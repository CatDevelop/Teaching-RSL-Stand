import React, { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import clsx from "clsx";
import { ComponentProps } from "../../core/models/ComponentProps";
import styles from "./PageContent.module.css";

type Props = PropsWithChildren & ComponentProps;

/** Контейнер для контента на странице. */
export const PageContent: FC<Props> = typedMemo(function PageContent(props){
    return (
        <div className={clsx(props.className, styles.pageContent)}>
            {props.children}
        </div>
    )
})
