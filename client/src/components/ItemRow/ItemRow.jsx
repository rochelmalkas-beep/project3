import { useState } from 'react';

function ItemRow({ item, onUpdateTitle, onDelete, children }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState(item.title);

    const startEditing = () => {
        setDraftTitle(item.title);
        setIsEditing(true);
    };

    const cancelEditing = () => setIsEditing(false);

    const saveTitle = async () => {
        const trimmedTitle = draftTitle.trim();
        if (!trimmedTitle || trimmedTitle === item.title) {
            setIsEditing(false);
            return;
        }
        await onUpdateTitle(trimmedTitle);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (window.confirm('למחוק את הפריט?')) {
            onDelete();
        }
    };

    return (
        <div>
            {children}
            <h2>{item.id}</h2>
            {isEditing ? (
                <>
                    <input
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        autoFocus
                    />
                    <button onClick={saveTitle}>שמירה</button>
                    <button onClick={cancelEditing}>ביטול</button>
                </>
            ) : (
                <>
                    <span>{item.title}</span>
                    <button onClick={startEditing}>עריכה</button>
                    <button onClick={handleDeleteClick}>מחיקה</button>
                </>
            )}
        </div>
    );
}

export default ItemRow;