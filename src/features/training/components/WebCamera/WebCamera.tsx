import styles from './WebCamera.module.css'
import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../core/models/ComponentProps";


export const WebCamera: FC<ComponentProps> = typedMemo(function PracticeSelectWord() {
    return (
        <video id="webcam" className={styles.webcamera} autoPlay/>
    )
});
