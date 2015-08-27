/* Functionality */
/* Search functionality */
function enableSearch() {
    search.addEventListener('keyup', function() {
        if (search.value != '') {
            pageTitle.innerHTML = 'Searching...' + search.value;
            ajaxGet('api/search/?key=' + this.value, addProducts);
        } else {
            pageTitle.innerHTML = 'All Products';
            ajaxGet('api/products/', addProducts);
        }
    }, true);
}

/* Displays an individual product */
function showProduct(response) {
    clearHTML(pageTitle);
    search.value = '';
    // there should be only one result
    var product = JSON.parse(response)[0];

    ajaxGet('inc/product.php', function(response) {
        content.innerHTML = response;
        // popluates text fields
        setElementText(elementWithId('productName'), product.productName);
        setElementText(elementWithId('productDesc'), product.productDesc);
        setElementText(elementWithId('productPrice'), '£' + product.productPrice);

        // populates image
        elementWithId('productImage').setAttribute('src', 'cms/images/' +
            product.productImage);

        // calculates the remaining stock
        if (quantityInBasket(product.productID)) {
            var remainingStock = product.productStock -
                quantityInBasket(product.productID);
        } else {
            var remainingStock = product.productStock;
        }

        // checks if out of stock
        if (remainingStock != 0) {
            setElementText(elementWithId('productStock'), remainingStock);
        } else {
            setElementText(elementWithId('productStock'),
                'Sorry this product is out of stock!');
            // hide the add to basket options
            elementWithId('quantity').style.display = 'none';
            elementWithId('addToBasket').style.display = 'none';
        }

        elementWithId('quantity').setAttribute('max', remainingStock);

        elementWithId('addToBasket').addEventListener('click', function() {
            addToBasket(product);
        });
    });
}

/* Creates an individual product */
function createListProduct(productObj) {
    var product = createElement('li');
    setElementId(product, 'product_' + productObj.productID);
    setElementClass(product, 'product');

    // populates the product name
    var productName = createElement('h1');
    setElementText(productName, productObj.productName);

    // add div to ensure sizing is correct
    var sizingDiv = createElement('div');
    setElementClass(sizingDiv, 'imgSize');
    var imageElement = createElement('img');

    if (productObj.productImage != null) {
        // populates the product image
        imageElement.setAttribute('src', 'cms/images/' + productObj.productImage);
    } else {
        // populates a default image
        imageElement.setAttribute('src', 'cms/images/noImage.jpg');
    }

    var productPrice = createElement('p');
    setElementText(productPrice, '£' + productObj.productPrice);
    sizingDiv.appendChild(imageElement);
    product.appendChild(sizingDiv);
    product.appendChild(productName);
    product.appendChild(productPrice);

    // shows product when clicked
    product.addEventListener('click', function() {
      ajaxGet('api/product/?productID=' + productObj.productID, showProduct);
    });

    return product;
}

/* Creates and displays all products */
function addProducts(response) {
    clearContent();

    if (response !== null) {

        var products = JSON.parse(response);
        if (products.length != 0) {
            // create product list
            var productList = createElement('ul');
            setElementId(productList, 'product-list');
            content.appendChild(productList);
            // loops over products
            for (var i = 0; i < products.length; i++) {
                productList.appendChild(createListProduct(products[i]));
            }
        } else {
            content.innerHTML = 'Sorry, there are no products to display!';
        }
    }
}

/* Creates a category button */
function createCategoryButton(categoryName) {

    var categoryButton = createButton(categoryName, categoryName);
    setElementClass(categoryButton, 'navBtn');
    elementWithId('categories').appendChild(categoryButton);

    categoryButton.addEventListener('click', function(e) {
        pageTitle.innerHTML = e.target.id;
        ajaxGet('api/products/?categoryName=' + e.target.id, addProducts);
    });
}

/* Populates the category menu */
function addCategories(response) {
    clearHTML(elementWithId('categories'));
    var categories = JSON.parse(response);
    // sorts categories alphabetically
    categories.sort(sort_by('categoryName', true));
    for (var i = 0; i < categories.length; i++) {
        createCategoryButton(categories[i].categoryName);
    }
}

/* Loads / setup the store */
function loadStore() {
    clearContent();
    getStyle();
    ajaxGet('api/categories/', addCategories);
    ajaxGet('api/products/', addProducts);
    updateBasketCost();
    enableSearch();
}

/* Event Listeners */

/* loads all products on click */
elementWithId('products').addEventListener('click', function() {
    pageTitle.innerHTML = 'All Products';
    loadStore();
});

/* displays the customers basket on click */
elementWithId('basket').addEventListener('click', function() {
    pageTitle.innerHTML = 'Basket';
    ajaxGet('inc/basket.php', loadBasket);
});

/* Loads the store */
window.addEventListener('load', loadStore);
