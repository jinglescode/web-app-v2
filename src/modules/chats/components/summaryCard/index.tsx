import { Typography } from '@mui/material';
import React from 'react';
import { OrgMeta, UserMeta } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Dot } from 'src/modules/general/components/dot';
import { useSeeMore } from 'src/modules/general/utils';
import variables from 'src/styles/constants/_exports.module.scss';

import { SummaryCardProps } from './summaryCard.types';

export const SummaryCard: React.FC<SummaryCardProps> = ({ chat, handleSelect, isSelected }) => {
  const {
    data: { copyProccessed },
  } = useSeeMore(chat.last_message?.text || '', 50);

  const {
    profileImage,
    username,
    type = 'users',
    name,
  } = getIdentityMeta(chat.participants[0].identity_meta as UserMeta | OrgMeta);

  const account = {
    id: chat.participants[0].identity_meta?.id || '',
    img: profileImage,
    type,
    name,
    username,
  };

  return (
    <div
      className={`flex flex-col gap-4 p-4 w-full cursor-pointer ${isSelected ? 'bg-Gray-light-mode-50' : ''}`}
      onClick={() => handleSelect(chat.id)}
    >
      <div className="w-full flex justify-between items-start">
        <div className="flex items-center justify-start gap-3">
          <Dot
            size="small"
            color={Number(chat.unread_count) ? variables.color_primary_600 : 'transparent'}
            shadow={false}
          />
          <AvatarLabelGroup account={account} customStyle="!w-fit !p-0" />
        </div>
        <Typography variant="caption" color={variables.color_grey_600}>
          {toRelativeTime(chat.updated_at)}
        </Typography>
      </div>
      <div className="pl-5">
        <Typography variant="caption" color={variables.color_grey_600}>
          {copyProccessed}
        </Typography>
      </div>
    </div>
  );
};
