import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import ProfileSecurity from './screens/ProfileSecurity/sagas';
import Staff from './screens/Staff/sagas';
import Register from './screens/Register/sagas';
import StaffEdit from './screens/StaffEdit/sagas';
import StaffInvite from './screens/StaffInvite/sagas';
import Store from './screens/Store/sagas';
import StoreEdit from './screens/StoreEdit/sagas';
import CompanyEdit from './screens/CompanyEdit/sagas';
import PasswordSet from './screens/PasswordSet/sagas';
import PasswordReset from './screens/PasswordReset/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(ProfileSecurity),
    fork(Register),
    fork(Staff),
    fork(StaffEdit),
    fork(StaffInvite),
    fork(Store),
    fork(StoreEdit),
    fork(CompanyEdit),
    fork(PasswordSet),
    fork(PasswordReset),
  ]);
}
