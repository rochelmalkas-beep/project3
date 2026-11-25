import { useLocation, useNavigate } from 'react-router-dom';

export function useUrlState(paramName, defaultValue = '') {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get(paramName) || defaultValue;

  const setValues = (updates) => {
    const updatedParams = new URLSearchParams(location.search);

    Object.entries(updates).forEach(([key, newValue]) => {
      if (newValue === '' || newValue == null) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, newValue);
      }
    });

    navigate(
      {
        pathname: location.pathname,
        search: updatedParams.toString(),
      },
      { replace: true }
    );
  };

  const setValue = (newValue) => setValues({ [paramName]: newValue });

  return [value, setValue, setValues];
}
