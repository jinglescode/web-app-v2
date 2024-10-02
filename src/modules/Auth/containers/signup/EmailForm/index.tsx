import { Google } from 'public/icons/nowruz/google';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import { useEmailForm } from './useEmailForm';

interface EmailFormProps {
  eventId: string;
}

export const EmailForm: React.FC<EmailFormProps> = ({ eventId }) => {
  const { register, errors, onSubmit, handleSubmit, navigate } = useEmailForm(eventId);
  const type = localStorage.getItem('registerFor');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          autoComplete="Email"
          label={type === 'user' ? 'Email*' : 'Your work email*'}
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className="mt-8 flex flex-col gap-4">
          <Button color="primary" block onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
          {/* <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate('/oauth/google')}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Google />
            Continue with Google
          </Button> */}
        </div>
      </form>
    </>
  );
};
