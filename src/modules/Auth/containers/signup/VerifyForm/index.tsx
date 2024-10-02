import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { OTP } from 'src/modules/general/components/otp/otp';
import variables from 'src/styles/constants/_exports.module.scss';

import { useVerifyForm } from './useVerifyForm';
import css from './verifyForm.module.scss';

export const VerifyForm = () => {
  const { onSubmit, otpValue, setOtpValue, resendCode, isValid, loading } = useVerifyForm();

  return (
    <div className="flex flex-col justify-center">
      <OTP
        errorMessage={'Incorrect verification code entered'}
        isValid={isValid}
        value={otpValue}
        setValue={setOtpValue}
      />
      <div className="mt-8">
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          {loading ? <CircularProgress size="32px" sx={{ color: variables.color_white }} /> : 'Verify email'}
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center ">
        <Typography variant="caption" color={variables.color_grey_600}>
          Didn’t receive the email?
        </Typography>

        <Button color="primary" variant="text" onClick={resendCode} className={css.resend}>
          <Typography variant="subtitle2" color={variables.color_primary_700}>
            Click to resend
          </Typography>
        </Button>
      </div>
    </div>
  );
};
