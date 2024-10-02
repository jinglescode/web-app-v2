import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from 'src/core/api';
import * as yup from 'yup';

export const formModel = {
  email: '',
};

export const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email('Enter a correct email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Enter a correct email')
      .required('Enter a correct email'),
  })
  .required();

export const useEmailForm = () => {
  const navigate = useNavigate();
  const eventName = localStorage.getItem('event_name') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const navigateToOtp = () => {
    const email = getValues().email.trim();

    forgetPassword({ email })
      .then(() => navigate(`../otp?email=${email}`))
      .catch(() => {
        setError('email', {
          type: 'manual',
          message: 'Enter a correct email',
        });
      });
  };

  const onBack = () => {
    navigate(`/sign-in${eventName && `?event_name=${eventName}`}`);
  };

  return { register, handleSubmit, errors, isValid, navigateToOtp, onBack, getValues };
};
