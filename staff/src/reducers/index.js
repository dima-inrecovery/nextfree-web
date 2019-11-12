import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import QRScanner from '../screens/QRScanner/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  QRScanner,
});

export default createRootReducer