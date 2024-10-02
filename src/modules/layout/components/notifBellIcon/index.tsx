import { Icon } from 'src/modules/general/components/Icon';

import css from './notifBellIcon.module.scss';
export interface NotifBellIconProps {
  unread: boolean;
}
const NotifBellIcon = ({ unread = false }) => {
  return (
    <div className={`${css.container} `}>
      <div className="hidden md:block">
        <Icon name="bell-01" className="text-Gray-light-mode-500 !cursor-pointer" fontSize={20} />
      </div>
      <div className="md:hidden">
        <Icon name="bell-01" className="text-Gray-light-mode-500 !cursor-pointer" fontSize={24} />
      </div>

      {unread && <div className={css.dot} />}
    </div>
  );
};

export default NotifBellIcon;
