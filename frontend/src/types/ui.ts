import type {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    ReactNode
} from "react";


export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}