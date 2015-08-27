/* Refreshes the style form page with the new values */
function styleUpdated(response) {
    // reload the style form
    ajaxGet('inc/style/styleForm.php', loadStyleForm);
}

/* Populates the style form with current style data */
function populateStyleForm(response) {
    var currentCSS = JSON.parse(response);
    var keys = Object.keys(currentCSS);
    for (var i = 0; i < keys.length; i++) {
        setElementPlaceholder(elementWithId(keys[i]), currentCSS[keys[i]]);
    }
    // refreshes JS color
    jscolor.init();
}

/* Loads the product style form */
function loadStyleForm(response) {
    content.innerHTML = response;
    // gets current style
    ajaxGet('../css/style.php', populateStyleForm);
    elementWithId('submitStyle').addEventListener('click', function(e) {
        e.preventDefault();
        var data = new FormData(elementWithId('styleForm'));
        ajaxPost('../api/cms/style/', data, styleUpdated);
    });
    // sets to default style
    elementWithId('defaultStyle').addEventListener('click', function(e) {
        e.preventDefault();
        ajaxDelete('../api/cms/style/', styleUpdated);
    });
}

/* Sets the combo box to the current category */
function setSelected(selected) {
    var options = document.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == selected) {
            options[i].setAttribute('selected', 'selected');
        }
    }
}

/* Displays the form to add a new delivery method */
function newDeliveryForm(response) {
  content.innerHTML = response;
  elementWithId('submit').addEventListener('click', function(e) {
      // checks form inputs are valid
      if (this.form.checkValidity()) {
          e.preventDefault();
          var data = new FormData(elementWithId('addDeliveryForm'));
          ajaxPost('../api/cms/delivery/', data, loadDelivery);
      }
  });
}

/* Populates the delivery methods */
function populateDelivery(response) {
  var deliveryMethods = JSON.parse(response);
  // loops over the delivery methods
  for (var i = 0; i < deliveryMethods.length; i++) {
      var newRow =  addNewRow(elementWithId('delivery-table'), 'delivery_' + i);

      // populates the table cells with values
      newRow.appendChild(createCell(deliveryMethods[i]['deliveryId']));
      newRow.appendChild(createCell(deliveryMethods[i]['deliveryType']));
      newRow.appendChild(createCell(deliveryMethods[i]['deliveryCost']));

      var deleteButton = createButton('Delete',
                                          deliveryMethods[i]['deliveryId']);
      newRow.appendChild(deleteButton);

      deleteButton.addEventListener('click', function(e) {
          // deletes the current category
          ajaxDelete('../api/cms/delivery/?deliveryId=' +
              e.target.id, loadDelivery);
      });
  }
}

/* Loads the delivery table */
function loadDeliveryTable(response) {
  content.innerHTML = response;
  elementWithId('newDelivery').addEventListener('click', function() {
      ajaxGet('inc/delivery/deliveryForm.php', newDeliveryForm);
  });
}

/* Loads delivery */
function loadDelivery() {
  clearContent();
  ajaxGet('inc/delivery/deliveryTable.php', loadDeliveryTable);
  ajaxGet('../api/delivery/', populateDelivery);
}

/* Loads the combobox containing the categories */
function loadCategoryCombo(response) {
    var categoryCombo = elementWithId('categoryName');
    var categories = JSON.parse(response);
    for (var i = 0; i < categories.length; i++) {
        addComboOption(categoryCombo, categories[i]['categoryName'],
                                                categories[i]['categoryName']);
    }
}

/* Obtains the category list */
function getCategoryList(current) {
    ajaxGet('../api/categories/', loadCategoryCombo);
    // sets the selected of the combobox to the current value
    ajaxGet('../api/categories/', function() {
      setSelected(current);
    });
}

