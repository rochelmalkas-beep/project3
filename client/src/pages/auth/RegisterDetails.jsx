import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../hooks/useUser';
import { addItem } from '../../api/api';
import './auth.css';

function RegisterDetails() {
  const { state } = useLocation();
  const { values, handleChange, errorMessage, setErrorMessage } = useForm({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const { login } = useUser();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/register" replace />;
  }

  const handleDetailsSubmit = async (event) => {
    event.preventDefault();

    try {
      const newUser = await addItem('users', {
        username: state.username,
        password: state.password,
        ...values,
      });

      const { password, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);
      navigate(`/${newUser.username}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleDetailsSubmit}>
        <h2 className="auth-form__title">השלמת פרטים</h2>
        <p className="auth-form__hint">שלום <strong dir="ltr">{state.username}</strong></p>

        <input
          className="input"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="שם מלא"
          autoComplete="name"
          required
        />
        <input
          className="input"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="אימייל"
          autoComplete="email"
          required
        />
        <input
          className="input"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="טלפון"
          autoComplete="tel"
          required
        />
        <input
          className="input"
          name="website"
          value={values.website}
          onChange={handleChange}
          placeholder="אתר (אופציונלי)"
          autoComplete="url"
        />

        <button className="btn btn-primary auth-form__submit" type="submit">סיום הרשמה</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterDetails;
