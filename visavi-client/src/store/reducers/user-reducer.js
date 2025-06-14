const saved = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: saved?.user || null,
	token: saved?.token || null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
			};
		case 'LOGOUT':
			return {
				user: null,
				token: null,
			};
		default:
			return state;
	}
};
