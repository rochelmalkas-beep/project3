import { useState } from 'react';
import { useItemEditor } from '../../hooks/useItemEditor';
import EditFields from '../EditFields/EditFields';
import './ItemRow.css';

function ItemRow({
    item,
    onUpdate,
    onDelete,
    isOwner = true,
    titleField = 'title',
    itemTitleField = titleField,
    showId = true,
    alwaysOpen = false,
    selectButton = false,
    children,
}) {
    const editor = useItemEditor(item, onUpdate, titleField, itemTitleField);
    const [isExpanded, setIsExpanded] = useState(false);

    const isOpen = alwaysOpen || isExpanded;

    const handleDeleteClick = () => {
        if (window.confirm('Delete this item?')) {
            onDelete();
        }
    };

    return (
        <div className={`item-row${isOpen ? ' item-row--selected' : ''}`}>
            {/* בזמן עריכה הכותרת מוסתרת — היא מוצגת כשדה בתוך הטופס */}
            {editor.isEditing ? (
                showId && <span className="item-row__id item-row__id--editing">#{item.id}</span>
            ) : (
                <div
                    className={`item-row__head${selectButton ? ' item-row__head--buttoned' : ''}`}
                    role={!alwaysOpen && !selectButton ? 'button' : undefined}
                    aria-expanded={!alwaysOpen && !selectButton ? isOpen : undefined}
                    onClick={() => !alwaysOpen && !selectButton && setIsExpanded((open) => !open)}
                >
                    {showId && <span className="item-row__id">#{item.id}</span>}
                    <span className="item-row__title">{item[itemTitleField]}</span>
                    {selectButton && (
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm item-row__select"
                            onClick={() => setIsExpanded((open) => !open)}
                        >
                            {isOpen ? 'Unselect' : 'Select'}
                        </button>
                    )}
                </div>
            )}

            {editor.isEditing ? (
                <div className="item-row__edit">
                    <EditFields
                        fields={editor.editableFields}
                        values={editor.draftFields}
                        onChange={editor.changeField}
                    />
                    <div className="item-row__actions">
                        <button className="btn btn-primary btn-sm" onClick={editor.saveFields}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={editor.cancelEditing}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    {children && isOpen && (
                        <div className="item-row__extras">{children}</div>
                    )}

                    {/* כפתורי עדכון/מחיקה מוצגים רק כשהפריט פתוח — כלומר במצב סקירה אין אותם */}
                    {isOpen && isOwner && (
                        <div className="item-row__actions">
                            <button className="btn btn-secondary btn-sm" onClick={editor.startEditing}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ItemRow;
