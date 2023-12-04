import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {StartThemeTasks, StartThemeWords} from "../../../../core/data";
import {Button} from "../../../../components/Button";
import {TheoryCard} from "../../components/TheoryCard";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {clsx} from "clsx";
import {TaskContinue} from "../../../../components/TaskContinue";
import {StepStatus} from '../../../../core/models/StepStatus';
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {PracticeCards} from "../../components/PracticeCards/PracticeCards";
import {StartLearning} from "../../components/StartLearning/StartLearning";
import {generateTasks} from "../../../../core/utils/generateTasks";
import {useIdle} from "@mantine/hooks";
import ResultLearning from "../../../../assets/images/ResultLearningImage.svg"
import RightClicker from "../../../../assets/images/RightClicker.svg";
import LeftClicker from "../../../../assets/images/LeftClicker.svg";

// TODO написать нормальные типы
type task = {
    id: number,
    task: any,
    type: string
}

export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const theoryCount = 5;
    const practiceCount = 3;



    // -1 - стартовая плашка
    // 0-(theoryCount-1) - теория
    // (theoryCount)-(theoryCount+practiceCount-1) - практика
    const [currentStep, setCurrentStep] = useState(-1)
    const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>({status: "default"})

    const [taskCompleted, setTaskCompleted] = useState<boolean>(false)
    const [taskChecked, setTaskChecked] = useState<boolean>(false)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

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

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toMainPage = useCallback(() => navigate("/"), [navigate])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])
    const toAFK = useCallback(() => navigate("/"), [navigate])

    const retry = useCallback(() => {
        setCurrentStepStatus({status: "default"})
        setTaskChecked(false)
        setTaskCompleted(true)
    }, [setCurrentStepStatus, setTaskChecked, setTaskCompleted])

    const idle = useIdle(120000, {initialState: false});

    const nextStep = useCallback(() => {
        if(currentStep === tasks.length - 1) {
            console.log(1)
            toTrainingPage()
        }

        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep, toTrainingPage])

    useEffect(() => {
        if(idle)
            toAFK()
    }, [idle, toAFK]);

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextStep()
            console.log("Далее", currentStep)
        }
    }, [nextStep])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.learningTask}>
                <div className={styles.learningTaskPage__header}>
                    <div className={styles.learningTask__logoContainer} onClick={toAFK}>
                        <img src={Logo} rel="preload" alt="Логотип" width={300}/>
                    </div>

                    {
                        currentStep !== -1 &&
                        <div className={styles.learningTask__progressBarContainer}>
                            <ProgressBar currentStep={currentStep - 1} stepCount={tasks.length -1}/>
                        </div>
                    }

                    {/*<div className={styles.learningTask__exitButtonContainer}>*/}
                    {/*    {*/}
                    {/*        currentStep !== theoryCount + practiceCount &&*/}
                    {/*        <Button*/}
                    {/*            variant="faded"*/}
                    {/*            color="default"*/}
                    {/*            onClick={openExitModal}*/}
                    {/*        >*/}
                    {/*            <img className={styles.learningTask__exitTap__clicker} src={LeftClicker} alt={"Правый кликер"}/> Выйти*/}
                    {/*        </Button>*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>

                <div className={styles.learningTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        <StartLearning onStart={nextStep}/>
                    }
                    {
                        currentStep >= 0 && currentStep <= theoryCount - 1 &&
                        (
                            <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>
                                <TheoryCard wordObject={tasks[currentStep].task?.wordObject}/>
                            </div>
                        )
                    }
                    {
                        currentStep !== -1 &&
                        currentStep >= theoryCount &&
                        currentStep <= theoryCount + practiceCount - 1 &&
                        <PracticeCards type={tasks[currentStep].task.type}
                                       task={tasks[currentStep].task}
                                       checked={taskChecked}
                                       setStatus={setCurrentStepStatus}
                                       setTaskCompleted={setTaskCompleted}
                        />
                    }
                    {
                        currentStep === theoryCount + practiceCount &&
                        <div className={styles.learningTask__result}>
                            <img src={ResultLearning} alt={"Конец обучения!"} className={styles.learningTask__result__image}/>
                            {/*<Typography variant="h2" className={styles.learningTask__resultTitle}>*/}
                            {/*    Конец обучения!*/}
                            {/*</Typography>*/}
                            <Typography variant="p" className={styles.learningTask__resultDescription}>
                                Вы выучили 5 жестов.<br/>Теперь можно перейти к следующему этапу<br/>
                                и попробовать их на практике.
                            </Typography>
                        </div>
                    }
                </div>

                <div className={styles.learningTask__buttonsContainer}>
                    {
                        currentStep >= 0 && currentStep <= theoryCount - 2 &&
                        <Button
                            size="lg"

                            color="primary"
                            onClick={nextStep}
                        >
                            <img className={styles.learningTask__rightClicker} src={RightClicker} alt={"Правый кликер"}/> Далее
                        </Button>
                    }

                    {
                        currentStep === theoryCount - 1 &&
                        <Button
                            size="lg"
                            color="primary"
                            onClick={nextStep}
                        >
                            <img className={styles.learningTask__rightClicker} src={RightClicker} alt={"Правый кликер"}/> Перейти к практике
                        </Button>
                    }

                    {
                        currentStepStatus.status === 'default' &&
                        currentStep >= theoryCount &&
                        currentStep <= (theoryCount + practiceCount - 1) &&
                        tasks[currentStep].task.type !== "MatchWordAndGIF" &&
                        <Button
                            disabled={!taskCompleted}
                            color={taskCompleted ? "primary" : "default"}
                            variant={taskCompleted ? "faded" : 'solid'}
                            size="lg"
                            onClick={() => {
                                setTaskChecked(true)
                            }}
                        >
                            Проверить
                        </Button>
                    }

                </div>

                <div className={styles.learningTask__taskContinueContainer}>
                    {
                        currentStepStatus.status === 'success' &&
                        <TaskContinue
                            next={() => {
                                nextStep()
                                setCurrentStepStatus({status: "default"})
                                setTaskChecked(false)
                                setTaskCompleted(false)
                            }}
                            isRightAnswer={true}
                        />
                    }

                    {
                        currentStepStatus.status === 'error' &&
                        <TaskContinue
                            next={() => {
                                nextStep()
                                setCurrentStepStatus({status: "default"})
                                setTaskChecked(false)
                                setTaskCompleted(false)
                            }}
                            isRightAnswer={false}
                            retry={retry}
                            rightAnswer={currentStepStatus.message}
                        />
                    }

                    {
                        currentStep === theoryCount + practiceCount &&
                        <div className={styles.learningTask__toPractice}>
                            <Button variant="faded" onClick={toMainPage}>
                                В меню
                            </Button>
                            <Button color="primary" onClick={toTrainingPage}>
                                <img className={styles.learningTask__rightClicker} src={RightClicker} alt={"Правый кликер"}/> Перейти к практике
                            </Button>
                        </div>
                    }
                </div>
            </PageContent>
        </Page>
    )
})
