import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect} from "react";
import styles from "./TrainingSentenceStartPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {useIdle} from "@mantine/hooks";
import {Card} from "../../../../components/Card";
import StartSentenceTraining from "../../../../assets/images/StartTraining.png"
import {StartTrainingSentence} from "../../components/StartTrainingSentence/StartTrainingSentence";


export const TrainingSentenceStartPage: FC = typedMemo(function TrainingSentenceStartPage() {
    const navigate = useNavigate()

    const idle = useIdle(180000, {initialState: false});

    const toAFK = useCallback(() => navigate("/"), [])
    const toTraining = useCallback(() => navigate("/training"), [])
    const toTrainingSentence = useCallback(() => navigate("/training/sentence"), [])

    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toTrainingSentence()
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            toTraining()
        }
    }, [toTraining, toTrainingSentence])

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
                    <StartTrainingSentence/>
                </div>
            </PageContent>
        </Page>
    )
})
