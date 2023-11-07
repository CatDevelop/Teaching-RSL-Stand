import React, {FC, useEffect, useState} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import styles from "./SignVideo.module.css";
import clsx from "clsx";
import {Spinner} from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    src: string;
}>

/** Видео жеста. */
export const SignVideo: FC<Props> = typedMemo(function SignVideo(props) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
    }, [props.src]);

    return (
        <div className={clsx(styles.signVideo, props.className)}>
            {
                isLoading &&
                <Spinner className={styles.loader}/>
            }
            <video
                className={clsx(styles.signVideo__video, isLoading && styles.signVideo__video_hide)}
                src={props.src}
                autoPlay
                loop
                muted
                onCanPlayThrough={() => {setIsLoading(false)}}
            />
        </div>
    )
});
