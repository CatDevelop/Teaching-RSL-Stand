import React, {FC} from "react";
import {Checkbox, Switch} from "@nextui-org/react";
import styles from "./SettingsSwitch.module.css";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {HintIcon} from "../../../../assets/images/HintIcon";

type Props = {
    isSelected: boolean,
    title: string,
    hint: string,
    onValueChange: (isSelected: boolean) => void
};

/** Кнопка. */
export const SettingsSwitch: FC<Props> = typedMemo(function SettingsSwitch(props) {
    return (
        <div className={styles.switch}>
            <Switch
                isSelected={props.isSelected}
                classNames={{label: styles.switch__label}}
                size='sm'
                onValueChange={props.onValueChange}
            >
                {props.title}
            </Switch>
            <div className={styles.switch__hintContainer}>
                {/*<div className={styles.switch__hint__icon}>{HintIcon}</div>*/}
                <p className={styles.switch__hint__title}>{props.hint}</p>
            </div>
        </div>
    )
})
