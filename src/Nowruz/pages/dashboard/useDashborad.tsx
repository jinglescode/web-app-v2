import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, ImpactPoints, Organization, User, UserMeta } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useDashboard = () => {
  const { profileData, impactPointHistory } = useLoaderData() as {
    profileData: User | Organization;
    impactPointHistory: ImpactPoints;
  };

  const { name, type, usernameVal } = getIdentityMeta(profileData);

  const profileUrl =
    type === 'users' ? `/profile/users/${usernameVal}/view` : `/profile/organizations/${usernameVal}/view`;

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const verified =
    type === 'users' ? (currentIdentity?.meta as UserMeta).identity_verified : (profileData as Organization).verified;

  const verificationStatus = currentIdentity?.verification_status;
  let hoursWorked = 0;
  let hoursVolunteered = 0;

  if (impactPointHistory) {
    impactPointHistory.items
      .filter(item => item.offer !== null)
      .forEach(item => {
        if (item.offer) {
          if ((item?.offer?.currency && ['USD', 'YEN'].includes(item?.offer?.currency)) || item.offer.currency)
            hoursWorked += item.offer.total_hours;
          else hoursVolunteered += item.offer.total_hours;
        }
      });
  }

  return {
    verified,
    type,
    profileData,
    profileUrl,
    hoursVolunteered,
    hoursWorked,
    name,
    verificationStatus,
  };
};
