import { isTouchDevice } from 'src/core/device-type-detector';
import { Mobile } from './mobile/mobile';
import { Desktop } from './desktop/desktop';

export const Team: React.FC = () => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};