import {apiFetch} from "../../apiFetch.js";

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
    return await apiFetch('/login/', {
        method: 'POST',
        body: {
            email,
            password
        },
    })
}

export async function changePassword(currentPassword, newPassword) {
    return await apiFetch('/change-password/', {
        method: 'PUT',
        body: {
            currentPassword,
            newPassword
        },
    })
}

export async function logout() {
    return await apiFetch('/logout/', {
        method: 'POST',
    })
}