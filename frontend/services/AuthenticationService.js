async function register(name, email, password) {
    return await apiFetch('/api/auth/register/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
    })
}

async function login(email, password) {
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


async function changePassword(currentPassword, newPassword, userId) {
	return await apiFetch('/api/auth/change-password/', {
        method: 'PUT',
        body: JSON.stringify({
            currentPassword,
            newPassword,
			userId: userId
        }),
    })
}

async function changeName(newName, email) {
	return await apiFetch('/api/auth/change-name/', {
        method: 'PUT',
        body: JSON.stringify({
            newName,
			email
        }),
    })
}

async function logout() {
    return await apiFetch('/api/auth/logout/', {
        method: 'POST',
    })
}