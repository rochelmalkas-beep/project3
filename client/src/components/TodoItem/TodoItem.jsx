function TodoItem({ todo, onToggle, onDelete, onUpdate}) {
    return (
        <div>
            <span>{todo.id}</span>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo)}
            />
            <span>{todo.title}</span>
            <button onClick={() => onEdit(todo.id)}>עריכה</button>
            <button onClick={() => onDelete(todo.id)}>מחיקה</button>
        </div>
    );
}

export default TodoItem;