import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
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
import {BySberAI} from "../../../../components/BySberAI";
import {useIdle} from "@mantine/hooks";
import ResultTraining from '../../../../assets/images/ResultTraining.png'

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const [data] = useState(shuffleArray(StartThemeWords));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([]);
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>();
    const [currentStep, setCurrentStep] = useState(-1);
    const [isNotStartModel, setIsNotStartModel] = useState(false);

    const getTaskResult = () => 100 - Math.floor((countSkippedWords) / data.length * 100)
    const clearRecognizeText = () => setSignRecognizeText([])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toMainPage = useCallback(() => navigate("/home"), [navigate])
    const toAFK = useCallback(() => navigate("/"), [navigate])

    const skip = useCallback(() => {
        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        clearRecognizeText()
    }, [setCountSkippedWords, setCurrentStep]);

    const next = useCallback(() => {
        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [setCurrentStep, setIsDoneTask])

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
        if(idle)
            toAFK()
    }, [idle, toAFK]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__header}>
                    <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                        <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                        {/*<BySberAI/>*/}
                    </div>
                    {
                        currentStep !== -1 && currentStep !== data.length && !isNotStartModel &&
                        <div className={styles.trainingTask__progressBarContainer}>
                            <ProgressBar currentStep={currentStep - 1} stepCount={data.length}/>
                        </div>
                    }
                    <div className={styles.trainingTask__exitButtonContainer}>
                        {
                            currentStep !== data.length &&
                            <Button
                                variant={"faded"}
                                color={"default"}
                                size={"lg"}
                                onClick={openExitModal}
                            >
                                В главное меню
                            </Button>
                        }
                    </div>
                </div>

                {currentStep !== data.length && <BySberAI className={styles.trainingTask__bySberAI}/>}


                <div className={styles.trainingTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        <StartTraining onStart={() => setCurrentStep(0)}/>
                    }
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && !isNotStartModel &&
                        <RecognitionBlock
                            word={data[currentStep]}
                            className={styles.trainingTask__recognition}
                            onSuccess={() => setIsDoneTask(true)}
                            setIntervalID={setIntervalID}
                            intervalID={intervalID}
                            signRecognizeText={signRecognizeText}
                            setSignRecognizeText={setSignRecognizeText}
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
                        <div className={styles.trainingTask__result}>
                            <img src={ResultTraining} alt={"Конец тренировки!"} className={styles.trainingTask__result__image}/>
                            <Typography variant="h2" className={styles.trainingTask__resultTitle}>
                                Поздравляем!
                            </Typography>
                            <Typography variant="p" className={styles.trainingTask__resultDescription}>
                                Благодарим за участие!
                            </Typography>
                            <div className={styles.trainingTask__result__container}>
                                <BySberAI/>
                                {/*<ResultCard*/}
                                {/*    title="Результат"*/}
                                {/*    iconUrl={Result}*/}
                                {/*    content={`${getTaskResult()}%`}*/}
                                {/*    className={styles.trainingTask__resultCard}/>*/}
                            </div>
                        </div>
                    }
                </div>

                <div className={styles.trainingTask__buttonsContainer}>
                    {
                         //currentStep <= data.length - 1 && !isDoneTask &&
                         //<div className={styles.trainingTask__bySberAI}>
                             //<BySberAI/>
                         //</div>
                     }
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && !isDoneTask && !isNotStartModel &&
                        <Button
                            size={"lg"}
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
                    {
                        currentStep === data.length &&
                        <div className={styles.trainingTask__toHome}>
                            <Button
                                size={'lg'}
                                color="primary"
                                onClick={toMainPage}
                            >
                                В главное меню
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
