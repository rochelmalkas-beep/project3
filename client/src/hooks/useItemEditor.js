import { useState } from 'react';

const EDITABLE_FIELDS = ['title', 'body', 'url'];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

export function useItemEditor(item, onUpdate) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftFields, setDraftFields] = useState({});

    // רק שדות שקיימים בפריט ואינם ריקים (לפוסט: title+body, לתמונה: title+url)
    const editableFields = EDITABLE_FIELDS.filter((field) => isNonEmptyString(item[field]));

    const startEditing = () => {
        setDraftFields(Object.fromEntries(editableFields.map((field) => [field, item[field]])));
        setIsEditing(true);
    };

    const cancelEditing = () => setIsEditing(false);

    const changeField = (field, value) => {
        setDraftFields((previous) => ({ ...previous, [field]: value }));
    };

    const saveFields = async () => {
        const changes = {};

        for (const field of editableFields) {
            const newValue = draftFields[field].trim();
            if (!newValue) return; // לא שומרים שדה ריק
            if (newValue !== item[field]) changes[field] = newValue;
        }

        setIsEditing(false);
        if (Object.keys(changes).length > 0) {
            await onUpdate(changes);
        }
    };

    return { isEditing, editableFields, draftFields, startEditing, cancelEditing, changeField, saveFields };
}