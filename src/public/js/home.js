const addToCart = document.querySelector('.addToCart');

addToCart.addEventListener('click', desloguear);

function desloguear() {
    fetch('api/cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
}