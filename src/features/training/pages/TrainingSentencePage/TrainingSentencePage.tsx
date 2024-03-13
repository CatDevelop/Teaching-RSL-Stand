import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingSentencePage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import {StartThemeSentence} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {useIdle} from "@mantine/hooks";
import {RecognitionSentenceBlock} from "../../components/RecognitionSentenceBlock";
import {Card} from "../../../../components/Card";
import {TaskHeader} from "../../../../components/TaskHeader";

interface IData {
    id: number,
    words: number[],
    text: string
}

export const TrainingSentencePage: FC = typedMemo(function TrainingSentencePage() {
    const navigate = useNavigate()


    const [data] = useState<IData[]>(shuffleArray(StartThemeSentence));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([]);

    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);

    const [currentStep, setCurrentStep] = useState(0);


    const [isNotStartModel, setIsNotStartModel] = useState(false);

    const clearRecognizeText = () => setSignRecognizeText([])

    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toTrainingSentenceStart = useCallback(() => navigate("/training/sentence/start"), [navigate])

    const skip = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/result")
        }

        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        setIsDoneTask(false);
        clearRecognizeText()
    }, [currentStep, data.length, navigate, countSkippedWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === data.length) {
            navigate("/training/result")
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
        if(signRecognizeText.length >= data[currentStep].words.length)
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
                toTrainingSentenceStart()
            else {
                // correctWords.delete(data[currentStep]?.recognitionText)
                setIsDoneTask(false);
                clearRecognizeText()
                setCurrentStep(currentStep - 1)
            }
        }
    }, [setCurrentStep, currentStep, isDoneTask, toTrainingSentenceStart])

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
                        type={"Практика"}
                        name={`${currentStep + 1} из ${data.length} предложение`}
                        currentStep={currentStep}
                        stepCount={data.length}
                    />


                    <RecognitionSentenceBlock
                        sentence={data[currentStep]}
                        signRecognizeText={signRecognizeText}
                        setSignRecognizeText={setSignRecognizeText}
                        isDoneTask={isDoneTask}
                        next={next}
                    />
                </div>





                {/*<div className={styles.trainingTask__contentContainer}>*/}
                {/*    {*/}
                {/*        currentStep !== -1 && currentStep !== data.length && !isNotStartModel &&*/}
                {/*        <Card className={styles.progressContainer}>*/}
                {/*            <ProgressBar currentStep={currentStep - 1} stepCount={data.length}/>*/}
                {/*        </Card>*/}
                {/*        // <div className={styles.trainingTask__progressBarContainer}>*/}
                {/*        //*/}
                {/*        // </div>*/}
                {/*    }*/}
                {/*    {*/}
                {/*        !isNotStartModel &&*/}
                {/*        <RecognitionSentenceBlock*/}
                {/*            sentence={data[currentStep]}*/}
                {/*            signRecognizeText={signRecognizeText}*/}
                {/*            setSignRecognizeText={setSignRecognizeText}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    {*/}
                {/*        isNotStartModel &&*/}
                {/*        <div className={styles.trainingPage__warningContainer}>*/}
                {/*            <ModelWarning/>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}

                {/*<div className={styles.trainingTask__buttonsContainer}>*/}
                {/*    {*/}
                {/*        currentStep >= 0 && currentStep <= data.length - 1 && !isDoneTask && !isNotStartModel &&*/}
                {/*        <Button*/}
                {/*            size={"lg"}*/}
                {/*            variant="faded"*/}
                {/*            onClick={skip}*/}
                {/*        >*/}
                {/*            <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/> Пропустить*/}
                {/*        </Button>*/}
                {/*    }*/}
                {/*</div>*/}

                {/*<div className={styles.trainingTask__taskContinueContainer}>*/}
                {/*    {*/}
                {/*        isDoneTask &&*/}
                {/*        <TaskContinue next={next} isRightAnswer={true}/>*/}
                {/*    }*/}
                {/*    {*/}
                {/*        currentStep === data.length &&*/}
                {/*        <div className={styles.trainingTask__toHome}>*/}
                {/*            <Button*/}
                {/*                size={'lg'}*/}
                {/*                color="primary"*/}
                {/*                onClick={toAFK}*/}
                {/*            >*/}
                {/*                <img className={styles.trainingTask__rightClicker} src={RightClicker} alt={"Правый кликер"}/> В главное меню*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
                {/*{*/}
                {/*    currentStep === -1 && isNotStartModel &&*/}
                {/*    <ModelWarning className={styles.trainingPage__warning}/>*/}
                {/*}*/}
            </PageContent>
        </Page>
    )
})
