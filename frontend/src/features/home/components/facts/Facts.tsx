import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./Facts.module.css";
import {facts} from './utils/data'
import {Fact} from "../fact";
import {ScrollShadow} from "@nextui-org/react";

/**
 * Движущийся контейнер с фактами
 */
export const Facts: FC = typedMemo(function Facts() {
    return (
        <div className={styles.facts}>
            <ScrollShadow orientation="horizontal" size={100} offset={-10} hideScrollBar>
                <div className={styles.facts__contentContainer}>
                    {
                        facts.map(fact => {
                            return <Fact
                                title={fact.title}
                                description={fact.description}
                                variant={fact.variant}
                            />
                        })
                    }
                </div>
            </ScrollShadow>
        </div>
    );
});
