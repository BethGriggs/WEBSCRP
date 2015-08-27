/* Basket functionality */
/* Order Submitted */
function orderSubmitted(response) {
    clearContent();
    localStorage.clear();
    updateBasketCost();
    pageTitle.innerHTML = 'Order Submitted';
    content.innerHTML = 'Your order was sucessful. Thank you for your custom';
}

/* Gets the total cost with delivery */
function costWithDelivery() {
  orderCost = totalCost() + parseFloat(deliveryCombo.value);
  // return order cost to 2d.p.
  return orderCost.toFixed(2);
}

/* Calculates the total cost of all products in basket */
function totalCost() {
    var totalCost = 0;
    if (localStorage.BASKET) {
        var json = JSON.parse(localStorage.BASKET);

        for (var i = 0; i < json.length; i++) {
            var product = JSON.parse(json[i]);
            var lineTotal = parseFloat(product.productPrice) *
                                          parseFloat(product.quantity);
            totalCost += lineTotal;
        }
    }
    return totalCost;
}

/* Populates the delivery options */
function loadDeliveryCombo(response) {
  deliveryCombo = elementWithId('deliveryType');
  // json list of all delivery options
  var delivery = JSON.parse(response);
  for (var i = 0; i < delivery.length; i++) {
      // adds all options to combobox
      var option = createElement('option');
      var deliveryString = '+£' + delivery[i]['deliveryCost'] + "   "
                                                + delivery[i]['deliveryType'];
      option.setAttribute('id', delivery[i]['deliveryType']);
      option.setAttribute('value', delivery[i]['deliveryCost']);

      setElementText(option, deliveryString);
      deliveryCombo.appendChild(option);
  }

  costWithDelivery();
  elementWithId('withDelivery').innerHTML = costWithDelivery();

  deliveryCombo.addEventListener('change', function() {
    elementWithId('withDelivery').innerHTML = costWithDelivery();
  });

}

/* Obtains the category list */
function getDeliveryList() {
    ajaxGet('api/delivery/', loadDeliveryCombo);
}

/* Loads the checkout form */
function loadCheckout(response) {
    content.innerHTML = response;
    pageTitle.innerHTML= 'Checkout';
    getDeliveryList();

    elementWithId('submitOrder').addEventListener('click', function(e) {
        var deliveryValue = elementWithId('deliveryType').value;
        // checks if valid input
        if (this.form.checkValidity()) {
            e.preventDefault();

            var basket = JSON.parse(localStorage.BASKET);
            // checks if there is enough stock to complete order
            var enoughStock = true;
            for (var i = 0; i < basket.length; i++) {
                var product = JSON.parse(basket[i]);
                var remainingStock = product.productStock - product.quantity;
                if (remainingStock < 0) {
                    enoughStock = false;
                }
            }

            // processes order
            if (enoughStock) {
                var data = new FormData(elementWithId('checkoutForm'));
                data.append('orderProducts', localStorage.BASKET);
                data.append('orderCost', costWithDelivery());
                var delivery = elementWithId("deliveryType");
                data.append('orderDelivery',
                                delivery.options[delivery.selectedIndex].text);
                ajaxPost('api/order/', data, orderSubmitted);
            } else {
                setElementText(content, 'Sorry, there is not enough stock to' +
                ' complete your order.');
            }
        }
    });
}

/* Displays the total cost of the basket */
function updateBasketCost() {
    // checks if localStorage.BASKET is defined
    if (localStorage.BASKET) {
        var json = JSON.parse(localStorage.BASKET);
        if (json.length != 0) {
            elementWithId('basketCost').innerHTML = '£' +
                                                        totalCost().toFixed(2);
        } else {
            elementWithId('basketCost').innerHTML = '£0.00';
        }
    } else {
        elementWithId('basketCost').innerHTML = '£0.00';
    }
}

/* Returns the product object from the basket */
function productInBasket(id) {
    basketProduct = null;
    if (localStorage.BASKET) {
        var basket = JSON.parse(localStorage.BASKET);
        // checks if product id matches any product in basket
        for (var i = 0; i < basket.length; i++) {
            var product = JSON.parse(basket[i]);
            if (product.productID == id) {
                basketProduct = product;
            }
        }
    }
    return basketProduct;
}

/* Adds an item to the basket */
function addToBasket(product) {
    // defines the new product
    var newProduct = {
        productID: product.productID,
        productName: product.productName,
        productDesc: product.productDesc,
        productPrice: product.productPrice,
        productStock: product.productStock,
        quantity: elementWithId('quantity').value
    };

    // checks if localStorage is defined
    if (localStorage.BASKET) {
        var basket = JSON.parse(localStorage.BASKET);
        var productInBasket = false;
        // loop through products in basket
        for (var i = 0; i < basket.length; i++) {

            var basketProduct = JSON.parse(basket[i]);

            // if the product is already in the basket, add the new quantity
            if (basketProduct.productName === newProduct.productName) {
                var quantityInBasket = parseInt(basketProduct.quantity);
                productInBasket = true;
                basketProduct.quantity = parseInt(basketProduct.quantity) +
                    parseInt(newProduct.quantity);
                basket[i] = JSON.stringify(basketProduct);
            }
        }
        if (!productInBasket) {
            // adds the new product to the basket
            basket.push(JSON.stringify(newProduct));
        }

        localStorage.BASKET = JSON.stringify(basket);
    } else {
        // new basket
        var newBasket = [];
        newBasket.push(JSON.stringify(newProduct));
        localStorage.BASKET = JSON.stringify(newBasket);
    }
    updateBasketCost();
    // shows the product
    ajaxGet('api/product/?productID=' + product.productID, showProduct);
}

