import { Typography } from '@mui/material';
import { Google } from 'public/icons/nowruz/google';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';
import { Link } from 'src/modules/general/components/link';
import variables from 'src/styles/constants/_exports.module.scss';

import { useSignInForm } from './useSignInForm';
// import { LinkedIn } from 'public/icons/nowruz/linkedin';

export const SignInForm = () => {
  const { register, errors, keepLoggedIn, handleChange, handleSubmit, onLogin, tried } = useSignInForm();
  const navigate = useNavigate();

  return (
    <>
      <form className="flex flex-col gap-6 my-8 ">
        <div className="flex flex-col gap-[20px]">
          <Input
            id="email"
            autoComplete="Email"
            label="Email"
            name="email"
            register={register}
            placeholder="Enter your email"
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Input
            autoComplete="current-password"
            id="password"
            type="password"
            label="Password"
            name="password"
            register={register}
            placeholder="Enter your password"
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox id="Keep_me_logged_in" label={'Keep me logged in'} value={keepLoggedIn} onChange={handleChange} />
          <div className="w-fit mr-0 ml-auto flex items-center">
            <Link href="/forget-password/email" label="Forgot password" customStyle="!font-semibold" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="primary" onClick={handleSubmit(onLogin)}>
            Continue
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              tried();
              navigate('/oauth/google');
            }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Google />
            Continue with Google
          </Button>
          {/*
            <Button variant="outlined" color="secondary" className={css.button}>
              <LinkedIn />
              <div className={css.buttonTitle}>Continue with LinkedIn</div>
            </Button> */}
        </div>
      </form>

      <div className="flex flex-row items-center justify-center gap-1">
        <Typography variant="caption" color={variables.color_grey_600}>
          Don&apos;t have an account?
        </Typography>
        <Link label=" Sign up" href="/intro" customStyle="!font-semibold" />
      </div>
    </>
  );
};
