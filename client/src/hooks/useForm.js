import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

    const resetForm = () => {
    setValues(initialValues);
  };
  return { values, setValues, handleChange, resetForm, errorMessage, setErrorMessage};
}