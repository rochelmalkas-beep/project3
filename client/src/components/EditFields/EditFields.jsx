import './EditFields.css';

function EditFields({ fields, values, onChange }) {
    return (
        <div className="edit-fields">
            {fields.map((field) =>
                field === 'body' ? (
                    <textarea
                        key={field}
                        className="textarea"
                        value={values[field]}
                        onChange={(event) => onChange(field, event.target.value)}
                    />
                ) : (
                    <input
                        key={field}
                        className="input"
                        value={values[field]}
                        onChange={(event) => onChange(field, event.target.value)}
                        autoFocus
                    />
                )
            )}
        </div>
    );
}

export default EditFields;