/* Displays the  add category form */
function addCategoryForm(response) {
    content.innerHTML = response;
    elementWithId('addCategory').addEventListener('click', function(e) {
        if(this.form.checkValidity()){
          e.preventDefault();
          var data = new FormData();
          data.append('categoryName', elementWithId('name').value);
          ajaxPost('../api/cms/category/', data, loadCategories);
      }
    });
}

/* Populates the category table */
function populateCategories(response) {
    var categories = JSON.parse(response);

    // loops over the categories
    for (var i = 0; i < categories.length; i++) {
        var newRow = createElement('tr');
        elementWithId('category-table').appendChild(newRow);

        // populates the table cells with values
        newRow.appendChild(createCell(categories[i]['categoryId']));
        newRow.appendChild(createCell(categories[i]['categoryName']));
        var deleteButton = createButton('Delete', categories[i]['categoryId']);
        newRow.appendChild(deleteButton);

        deleteButton.addEventListener('click', function(e) {
            // deletes the current category
            ajaxDelete('../api/cms/category/?categoryId=' +
                e.target.id, loadCategories);
        });
    }
}

/* Obtains and populates the categories */
function getCategories(response) {
    content.innerHTML = response;
    ajaxGet('../api/categories/', populateCategories);
    elementWithId('newCategory').addEventListener('click', function() {
        ajaxGet('inc/category/categoryForm.php', addCategoryForm);
    });
}

/* Loads the categories */
function loadCategories() {
    content.innerHTML = '';
    ajaxGet('inc/category/categoryTable.php', getCategories);
}

/* Create name input */
function createNameInput(currentName) {
    nameInput = createInput('productName', 'text');
    setElementPlaceholder(nameInput, currentName);
    return nameInput;
}

/* Create description input */
function createDescriptionInput(currentDesc) {
    descInput = createElement('textarea');
    setElementId(descInput, 'productDesc');
    descInput.required = true;
    descInput.innerHTML = currentDesc;
    return descInput;
}

/* Create price input */
function createPriceInput(currentPrice) {
    priceInput = createInput('productPrice', 'text')
    setElementPlaceholder(priceInput, currentPrice);
    priceInput.required = true;
    setElementPattern(priceInput, '^\\d*(\\.\\d{2}$)?');
    return priceInput;
}

/* Create stock input */
function createStockInput(currentStock) {
    stockInput = createInput('productStock', 'number');
    numberInputAttributes(stockInput, '0', '', '1');
    setElementPlaceholder(stockInput, currentStock);
    return stockInput;
}

/* Shows update fields for the particular row */
function addUpdateFields(id) {
    var name = getProductCell(id, 'name');
    currentName = name.innerHTML;
    clearHTML(name);
    name.appendChild(createNameInput(currentName));

    var desc = getProductCell(id, 'description');
    currentDesc = desc.innerHTML;
    clearHTML(desc);
    desc.appendChild(createDescriptionInput(currentDesc));

    var price = getProductCell(id, 'price');
    currentPrice = price.innerHTML;
    clearHTML(price);
    price.appendChild(createPriceInput(currentPrice));

    var stock = getProductCell(id, 'stock');
    currentStock = stock.innerHTML;
    clearHTML(stock);
    stock.appendChild(createStockInput(currentStock));

    var category = getProductCell(id, 'category');
    currentCategory = category.innerHTML;
    categoryInput = createCombo('categoryName');
    addComboOption(categoryInput, 'None', 'None');

    category.appendChild(categoryInput);
    getCategoryList(currentCategory);

    var updateCell = getProductCell(id, 'update');
    clearHTML(updateCell);
    var update = createButton('Update', 'updateProduct');
    updateCell.appendChild(update);

    update.addEventListener('click', function() {
        // resets to orginal value if invalid data
        resetIfInvalid(nameInput, currentName);
        resetIfInvalid(descInput, currentDesc);
        resetIfInvalid(priceInput, currentPrice);
        resetIfInvalid(stockInput, currentStock);

        var query = '?';
        query += 'productName=' + elementWithId('productName').value;
        query += '&productDesc=' + elementWithId('productDesc').value;
        query += '&productPrice=' + elementWithId('productPrice').value;
        query += '&productStock=' + elementWithId('productStock').value;
        query += '&categoryName=' + elementWithId('categoryName').value;
        query += '&productID=' + id;
        ajaxPut('../api/cms/product/' + query, loadProducts);
    });

    var cancel = createButton('Cancel', 'cancelUpdate');
    updateCell.appendChild(cancel);
    cancel.addEventListener('click', function() {
        loadProducts();
    });
}

