import { useForm } from '../../hooks/useForm';
function Login() {
  const { values, handleChange, errorMessage, setErrorMessage } = useForm({
    username: '',
    password: '',
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const users = await getItems('users', { username: values.username });
      const foundUser = users[0];

      if (!foundUser || foundUser.password !== values.password) {
        setErrorMessage('שם משתמש או סיסמה שגויים');
        return;
      }

      login(foundUser);
      navigate(`/${foundUser.username}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h2>כניסה</h2>

      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="שם משתמש"
        required
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="סיסמה"
        required
      />

      <button type="submit">התחברות</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}