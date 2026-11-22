import { useForm } from '../../hooks/useForm';
import { useUser } from '../../context/UserContext';
import { getItems } from '../../api/api';

function Login() {
  const { values, handleChange, errorMessage, setErrorMessage } = useForm({
    email: '',
    password: '',
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const users = await getItems('users', { email: values.email.trim() });
      const foundUser = users[0];

      if (!foundUser || foundUser.password !== values.password) {
        setErrorMessage('אימייל או סיסמה שגויים');
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
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="אימייל"
        autoComplete="email"
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

export default Login;