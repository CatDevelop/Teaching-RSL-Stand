import React, {FC} from "react";
import styles from "./LearningSettingsForm.module.css";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {SettingsSwitch} from "../SettingsSwitch";
import {Settings} from "../../pages/ConstructorPage/ConstructorPage";

type Props = {
    settings: Settings,
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
};

/** Кнопка. */
export const LearningSettingsForm: FC<Props> = typedMemo(function LearningSettingsForm(props) {
    return (
        <div className={styles.form}>
            <SettingsSwitch
                onValueChange={(value) => props.setSettings({
                    ...props.settings,
                    learning: {...props.settings.learning, practices: value},
                    general: {...props.settings.general, clickerMode: value ? false : props.settings.general.clickerMode}
                })}
                isSelected={props.settings.learning.practices}
                title="Проверка знаний с помощью интерактивных заданий"
                hint="Отключите, если необходимо отображать только теорию"
            />
        </div>
    )
})
