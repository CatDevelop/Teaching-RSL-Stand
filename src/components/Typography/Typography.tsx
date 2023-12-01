import React, { ElementType, PropsWithChildren, useMemo, HtmlHTMLAttributes, forwardRef  } from "react";
import clsx from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Typography.module.css";

type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLParagraphElement> & Readonly<{
    variant?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
}>

/** Текст. */
export const Typography = typedMemo(forwardRef<HTMLParagraphElement, Props>(function Typography(props, ref){
    const Component: ElementType = useMemo(() => props.variant ?? 'span',[props.variant]);

    return <Component {...props} ref={ref} className={clsx(styles.typography, styles[Component], props.className)}>
        {props.children}
    </Component>
}));
