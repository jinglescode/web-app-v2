import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Offer } from 'src/core/api';
import dapp from 'src/dapp';
import { Icon } from 'src/Nowruz/general/Icon';

interface ContractDetailTabProps {
  offer: Offer;
}
export const ContractDetailTab: React.FC<ContractDetailTabProps> = ({ offer }) => {
  let unit = offer.currency;

  if (offer.crypto_currency_address) {
    dapp.NETWORKS.map((n) => {
      const token = n.tokens.filter((t) => offer.crypto_currency_address === t.address)[0];
      if (token) unit = token.symbol;
    });
  }

  const cuttencyIcon =
    offer.payment_mode === 'CRYPTO' ? '' : offer.currency === 'JPY' ? 'currency-yen-circle' : 'currency-dollar-circle';
  const renderDetailItems = (iconName: string, title: string, subtitle?: string) => {
    return (
      <div className="flex gap-1.5">
        {iconName && <Icon name={iconName} fontSize={20} color={variables.color_grey_500} />}
        <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{title}</span>
        {subtitle && <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6 py-4">
      <ExpandableText text={offer.offer_message} isMarkdown expectedLength={700} />
      {(offer.due_date || offer.total_hours || offer.assignment_total) && (
        <div className="flex flex-col p-5 gap-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {offer.due_date && renderDetailItems('calendar-check-01', `Due ${offer.due_date || ''}`)}
          {offer.total_hours &&
            renderDetailItems('clock', `${offer.total_hours} ${offer.total_hours === 1 ? 'hour' : 'hours'}`)}
          {offer.assignment_total &&
            renderDetailItems(cuttencyIcon, `${offer.assignment_total.toString()} ${unit}`, '(fixed-price)')}
          {offer.project.payment_type === 'VOLUNTEER' && (
            <div className="flex gap-1.5">
              <img src="/icons/nowruz/red-heart.svg" alt="" />
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Volunteer</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
