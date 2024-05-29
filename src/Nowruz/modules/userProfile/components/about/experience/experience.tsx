import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { verificationStatus } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import { CreateUpdateExperience } from 'src/Nowruz/modules/userProfile/containers/createUpdateExperience';
import { VerifyExperience } from 'src/Nowruz/modules/userProfile/containers/verifyExperience';

import { useExperience } from './useExperience';
import css from '../about.module.scss';
import { ClaimCertificateModal } from '../claimCertificateModal';

interface ExperienceProps {
  handleOpenVerifyModal: () => void;
}

export const Experiences: React.FC<ExperienceProps> = ({ handleOpenVerifyModal }) => {
  const {
    user,
    myProfile,
    openModal,
    experience,
    handleEdit,
    handleAdd,
    handleDelete,
    getStringDate,
    handleClose,
    onOpenVerifyModal,
    handleRequestVerify,
    disabledClaims,
    reqModelShow,
    userVerified,
    handleOpenClaimModal,
    handleClaimVC,
    claimUrl,
  } = useExperience();

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>Experience</div>
        {myProfile && (
          <Button variant="text" color="primary" className={css.addBtn} onClick={handleAdd}>
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            Add experience
          </Button>
        )}
        {user?.experiences && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.experiences.map(item => (
              <>
                <StepperCard
                  key={item.id}
                  iconName="building-05"
                  img={item.org.image?.url}
                  title={item.title}
                  subtitle={item.org.name}
                  supprtingText={`${getStringDate(item.start_at)} - ${
                    item.end_at ? getStringDate(item.end_at) : 'Now'
                  }`}
                  DisplayVerificationStatus
                  verified={item.credential?.status ? verificationStatus[item.credential?.status] : 'unverified'}
                  description={item.description}
                  editable={myProfile}
                  deletable={myProfile}
                  handleEdit={() => handleEdit(item)}
                  handleDelete={() => handleDelete(item.id)}
                  verifyButton={{
                    display: myProfile && (!item.credential || item.credential?.status === 'PENDING'),
                    label: item.credential ? 'Verification pending' : 'Verify experience',
                    disabled: !!item.credential,
                    action: () => onOpenVerifyModal(item),
                  }}
                  claimButton={{
                    display:
                      myProfile && (item.credential?.status === 'APPROVED' || item.credential?.status === 'SENT'),
                    label: item.credential?.status === 'APPROVED' ? 'Claim certificate' : 'Certificate claimed',
                    disabled: !!disabledClaims[item.credential?.id || ''] || item.credential?.status === 'SENT',
                    action: userVerified ? () => handleOpenClaimModal(item.credential?.id) : handleOpenVerifyModal,
                  }}
                />
                {myProfile && item.credential?.status === 'REJECTED' && (
                  <div
                    className={css.status}
                    style={{ borderColor: variables.color_error_500, color: variables.color_error_500 }}
                  >
                    <Icon name="x-close" color={variables.color_error_500} />
                    <span>Rejected from {item.org.name}</span>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <AlertModal
        open={reqModelShow}
        onClose={handleClose}
        message={`Verfication request has been sent successfully`}
        title="Request sent"
        customIcon={<FeaturedIcon iconName="check-circle" size="md" theme="success" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Close"
        submitButton={false}
      />
      {claimUrl && (
        <ClaimCertificateModal
          open={openModal.name === 'claim' && openModal.open}
          link={claimUrl}
          handleClose={handleClose}
          handleClaimVC={handleClaimVC}
        />
      )}
      <CreateUpdateExperience
        open={(openModal.name === 'add' || openModal.name === 'edit') && openModal.open}
        handleClose={handleClose}
        experience={experience}
        readonly={
          experience?.credential && ['APPROVED', 'SENT', 'CLAIMED'].includes(experience.credential?.status || '')
        }
      />
      {!!experience && (
        <VerifyExperience
          open={openModal.name === 'verify' && openModal.open}
          handleClose={handleClose}
          experience={experience}
          onVerifyExperience={handleRequestVerify}
        />
      )}
    </>
  );
};
