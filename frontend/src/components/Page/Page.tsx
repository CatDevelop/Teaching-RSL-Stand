import {typedMemo} from "../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./Page.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../core/models/ComponentProps";

type Props = PropsWithChildren & ComponentProps;

export const Page: FC<Props> = typedMemo(function Page(props) {
    return (
        <div className={clsx(styles.page, props.className)}>
            {props.children}
        </div>
    )
})
