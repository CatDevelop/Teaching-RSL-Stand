import React, {FC, useEffect} from "react";
import styles from "./GeneralSettingsForm.module.css";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {SettingsSwitch} from "../SettingsSwitch";
import {Chip, Select, SelectItem} from "@nextui-org/react";
import {Settings} from "../../pages/ConstructorPage/ConstructorPage";
import {Words} from "../../../../core/data";

type Props = {
    settings: Settings,
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
};

/**
 * Форма общих настроек демо-стенда.
 */
export const GeneralSettingsForm: FC<Props> = typedMemo(function GeneralSettingsForm(props) {
    const words = Words.map(word => ({
        label: word.text, key: word.id
    }))

    console.log(props.settings)

    return (
        <div className={styles.form}>
            <SettingsSwitch
                onValueChange={(value) => props.setSettings({
                    ...props.settings,
                    general: {...props.settings.general, selectMenu: value, clickerMode: false}
                })}
                isSelected={props.settings.general.selectMenu}
                title="Меню выбора перехода к обучению или тренировкам"
                hint="Если меню отключено, с АФК страницы пользователь сразу перейдёт в обучение и после - в тренировки"
            />
            <SettingsSwitch
                onValueChange={(value) => props.setSettings({
                    ...props.settings,
                    learning: {practices: value ? false : props.settings.learning.practices},
                    general: {...props.settings.general, clickerMode: value, selectMenu: false}
                })}
                isSelected={props.settings.general.clickerMode}
                title="Управление с помощью стрелочек"
                hint="Для использования кликера используйте эту настройку"
            />
            <Select
                className={styles.select}
                classNames={{label: styles.select__label, listbox: styles.select__value}}
                variant="bordered"
                labelPlacement="outside-left"
                label="Список слов для изучения:"
                placeholder="Выберите слова"
                defaultSelectedKeys={["3", "4"]}
                disallowEmptySelection
                selectionMode="multiple"
                items={words}
                selectedKeys={props.settings.general.wordsList}
                onSelectionChange={(keys) => {
                    console.log(keys)
                    props.setSettings({
                            ...props.settings,
                            general: {...props.settings.general, wordsList: new Set(keys)}
                        }
                    )
                }}
                renderValue={(items) => {
                    return (
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <Chip className={styles.select__chip} key={item.key}>{item.textValue}</Chip>
                            ))}
                        </div>
                    );
                }}
            >
                {
                    words.map(word => {
                        return <SelectItem key={word.key}>{word.label}</SelectItem>
                    })
                }
            </Select>
        </div>
    )
})
