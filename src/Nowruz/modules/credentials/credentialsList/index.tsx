import { formatDate } from 'src/core/time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './credentialsList.module.scss';
import { useCredentialsList } from './useCredentialsList';
import { CreditStatus } from '../creditStatus';
import { EducationDetails } from '../educationDetails';
import { ExperienceDetails } from '../experienceDetails';

export const CredentialList = () => {
  const {
    credentialsList,
    totalPage,
    setPage,
    onApprove,
    onReject,
    onView,
    handleCloseModal,
    openModal,
    experience,
    education,
    onUpdateExperience,
    onUpdateEducation,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
    userProfile,
    verified,
  } = useCredentialsList();
  return (
    <div className="flex flex-col">
      {!userProfile && (
        <div className="flex gap-3 justify-end">
          <Button
            color="inherit"
            variant="outlined"
            disabled={!selectedCredential.id}
            onClick={() => onApprove(selectedCredential.id, selectedCredential.name === 'experience')}
          >
            Approve
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            disabled={!selectedCredential.id}
            onClick={() => onReject(selectedCredential.id, selectedCredential.name === 'experience')}
          >
            Decline
          </Button>
        </div>
      )}
      <div className={css.tableCereditList}>
        <div className={css.header}>
          <div className="flex flex-[2_2_0%] gap-3">
            {/* <Checkbox id="select-all" /> */}
            Name
          </div>
          <div className="flex-1">Credential Type</div>
          <div className={css.col}>Status</div>
          <div className={css.col}>Requested Date</div>
          {verified && <div className={css.col} />}
        </div>
        <div className="flex flex-col">
          {credentialsList.map(item => (
            <div key={item.id} className="flex items-center text-sm font-normal text-left px-6 py-4">
              <div className="flex flex-[2_2_0%] justify-start items-center gap-3">
                {!userProfile && (
                  <Checkbox
                    id={item.id}
                    checked={selectedCredential.id === item.id}
                    onChange={() => onSelectCredential(item.id, 'experience' in item)}
                    disabled={item.status !== 'PENDING' || !verified}
                  />
                )}
                {userProfile ? (
                  <Avatar size="40px" type={'organizations'} img={item.org_image?.url} />
                ) : (
                  <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                )}

                <div className="flex flex-col">
                  <span className="leading-7 text-Gray-light-mode-900">
                    {userProfile ? item.org.name : `${item.user.first_name} ${item.user.last_name}`}
                  </span>
                  <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                    {userProfile ? `@${item.org.shortname}` : `@${item.user.username}`}
                  </span>
                </div>
              </div>
              <div className="flex-1">{'experience' in item ? 'Work Certificate' : 'Educational Certificate'}</div>
              <div className={css.col}>
                <div className="flex">
                  {item.status === 'PENDING' && <CreditStatus icon="clock" label="Pending" theme="secondary" />}
                  {item.status === 'APPROVED' && <CreditStatus icon="check" label="Approved" theme="primary" />}
                  {item.status === 'SENT' && (
                    <CreditStatus
                      icon="check"
                      label={userProfile ? 'Received' : 'Sent'}
                      theme={userProfile ? 'secondary' : 'success'}
                    />
                  )}
                  {item.status === 'REJECTED' && <CreditStatus icon="x-close" label="Rejected" theme="error" />}
                  {item.status === 'CLAIMED' && <CreditStatus icon="check" label="Claimed" theme="success" />}
                </div>
              </div>
              <div className={css.col}>{formatDate(item.created_at)}</div>
              {verified &&
                (userProfile ? (
                  <div className={css.col} />
                ) : (
                  <div className={css.col}>
                    <Button
                      color="primary"
                      variant="text"
                      onClick={() => onView(item, 'experience' in item)}
                      customStyle="!text-sm !font-semibold"
                    >
                      View
                    </Button>
                    {item.status === 'PENDING' && (
                      <Button
                        color="secondary"
                        variant="text"
                        onClick={() => onReject(item.id, 'experience' in item)}
                        customStyle="!text-sm !font-semibold"
                      >
                        Decline
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className={css.paginationBox}>
        <Pagination count={totalPage} onChange={(e, p) => setPage(p)} />
      </div>
      {!!experience && (
        <ExperienceDetails
          open={openModal.name === 'experience' && openModal.open}
          handleClose={handleCloseModal}
          experience={experience}
          onUpdateExperience={onUpdateExperience}
          avatarInfo={avatarInfo}
          readonly={experience?.credential?.status !== 'PENDING'}
        />
      )}
      {!!education && (
        <EducationDetails
          open={openModal.name === 'education' && openModal.open}
          handleClose={handleCloseModal}
          education={education}
          onUpdateEducation={onUpdateEducation}
          avatarInfo={avatarInfo}
          readonly={education?.credential?.status !== 'PENDING'}
        />
      )}
    </div>
  );
};
