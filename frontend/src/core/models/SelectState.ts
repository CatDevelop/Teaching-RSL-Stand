import {ButtonProps} from "@nextui-org/react";
import {Word} from "./Word";

export type SelectState = Readonly<"default" | "checked" | "success" | "error" | "disabled">

export type SelectObjectState = {
    wordObject: Readonly<Word>;
    state: SelectState;
}

export const colorsByState: Record<SelectState, ButtonProps['color']> = {
    default: "default",
    checked: "primary",
    success: "success",
    error: "danger",
    disabled: "default"
}
