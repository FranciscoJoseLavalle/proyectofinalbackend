const form = document.querySelector('#addProductForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key) => obj[key]=value);
    fetch('api/products/',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(result => result.json()).then(json => console.log(json))
})