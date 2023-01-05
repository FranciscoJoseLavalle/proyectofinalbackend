const logout = document.querySelector('.logout');

if (logout) {
    logout.addEventListener('click', desloguear);
}

function desloguear() {
    fetch('api/sessions/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
}