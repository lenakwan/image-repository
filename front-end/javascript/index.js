dbItem = (itemName, itemPrice, itemDiscount, itemCategory, itemDate, image) => {
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.discountedPrice = calculateDiscount(itemPrice, itemDiscount);
    this.listDate = itemDate;
    this.itemCategory = itemCategory;
    this.image = image;
}


calculateDiscount = (price, discount) => {
    let discountedPrice = (1 - (discount / 100)) * price;
    return discountedPrice.toFixed(2);
}

getDbItems = () => {
    fetch('https://shopify-challenge-db.herokuapp.com/v1/items/', {
        method: 'GET', // likewise we have DELETE, PUT, PATCH
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).
    then(res => {
            if (res.status == 200) {
                return res.json();
            } else if (res.status == 500) {
                throw new Error('Internal Server Error');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            for (i = 0; i < data.length; i++) {
                if (i % 2 == 0) {
                    let spacing = document.createElement("div");
                    spacing.className = "w-100";
                    document.getElementById("inventory").appendChild(spacing);
                }
                let listDate = data[i].list_date.split('T')[0];
                let img = document.createElement("img");
                img.src = data[i].image;
                generateCard(listDate, data[i].item_name, data[i].price, data[i].discount, data[i].quantity, data[i].item_category, img);
            }
        }).
    catch(e => {
        console.log(e);
    });
}

generateCard = (listDate, itemName, price, discount, quantity, itemCategory, image) => {
    let column = document.createElement("div");
    column.className = "col";
    let cardObject = document.createElement("div");
    cardObject.className = "card";
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "view zoom overlay card-body";
    let img = image;
    img.className = "card-img-top";
    let cardText = document.createElement("div");
    cardText.className = "card-body text-center";
    let header = document.createElement("h5");
    header.innerHTML = itemName;
    let category = document.createElement("p");
    let listingDate = document.createElement("p");
    listingDate.innerHTML = "Listed: " + listDate;
    let storeQuantity = document.createElement("p");
    storeQuantity.innerHTML = "Quantity: " + quantity;
    let linebreak = document.createElement("h6");
    linebreak.className = "mb-3";
    category.innerHTML = itemCategory;
    category.className = "small text-muted text-uppercase mb-2";
    listingDate.className = "small text-muted text-uppercase mb-2";
    storeQuantity.className = "small text-muted text-uppercase mb-2";

    //price calculation
    let currentPrice = document.createElement("span");
    currentPrice.className = "text-success mr-1";
    currentPrice.innerHTML = "$ " + calculateDiscount(price, discount);

    let previousPrice = document.createElement("span");
    previousPrice.className = "text-danger mr-1";


    let addToCart = document.createElement("button");
    addToCart.className = "btn btn-primary btn-sm mr-1 mb-2"
    addToCart.innerHTML = "Add to Cart";
    cardText.appendChild(header);
    cardText.appendChild(category);
    cardText.appendChild(listingDate);
    cardText.appendChild(storeQuantity);
    cardText.appendChild(linebreak);
    //check to see if discount is invalid
    if (price <= calculateDiscount(price, discount)) {
        previousPrice.className = "text-gray mr-1";
        previousPrice.innerHTML = "$ " + price + "</br>";
        cardText.appendChild(previousPrice);
        let saleOverlay = document.createElement('h4');
        saleOverlay.className = "mb-2";
        let saleSpan = document.createElement('span');
        saleSpan.className = "badge badge-success";
        saleSpan.innerHTML = "NEW";
        saleOverlay.appendChild(saleSpan);
        overlayDiv.appendChild(saleOverlay);
    } else {
        previousPrice.innerHTML = "<s>$ " + price + "</s></br>";
        cardText.appendChild(currentPrice);
        cardText.appendChild(previousPrice);
        let saleOverlay = document.createElement('h4');
        saleOverlay.className = "mb-2";
        let saleSpan = document.createElement('span');
        saleSpan.className = "badge badge-danger";
        saleSpan.innerHTML = "SALE";
        saleOverlay.appendChild(saleSpan);

        overlayDiv.appendChild(saleOverlay);
    }

    cardText.appendChild(addToCart);
    cardObject.appendChild(overlayDiv);
    overlayDiv.appendChild(img);
    cardObject.appendChild(cardText);
    column.appendChild(cardObject);
    document.getElementById("inventory").appendChild(column);


}

getDbItems();

// document.getElementById("manageInventory").onclick = (event)=>{
//     alert("clicked button");
//     event.preventDefault();
// }
$(document).ready(function () {
    $("#login_submit").click(() => {
        fetch('https://shopify-challenge-db.herokuapp.com/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password:  document.getElementById('password').value
                })
            },
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Login Success");
                    return res.json();

                } else if (res.status == 401) {
                    throw new Error('Invalid Login.');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                localStorage.setItem('user_id', data.user_id);
                console.log(data);
            }).
        catch(e => {
            console.log(e);
        });
    })
})