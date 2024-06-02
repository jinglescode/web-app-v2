import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelOffer } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

interface SliderSentOfferProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
export const SliderOfferSent: React.FC<SliderSentOfferProps> = ({ contract, disableMessage, redirectToChat }) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const withdrawOfferByOP = async () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CANCELED',
        }),
      );
      cancelOffer(contract.id);
    } catch (e) {
      console.log('error in withdrawing offer by organization', e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {!disableMessage && (
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            Message
          </Button>
        )}

        <Button variant="outlined" color="secondary" fullWidth onClick={withdrawOfferByOP}>
          Withdraw
        </Button>
      </div>

      <AlertMessage theme="gray" iconName="check-circle" title="You have sent an offer to the applicant" subtitle="" />
    </div>
  );
};
