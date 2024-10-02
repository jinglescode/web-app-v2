import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerReq, preRegister, handleError } from 'src/core/api';
import * as yup from 'yup';
type Inputs = {
  email: string;
};
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Enter a correct email')
    .required('Email is required'),
});
export const useEmailForm = (event_id: string) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;

  const setEventsFilter = () => {
    const filter = { events: [event_id] };
    localStorage.setItem('filter', JSON.stringify(filter));
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const response = await preRegister({ email: email });
    clearErrors('email');

    if (response.email === 'EXISTS') {
      setError('email', {
        type: 'manual',
        message: 'Email already in use. Please sign in or choose another email.',
      });
      return;
    } else {
      registerReq({ email }, referrerUser?.id, event_id)
        .then(() => {
          localStorage.setItem('email', email);
          event_id && setEventsFilter();
        })
        .then(() => navigate('../verification'))
        .catch(handleError());

      if (localStorage.getItem('registerFor') === 'user') localStorage.removeItem('referrer');
    }
  };

  return { register, handleSubmit, errors, onSubmit, navigate };
};
