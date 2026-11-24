import { useForm } from '../../hooks/useForm';

const PLACEHOLDER_BY_FIELD = {
  title: 'כותרת חדשה',
  body: 'תוכן',
};

function AddItemForm({ onAdd, initialValues = { title: '' }, requiredField = 'title' }) {
  const { values, handleChange, resetForm, errorMessage, setErrorMessage } = useForm(initialValues);

  const handleAddClick = async () => {
    const trimmedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()])
    );
    if (!trimmedValues[requiredField]) {
      setErrorMessage('יש למלא את השדה');
      return;
    }
    await onAdd(trimmedValues);
    resetForm();
  };

  return (
    <div>
      {Object.keys(values).map((field) => {
        const FieldTag = field === 'body' ? 'textarea' : 'input';
        return (
          <FieldTag
            key={field}
            name={field}
            value={values[field]}
            onChange={handleChange}
            placeholder={PLACEHOLDER_BY_FIELD[field] ?? ''}
          />
        );
      })}
      <button onClick={handleAddClick}>הוספה</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddItemForm;
