import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../hooks/useUser';
import { addItem } from '../../api/api';

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
    <form onSubmit={handleDetailsSubmit}>
      <h2>השלמת פרטים</h2>
      <p>שלום <strong dir="ltr">{state.username}</strong></p>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="שם מלא"
        autoComplete="name"
        required
      />
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
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        placeholder="טלפון"
        autoComplete="tel"
        required
      />
      <input
        name="website"
        value={values.website}
        onChange={handleChange}
        placeholder="אתר (אופציונלי)"
        autoComplete="url"
      />

      <button type="submit">סיום הרשמה</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default RegisterDetails;