import { combineReducers } from  'redux';
import { OragizationReducer from './OrganizationReducer';

export default combineReducers({
  organizations: OrganizationReducer
});
