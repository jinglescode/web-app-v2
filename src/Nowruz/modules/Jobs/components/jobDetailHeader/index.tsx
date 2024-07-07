import { Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Job } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import { AuthGuard } from 'src/Nowruz/modules/authGuard';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { RootState } from 'src/store';

import css from './jobDetailHeader.module.scss';

interface JobDetailHeaderProps {
  job: Job;
  applied?: boolean;
  handleOpenApplyModal?: () => void;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job, applied, handleOpenApplyModal }) => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { usernameVal } = getIdentityMeta(job.identity_meta);

  const socialCauses = socialCausesToCategory(job.causes_tags).map(item => item.label);
  const skills = skillsToCategory(job.skills).map(item => item.label);

  const getBackLink = () => {
    const sourceOrg = localStorage.getItem('source') ?? '';
    if (localStorage.getItem('navigateToSearch') === 'true') {
      const searchTerm = localStorage.getItem('searchTerm');
      const type = localStorage.getItem('type');
      return `/search?q=${searchTerm}&type=${type}&page=1`;
    }
    if (sourceOrg === 'applied') {
      return `/jobs/applied`;
    }
    if (sourceOrg === 'recommended') {
      return '/jobs/recommended';
    }
    if (sourceOrg === 'saved') {
      return '/jobs/saved';
    }
    if (sourceOrg) {
      return `/profile/organizations/${sourceOrg}/jobs`;
    }

    return currentIdentity?.type === 'organizations' ? '/jobs/created' : '/jobs';
  };

  const onAvatarClick = () => {
    if (usernameVal) {
      navigate(`/profile/organizations/${usernameVal}/view`);
    }
  };

  return (
    <>
      <div className={css.container}>
        <BackLink title="Back" onBack={() => navigate(getBackLink())} customStyle="w-fit" />
        <Avatar size="72px" type="organizations" img={job.identity_meta.image} hasBorder isVerified={false} />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className={css.jobTitle}>{job.title}</h1>
            <div className="flex">
              <button className={`${css.subtitle} cursor-pointer`} onClick={onAvatarClick}>
                {job.identity_meta.name}
              </button>
              <span className={css.subtitle}>{` ・ ${toRelativeTime(job.created_at.toString())}`}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {socialCauses?.map(tag => <Chip key={tag} label={tag} theme="primary" shape="round" size="lg" />)}
            {skills?.map(s => <Chip key={s} label={s} theme="grey_blue" shape="round" size="lg" />)}
          </div>

          {/* <span className={css.subtitle}>
            <ExpandableText
              isMarkdown
              expectedLength={isTouchDevice() ? 85 : 175}
              text={job.identity_meta.mission || ''}
            />
          </span> */}
          {!applied && currentIdentity?.type !== 'organizations' && (
            <AuthGuard>
              <Button color="primary" variant="contained" customStyle="md:hidden w-full" onClick={handleOpenApplyModal}>
                Apply now
              </Button>
            </AuthGuard>
          )}
          {currentIdentity?.type === 'users' && <Divider />}
        </div>
      </div>
    </>
  );
};
