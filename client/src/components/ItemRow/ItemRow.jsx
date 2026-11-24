import { useState } from 'react';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

function ItemRow({ item, onUpdate, onDelete, collapsible = false, canEdit = true, canDelete = true, children }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftFields, setDraftFields] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);

    const editableFields = ['title', 'body','url'].filter((field) => isNonEmptyString(item[field]));

    const startEditing = () => {
        setDraftFields(Object.fromEntries(editableFields.map((field) => [field, item[field]])));
        setIsEditing(true);
    };

    const cancelEditing = () => setIsEditing(false);

    const handleFieldChange = (field) => (event) => {
        setDraftFields((previous) => ({ ...previous, [field]: event.target.value }));
    };

    const saveFields = async () => {
        const changes = {};

        for (const field of editableFields) {
            const newValue = draftFields[field].trim();
            if (!newValue) return; // לא שומרים שדה ריק (כותרת חובה)
            if (newValue !== item[field]) changes[field] = newValue;
        }

        setIsEditing(false);
        if (Object.keys(changes).length > 0) {
            await onUpdate(changes);
        }
    };

    const handleDeleteClick = () => {
        if (window.confirm('למחוק את הפריט?')) {
            onDelete();
        }
    };

    return (
        <div>
            {children && collapsible && (
                <button onClick={() => setIsExpanded((open) => !open)}>
                    {isExpanded ? 'הסתר' : 'הצג'}
                </button>
            )}
            {children && (!collapsible || isExpanded) && children}
            <h2>{item.id}</h2>
            {isEditing ? (
                <>
                    {editableFields.map((field) =>
                        field === 'body' ? (
                            <textarea
                                key={field}
                                value={draftFields[field]}
                                onChange={handleFieldChange(field)}
                            />
                        ) : (
                            <input
                                key={field}
                                value={draftFields[field]}
                                onChange={handleFieldChange(field)}
                                autoFocus
                            />
                        )
                    )}
                    <button onClick={saveFields}>שמירה</button>
                    <button onClick={cancelEditing}>ביטול</button>
                </>
            ) : (
                <>
                    <span>{item.title}</span>
                    {canEdit && <button onClick={startEditing}>עריכה</button>}
                    {canDelete && <button onClick={handleDeleteClick}>מחיקה</button>}
                </>
            )}
        </div>
    );
}

export default ItemRow;
