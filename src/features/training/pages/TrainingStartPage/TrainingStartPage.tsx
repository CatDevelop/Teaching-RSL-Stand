import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingStartPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {BySberAI} from "../../../../components/BySberAI";
import {StartTraining} from "../../components/StartTraining/StartTraining";
import {QRCode} from "../../../../components/QR-code";
import {initialSettings, Settings} from "../../../admin/pages/ConstructorPage/ConstructorPage";
import {LocalStorageService} from "../../../../api/services/localStorageService";

export const TrainingStartPage: FC = typedMemo(function TrainingStartPage() {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const learningWordsCount = parseInt(queryParams.get("learningResult") || "0")
    const settings: Settings = LocalStorageService.get('Teaching-RSL-Settings') || initialSettings;

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (settings.general.clickerMode && event.key === "ArrowRight") {
            event.preventDefault();
            toTrainingPage()
        }

        if (settings.general.clickerMode && event.key === "ArrowLeft") {
            event.preventDefault();
            navigate("/learning/result/?count=" + learningWordsCount)
        }
    }, [settings, navigate, learningWordsCount])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>
            <PageContent className={styles.trainingResult}>
                <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>

                <>
                    <div className={styles.trainingPage__leftInfoContainer}>
                        <BySberAI className={styles.trainingTask__bySberAI}/>
                        {
                            settings.training.qrCode &&
                            <QRCode type="git"/>
                        }
                    </div>
                    <div className={styles.trainingPage__habrQR}>
                        {
                            settings.training.qrCode &&
                            <QRCode type="habr"/>
                        }
                    </div>
                </>

                <div className={styles.trainingStart__contentContainer}>
                    <StartTraining onStart={() => navigate("/training")}/>
                </div>
            </PageContent>
        </Page>
    )
})