/* Removes an item from the basket by rebuilding */
function removeProduct(productName) {
    var newBasket = [];
    var basket = JSON.parse(localStorage.BASKET);
    for (var i = 0; i < basket.length; i++) {
        var product = JSON.parse(basket[i]);

        if (productName !== product.productName) {
            newBasket.push(JSON.stringify(product));
        }
    }
    localStorage.setItem('BASKET', JSON.stringify(newBasket));
}

/* Updates the quantity in the basket */
function updateQuantity(id, newQuantity) {

    var basket = JSON.parse(localStorage.BASKET);
    // loop through products in basket
    for (var i = 0; i < basket.length; i++) {

        var basketProduct = JSON.parse(basket[i]);

        // if the product is already in the basket, add the new quantity
        if (basketProduct.productID == id) {
            basketProduct.quantity = newQuantity;
            basket[i] = JSON.stringify(basketProduct);
        }
    }
    // updates the basket
    localStorage.BASKET = JSON.stringify(basket);
    ajaxGet('inc/basket.php', loadBasket);
    updateBasketCost();
}

/* Calculates the number of items in the users basket */
function quantityInBasket(productId) {
    // checks if basket is defined
    if (localStorage.BASKET) {
        var basket = JSON.parse(localStorage.BASKET);
        // returns the quantity in the basket
        for (var i = 0; i < basket.length; i++) {
            var product = JSON.parse(basket[i]);
            if (product.productID == productId) {
                return product.quantity;
            }
        }
    }
}

/* Loads the users' basket */
function loadBasket(response) {
    content.innerHTML = response;

    elementWithId('checkout').addEventListener('click', function() {
        ajaxGet('inc/checkoutForm.php', loadCheckout);
    });
    elementWithId('clear').addEventListener('click', function() {
        // clears the localStorage
        localStorage.clear();
        updateBasketCost();
        ajaxGet('inc/basket.php', loadBasket);
    });

    var basketTotal = 0;

    // checks if localStorage.BASKET is defined
    if (localStorage.BASKET) {

        var basket = JSON.parse(localStorage.BASKET);

        if (basket.length > 0) {
            // loops around all products in basket
            for (var i = 0; i < basket.length; i++) {

                // parses the product
                var product = JSON.parse(basket[i]);
                var basketTable = elementWithId('table-basket');
                var newRow = addNewRow(basketTable, 'product_' +
                                                            product.productID);
                // populates the table cells with values
                newRow.appendChild(createCell(product.productName));
                newRow.appendChild(createCell(product.productDesc));

                // creates quantity cell
                var quantityCell = createCell('');
                var quantity = createInput('quantity', 'number');
                setElementClass(quantity, 'quantity');
                numberInputAttributes(quantity, '1', product.productStock, '1');
                quantity.setAttribute('value', product.quantity);
                quantity.addEventListener('keyup', function() {
                    resetIfInvalid(quantity, product.quantity);
                });

                // creates refresh button
                var refreshQuantity = createIcon('refresh_' + product.productID,
                    'fa fa-refresh');
                refreshQuantity.addEventListener('click', function(e) {
                    var id = splitAtUnderscore(e.target.id);
                    var newQuantity = getProductCell(id, 'quantity').value;
                    updateQuantity(id, newQuantity);
                });

                quantityCell.appendChild(quantity);
                quantityCell.appendChild(refreshQuantity);
                newRow.appendChild(quantityCell);

                // popualtes product price
                newRow.appendChild(createCell('£' + product.productPrice));

                // calculates the line total
                var lineTotal = parseFloat(product.quantity) *
                                              parseFloat(product.productPrice);
                basketTotal += lineTotal;
                newRow.appendChild(createCell('£' + lineTotal.toFixed(2)));

                // creates update cell
                var updateCell = createCell('');
                var deleteButton = createIcon(product.productName,'fa fa-trash')

                deleteButton.addEventListener('click', function(e) {
                    removeProduct(e.target.id);
                    ajaxGet('inc/basket.php', loadBasket);
                    updateBasketCost();
                });
                updateCell.appendChild(deleteButton);
                newRow.appendChild(updateCell);
                basketTable.appendChild(newRow);
            }
            elementWithId('totalCost').innerHTML = basketTotal.toFixed(2);
        } else {
            content.innerHTML = 'Your basket is empty! Browse our products.';
        }
    } else {
        content.innerHTML = 'Your basket is empty! Browse our products.';
    }
}
