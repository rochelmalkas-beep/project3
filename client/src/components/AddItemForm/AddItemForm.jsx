import { useForm } from '../../hooks/useForm';

function AddItemForm({ onAdd }) {
  const { values, handleChange, resetForm, errorMessage, setErrorMessage } = useForm({ title: '' });

  const handleAddClick = async () => {
    const trimmedTitle = values.title.trim();
    if (!trimmedTitle) {
      setErrorMessage('יש להזין כותרת');
      return;
    }
    await onAdd(trimmedTitle);
    resetForm();
  };

  return (
    <div>
      <input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="כותרת חדשה"
      />
      <button onClick={handleAddClick}>הוספה</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddItemForm;