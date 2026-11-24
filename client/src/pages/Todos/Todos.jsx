import ItemList from '../../components/ItemList/ItemList';

const createNewTodo = (userId, { title }) => ({
  userId,
  title,
  completed: false,
});

const searchOptions = [
  { value: 'id', label: 'מזהה' },
  { value: 'title', label: 'כותרת' },
  {
    value: 'completed',
    label: 'סטטוס',
    choices: [
      { value: 'true', label: 'בוצע' },
      { value: 'false', label: 'לא בוצע' },
    ],
  },
];

const sortOptions = [
  { value: 'id', label: 'מזהה' },
  { value: 'title', label: 'כותרת' },
  { value: 'completed', label: 'סטטוס' },
];

const renderTodoExtras = (todo, updateTodo) => (
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
  />
);

function Todos() {
  return (
    <ItemList
      resource="todos"
      title="המשימות שלי"
      createNewItem={createNewTodo}
      searchOptions={searchOptions}
      sortOptions={sortOptions}
      renderExtras={renderTodoExtras}
    />
  );
}

export default Todos;