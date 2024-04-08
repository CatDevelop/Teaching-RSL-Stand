import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect} from "react";
import styles from "./TrainingResultPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/LogoStand.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {BySberAI} from "../../../../components/BySberAI";
import {Card} from "../../../../components/Card";
import RightClickerPrimary from "../../../../assets/images/RightClickerPrimary.svg";
import {StartThemeWords} from "../../../../core/data";
import {ByPinCode} from "../../../../components/ByPinCode";
import {useLottie} from "lottie-react";
import leavesAnimation from "../../../../assets/images/leaves.json"
import PersonImage from "../../../../assets/images/Persona.svg"

export const TrainingResultPage: FC = typedMemo(function TrainingPage() {
    const { View, play } = useLottie({
        animationData: leavesAnimation,
        loop: false,
        autoplay: false,
    }, {
        position: "absolute",
        top: '20%',
        left: 0,
        right: 0,
        zIndex: '1',
        height: '50%'
    });

    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const toAFK = useCallback(() => navigate("/"), [navigate])

    useEffect(() => {
        fireworks()
    }, [fireworks]);



    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toAFK();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(-1)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    setTimeout(() => {
        play()
    }, 500)

    return (
        <Page>
            {/*<ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>*/}
            <PageContent className={styles.trainingResult}>
                <div className={styles.trainingResult__logoContainer} onClick={toAFK}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={300}/>
                </div>
                <Card className={styles.trainingResult__contentContainer}>
                    <div className={styles.trainingResult__result}>
                        {/*<img alt="" src={ResultImage} className={styles.trainingResult__resultImage}/>*/}
                        <div className={styles.lottieContainer}>
                            {View}
                            <img alt="" src={PersonImage} className={styles.lottie__image}/>
                        </div>

                        {/*<ResultImage className={styles.trainingResult__resultImage}/>*/}
                        <Typography variant="h2" className={styles.trainingResult__resultTitle}>
                            Спасибо за участие
                        </Typography>
                        <Typography variant="p" className={styles.trainingResult__resultDescription}>
                            Вы успешно выучили <b>{StartThemeWords.length}</b> жестов, поздравляем!
                        </Typography>

                        <Button
                            size={'lg'}
                            color="primary"
                            onClick={toAFK}
                            className={styles.button}
                        >
                            <img className={styles.trainingTask__rightClicker} src={RightClickerPrimary} alt={"Правый кликер"}/> В меню
                        </Button>
                    </div>

                    <div className={styles.trainingResult__result__container}>
                        <BySberAI/>
                    </div>

                    <div className={styles.trainingResult__result__container__pincode}>
                        <ByPinCode/>
                    </div>
                </Card>
            </PageContent>
        </Page>
    )
})
