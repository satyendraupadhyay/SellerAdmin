var form = document.getElementById('my-form');

form.addEventListener('submit', getValue);

function getValue(e) {
    e.preventDefault();

    var getPrice = document.getElementById('price').value;
    var getName = document.getElementById('name').value;
    var getCategory = document.getElementById('category').value;

    var productDetails = {
        price: getPrice,
        name: getName,
        category: getCategory
    }
    axios.post('https://crudcrud.com/api/7ac3d476e74c4ef8aa06c81a45265bb4/seller', productDetails)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    showUser(productDetails);
}

function showUser(productDetails) {
    let parent = null;
    var itemID = productDetails._id;

    if (productDetails.category === "Electronic") {
        parent = document.getElementById('electronic');
    } else if (productDetails.category === "Skincare") {
        parent = document.getElementById('skincare');
    } else if (productDetails.category === "Food") {
        parent = document.getElementById('food');
    }

    if (parent !== null) {
        let child = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = "Delete";
        
        btn.addEventListener('click', function() {
            axios.delete(`https://crudcrud.com/api/7ac3d476e74c4ef8aa06c81a45265bb4/seller/${itemID}`)
            parent.removeChild(child);
        });

        child.textContent = `Price: ${productDetails.price} - Name: ${productDetails.name} - Category: ${productDetails.category} `;
        child.appendChild(btn);
        parent.appendChild(child);
    }
}

// GET the saved User Details from crudcrud.
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/7ac3d476e74c4ef8aa06c81a45265bb4/seller")
        .then(res => {
            for (var i = 0; i < res.data.length; i++) {
                showUser(res.data[i])
            }
            console.log(res);
        })
        .catch(err => console.error(err));
})
