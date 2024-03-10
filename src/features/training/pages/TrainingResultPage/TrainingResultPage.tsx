import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingResultPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {BySberAI} from "../../../../components/BySberAI";
import ResultImage from "../../../../assets/images/ResultTraining.png"
import {Card} from "../../../../components/Card";
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg";
import {StartThemeWords} from "../../../../core/data";

export const TrainingResultPage: FC = typedMemo(function TrainingPage() {
    const queryParams = new URLSearchParams(window.location.search)
    // const skipWordsCount = parseInt(queryParams.get("skiped") || "0")
    // const allWordsCount = parseInt(queryParams.get("all") || "0")

    const allWordsCount = StartThemeWords.length
    const skipWordsCount = allWordsCount - JSON.parse(localStorage.getItem("Teaching-RSL-correct-words") || "[]").length
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])
    const toAFK = useCallback(() => navigate("/"), [navigate])

    useEffect(() => {
        fireworks()
    }, [fireworks]);

    const getTaskResult = useCallback((countAllWords: number, countSkippedWords: number) => {
        return 100 - Math.floor((countSkippedWords) / countSkippedWords * 100)
    }, [])


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toAFK();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(-1)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            {/*<ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>*/}
            <PageContent className={styles.trainingResult}>
                <div className={styles.trainingResult__logoContainer} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>
                <Card className={styles.trainingResult__contentContainer}>
                    <div className={styles.trainingResult__result}>
                        <img alt="" src={ResultImage} className={styles.trainingResult__resultImage}/>
                        {/*<ResultImage className={styles.trainingResult__resultImage}/>*/}
                        <Typography variant="h2" className={styles.trainingResult__resultTitle}>
                            Конец тренировки
                        </Typography>
                        <Typography variant="p" className={styles.trainingResult__resultTitle}>
                            Ваш результат {allWordsCount - skipWordsCount} из {allWordsCount} {normalizeCountForm(allWordsCount, ["жеста", 'жестов', 'жестов'])}
                        </Typography>

                        <Button
                            size={'lg'}
                            color="primary"
                            onClick={toAFK}
                        >
                            <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/> В меню
                        </Button>
                    </div>

                    <div className={styles.trainingResult__result__container}>
                        <BySberAI/>
                    </div>
                </Card>

            </PageContent>
        </Page>
    )
})
