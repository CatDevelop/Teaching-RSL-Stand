import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {StartThemeWords} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {useIdle} from "@mantine/hooks";
import {TaskHeader} from "../../../../components/TaskHeader";
import {RecognitionWordBlock} from "../../components/RecognitionWordBlock";

interface IData {
    id: number,
    words: number[],
    text: string
}

export const TrainingTaskPage: FC = typedMemo(function TrainingSentencePage() {
    const navigate = useNavigate()


    const [data] = useState(shuffleArray(StartThemeWords));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([]);

    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);

    const [currentStep, setCurrentStep] = useState(0);


    const [isNotStartModel, setIsNotStartModel] = useState(false);

    const clearRecognizeText = () => setSignRecognizeText([])

    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toTrainingStart = useCallback(() => navigate("/training/start"), [navigate])

    const skip = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/sentence/start")
        }

        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        setIsDoneTask(false);
        clearRecognizeText()
    }, [currentStep, data.length, navigate, countSkippedWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/sentence/start")
        }

        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [currentStep, data.length, navigate, countSkippedWords])

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

    useEffect(() => {
        if(signRecognizeText.includes(data[currentStep].text.toLowerCase()))
            setIsDoneTask(true)
    }, [signRecognizeText, data, currentStep]);


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            if (currentStep === data.length)
                toAFK();

            if (currentStep === -1) {
                setCurrentStep(0)
                return;
            }

            isDoneTask ? next() : skip();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (currentStep === 0)
                toTrainingStart()
            else {
                setIsDoneTask(false);
                clearRecognizeText()
                setCurrentStep(currentStep - 1)
            }
        }
    }, [setCurrentStep, currentStep, isDoneTask, toTrainingStart])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);


    if (isNotStartModel) {
        return (
            <Page>
                <PageContent className={styles.trainingSentencePage}>
                    <div className={styles.content}>
                        <div className={styles.warningContainer}>
                            <ModelWarning/>
                        </div>
                    </div>
                </PageContent>
            </Page>
        )
    }

    return (
        <Page>
            <PageContent className={styles.trainingSentencePage}>
                <div className={styles.logo} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>

                <div className={styles.content}>
                    <TaskHeader
                        type={"Тренировка"}
                        task={"Покажите жест в камеру"}
                        name={`${currentStep + 1} / ${data.length}`}
                        currentStep={currentStep}
                        stepCount={data.length}
                    />


                    <RecognitionWordBlock
                        word={data[currentStep]}
                        signRecognizeText={signRecognizeText}
                        setSignRecognizeText={setSignRecognizeText}
                        isDoneTask={isDoneTask}
                        next={next}
                    />
                </div>
            </PageContent>
        </Page>
    )
})
