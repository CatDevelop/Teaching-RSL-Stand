import React, {FC, PropsWithChildren} from 'react';
import styles from './WidthContent.module.css';
import {typedMemo} from "../../core/utils/typedMemo";

export const WidthContent: FC<PropsWithChildren> = typedMemo(function WidthContent(props) {
    return (
        <div className={styles.widthContent}>
            <div className={styles.widthContent__app}>
                {props.children}
            </div>
        </div>
    )
})
