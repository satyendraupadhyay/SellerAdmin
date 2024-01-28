var form = document.getElementById('my-form');

form.addEventListener('submit', function getValue(event){
    event.preventDefault();

    var price = event.target.price.value;
    var name = event.target.name.value;
    var category = event.target.category.value;

    const obj = {
        price,
        name,
        category
    }

    axios.post("http://localhost:3000/expense/add-expense", obj)
    .then((response) => {
        console.log(response);
        showUser(response.data.newExpenseDetail);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    })

});

function showUser(productDetails) {
    let parent = null;
    var itemID = productDetails.id;
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
                await axios.delete(`http://localhost:3000/expense/delete-expense/${itemID}`);
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
        const res = await axios.get("http://localhost:3000/expense/get-expense");
        for (var i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
        console.log(res);
    } catch (err) {
        console.error(err);
    }
});