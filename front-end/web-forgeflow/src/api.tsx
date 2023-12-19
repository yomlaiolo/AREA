const API = 'http://localhost:8080'

export async function login(email: string, password: string, navigate: Function) {

    fetch(API + '/auth/login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
        .then(response => {
            if (response.status === 200)
                return response.json();
            else if (response.status === 401)
                return null;
        })
        .then(async data => {
            if (data && data.access_token) {
                let token = data.access_token;
                await setToken(token);
                navigate('/flows');
            } else
                window.alert("Error: Unauthorized - invalid credentials");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function register(username: string, email: string, password: string, navigate: Function) {
    fetch(API + '/auth/register', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            "username": username,
            "firstname": "empty",
            "lastname": "empty",
            "email": email,
            "password": password,
        })
    })
        .then(response => {
            if (response.status === 201) {
                login(email, password, navigate);
            } else if (response.status === 400) {
                window.alert("Error: Bad Request - invalid data");
            } else if (response.status === 406) {
                window.alert("Error: Not Acceptable - invalid email / password");
            } else if (response.status === 409) {
                window.alert("Error: User or email already used");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function getToken() {
    const token = localStorage.getItem('token');
    return token;
}

export async function setToken(token: string) {
    localStorage.setItem('token', token);
}

export async function logout(navigate: any) {
    localStorage.removeItem('token');
    navigate('/');
}