/* Populates the products into the product table */
function populateProducts(response) {
    var products = JSON.parse(response);

    setElementText(elementWithId('numberOfProducts'), products.length);
    // loops around all products
    for (var i = 0; i < products.length; i++) {
        // adds a new row
        var newRow = addNewRow(elementWithId('cms-table'),
            'product_' + products[i]['productID']);
        // populates the table
        newRow.appendChild(createCell(products[i]['productID']));
        var name = createCell(products[i]['productName']);
        setElementClass(name, 'name');
        newRow.appendChild(name);

        var description = createCell(products[i]['productDesc']);
        setElementClass(description, 'description');
        newRow.appendChild(description);

        var price = createCell(products[i]['productPrice']);
        setElementClass(price, 'price');
        newRow.appendChild(price);

        var stock = createCell(products[i]['productStock']);
        setElementClass(stock, 'stock');
        newRow.appendChild(stock);

        var imageCell = createElement('td');
        var imageName = products[i]['productImage'];
        if (imageName != null) {
            var imageElement = createElement('img');
            setElementClass(imageElement, 'thumnail');
            imageElement.setAttribute('src', 'images/' + imageName);
            imageCell.appendChild(imageElement);
        }
        newRow.appendChild(imageCell);

        var category = createCell(products[i]['categoryName']);
        setElementClass(category, 'category');
        newRow.appendChild(category);

        var update = createElement('td');
        setElementClass(update, 'update');

        var editButton = createButton('Edit', 'edit_' + products[i].productID);
        update.appendChild(editButton);

        var deleteButton = createButton('Delete', products[i].productID);
        update.appendChild(deleteButton);

        newRow.appendChild(update);

        editButton.addEventListener('click', function(e) {
            addUpdateFields(splitAtUnderscore(e.target.id));
        });
        deleteButton.addEventListener('click', function(e) {
            ajaxDelete('../api/cms/product/?productID=' + e.target.id,
                function() {
                    loadProducts();
                });
        });
    }
}

/* Displays the new product form */
function newProductForm(response) {
    content.innerHTML = response;
    getCategoryList();
    elementWithId('submit').addEventListener('click', function(e) {
        if (this.form.checkValidity()) {
            e.preventDefault();
            var data = new FormData(elementWithId('addProductForm'));
            ajaxPost('../api/cms/product/', data, loadProducts);
        }
    });
}

/* Loads the product table */
function loadProductTable(response) {
    content.innerHTML = response;
    elementWithId('newProduct').addEventListener('click', function() {
        ajaxGet('inc/product/productForm.php', newProductForm);
    });
}

/* Loads the store products */
function loadProducts() {
    content.innerHTML = '';
    ajaxGet('inc/product/productTable.php', loadProductTable);
    ajaxGet('../api/products/', populateProducts);
}

/* Displays all products on window load */
window.onload = function() {
    // load products by default
    loadProducts();

    // navigation event listeners
    elementWithId('products').addEventListener('click', function() {
        loadProducts();
    });

    elementWithId('categories').addEventListener('click', function() {
        loadCategories();
    });

    elementWithId('delivery').addEventListener('click', function() {
        loadDelivery();
    });

    elementWithId('style').addEventListener('click', function(e) {
        e.preventDefault();
        ajaxGet('inc/style/styleForm.php', loadStyleForm);
    });
};
