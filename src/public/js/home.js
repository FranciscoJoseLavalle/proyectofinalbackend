const addBtn = document.querySelectorAll('.addToCart');

document.addEventListener('DOMContentLoaded', getTotalProducts)

addBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        addToCart(e)
    });
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
    }).then(result => result.json()).then(json => getTotalProducts())
}

const totalProducts = document.querySelectorAll('.totalProducts');

function getTotalProducts() {

    if (totalProducts) {
        fetch(`api/carts/${totalProducts[0].id}/products/quantity`)
            .then(data => data.json())
            .then(data => {
                totalProducts.forEach(element => {
                    element.textContent = data.result
                })
            })
    }

}