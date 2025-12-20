import {apiFetch} from "../../apiFetch.js";
import {useAuthentication} from "../context/AuthenticationContext.jsx";

export async function register(name, email, password) {
    return await apiFetch('/api/auth/register/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
    })
}

export async function login(email, password) {
    return await apiFetch('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
    })
}

// export async function getMe() {
//     return await apiFetch('/api/auth/me/', {
//         method: 'GET',
//     })
// }


export async function changePassword(currentPassword, newPassword) {
    const { user } = useAuthentication()
	return await apiFetch('/api/auth/change-password/', {
        method: 'PUT',
        body: JSON.stringify({
            currentPassword,
            newPassword,
			userId: user._id
        }),
    })
}

export async function logout() {
    return await apiFetch('/api/auth/logout/', {
        method: 'POST',
    })
}