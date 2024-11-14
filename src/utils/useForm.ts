import React, { ChangeEvent } from "react";

type TUseForm<T> = [
    formData: T,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    //setValues: (state: T) => void;
]

export const useForm = <T>(initialState: T): TUseForm<T> => {
    const [formData, setFormData] = React.useState<T>(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return [formData, onChange];
}