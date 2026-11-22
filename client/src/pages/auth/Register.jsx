import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getItems } from '../../api/api';

function Register() {
  const { values, setValues, handleChange, errorMessage, setErrorMessage, resetForm } = useForm({
    username: '',
    password: '',
    verPassword: '',
  });
  const navigate = useNavigate();


  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    const username = values.username.trim()
    const password = values.password

    try {
      if (values.password !== values.verPassword) {
        setErrorMessage('סיסמאות לא תואמות')
        setValues({ ...values, password: '', verPassword: '' })
        return
      }
      const users = await getItems('users', { username: values.username.trim() })

      if (users.length > 0) {
        setErrorMessage('שם משתמש קיים')//check if its a problem
        setValues({ ...values, username: '' })//לחשוב אם כדאי אולי למחוק הפוך
         return
      }

      setErrorMessage('')
      resetForm()
      navigate('/register/details', { state: { username, password } ,replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      setValues({ ...values, password: '', verPassword: '' })
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <h2>הרשמה</h2>

      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="שם משתמש"
        autoComplete="username"
        required
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="סיסמה"
        autoComplete="new-password"
        required
      />
      <input
        name="verPassword"
        type="password"
        value={values.verPassword}
        onChange={handleChange}
        placeholder=" אימות סיסמה"
        autoComplete="new-password"
        required
      />

      <button type="submit">הרשמה</button>

      {errorMessage && <p>{errorMessage}</p>}

      <p>
        כבר יש לך חשבון? <Link to="/login">להתחברות</Link>
      </p>
    </form>
  );
}

export default Register;