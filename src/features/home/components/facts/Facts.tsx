import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useRef} from "react";
import styles from "./Facts.module.css";
import {facts} from './utils/data'
import {Fact} from "../fact";
import {ScrollShadow} from "@nextui-org/react";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";

/**
 * Движущийся контейнер с фактами
 */
export const Facts: FC<ComponentProps> = typedMemo(function Facts(props) {
    return (
        <div className={clsx(styles.facts, props.className)}>
            <ScrollShadow orientation="horizontal" size={100} offset={-10} hideScrollBar className={styles.facts__shadow}>
                <div className={styles.facts__contentContainer}>
                    <div className={clsx(styles.facts__contentContainer, styles.facts__firstContent)}>
                        {
                            facts.map(fact => {
                                return <Fact
                                    title={fact.title}
                                    description={fact.description}
                                    source={fact.source}
                                    variant={fact.variant}
                                />
                            })
                        }
                    </div>
                    <div className={clsx(styles.facts__contentContainer, styles.facts__secondContent)}>
                        {
                            facts.map(fact => {
                                return <Fact
                                    title={fact.title}
                                    description={fact.description}
                                    source={fact.source}
                                    variant={fact.variant}
                                />
                            })
                        }
                    </div>
                </div>
            </ScrollShadow>
        </div>
    );
});
