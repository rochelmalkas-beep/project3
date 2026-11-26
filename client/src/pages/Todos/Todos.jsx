import ItemList from '../../components/ItemList/ItemList';

const createNewTodo = (userId, { title }) => ({
  userId,
  title,
  completed: false,
});

const SEARCH_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
  {
    value: 'completed',
    label: 'Status',
    choices: [
      { value: 'true', label: 'Done' },
      { value: 'false', label: 'Not done' },
    ],
  },
];

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
  { value: 'completed', label: 'Status' },
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
      title="My Todos"
      createNewItem={createNewTodo}
      searchOptions={SEARCH_OPTIONS}
      sortOptions={SORT_OPTIONS}
      renderExtras={renderTodoExtras}
    />
  );
}

export default Todos;