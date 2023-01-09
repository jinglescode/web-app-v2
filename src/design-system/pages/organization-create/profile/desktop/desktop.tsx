import css from './desktop.module.scss';
import { Input } from '../../../../atoms/input/input';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';

const sharedProps: Record<string, string> = {
  className: css.input,
  variant: 'outline',
};

export const Desktop = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Divider title="Basic info" divider="space">
        <Input {...sharedProps} label="Organization name" placeholder="Organization name" />
        <Textarea {...sharedProps} label="Bio" placeholder="Your organization's bio" />
      </Divider>
      <Divider title="Contact" divider="space">
        <Input {...sharedProps} label="Organization email" placeholder="Organization email" />
        <Input {...sharedProps} label="Country" placeholder="Country" />
        <Input {...sharedProps} label="City" placeholder="City" />
        <Input {...sharedProps} label="Address" placeholder="Address" />
        <Input {...sharedProps} label="Website" placeholder="Website" />
      </Divider>
    </div>
  );
};
