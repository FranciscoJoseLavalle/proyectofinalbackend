const deleteBtn = document.querySelectorAll('.delete');
const editBtn = document.querySelectorAll('.edit');
const modalContainer = document.querySelector('.modal');
let PID;

deleteBtn.forEach(btn => {
    btn.addEventListener('click', deleteProduct);
})
editBtn.forEach(btn => {
    btn.addEventListener('click', openModal);
})

function deleteProduct(e) {
    let productID = e.target.parentNode.id;
    fetch(`api/products/${productID}/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        if (json) {
            location.reload();
        }
    })
}
function openModal(e) {
    let productID = e.target.parentNode.id;
    PID = productID
    modalContainer.setAttribute('pid', productID);
    fetch(`api/products/${productID}/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        if (json) {
            createModal(json)
        }
    })
}

function createModal(product) {
    console.log(PID);
    modalContainer.textContent = ''
    console.log(product);
    const form = document.createElement('form');
    const name = document.createElement('input');
    const price = document.createElement('input');
    const stock = document.createElement('input');
    const submit = document.createElement('input')
    const description = document.createElement('input')
    const thumbnail = document.createElement('input')

    name.type = 'text'
    name.name = 'name';
    name.placeholder = 'Nombre del producto';
    name.value = product.name;

    price.type = 'number'
    price.name = 'price';
    price.placeholder = 'Precio del producto';
    price.value = product.price;

    stock.type = 'number'
    stock.name = 'stock';
    stock.placeholder = 'Stock del producto';
    stock.value = product.stock;

    description.type = 'text'
    description.name = 'description';
    description.placeholder = 'Descripción del producto';
    description.value = product.description;

    thumbnail.type = 'text'
    thumbnail.name = 'thumbnail';
    thumbnail.placeholder = 'Imagen del producto';
    thumbnail.value = product.thumbnail;

    submit.type = 'submit';

    form.append(name, price, stock, description, thumbnail, submit);
    form.onsubmit = (e) => {
        e.preventDefault();
        let obj = {
            name: name.value,
            price: price.value,
            stock: stock.value,
            description: description.value,
            thumbnail: thumbnail.value
        }
        fetch(`api/products/${PID}`, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(result => result.json()).then(json => {
            if (json.status === 'success') {
                location.reload();
            }
        })
    }

    modalContainer.append(form);
}