import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState('');

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrorMessage('');
  };

  return { values, setValues, setValue, handleChange, resetForm, errorMessage, setErrorMessage };
}