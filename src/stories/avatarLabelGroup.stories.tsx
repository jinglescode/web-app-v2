import { StoryFn } from '@storybook/react';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';

export default {
  title: 'General/AvatarLabelGroup',
  component: AvatarLabelGroup,
} as const;

const account: AccountItem = {
  id: '1',
  type: 'users',
  name: 'first last',
  username: 'username',
  img: '',
  selected: true,
};

const Template: StoryFn = args => {
  return <AvatarLabelGroup account={account} {...args} />;
};
const imgUrl = 'https://socious-new.s3.ap-northeast-1.amazonaws.com/f9d1522cb673fa3d64e4243bd423e2bc.jpg';
export const WithImage = Template.bind({});
WithImage.args = {
  account: { id: '2', img: imgUrl, type: 'users', name: 'first last', username: '@username' },
};
WithImage.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/oDpGb8I9Eg0DFJSkkvXrrH/DS-3.1-Avatars?type=design&node-id=5919-5676&mode=design&t=cYVUM15bghSf6Lio-0',
  },
};

export const UserAvatar = Template.bind({});
UserAvatar.args = { account: { id: '3', type: 'users', name: 'first last', username: '@username' } };
UserAvatar.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/oDpGb8I9Eg0DFJSkkvXrrH/DS-3.1-Avatars?type=design&node-id=5919-5676&mode=design&t=cYVUM15bghSf6Lio-0',
  },
};

export const OrgAvatar = Template.bind({});
OrgAvatar.args = {
  account: {
    id: '4',
    type: 'organizations',
    name: 'first last',
    username: '@username',
  },
};
OrgAvatar.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/oDpGb8I9Eg0DFJSkkvXrrH/DS-3.1-Avatars?type=design&node-id=5919-5676&mode=design&t=cYVUM15bghSf6Lio-0',
  },
};
