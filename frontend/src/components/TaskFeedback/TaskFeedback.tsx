import React, {FC, useCallback, useState} from "react";
import clsx from "clsx";
import {
    Checkbox,
    CheckboxGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {Button} from "../Button";
import {ComponentProps} from "../../core/models/ComponentProps";
import {typedMemo} from "../../core/utils/typedMemo";
import {Typography} from "../Typography";
import Feedback from "../../assets/images/Feedback.svg";
import styles from "./TaskFeedback.module.css";

type TempItem = {
    id: string;
    label: string;
}

type Props = ComponentProps & Readonly<{
    text?: string;
    items: TempItem[];
}>

/** Task feedback (modal + button). */
export const TaskFeedback: FC<Props> = typedMemo(function TaskFeedback(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedIds, setSelectedIds] = useState<TempItem['id'][]>([]);

    const changeSelectedIds = useCallback((value: TempItem['id'][]) => {
        setSelectedIds(value);
    }, [setSelectedIds]);

    return (
        <>
            <Button
                className={clsx(styles.taskFeedback__open, props.className)}
                variant="faded"
                onClick={onOpen}
                endContent={<img src={Feedback} alt="Отправить отзыв"/>}
            >
                {props.text}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Обратная связь</ModalHeader>
                            <ModalBody className={styles.taskFeedback__feedback}>
                                <Typography variant="span" className={styles.taskFeedback__aboutFeedback}>
                                    Ваши отзывы помогут нам улучшить работу сервиса. Пожалуйста, дайте нам знать, что
                                    пошло не так.
                                </Typography>

                                <CheckboxGroup className={styles.taskFeedback__checkboxes}
                                               onValueChange={changeSelectedIds}>
                                    {
                                        props.items.map(item => (
                                            <Checkbox value={item.id} className={styles.taskFeedback__checkbox}
                                                      key={item.id}>
                                                {item.label}
                                            </Checkbox>
                                        ))
                                    }
                                </CheckboxGroup>

                                <Textarea
                                    placeholder="Ваш коментарий..."
                                    className={styles.taskFeedback__textarea}
                                />
                            </ModalBody>
                            <ModalFooter className={styles.taskFeedback__actions}>
                                <Button variant="faded" onPress={onClose}>
                                    Назад
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Отправить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
});
