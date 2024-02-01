import React, {FC} from "react";
import styles from "./TrainingSettingsForm.module.css";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Select, SelectItem} from "@nextui-org/react";
import {Settings} from "../../pages/ConstructorPage/ConstructorPage";
import {SettingsSwitch} from "../SettingsSwitch";

type Props = {
    settings: Settings,
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
};

/** Кнопка. */
export const TrainingSettingsForm: FC<Props> = typedMemo(function TrainingSettingsForm(props) {
    return (
        <div className={styles.form}>
            <Select
                className={styles.select}
                classNames={{label: styles.select__label}}
                variant="bordered"
                labelPlacement="outside-left"
                label="Режим оценивания:"
                placeholder="Выберите режим"
                selectedKeys={[props.settings.training.markMode]}
                disallowEmptySelection
                onChange={(keys) => {
                    props.setSettings({
                            ...props.settings,
                            // @ts-ignore
                            training: {...props.settings.training, markMode: keys.target.value}
                        }
                    )
                }}
            >
                <SelectItem key='mark'>Оценка</SelectItem>
                <SelectItem key='words'>Распознанные слова</SelectItem>
            </Select>

            <Select
                className={styles.select}
                classNames={{label: styles.select__label}}
                variant="bordered"
                labelPlacement="outside-left"
                label="Строгость оценки:"
                placeholder="Выберите строгость"
                selectedKeys={[props.settings.training.markStrictness]}
                disallowEmptySelection
                onChange={(keys) => {
                    props.setSettings({
                            ...props.settings,
                            // @ts-ignore
                            training: {...props.settings.training, markStrictness: keys.target.value}
                        }
                    )
                }}
            >
                <SelectItem key='loyal'>Лояльная (Засчитывает топ 3 слова)</SelectItem>
                <SelectItem key='strict'>Строгая (Засчитывает топ 1 слово)</SelectItem>
            </Select>
            <Select
                className={styles.select}
                classNames={{label: styles.select__label}}
                variant="bordered"
                labelPlacement="outside-left"
                label="Модель распознавания:"
                placeholder="Выберите модель"
                selectedKeys={[props.settings.training.recognitionSource]}
                disallowEmptySelection
                onChange={(keys) => {
                    props.setSettings({
                            ...props.settings,
                            // @ts-ignore
                            training: {...props.settings.training, recognitionSource: keys.target.value}
                        }
                    )
                }}
            >
                <SelectItem key='local'>Локальная</SelectItem>
                <SelectItem key='server'>Серверная</SelectItem>
            </Select>
            <SettingsSwitch
                onValueChange={(value) => props.setSettings({
                    ...props.settings,
                    training: {
                        ...props.settings.training,
                        qrCode: value
                    }
                })}
                isSelected={props.settings.training.qrCode}
                title="QR-коды"
                hint="Отображение QR-кодов на модель распознавания и статью о ней"/>
        </div>
    )
})
