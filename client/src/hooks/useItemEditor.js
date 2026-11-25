import { useState } from 'react';

const EDITABLE_FIELDS = ['title', 'body', 'url'];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

/**
 * titleField - שם השדה בטופס העריכה (ברירת מחדל 'title')
 * itemTitleField - שם השדה בפריט עצמו, אם שונה (לתגובות: name)
 */
export function useItemEditor(item, onUpdate, titleField = 'title', itemTitleField = titleField) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftFields, setDraftFields] = useState({});

    const fields = [titleField, 'body', 'url'];

    // השדה בטופס נקרא titleField, אבל בפריט עצמו הוא יכול להיקרא אחרת (לתגובות: name)
    const isTitle = (field) => field === titleField;
    const readField = (field) => item[isTitle(field) ? itemTitleField : field];

    // רק שדות שקיימים בפריט ואינם ריקים (לפוסט: title+body, לתמונה: title+url)
    const editableFields = fields.filter((field) => isNonEmptyString(readField(field)));

    const startEditing = () => {
        setDraftFields(Object.fromEntries(editableFields.map((field) => [field, readField(field)])));
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
            // "title" בטופס נשמר ל-DB בשם itemTitleField (לתגובות: name)
            if (newValue !== readField(field)) changes[isTitle(field) ? itemTitleField : field] = newValue;
        }

        setIsEditing(false);
        if (Object.keys(changes).length > 0) {
            await onUpdate(changes);
        }
    };

    return { isEditing, editableFields, draftFields, startEditing, cancelEditing, changeField, saveFields };
}