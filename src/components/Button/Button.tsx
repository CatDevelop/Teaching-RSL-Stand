import React, {FC} from "react";
import {clsx} from 'clsx';
import {Button as ButtonNextUI, ButtonProps} from "@nextui-org/react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./Button.module.css";

type Props = ButtonProps & {[key: string]: unknown};


/**
 * Кнопка
 */
export const Button: FC<Props> = typedMemo(function Button(props) {
    return (
        <ButtonNextUI
            {...props}
            className={clsx(
                styles.button,
                props.variant === "solid" && props.color !== "primary" && styles.button_solid,
                props.variant === "faded" && props.color !== "primary" && styles.button_faded,
                props.variant === "faded" && props.color === "primary" && styles.button_primary_faded,
                props.variant === "light" && styles.button_link,
                props.variant === "light" && props.color === 'primary' && styles.button_primary_link,
                props.variant === undefined && styles.button_filled,
                props.disabled && props.color === "primary" && props.variant === "solid" && styles.button_primary_solid_disabled,
                props.className ?? ''
            )}
        />
    )
})
