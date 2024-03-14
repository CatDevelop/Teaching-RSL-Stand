import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {StartThemeWords} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {useIdle} from "@mantine/hooks";
import {TaskHeader} from "../../../../components/TaskHeader";
import {TheoryCard} from "../../components/TheoryCard";
import {getFireworks} from "../../../../core/utils/explodeFireworks";

type task = {
    id: number,
    task: any,
    type: string
}

export const LearningTaskPage: FC = typedMemo(function LearningPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const theoryCount = StartThemeWords.length;
    const practiceCount = 3;


    const [currentStep, setCurrentStep] = useState(0)

    const [tasks] = useState<task[]>([
        ...shuffleArray(StartThemeWords).map((wordObject, index) => ({
            id: index,
            task: {
                wordObject
            },
            type: "theory"
        })),
        // ...shuffleArray(generateTasks(StartThemeWords, StartThemeTasks)).map((task, index) => ({
        //     id: index + 5,
        //     task,
        //     type: "practice"
        // }))
    ])

    useEffect(() => {
        if (currentStep === theoryCount + practiceCount)
            fireworks()
    }, [currentStep, fireworks]);


    const idle = useIdle(120000, {initialState: false});


    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toTrainingStartPage = useCallback(() => navigate("/training/start"), [navigate])
    const toLearningStart = useCallback(() => navigate("/learning/start"), [navigate])

    const nextStep = useCallback(() => {
        if (currentStep === tasks.length - 1) {
            console.log(1)
            toTrainingStartPage()
        }

        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep, toTrainingStartPage])

    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextStep()
            console.log("Далее", currentStep)
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (currentStep === 0)
                toLearningStart()
            else {
                setCurrentStep(currentStep - 1)
            }
        }
    }, [nextStep, currentStep, toLearningStart])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);


    return (
        <Page>
            <PageContent className={styles.trainingSentencePage}>
                <div className={styles.logo} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>

                <div className={styles.content}>
                    <TaskHeader
                        type="Теория"
                        task="Посмотрите и запомните жест"
                        name={`${currentStep + 1} / ${tasks.length}`}
                        currentStep={currentStep}
                        stepCount={tasks.length}
                    />

                    <TheoryCard wordObject={tasks[currentStep].task?.wordObject} next={nextStep}/>
                </div>
            </PageContent>
        </Page>
    )
})
