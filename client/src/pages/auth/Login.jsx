import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../hooks/useUser';
import { getItems } from '../../api/api';
import './auth.css';

function Login() {
  const { values, setValues, handleChange, errorMessage, setErrorMessage } = useForm({
    username: '',
    password: '',
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const users = await getItems('users', { username: values.username.trim() });
      const foundUser = users[0];

      if (!foundUser || foundUser.password !== values.password) {
        setErrorMessage('שם משתמש או סיסמה שגויים');
        setValues({ ...values, password: '' });
        return;
      }

      const { password, ...userWithoutPassword } = foundUser;
      login(userWithoutPassword);
      navigate(`/${foundUser.username}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      setValues({ ...values, password: '' });
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLoginSubmit}>
        <h2 className="auth-form__title">כניסה</h2>

        <input
          className="input"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="שם משתמש"
          autoComplete="username"
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="סיסמה"
          autoComplete="current-password"
          required
        />

        <button className="btn btn-primary auth-form__submit" type="submit">התחברות</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="auth-form__footer">
          אין לך חשבון? <Link to="/register">להרשמה</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
