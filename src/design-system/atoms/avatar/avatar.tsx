import { CSSProperties } from 'react';
import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { size, onClick, type = 'users', img, ...rest } = props;

  const images: Record<AvatarProps['type'], string> = {
    organizations: '/icons/organization.svg',
    users: '/icons/user.svg',
  };

  const style: CSSProperties = {
    ...rest,
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    backgroundImage: `url(${images[type]})`,
  };

  return (
    <div onClick={props.onClick} style={style} className={css.container}>
      {img && <img className={css.img} src={img} />}
    </div>
  );
};
