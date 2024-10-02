import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import dapp from 'src/dapp';
import { Dot } from 'src/modules/general/components/dot';
import { Icon } from 'src/modules/general/components/Icon';
import { RootState } from 'src/store';
import { handleDisplaySlider, setSelected } from 'src/store/reducers/contracts.reducer';
import variables from 'src/styles/constants/_exports.module.scss';

export const useContractCard = (contract: Contract) => {
  const [contractVal, setContractVal] = useState(contract);
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const type = identity?.type;

  const name = type === 'users' ? contractVal.offerer.meta.name : contractVal.recipient.meta.name;
  const profileImageUrl =
    type === 'users' ? (contractVal.offerer.meta as OrgMeta).image : (contractVal.recipient.meta as UserMeta).avatar;

  const dispatch = useDispatch();

  useEffect(() => {
    let unit = contract.currency;

    if (!unit && contract.crypto_currency_address) {
      dapp.NETWORKS.map(n => {
        const token = n.tokens.filter(t => contract.crypto_currency_address === t.address)[0];
        if (token) unit = token.symbol;
      });
    }

    setContractVal({ ...contract, currency: unit });
  }, [contract]);

  // We might delete currency icon later (we accept only USD or JPY at the moment)
  const currencyIconName = (() => {
    switch (contractVal.currency) {
      case 'JPY':
        return 'currency-yen-circle';
      case 'USD':
        return 'currency-dollar-circle';
    }
  })();

  // Format the amount depending of the currency
  const formatCurrency = (() => {
    if (!contractVal.assignment_total) return;
    const options = { useGrouping: true };

    switch (contractVal.currency) {
      case 'JPY':
        return new Intl.NumberFormat('ja-JP', { ...options, maximumFractionDigits: 0 }) // Japanese Yen typically doesn't use decimal places
          .format(contractVal.assignment_total);
      case 'USD':
        return new Intl.NumberFormat('en-US', { ...options, maximumFractionDigits: 2 }).format(
          contractVal.assignment_total,
        );
      default:
        return contractVal.assignment_total.toString(); // Ensure the default case returns a string for consistency
    }
  })();

  type BadgeTheme = 'warning' | 'secondary' | 'success' | 'error' | 'primary' | 'grey_blue' | undefined;
  const BadgeData = (): { theme: BadgeTheme; icon: ReactNode } => {
    switch (contractVal.contractStatus) {
      case 'Offer received':
        return {
          theme: 'warning',
          icon: <Dot size="small" color={variables.color_warning_600} shadow={false} />,
        };
      case 'Offer sent':
        return {
          theme: 'secondary',
          icon: <Icon fontSize={12} name="arrow-up" className="text-Gray-light-mode-600" />,
        };
      case 'Awaiting confirmation':
        return {
          theme: 'warning',
          icon: <Icon fontSize={12} name="clock" className="text-Warning-600" />,
        };
      case 'Payment required':
        return {
          theme: 'warning',
          icon: <Icon fontSize={12} name="alert-circle" className="text-Warning-600" />,
        };
      case 'Ongoing':
        return {
          theme: 'success',
          icon: <Dot size="small" color={variables.color_success_700} shadow={false} />,
        };
      case 'Completed':
        return {
          theme: 'success',
          icon: <Icon name="check-circle" fontSize={12} className="text-Success-600" />,
        };
      case 'Canceled':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Kicked out':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Closed':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Withdrawn':
        return {
          theme: 'secondary',
          icon: <></>,
        };
    }
  };

  const handleOpenOverlayModal = async () => {
    dispatch(setSelected(contract.id));
    dispatch(handleDisplaySlider(true));
  };

  const badge = BadgeData();
  const contractCurrency = String(contractVal?.currency || '');

  return {
    badge,
    type,
    name,
    profileImageUrl,
    currencyIconName,
    formatCurrency,
    contractVal,
    handleOpenOverlayModal,
    contractCurrency,
  };
};
