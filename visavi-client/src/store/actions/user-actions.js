export const setUser = (user, token) => {
	localStorage.setItem(
		'user',
		JSON.stringify({
			user,
			token,
		}),
	);

	return {
		type: 'SET_USER',
		payload: { user, token },
	};
};

export const logout = () => {
	localStorage.removeItem('user');

	return {
		type: 'LOGOUT',
	};
};
