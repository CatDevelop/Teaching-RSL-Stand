import React, {FC, useCallback} from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import Logo from "../../../../assets/images/LogoStand.svg";
import startLearningSVG from '../../../../assets/images/StartLearning.svg'
import startTrainingSVG from '../../../../assets/images/StartTraining.svg'
import {Typography} from "../../../../components/Typography";
import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";

export const HomePage: FC = typedMemo(function HomePage() {
    const navigate = useNavigate();

    const toLearning = useCallback(() => navigate("/learning"), [navigate])
    const toTraining = useCallback(() => navigate("/training"), [navigate])

    return (
        <div className={styles.homePage}>
            <img src={Logo} alt={"Логотип сервиса \"Изучение русского жестового языка\""} width={500}/>
            <div className={styles.homePage__links}>
                <div onClick={toLearning}>
                    <Card className={styles.homePage__buttonContainer}>
                        <div className={styles.homePage__button__imageContainer}>
                            <img src={startLearningSVG} rel="preload" alt="Перейти к обучению"/>
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
                            <img src={startTrainingSVG} rel="preload" alt="Перейти к тренировкам"/>
                        </div>
                        <div className={styles.homePage__button__typographyContainer}>
                            <Typography variant="h2" className={styles.homePage__button__title}>
                                Проверить свои знания
                            </Typography>
                            <Typography variant="p" className={styles.homePage__button__description}>
                                Проверьте своё умение общаться на РЖЯ<br/> с нашей моделью распознавания
                            </Typography>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
})
