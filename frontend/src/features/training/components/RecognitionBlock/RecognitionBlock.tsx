import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction, useCallback, useEffect} from "react";
import styles from "./RecognitionBlock.module.css";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import {WebCamera} from "../WebCamera/WebCamera";
import {Spinner} from "@nextui-org/react";
import {Word} from "../../../../core/models/Word";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {stopAllTracks} from "../../../../core/utils/stopAllTracks";
import {socket} from "../../../../core/utils/connectToModal";

type Props = ComponentProps & Readonly<{
    word: Word;
    onSuccess: () => void;
    intervalID: TimeoutId | undefined;
    setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    signRecognizeText: string[]
    setSignRecognizeText: Dispatch<SetStateAction<string[]>>
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock(props) {
    let videoElement: any;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const onConnectToModal = useCallback(() => {
        console.log("Connected to server");
    }, [])

    const onDisconnectFromModal = useCallback(() => {
        console.log("Disconnect");
    }, [])

    const onReceiveText = useCallback((text: string) => {
        console.log(text)
        props.setSignRecognizeText([...props.signRecognizeText, text.toLowerCase()])
    }, [props.setSignRecognizeText, props.signRecognizeText, props])

    useEffect(() => {
        socket.on("send_not_normalize_text", onReceiveText);
        return () => {
            socket.off("send_not_normalize_text", onReceiveText)
        }
    }, [onReceiveText]);


    const startWebcam = useCallback(async (addFrameSender: () => void) => {
        try {
            stopAllTracks(videoElement.srcObject)
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}});
            videoElement.addEventListener('play', addFrameSender, {once: true});
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }

        return () => {
            videoElement.removeEventListener('play', addFrameSender, {once: true});
            stopAllTracks(videoElement.srcObject)
        }
    }, [videoElement, props.intervalID])

    const addFrameSender = useCallback(() => {
        let id = setInterval(() => {
            console.log("Send frame")
            const originalWidth = videoElement.videoWidth;
            const originalHeight = videoElement.videoHeight;
            const aspectRatio = originalWidth / originalHeight;
            let newWidth = 224;
            let newHeight = newWidth / aspectRatio;

            canvas.width = 224;
            canvas.height = 224;

            if (context)
                context.fillStyle = 'rgb(114, 114, 114)';
            context?.fillRect(0, 0, canvas.width, canvas.width);

            context?.drawImage(videoElement, 0, (224 - newHeight) / 2, newWidth, newHeight);
            const image = canvas.toDataURL('image/jpeg');
            socket.emit("data", image);
        }, 30);
        props.setIntervalID(id)
    }, [context, canvas, videoElement, props.setIntervalID])


    useEffect(() => {
        socket.connect()

        socket.on("connect", onConnectToModal);
        socket.on("disconnect", onDisconnectFromModal);
        // socket.on("send_not_normalize_text", onReceiveText);

        videoElement = document.getElementById('webcam');
        if (videoElement)
            startWebcam(addFrameSender);

        return () => {
            socket.off("connect", onConnectToModal);
            socket.off("disconnect", onDisconnectFromModal);
            // socket.off("send_not_normalize_text", onReceiveText);
            socket.disconnect();
            videoElement.removeEventListener('play', addFrameSender);
            stopAllTracks(videoElement.srcObject)
        }
    }, []);

    useEffect(() => {
        return () => clearInterval(props.intervalID)
    }, [props.intervalID])

    useEffect(() => {
        if (props.signRecognizeText.includes(props.word.recognitionText.toLowerCase()))
            props.onSuccess()
    }, [props.signRecognizeText])

    if (!props)
        return;

    return (
        <Card className={clsx(styles.recognitionBlock, props.className)}>
            <div className={styles.recognitionBlock__titleContainer}>
                <Typography variant="span" className={styles.recognitionBlock__title}>
                    Покажите жест в камеру
                </Typography>
                <Typography variant="h2" className={styles.recognitionBlock__gesture}>
                    {props.word.text}
                </Typography>
            </div>

            <div className={styles.recognitionBlock__camera}>
                <Spinner className={styles.recognitionBlock__cameraLoading}/>
                <WebCamera/>
            </div>

            <div className={styles.recognitionBlock__recognizedContainer}>
                <Typography variant="h3" className={styles.recognitionBlock__recognized}>
                    Распознанные жесты
                </Typography>
                <div className={clsx(styles.recognitionBlock__recognizedWords)}>
                    {
                        props.signRecognizeText.slice(-6).map(word => {
                            return (
                                <Typography
                                    variant="span"
                                    className={clsx(
                                        styles.recognitionBlock__recognizedWord,
                                        word.toLowerCase() === props.word.recognitionText.toLowerCase() && styles.recognitionBlock__rightWord
                                    )}
                                >
                                    {word}
                                </Typography>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    );
});
