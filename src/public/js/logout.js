const logout = document.querySelectorAll('.logout');

if (logout) {
    logout.forEach(el => {
        el.addEventListener('click', desloguear);
    })
}

function desloguear() {
    fetch('api/sessions/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
}