function register() {

}

function login() {

}

function changePassword() {

}

/* This will not be implemented
function logout() {

}

function me() {

}
*/

const authenticationRoutes = {
	'/api/auth/register/': register,
	// '/api/auth/me/': me,
	'/api/auth/login/': login,
	'/api/auth/change-password/': changePassword,
	// '/api/auth/logout/': logout,
}

module.exports = authenticationRoutes