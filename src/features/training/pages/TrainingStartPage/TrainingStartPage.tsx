import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect} from "react";
import styles from "./TrainingStartPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {useIdle} from "@mantine/hooks";
import {StartTrainingSentence} from "../../components/StartTrainingSentence/StartTrainingSentence";
import {StartTraining} from "../../components/StartTraining/StartTraining";


export const TrainingStartPage: FC = typedMemo(function TrainingSentenceStartPage() {
    const navigate = useNavigate()

    const idle = useIdle(180000, {initialState: false});

    const toAFK = useCallback(() => navigate("/"), [])
    const toTraining = useCallback(() => navigate("/training"), [])
    const toLearningStart = useCallback(() => navigate("/learning/start"), [])

    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toTraining()
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            toLearningStart()
        }
    }, [toTraining, toLearningStart])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);


    return (
        <Page>
            <PageContent className={styles.trainingSentenceStartPage}>
                <div className={styles.logo} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>

                <div className={styles.content}>
                    <StartTraining onStart={toTraining}/>
                </div>
            </PageContent>
        </Page>
    )
})
