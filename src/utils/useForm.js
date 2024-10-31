import React from 'react';

export const useForm = (initialState = {}) => {
    const [formData, setFormData] = React.useState(initialState);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return [formData, onChange];
}