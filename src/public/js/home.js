const addBtn = document.querySelectorAll('.addToCart');

addBtn.forEach(btn => {
    btn.addEventListener('click', addToCart);
})

function addToCart(e) {
    let productID = e.target.parentNode.id;
    let cartID = e.target.parentNode.parentNode.id;
    fetch(`api/carts/${cartID}/products`, {
        method: 'POST',
        body: JSON.stringify({ pid: productID }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
}