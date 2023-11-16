import React, {FC, useCallback, useEffect} from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/images/LogoStand.svg";
import startLearningSVG from '../../assets/images/StartLearning.png'
import startTrainingSVG from '../../assets/images/StartTraining.png'
import {Typography} from "../../components/Typography";
import {Card} from "../../components/Card";
import {typedMemo} from "../../core/utils/typedMemo";
import {useIdle} from '@mantine/hooks';

export const HomePage: FC = typedMemo(function HomePage() {
    const navigate = useNavigate();

    const toLearning = useCallback(() => navigate("/learning"), [navigate])
    const toAFK = useCallback(() => navigate("/"), [navigate])
    const toTraining = useCallback(() => navigate("/training"), [navigate])

    const idle = useIdle(120000, {initialState: false});

    useEffect(() => {
        if(idle)
            toAFK()
    }, [idle, toAFK]);

    return (
        <div className={styles.homePage}>
            {/*<PreloadGIFs/>*/}
            <img className={styles.homePage__logo} src={Logo} alt={"Логотип сервиса \"Изучение русского жестового языка\""}/>
            <div className={styles.homePage__links}>
                <div onClick={toLearning}>
                    <Card className={styles.homePage__buttonContainer}>
                        <div className={styles.homePage__button__imageContainer}>
                            <img className={styles.homePage__logo} src={startLearningSVG} rel="preload" alt="Перейти к обучению" width={495} height={372}/>
                        </div>
                        <div className={styles.homePage__button__typographyContainer}>
                            <Typography variant="h2" className={styles.homePage__button__title}>
                                Изучить жесты
                            </Typography>
                            <Typography variant="p" className={styles.homePage__button__description}>
                                Изучите 5 базовых жестов с помощью
                                наших интерактивных заданий
                            </Typography>
                        </div>
                    </Card>
                </div>

                <div onClick={toTraining}>
                    <Card className={styles.homePage__buttonContainer}>
                        <div className={styles.homePage__button__imageContainer}>
                            <img src={startTrainingSVG} rel="preload" alt="Перейти к тренировкам" width={495} height={372}/>
                        </div>
                        <div className={styles.homePage__button__typographyContainer}>
                            <Typography variant="h2" className={styles.homePage__button__title}>
                                Проверить свои знания
                            </Typography>
                            <Typography variant="p" className={styles.homePage__button__description}>
                                Проверьте своё умение общаться на РЖЯ с нашей моделью распознавания
                            </Typography>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
})
