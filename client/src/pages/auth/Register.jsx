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
        setErrorMessage('Passwords do not match');
        setValues({ ...values, password: '', verPassword: '' });
        return;
      }

      const users = await getItems('users', { username });

      if (users.length > 0) {
        setErrorMessage('Username already exists');
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
        <h2 className="auth-form__title">Register</h2>

        <input
          className="input"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="username"
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
          required
        />
        <input
          className="input"
          name="verPassword"
          type="password"
          value={values.verPassword}
          onChange={handleChange}
          placeholder="Verify password"
          autoComplete="new-password"
          required
        />

        <button className="btn btn-primary auth-form__submit" type="submit">Register</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="auth-form__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
