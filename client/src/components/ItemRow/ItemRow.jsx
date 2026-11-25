import { useState } from 'react';
import { useItemEditor } from '../../hooks/useItemEditor';
import EditFields from '../EditFields/EditFields';
import './ItemRow.css';

function ItemRow({
    item,
    onUpdate,
    onDelete,
    collapsible = false,
    isSelected = false,
    canEdit = true,
    canDelete = true,
    children,
}) {
    const editor = useItemEditor(item, onUpdate);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDeleteClick = () => {
        if (window.confirm('למחוק את הפריט?')) {
            onDelete();
        }
    };

    return (
        <div className={`item-row${isSelected ? ' item-row--selected' : ''}`}>
            <div className="item-row__head">
                <span className="item-row__id">#{item.id}</span>
                <div className="item-row__actions">
                    {children && collapsible && (
                        <button className="btn btn-secondary btn-sm" onClick={() => setIsExpanded((open) => !open)}>
                            {isExpanded ? 'הסתר' : 'הצג'}
                        </button>
                    )}
                </div>
            </div>

            {children && (!collapsible || isExpanded) && (
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
                <div className="item-row__content">
                    <span className="item-row__title">{item.title}</span>
                    <div className="item-row__actions">
                        {canEdit && (
                            <button className="btn btn-secondary btn-sm" onClick={editor.startEditing}>עריכה</button>
                        )}
                        {canDelete && (
                            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>מחיקה</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemRow;
