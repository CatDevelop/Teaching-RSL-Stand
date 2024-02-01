import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";
import {TaskContinue} from "../../../../components/TaskContinue";
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {Words} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {getSocket} from "../../../../core/utils/connectToModal";
import {BySberAI} from "../../../../components/BySberAI";
import {useIdle} from "@mantine/hooks";
import {QRCode} from "../../../../components/QR-code";
import {initialSettings, Settings} from "../../../admin/pages/ConstructorPage/ConstructorPage";
import {LocalStorageService} from "../../../../api/services/localStorageService";

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const settings: Settings = LocalStorageService.get('Teaching-RSL-Settings') || initialSettings;
    console.log(settings)

    const socket = getSocket(settings.training.recognitionSource)

    const [data] = useState(shuffleArray(Words.filter(word => `${word.id}` in settings.general.wordsList)));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([]);
    const [signRecognizeResult, setSignRecognizeResult] = useState<number>(0);
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>();
    const [currentStep, setCurrentStep] = useState(0);
    const [isNotStartModel, setIsNotStartModel] = useState(false);
    const [incorrectWords, setIncorrectWords] = useState<string[]>([])

    const getTaskResult = () => 100 - Math.floor((countSkippedWords) / data.length * 100)
    const clearRecognizeText = () => setSignRecognizeText([])
    const clearRecognizeResult = useCallback(() => setSignRecognizeResult(0), [setSignRecognizeResult])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toAFK = useCallback(() => navigate("/"), [navigate])

    const skip = useCallback(() => {
        data && setIncorrectWords([...incorrectWords, data[currentStep].id])
        if (currentStep + 1 === data.length) {
            navigate("result/?skiped=" + (countSkippedWords + 1) + "&all=" + data.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        clearRecognizeText()
    }, [setCountSkippedWords, setCurrentStep, currentStep, data, countSkippedWords, incorrectWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("result/?skiped=" + countSkippedWords + "&all=" + data.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [setCurrentStep, setIsDoneTask, currentStep, data, countSkippedWords])

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

    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (settings.general.clickerMode && event.key === "ArrowRight") {
            event.preventDefault();
            isDoneTask ? next() : skip();
        }

        if (settings.general.clickerMode && event.key === "ArrowLeft") {
            event.preventDefault();
            if(currentStep === 0)
                navigate("/training/start")
            else {
                setIsDoneTask(false);
                clearRecognizeResult()
                clearRecognizeText()
                setCurrentStep(currentStep - 1)
            }
        }
    }, [setCurrentStep, currentStep, isDoneTask, settings])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toAFK}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__header}>
                    <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                        <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                    </div>
                    {
                        !isNotStartModel &&
                        <div className={styles.trainingTask__progressBarContainer}>
                            <ProgressBar currentStep={currentStep - 1} stepCount={data.length}/>
                        </div>
                    }
                    <div className={styles.trainingTask__exitButtonContainer}>
                        <Button
                            variant="faded"
                            size="lg"
                            onClick={openExitModal}
                        >
                            В главное меню
                        </Button>
                    </div>
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


                <div className={styles.trainingTask__taskContainer}>
                    {
                       !isNotStartModel &&
                        <RecognitionBlock
                            word={data[currentStep]}
                            className={styles.trainingTask__recognition}
                            onSuccess={() => setIsDoneTask(true)}
                            setIntervalID={setIntervalID}
                            intervalID={intervalID}

                            signRecognizeResult={signRecognizeResult}
                            setSignRecognizeResult={setSignRecognizeResult}

                            signRecognizeText={signRecognizeText}
                            setSignRecognizeText={setSignRecognizeText}
                        />
                    }
                    {
                        isNotStartModel &&
                        <div className={styles.trainingPage__warningContainer}>
                            <ModelWarning/>
                        </div>
                    }
                </div>

                <div className={styles.trainingTask__buttonsContainer}>
                    {
                        !isDoneTask && !isNotStartModel &&
                        <Button
                            size="lg"
                            variant="faded"
                            onClick={skip}
                        >
                            Пропустить
                        </Button>
                    }
                </div>

                <div className={styles.trainingTask__taskContinueContainer}>
                    {
                        isDoneTask &&
                        <TaskContinue next={next} isRightAnswer={true}/>
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
