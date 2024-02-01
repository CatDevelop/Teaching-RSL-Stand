import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, Key, useCallback, useState} from "react";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {Typography} from "../../../../components/Typography";
import {Accordion, AccordionItem, Selection} from "@nextui-org/react";
import {LearningIcon} from "../../../../assets/images/LearningIcon";
import styles from "./ConstructorPage.module.css"
import {TrainingIcon} from "../../../../assets/images/TrainingIcon";
import {SettingsIcon} from "../../../../assets/images/SettingsIcon";
import {GeneralSettingsForm} from "../../components/GeneralSettingsForm";
import {LearningSettingsForm} from "../../components/LearningSettingsForm";
import {TrainingSettingsForm} from "../../components/TrainingSettingsForm";
import {Button} from "../../../../components/Button";
import {LocalStorageService} from "../../../../api/services/localStorageService";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export type Settings = {
    general: {
        selectMenu: boolean,
        clickerMode: boolean,
        wordsList: Set<Key>
    },
    learning: {
        practices: boolean
    },
    training: {
        markMode: 'mark' | 'words',
        markStrictness: 'loyal' | 'strict',
        recognitionSource: 'server' | 'local',
        qrCode: boolean
    }
}

export const initialSettings: Settings = {
    general: {
        selectMenu: true,
        clickerMode: false,
        wordsList: new Set<Key>(["3", "4"])
    },
    learning: {
        practices: true
    },
    training: {
        markMode: 'words',
        markStrictness: 'loyal',
        recognitionSource: 'server',
        qrCode: true
    }
}
export const ConstructorPage: FC = typedMemo(function ConstructorPage() {
    const [settings, setSettings] = useState<Settings>(LocalStorageService.get("Teaching-RSL-Settings") || initialSettings)
    const navigate = useNavigate()

    const toMainPage = useCallback(() => {
        navigate("/")
    }, [navigate])

    const saveSettings = useCallback(() => {
        LocalStorageService.set('Teaching-RSL-Settings', settings)
        toast.success("Настройки успешно сохранены!")
    }, [settings])

    const restoreSettings = useCallback(() => {
        LocalStorageService.set('Teaching-RSL-Settings', initialSettings)
        setSettings(initialSettings)
    }, [settings])

    return (
        <Page>
            <PageContent className={styles.constructor__content}>
                <div className={styles.constructor__title}>
                    <Typography variant="h1">
                        Настройки демо-стенда
                    </Typography>
                    <Button variant="faded" onClick={toMainPage}>
                        В главное меню
                    </Button>
                </div>

                <Accordion
                    selectionMode="multiple"
                    variant="splitted"
                    defaultExpandedKeys={["general", "learning", "training"]}
                    className={styles.constructor__accordion}
                >
                    <AccordionItem
                        key="general"
                        aria-label="Общие"
                        title="Общие"
                        startContent={SettingsIcon}
                        className={styles.constructor__accordionItem}
                        classNames={{
                            title: styles.constructor__accordionItem__title,
                            startContent: styles.constructor__accordionItem__icon
                        }}
                    >
                        <GeneralSettingsForm settings={settings} setSettings={setSettings}/>
                    </AccordionItem>
                    <AccordionItem
                        key="learning"
                        aria-label="Обучение"
                        title="Обучение"
                        startContent={LearningIcon}
                        className={styles.constructor__accordionItem}
                        classNames={{
                            title: styles.constructor__accordionItem__title,
                            startContent: styles.constructor__accordionItem__icon
                        }}
                    >
                        <LearningSettingsForm settings={settings} setSettings={setSettings}/>
                    </AccordionItem>
                    <AccordionItem
                        key="training"
                        aria-label="Тренировки"
                        title="Тренировки"
                        startContent={TrainingIcon}
                        className={styles.constructor__accordionItem}
                        classNames={{
                            title: styles.constructor__accordionItem__title,
                            startContent: styles.constructor__accordionItem__icon
                        }}
                    >
                        <TrainingSettingsForm settings={settings} setSettings={setSettings}/>
                    </AccordionItem>
                </Accordion>
                <div className={styles.constructor__buttonContainer}>
                    <Button color="default" variant="faded" onClick={restoreSettings}>
                        Сбросить
                    </Button>
                    <Button color="primary" onClick={saveSettings}>
                        Сохранить
                    </Button>
                </div>
            </PageContent>
        </Page>
    )
})
