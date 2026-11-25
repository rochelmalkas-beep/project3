import { useState } from 'react';
import { useItemEditor } from '../../hooks/useItemEditor';
import EditFields from '../EditFields/EditFields';
import './ItemRow.css';

function ItemRow({
    item,
    onUpdate,
    onDelete,
    isSelected = false,
    canEdit = true,
    canDelete = true,
    titleField = 'title',
    itemTitleField = titleField,
    showId = true,
    defaultOpen = false,
    alwaysOpen = false,
    children,
}) {
    const editor = useItemEditor(item, onUpdate, titleField, itemTitleField);
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    const isOpen = alwaysOpen || isExpanded;

    const handleDeleteClick = () => {
        if (window.confirm('למחוק את הפריט?')) {
            onDelete();
        }
    };

    return (
        <div className={`item-row${isSelected ? ' item-row--selected' : ''}`}>
            <button
                type="button"
                className="item-row__head"
                aria-expanded={isOpen}
                onClick={() => !alwaysOpen && setIsExpanded((open) => !open)}
            >
                {showId && <span className="item-row__id">#{item.id}</span>}
                <span className="item-row__title">{item[itemTitleField]}</span>
            </button>

            {children && isOpen && (
                <div className="item-row__extras">{children}</div>
            )}

            {editor.isEditing ? (
                <div className="item-row__edit">
                    <EditFields
                        fields={editor.editableFields}
                        values={editor.draftFields}
                        onChange={editor.changeField}
                    />
                    <div className="item-row__actions">
                        <button className="btn btn-primary btn-sm" onClick={editor.saveFields}>שמירה</button>
                        <button className="btn btn-secondary btn-sm" onClick={editor.cancelEditing}>ביטול</button>
                    </div>
                </div>
            ) : (
                // כפתורי עדכון/מחיקה מוצגים רק כשהפריט פתוח — כלומר במצב סקירה אין אותם
                isOpen && (canEdit || canDelete) && (
                    <div className="item-row__actions">
                        {canEdit && (
                            <button className="btn btn-secondary btn-sm" onClick={editor.startEditing}>עריכה</button>
                        )}
                        {canDelete && (
                            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>מחיקה</button>
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export default ItemRow;
