'use strict';

/* Displays the invoice for the orders */
function viewInvoice(response) {

    var order = JSON.parse(response)[0];
    // populate invoice with values
    elementWithId('orderID').innerHTML = order.orderId;
    elementWithId('orderDate').innerHTML = order.orderDate;
    elementWithId('name').innerHTML = order.orderName;
    elementWithId('address').innerHTML = order.orderAddress;
    elementWithId('town').innerHTML = order.orderTown;
    elementWithId('postcode').innerHTML = order.orderPostcode;
    elementWithId('email').innerHTML = order.orderEmail;
    elementWithId('delivery').innerHTML = order.orderDelivery;
    elementWithId('totalCost').innerHTML = order.orderCost;

    // populates the invoice with the order products
    var orderProducts = JSON.parse(order.orderProducts);
    for (var i = 0; i < orderProducts.length; i++) {
        var product = JSON.parse(orderProducts[i]);
        var newRow = addNewRow(elementWithId('table-order'),
            'product_' + product.productId);
        // populates table of products
        newRow.appendChild(createCell(product.productName));
        newRow.appendChild(createCell(product.productDesc));
        newRow.appendChild(createCell(product.quantity));
        newRow.appendChild(createCell('£' + product.productPrice));
        var lineTotal = parseFloat(product.quantity) *
            parseFloat(product.productPrice);
        newRow.appendChild(createCell('£' + lineTotal.toFixed(2)));
    }
}

/* Populates the order table with values */
function populateOrderTable(response) {
    var orders = JSON.parse(response);

    var totalSales = 0;
    // loops around all products
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];

        var newRow = addNewRow(elementWithId('admin-table'),
            'order_' + order.orderId);
        totalSales += parseInt(order.orderCost);

        // populates the table
        newRow.appendChild(createCell(order.orderId));
        newRow.appendChild(createCell(order.orderDate));
        newRow.appendChild(createCell(order.orderDelivery));
        newRow.appendChild(createCell(order.orderName));
        newRow.appendChild(createCell(order.orderPostcode));
        newRow.appendChild(createCell(order.orderEmail));

        var invoice = createButton('View', 'invoice_' + order.orderId);
        newRow.appendChild(invoice);

        invoice.addEventListener('click', function(e) {
            var orderId = splitAtUnderscore(e.target.id);
            ajaxGet('inc/order/invoice.php', function(response) {
                content.innerHTML = response;
                ajaxGet('../api/order/?orderId=' + orderId, viewInvoice);
            });
        });
    }
    elementWithId('totalSales').innerHTML = '£' + totalSales.toFixed(2);
}

/* Retrieves all orders between two dates */
function loadOrders(response) {
    elementWithId('tableDiv').innerHTML = response;
    var startDate = elementWithId('startDate').value;
    var endDate = elementWithId('endDate').value;
    ajaxGet('../api/admin/orders/?startDate=' + startDate + '&endDate='
                                                + endDate, populateOrderTable);
}

/* Obtains the order table */
function getOrderTable() {
    ajaxGet('inc/order/orderTable.php', loadOrders);
}

/* Executes setup for order page */
function setupOrderTable(response) {
    content.innerHTML = response;
    getOrderTable();
    elementWithId('reloadOrders').addEventListener('click', function(e) {
        e.preventDefault();
        getOrderTable();
    });
}

/* Setup order page */
function getOrders() {
    ajaxGet('inc/order/orderSearch.php', setupOrderTable);
}

/* Populates the stock table */
function populateStockTable(response) {
    var totalSales = 0;
    var products = JSON.parse(response);

    // sorts the products by product stock
    products.sort(sort_by('productStock', true, parseInt));

    // loops around all products
    for (var i = 0; i < products.length; i++) {
        var newRow = addNewRow(elementWithId('admin-table'),
            'product_' + products[i]['productID']);
        // populates the table
        newRow.appendChild(createCell(products[i]['productID']));
        newRow.appendChild(createCell(products[i]['productName']));
        newRow.appendChild(createCell(products[i]['productSales']));

        // creates and populates the product information cells
        var stockCell = createCell(products[i]['productStock']);
        setElementClass(stockCell, 'stock');
        newRow.appendChild(stockCell);

        var update = document.createElement('td');

        var stockInput = createInput('addStock', 'number');
        setElementClass(stockInput, 'addStock');
        numberInputAttributes(stockInput, '0', '', '1');
        update.appendChild(stockInput);

        var addBtn = createButton('Add', 'add_' + products[i]['productID']);
        update.appendChild(addBtn);
        newRow.appendChild(update);

        addBtn.addEventListener('click', function(e) {
            resetIfInvalid(stockInput, '0');
            // calculates the new stock value
            var productId = splitAtUnderscore(e.target.id);
            var currentStock = getProductCell(productId, 'stock').innerHTML;
            var stockToAdd = getProductCell(productId, 'addStock').value;
            var newStock = parseInt(stockToAdd) + parseInt(currentStock);

            // query to update the stock
            var query = '?';
            query += 'productID=' + productId;
            query += '&productStock=' + newStock;
            ajaxPut('../api/admin/stock/' + query, getStock);
        });
    }
}

/* AJAX call to get all products. */
function getProducts(callback) {
    ajaxGet('../api/products/', callback);
}

/* Populates stock table */
function loadStock(response) {
    content.innerHTML = response;
    getProducts(populateStockTable);
}

/* Setup stock table */
function getStock() {
    ajaxGet('inc/stock/stockTable.php', loadStock);
}

/* Load stock and setup event listeners */
window.onload = function() {
    ajaxGet('inc/stock/stockTable.php', loadStock);
    // navigation event listeners
    elementWithId('stock').addEventListener('click', getStock);
    elementWithId('orders').addEventListener('click', getOrders);
};
