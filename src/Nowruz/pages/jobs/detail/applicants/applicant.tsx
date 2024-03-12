import React from 'react';
import { Applicant } from 'src/core/api';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { useSeeMore } from 'src/Nowruz/modules/general/utils';

import { useApplicant } from './useApplicant';

interface ApplicantDetailsProps {
  applicant: Applicant;
  openOffer: () => void;
  openReject: () => void;
  closeDetails: () => void;
}

export const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
  applicant,
  openOffer,
  openReject,
  closeDetails,
}) => {
  const {
    data: { seeMore, copyProccessed },
    operations: { handleSeeMore },
  } = useSeeMore(applicant?.cover_letter ?? '');

  const { handleViewProfile, handleClickResume, questionList } = useApplicant(applicant);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 ">
          <Avatar size="72px" type="users" img={applicant.user.avatar} />
          <div className="flex flex-col">
            <span className="font-semibold text-2xl leading-8 text-Gray-light-mode-900">{applicant.user?.name}</span>
            <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{applicant.user.username}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              openReject();
              closeDetails();
            }}
          >
            Reject
          </Button>

          <Button variant="outlined" color="secondary" fullWidth onClick={handleViewProfile}>
            View profile
          </Button>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            openOffer();
            closeDetails();
          }}
        >
          Hire
        </Button>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-Gray-light-mode-700">Cover letter</p>
            <p className="leading-6">
              {copyProccessed}
              {seeMore && (
                <span className="cursor-pointer" onClick={handleSeeMore}>
                  See more
                </span>
              )}
            </p>
          </div>
          {applicant.attachment?.filename && (
            <div className="flex flex-col gap-1 cursor-pointer">
              <p className="text-sm font-medium text-Gray-light-mode-700">Resume</p>
              <p onClick={handleClickResume}>{applicant.attachment?.filename}</p>
            </div>
          )}
          {questionList?.map((item) => (
            <div key={item.id} className="w-full flex flex-col gap-2">
              <span className="font-medium text-sm leading-5 text-Gray-light-mode-700">{item.question}</span>
              <span className="font-medium text-base leading-6 text-Gray-light-mode-900">{item.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
