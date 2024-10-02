import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { UserDetails } from 'src/modules/Auth/containers/signup/UserDetails';
import { steps } from 'src/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/modules/general/components/stepper/stepper';

export const Details = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`form-container`}>
        <IntroHeader title="Your details" description="" logo={<FeaturedIcon src="/icons/user-outlined.svg" />} />
        <div className="mt-5">
          <UserDetails />
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={2} steps={steps} />
    </div>
  );
};
