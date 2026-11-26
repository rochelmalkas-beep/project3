import { useForm } from '../../hooks/useForm';
import './AddItemForm.css';

const PLACEHOLDER_BY_FIELD = {
  title: 'New title',
  name: 'Comment title',
  body: 'Content',
};

function AddItemForm({ onAdd, initialValues = { title: '' }, requiredField = 'title' }) {
  const { values, handleChange, resetForm, errorMessage, setErrorMessage } = useForm(initialValues);

  const handleAddClick = async () => {
    const trimmedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()])
    );
    if (!trimmedValues[requiredField]) {
      setErrorMessage('Please fill in this field');
      return;
    }
    await onAdd(trimmedValues);
    resetForm();
  };

  return (
    <div className="add-item-form">
      {Object.keys(values).map((field) => {
        const FieldTag = field === 'body' ? 'textarea' : 'input';
        return (
          <FieldTag
            key={field}
            className={FieldTag === 'textarea' ? 'textarea' : 'input'}
            name={field}
            value={values[field]}
            onChange={handleChange}
            placeholder={PLACEHOLDER_BY_FIELD[field] ?? ''}
          />
        );
      })}

      <div className="add-item-form__actions">
        <button className="btn btn-primary" onClick={handleAddClick}>Add</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default AddItemForm;
