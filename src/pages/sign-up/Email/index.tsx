import { Typography } from '@mui/material';
import { Google } from 'public/icons/nowruz/google';
import { Logo } from 'public/icons/nowruz/logo';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/modules/Auth/containers/ServiceIntro';
import { EmailForm } from 'src/modules/Auth/containers/signup/EmailForm';
import { reviews } from 'src/modules/Auth/statics/intro';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import { Link } from 'src/modules/general/components/link';

import css from './email.module.scss';
import { useCaptcha } from '../../captcha';

export const Email = () => {
  const type = localStorage.getItem('registerFor');
  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;
  const { tried } = useCaptcha();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  const renderIntro = () => {
    if (type === 'user')
      return (
        <ServiceIntro
          name={reviews.user.name}
          position={reviews.user.position}
          review={reviews.user.review}
          avatar={reviews.user.image}
        />
      );
    return (
      <ServiceIntro
        name={reviews.organization.name}
        position={reviews.organization.position}
        review={reviews.organization.review}
        avatar={reviews.organization.image}
      />
    );
  };

  return (
    <div className="flex h-screen px-4 sm:p-0">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
        <div className="form-container">
          {!referrerUser && (
            <IntroHeader
              title={translate('sign-up-user-email-title')}
              description={
                type === 'user' ? translate('sign-up-user-email-subtitle') : translate('sign-up-org-email-subtitle')
              }
              logo={<Logo width={48} height={48} />}
            />
          )}
          {!!referrerUser && (
            <>
              <IntroHeader title={translate('sign-up-user-email-title')} logo={<Logo width={48} height={48} />} />
              <div className={css.referrerContainer}>
                <div
                  className="flex gap-1.5 w-fit justfy-center align-center items-center
                border border-solid border-Gray-light-mode-300 rounded-[16px] bg-grey-200 ...
              "
                >
                  <div className="py-1.5 px-1.5">
                    <Avatar size="16px" type="users" img={referrerUser.avatarUrl} />
                  </div>
                  <div className="py-1 pr-3">
                    <span className={css.referrerText}>
                      {translate('sign-up-referrer-invited', { name: referrerUser.fisrtName })}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="mt-7">
            <EmailForm />
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                tried();
                navigate('/oauth/google');
              }}
              style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}
            >
              <Google />
              {translate('sign-up-continue-google')}
            </Button>
          </div>
          <div className="my-5 text-center">
            <Typography variant="caption" className={css.signupTitle}>
              {translate('sign-up-have-account')}
            </Typography>
            <Link href="/sign-in" label={translate('sign-up-sign-in')} customStyle="!font-semibold" />
          </div>
          <div className="text-center">
            <Typography variant="caption" className={css.signupTitle}>
              {translate('sign-up-accept')}
            </Typography>
            <Link href="/terms-conditions" label={translate('sign-up-term')} target="_blank" />
            <Typography variant="caption" className={css.signupTitle}>
              {translate('sign-up-and')}
            </Typography>
            <Link href="/privacy-policy" label={translate('sign-up-privacy')} target="_blank" />
          </div>
        </div>
        <div className={css.copy}>
          <div>
            <span className={css.copyText}>© Socious Global Inc. 2023</span>
          </div>
        </div>
      </div>

      <div className="w-1/2 items-center justify-center hidden md:block">
        <div className={`${css.review} `}>
          <div className="px-8">{renderIntro()}</div>
        </div>
      </div>
    </div>
  );
};
