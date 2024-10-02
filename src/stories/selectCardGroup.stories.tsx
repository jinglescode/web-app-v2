import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import SelectCardGroup from 'src/modules/general/components/selectCardGroup';
import { SelectCardGroupItem } from 'src/modules/general/components/selectCardGroup/selectCardGroup.type';

export default {
  title: 'onboarding/SelectCardGroup',
  component: SelectCardGroup,
} as const;

const items = [
  { value: '1', label: 'Impact Startup' },
  { value: '2', label: 'Social Business' },
  { value: '3', label: 'Non profit / Charity' },
  { value: '4', label: 'Social Co-operative' },
  { value: '5', label: 'Impact Investing Funds / Foundations' },
  { value: '6', label: 'Public Institution' },
  { value: '7', label: 'Other' },
];
const Template: StoryFn = args => {
  const [selected, setSelected] = useState<SelectCardGroupItem>();
  const handleSelect = (value: SelectCardGroupItem) => {
    setSelected(value);
  };
  return (
    <div style={{ width: '350px' }}>
      <SelectCardGroup items={items} value={selected} setValue={handleSelect} {...args} />;
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/T0ZAkJOmRIvG3EmQgpgO0B/Socious-Web-App-3.1?type=design&node-id=1209-139550&mode=design&t=3LRoEJuLxlz7ZWPR-0',
  },
};
