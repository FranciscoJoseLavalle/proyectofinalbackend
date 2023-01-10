const restBtn = document.querySelectorAll('.restToCart');
const addBtn = document.querySelectorAll('.addToCart');
const endBtn = document.querySelector('.end');

addBtn.forEach(btn => {
    btn.addEventListener('click', addToCart);
})
restBtn.forEach(btn => {
    btn.addEventListener('click', restToCart);
})

function addToCart(e) {
    let productID = e.target.parentNode.parentNode.id;
    let cartID = e.target.parentNode.parentNode.parentNode.id;
    fetch(`api/carts/${cartID}/products`, {
        method: 'POST',
        body: JSON.stringify({ pid: productID }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        if (json) {
            location.reload();
        }
    })
}
function restToCart(e) {
    let productID = e.target.parentNode.parentNode.id;
    let cartID = e.target.parentNode.parentNode.parentNode.id;
    fetch(`api/carts/${cartID}/products`, {
        method: 'DELETE',
        body: JSON.stringify({ pid: productID }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        if (json) {
            location.reload();
        }
    })
}

endBtn.addEventListener('click', (e) => endBuy(e));

function endBuy(e) {
    let cartID = e.target.parentNode.id
    fetch(`api/carts/${cartID}/endbuy`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        if (json.status === 'success') {
            location.reload();
        }
    })
}