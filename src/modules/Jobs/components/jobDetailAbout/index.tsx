import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V3 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { closeJob, CurrentIdentity, Job } from 'src/core/api';
import { QuestionsRes } from 'src/core/types';
import { AuthGuard } from 'src/modules/authGuard';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { CountryFlag } from 'src/modules/general/components/countryFlag';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import { RootState } from 'src/store';

import css from './jobDetailAbout.module.scss';

interface JobDetailAboutProps {
  isUser: boolean;
  applied?: boolean;
  handleOpenApplyModal?: () => void;
}

export const JobDetailAbout: React.FC<JobDetailAboutProps> = ({ isUser = true, applied, handleOpenApplyModal }) => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const [openAlert, setOpenAlert] = useState(false);

  // FIXME: .env URLs should not have slash at the end
  const url = `${config.appBaseURL}jobs/${jobDetail.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const navigate = useNavigate();

  const onClose = async () => {
    const response = await closeJob(jobDetail.id);
    if (response) {
      navigate(-1);
    }
  };

  const inputJSX = (
    <button id="copy-button" className={css.copyBtn} onClick={handleCopy}>
      <Icon name="copy-01" fontSize={20} className="text-Gray-light-mode-700" />
      <span>Copy</span>
    </button>
  );

  const renderJobFeatures = (iconName: string, feature?: string, description?: string) => {
    if (!feature) return;
    return (
      <div className="flex gap-2 ">
        <Icon name={iconName} fontSize={20} className="text-Gray-light-mode-500" />
        <span className={css.subtitle}>{feature}</span>
        {description && <span className={css.description}>{description}</span>}
      </div>
    );
  };

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }
  const renderJobLocation = () => {
    const address = jobDetail.country
      ? `${jobDetail.city ? `${jobDetail.city}, ` : ''}${getCountryName(
          jobDetail.country as keyof typeof COUNTRIES_DICT | undefined,
        )}`
      : '';
    return (
      <div className="flex gap-2">
        {jobDetail.country ? (
          <CountryFlag countryCode={jobDetail.country || ''} />
        ) : (
          <img src="/icons/nowruz/earth.svg" alt="" />
        )}

        <span className={css.subtitle}>{address || 'Anywhere'}</span>
      </div>
    );
  };

  const detailJSX = (
    <div className="flex flex-row flex-wrap gap-4">
      {renderJobLocation()}
      {renderJobFeatures(
        'mouse',
        PROJECT_REMOTE_PREFERENCES_V2.find(level => level.value === jobDetail.remote_preference)?.label,
      )}
      {renderJobFeatures('calendar', PROJECT_TYPE_V2.find(level => level.value === jobDetail.project_type)?.label)}
      {renderJobFeatures(
        'hourglass-03',
        PROJECT_LENGTH_V3.find(level => level.value === jobDetail.project_length)?.label,
      )}

      {renderJobFeatures(
        'target-02',
        EXPERIENCE_LEVEL_V2.find(level => level.value === jobDetail.experience_level)?.label,
      )}
      {jobDetail.payment_type === 'PAID' &&
        jobDetail.payment_range_lower &&
        jobDetail.payment_range_higher &&
        renderJobFeatures(
          'currency-dollar-circle',
          ` ${jobDetail.payment_range_lower}~${jobDetail.payment_range_higher} USD`,
          '(Fixed-price)',
        )}

      {jobDetail.payment_type === 'VOLUNTEER' && renderJobFeatures('heart', 'Volunteer')}

      {jobDetail.payment_type === 'VOLUNTEER' &&
        jobDetail.commitment_hours_lower &&
        jobDetail.commitment_hours_higher &&
        renderJobFeatures(
          'clock',
          ` ${jobDetail.commitment_hours_lower}~${jobDetail.commitment_hours_higher} hrs/week`,
        )}
    </div>
  );
  return (
    <>
      <div className={css.container}>
        <span className={css.title}>About this job</span>
        <div className="hidden md:block">{detailJSX}</div>

        <Input className="hidden md:block" id="copy-url" value={url} postfix={inputJSX} />
        {!applied && currentIdentity?.type !== 'organizations' && jobDetail.status === 'ACTIVE' && (
          <AuthGuard>
            <Button
              variant="contained"
              color="primary"
              customStyle="hidden md:block w-full"
              onClick={handleOpenApplyModal}
            >
              Apply now
            </Button>
          </AuthGuard>
        )}
        {!isUser && jobDetail.status === 'ACTIVE' && currentIdentity?.id === jobDetail.identity_meta.id && (
          <Button
            variant="contained"
            color="error"
            customStyle="hidden md:block w-full"
            onClick={() => setOpenAlert(true)}
          >
            Close
          </Button>
        )}
        <div className="md:hidden flex flex-col gap-5 p-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {detailJSX}
          <Input id="copy-url" value={url} postfix={inputJSX} />
        </div>
      </div>

      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={onClose}
        message="Are you sure you want to close this job?It will be archived"
        title="Close job"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="error"
        submitButtonLabel="Close job"
      />
    </>
  );
};
