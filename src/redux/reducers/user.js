import * as actionTypes from "../actionTypes";
import { Record } from 'immutable';

const Model = Record({
	isLoggedIn: false
});

const initialState = Model();

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return state
                .withMutations(mutant => {
					mutant.set('isLoggedIn', true);
				});
		case actionTypes.SET_USER_IS_LOGGED_IN:
			return state
				.withMutations(mutant => {
					mutant.set('isLoggedIn', action.payload);
				});
		case actionTypes.LOGOUT_REQUEST:
			return initialState;
		default:
			return state;
	}
};

export default UserReducer;
