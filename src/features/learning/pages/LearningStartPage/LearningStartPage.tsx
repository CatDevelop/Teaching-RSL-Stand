import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect} from "react";
import styles from "./LearningStartPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {useIdle} from "@mantine/hooks";
import {StartLearning} from "../../components/StartLearning/StartLearning";


export const LearningStartPage: FC = typedMemo(function TrainingSentenceStartPage() {
    const navigate = useNavigate()
    const idle = useIdle(180000, {initialState: false});

    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toLearning = useCallback(() => navigate("/learning"), [navigate])

    useEffect(() => {
        if (idle)
            toAFK()
    }, [idle, toAFK]);


    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toLearning()
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            toAFK()
        }
    }, [toAFK, toLearning])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <Page>
            <PageContent className={styles.learningStartPage}>
                <div className={styles.logo} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>

                <div className={styles.content}>
                    <StartLearning onStart={toLearning}/>
                </div>
            </PageContent>
        </Page>
    )
})
