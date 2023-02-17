const restBtn = document.querySelectorAll('.restToCart');
const addBtn = document.querySelectorAll('.addToCart');
const endBtn = document.querySelector('.end');

document.addEventListener('DOMContentLoaded', getTotalProducts)

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
const productContainer = document.querySelector('.product-container-cart')

function endBuy(e) {
    let cartID = e.target.parentNode.id
    let loader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
    productContainer.innerHTML = loader;
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

const totalProducts = document.querySelectorAll('.totalProducts');

function getTotalProducts() {
    fetch(`api/carts/${totalProducts[0].id}/products/quantity`)
        .then(data => data.json())
        .then(data => {
            totalProducts.forEach(element => {
                element.textContent = data.result
            })
        })
}