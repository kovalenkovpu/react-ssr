import { InitialDataInterface } from '../shared/App';

declare global {
  interface Window {
    __APP_DATA__?: InitialDataInterface;
  }
}
