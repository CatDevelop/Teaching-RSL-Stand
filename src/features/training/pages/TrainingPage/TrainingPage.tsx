import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {TaskContinue} from "../../../../components/TaskContinue";
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {StartThemeWords} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {StartTraining} from "../../components/StartTraining/StartTraining";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {useIdle} from "@mantine/hooks";
import {QRCode} from "../../../../components/QR-code";
import ResultImage from "../../../../assets/images/ResultTrainingImage.svg";
import Result from "../../../../assets/images/Result.svg";
import {ResultCard} from "../../components/ResultCard";
import RightClicker from "../../../../assets/images/RightClicker.svg";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg";
import {BySberAI} from "../../../../components/BySberAI";
import {Card} from "../../../../components/Card";
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";
import {RECOGNITION_MODE} from "../../../../core/config";

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const [data] = useState(shuffleArray(StartThemeWords));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([]);
    const [signRecognizeGrade, setSignRecognizeGrade] = useState<number>(0);
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>();
    const [currentStep, setCurrentStep] = useState(0);
    const [isNotStartModel, setIsNotStartModel] = useState(false);
    let correctWords: Set<string> = useMemo(() => new Set(JSON.parse(localStorage.getItem("Teaching-RSL-correct-words") || "[]")), []);

    console.log(correctWords)
    const clearRecognizeText = () => setSignRecognizeText([])
    const clearRecognizeGrade = useCallback(() => setSignRecognizeGrade(0), [setSignRecognizeGrade])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toLearning = useCallback(() => navigate("/learning"), [navigate])

    const skip = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/sentence/start")
        }

        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        setIsDoneTask(false);
        clearRecognizeGrade()
        clearRecognizeText()
    }, [currentStep, data.length, clearRecognizeGrade, navigate, countSkippedWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/sentence/start")
        }

        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeGrade()
        clearRecognizeText()
    }, [currentStep, data.length, clearRecognizeGrade, navigate, countSkippedWords])

    useEffect(() => {
        if (currentStep === data.length && countSkippedWords !== data.length)
            fireworks()
    }, [currentStep, countSkippedWords, data.length, fireworks]);

    useEffect(() => {
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);

    const idle = useIdle(180000, {initialState: false});
    const getTaskResult = useCallback(() => {
        console.log(data, countSkippedWords, correctWords)
        if (!data) {
            return 0
        }
        return Math.floor((correctWords.size) / data.length * 100)
    }, [data, countSkippedWords, correctWords])


    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);

    const toTrainingPage = () => navigate("/")

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            if(currentStep === data.length)
                toAFK();

            if(currentStep === 0) {
                correctWords.clear()
                localStorage.setItem("Teaching-RSL-correct-words", "[]")
                setCurrentStep(0)
                return;
            }

            isDoneTask ? next() : skip();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            if(currentStep === -1)
                toLearning()
            else {
                correctWords.delete(data[currentStep]?.recognitionText)
                localStorage.setItem("Teaching-RSL-correct-words", JSON.stringify(Array.from(correctWords)))
                setIsDoneTask(false);
                clearRecognizeGrade()
                clearRecognizeText()
                setCurrentStep(currentStep - 1)
            }
        }
    }, [setCurrentStep, currentStep, isDoneTask])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__header}>
                    <div className={styles.trainingTask__logoContainer} onClick={toAFK}>
                        <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                    </div>
                    {
                        currentStep !== -1 && currentStep !== data.length && !isNotStartModel &&
                        <div className={styles.trainingTask__progressBarContainer}>
                            <ProgressBar currentStep={currentStep - 1} stepCount={data.length}/>
                        </div>
                    }
                </div>

                <div className={styles.trainingTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        <div className={styles.trainingTask__taskContainer__startContainer}>
                            <StartTraining onStart={() => setCurrentStep(0)}/>
                        </div>
                    }
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && !isNotStartModel &&
                        <RecognitionBlock
                            word={data[currentStep]}
                            className={styles.trainingTask__recognition}
                            onSuccess={() => setIsDoneTask(true)}
                            setIntervalID={setIntervalID}
                            intervalID={intervalID}
                            correctWords={correctWords}

                            signRecognizeGrade={signRecognizeGrade}
                            setSignRecognizeGrade={setSignRecognizeGrade}

                            signRecognizeText={signRecognizeText}
                            setSignRecognizeText={setSignRecognizeText}

                            recognitionMode={RECOGNITION_MODE}
                        />
                    }
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && isNotStartModel &&
                        <div className={styles.trainingPage__warningContainer}>
                            <ModelWarning/>
                        </div>

                    }
                    {
                        currentStep === data.length &&
                        <Card className={styles.trainingResult__contentContainer}>
                            <div className={styles.trainingResult__result}>
                                {/*<ResultImage className={styles.trainingResult__resultImage}/>*/}
                                <Typography variant="h2" className={styles.trainingResult__resultTitle}>
                                    Конец тренировки
                                </Typography>
                                <Typography variant="p" className={styles.trainingResult__resultTitle}>
                                    Ваш результат {correctWords.size} из {data.length} {normalizeCountForm(data.length, ["жеста", 'жестов', 'жестов'])}
                                </Typography>

                            </div>

                            <Button
                                size={'lg'}
                                color="primary"
                                onClick={toTrainingPage}
                            >
                                В меню
                            </Button>

                            <div className={styles.trainingResult__result__container}>
                                <BySberAI/>
                            </div>
                        </Card>
                        // <div className={styles.trainingTask__result}>
                        //     <Typography variant="h2" className={styles.trainingTask__resultTitle}>
                        //         Благодарим за участие!
                        //     </Typography>
                        //     <ResultCard
                        //         title="Результат"
                        //         iconUrl={Result}
                        //         content={`${getTaskResult()}%`}
                        //         className={styles.trainingTask__resultCard}
                        //     />
                        //     <div className={styles.trainingTask__result__container}>
                        //         <BySberAI/>
                        //     </div>
                        // </div>
                    }
                </div>

                <div className={styles.trainingTask__buttonsContainer}>
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && !isDoneTask && !isNotStartModel &&
                        <Button
                            size={"lg"}
                            variant="faded"
                            onClick={skip}
                        >
                            <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/> Пропустить
                        </Button>
                    }
                </div>

                <div className={styles.trainingTask__taskContinueContainer}>
                    {
                        isDoneTask &&
                        <TaskContinue next={next} isRightAnswer={true}/>
                    }
                    {
                        currentStep === data.length &&
                        <div className={styles.trainingTask__toHome}>
                            <Button
                                size={'lg'}
                                color="primary"
                                onClick={toAFK}
                            >
                                <img className={styles.trainingTask__rightClicker} src={RightClicker} alt={"Правый кликер"}/> В главное меню
                            </Button>
                        </div>
                    }
                </div>
                {
                    currentStep === -1 && isNotStartModel &&
                    <ModelWarning className={styles.trainingPage__warning}/>
                }
            </PageContent>
        </Page>
    )
})
