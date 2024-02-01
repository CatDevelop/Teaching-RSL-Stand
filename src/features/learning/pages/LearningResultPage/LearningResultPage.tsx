import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningResultPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {Typography} from "../../../../components/Typography";
import ResultLearning from "../../../../assets/images/ResultLearning.png"
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";
import {Card} from "../../../../components/Card";
import {initialSettings, Settings} from "../../../admin/pages/ConstructorPage/ConstructorPage";
import {LocalStorageService} from "../../../../api/services/localStorageService";

/**
 * Результаты уровня
 */
export const LearningResultPage: FC = typedMemo(function LearningResultPage() {
    const settings: Settings = LocalStorageService.get('Teaching-RSL-Settings') || initialSettings;
    const queryParams = new URLSearchParams(window.location.search)
    const wordsCount = parseInt(queryParams.get("count") || "0")

    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    useEffect(() => {
        fireworks()
    }, []);

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training/start"), [navigate])
    const toHomePage = useCallback(() => navigate("/"), [navigate])

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (settings.general.clickerMode && event.key === "ArrowRight") {
            event.preventDefault();
            navigate("/training/start?learningResult="+wordsCount)
        }

        if (settings.general.clickerMode && event.key === "ArrowLeft") {
            event.preventDefault();
            navigate("/learning")
        }
    }, [navigate, settings])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toHomePage}/>
            <PageContent className={styles.learningResult}>
                <div className={styles.learningResult__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt="Логотип" width={300}/>
                </div>

                <Card className={styles.learningResult__card}>
                    <div className={styles.learningResult__contentContainer}>
                        <div className={styles.learningResult__result}>
                            <img src={ResultLearning} alt={"Конец обучения!"}
                                 className={styles.learningResult__resultImage}/>
                            <Typography variant="p" className={styles.learningResult__resultDescription}>
                                Вы
                                выучили {wordsCount} {normalizeCountForm(wordsCount, ["жест", 'жеста', 'жестов'])}.<br/>
                                Теперь можно перейти к следующему этапу<br/>
                                и попробовать их на практике.
                            </Typography>
                            <Button variant={"solid"} color={"primary"} onClick={toTrainingPage}>
                                Перейти к практике
                            </Button>
                        </div>
                    </div>
                </Card>
            </PageContent>
        </Page>
    )
})
