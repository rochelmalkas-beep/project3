import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getItems } from '../../api/api';
import './auth.css';

function Register() {
  const { values, setValues, handleChange, errorMessage, setErrorMessage, resetForm } = useForm({
    username: '',
    password: '',
    verPassword: '',
  });
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const username = values.username.trim();
    const password = values.password;

    try {
      if (values.password !== values.verPassword) {
        setErrorMessage('סיסמאות לא תואמות');
        setValues({ ...values, password: '', verPassword: '' });
        return;
      }

      const users = await getItems('users', { username });

      if (users.length > 0) {
        setErrorMessage('שם משתמש קיים');
        setValues({ ...values, username: '' });
        return;
      }

      setErrorMessage('');
      resetForm();
      navigate('/register/details', { state: { username, password }, replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      setValues({ ...values, password: '', verPassword: '' });
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleRegisterSubmit}>
        <h2 className="auth-form__title">הרשמה</h2>

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
          autoComplete="new-password"
          required
        />
        <input
          className="input"
          name="verPassword"
          type="password"
          value={values.verPassword}
          onChange={handleChange}
          placeholder="אימות סיסמה"
          autoComplete="new-password"
          required
        />

        <button className="btn btn-primary auth-form__submit" type="submit">הרשמה</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="auth-form__footer">
          כבר יש לך חשבון? <Link to="/login">להתחברות</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
