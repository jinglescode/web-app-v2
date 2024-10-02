// FIXME: use ThreeDotsMenu component
import { MenuItem, MenuList } from '@mui/material';
import React from 'react';
import { Icon } from 'src/modules/general/components/Icon';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './threeDotButton.module.scss';
import { ThreeDotButtonProps } from './threeDotButton.types';
import { useInitiateDisputeButton } from './useThreeDotButton';

export const ThreeDotButton: React.FC<ThreeDotButtonProps> = ({ menuItems }) => {
  const { openMenu, setOpenMenu } = useInitiateDisputeButton();
  return (
    <div className="relative">
      <IconButton
        size="medium"
        iconName="dots-vertical"
        iconColor={variables.color_grey_700}
        iconSize={20}
        customStyle="!border !border-solid !border-Gray-light-mode-300"
        onClick={() => setOpenMenu(!openMenu)}
      />
      {openMenu && (
        <MenuList autoFocusItem className={css.menuList} onMouseLeave={() => setOpenMenu(false)}>
          {menuItems.map(item => (
            <MenuItem key={item.title} className={css.menuItem} onClick={item.onClick} disableRipple disableTouchRipple>
              <Icon name={item.iconName} fontSize={16} className="text-Gray-light-mode-500" />
              <span>{item.title}</span>
            </MenuItem>
          ))}
        </MenuList>
      )}
    </div>
  );
};
