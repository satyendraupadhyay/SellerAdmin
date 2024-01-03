var form = document.getElementById('my-form');

form.addEventListener('submit', getValue);

async function getValue(e) {
    e.preventDefault();

    var getPrice = document.getElementById('price').value;
    var getName = document.getElementById('name').value;
    var getCategory = document.getElementById('category').value;

    var productDetails = {
        price: getPrice,
        name: getName,
        category: getCategory
    };

    try {
        const res = await axios.post('https://crudcrud.com/api/8c8091e76039414086053ce63662cdce/seller', productDetails);
        showUser(res.data);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

function showUser(productDetails) {
    let parent = null;
    var itemID = productDetails._id;
    console.log(itemID);

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
        
        btn.addEventListener('click', async function() {
            try {
                await axios.delete(`https://crudcrud.com/api/8c8091e76039414086053ce63662cdce/seller/${itemID}`);
                parent.removeChild(child);
            } catch (err) {
                console.log(err);
            }
        });

        child.textContent = `Price: ${productDetails.price} - Name: ${productDetails.name} - Category: ${productDetails.category} `;
        child.appendChild(btn);
        parent.appendChild(child);
    }
}

// GET the saved User Details from crudcrud.
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get("https://crudcrud.com/api/8c8091e76039414086053ce63662cdce/seller");
        for (var i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
        console.log(res);
    } catch (err) {
        console.error(err);
    }
});