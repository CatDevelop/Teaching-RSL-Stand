import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import styles from "./RecognitionCamera.module.css";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {WebCamera} from "../WebCamera/WebCamera";
import {Chip, Spinner} from "@nextui-org/react";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {stopAllTracks} from "../../../../core/utils/stopAllTracks";
import {socket} from "../../../../core/utils/connectToModal";
import {Card} from "../../../../components/Card";
import {Badge} from "@mantine/core";
import clsx from "clsx";


type Props = ComponentProps & Readonly<{
    intervalID: TimeoutId | undefined;
    setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    onReceiveText: (text: string) => void
}>

export const RecognitionCamera: FC<Props> = typedMemo(function RecognitionCamera(props) {
    let videoElement: any;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const [recognitionIndicatorDots, setRecognitionIndicatorDots] = useState(1)


    const onDisconnectFromModal = useCallback(() => {
        console.log("Disconnect");
        socket.connect()
    }, [])


    useEffect(() => {
        socket.on("send_not_normalize_text", props.onReceiveText);
        return () => {
            socket.off("send_not_normalize_text", props.onReceiveText)
        }
    }, [props.onReceiveText]);

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
        socket.on("disconnect", onDisconnectFromModal);

        videoElement = document.getElementById('webcam');
        if (videoElement)
            startWebcam(addFrameSender);

        return () => {
            socket.off("disconnect", onDisconnectFromModal);
            socket.disconnect();
            videoElement.removeEventListener('play', addFrameSender);
            stopAllTracks(videoElement.srcObject)
        }
    }, []);

    useEffect(() => {
        return () => clearInterval(props.intervalID)
    }, [props.intervalID])


    useEffect(() => {
        let interval = setInterval(() => setRecognitionIndicatorDots((recognitionIndicatorDots + 1) % 3 + 1), 500)
        return () => {
            clearInterval(interval)
        }
    }, [setRecognitionIndicatorDots, recognitionIndicatorDots]);

    if (!props)
        return;

    return (
        <div className={clsx(styles.camera, props.className)}>
            <Spinner className={styles.loading}/>
            <WebCamera/>
            {/*<Badge className={styles.indicator} color="rgba(51, 142, 247, 0.75)" radius="sm">*/}
            {/*    Распознаю{".".repeat(recognitionIndicatorDots)}*/}
            {/*</Badge>*/}
        </div>
    );
});
