import React from 'react';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';

interface CustomStepperProps {
  iconName: string;
  title: string;
  subtitle: string;
  displayDivider?: boolean;
}
export const CustomStepper: React.FC<CustomStepperProps> = ({ iconName, title, subtitle, displayDivider }) => {
  return (
    <div className="w-full flex gap-3">
      <div className="flex flex-col gap-1 w-fit items-start justify-start pb-1">
        <FeaturedIcon iconName={iconName} type="modern" size="lg" theme="gray" />
        {displayDivider && (
          <div className="flex-grow w-[50%] border border-solid border-r-2 border-y-0 border-l-0 border-Gray-light-mode-200" />
        )}
      </div>
      <div className="flex flex-grow flex-col mb-6">
        <span className="font-semibold text-sm leading-5 text-Gray-light-mode-700">{title}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>
      </div>
    </div>
  );
};
