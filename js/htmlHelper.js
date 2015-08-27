/* Common variables */
var pageTitle = document.getElementById('pageTitle');
var content = document.getElementById('content');
var search = document.getElementById('search');

/* HTML helper functions */

/* Creates a new element */
function createElement(element) {
    return document.createElement(element);
}

/* Sets the id of the specified element */
function setElementId(element, value) {
    element.setAttribute('id', value);
}

/* Sets the class of the specified element */
function setElementClass(element, value) {
    element.setAttribute('class', value);
}

/* Sets the pattern of the specified element, used for validation */
function setElementPattern(element, pattern) {
    element.setAttribute('pattern', pattern);
}

/* Sets the value of the specified element */
function setElementPlaceholder(element, value) {
    element.setAttribute('value', value);
}

/* Sets the text of the specified element */
function setElementText(element, text) {
    element.appendChild(document.createTextNode(text));
}

/* Returns the element with the specified id */
function elementWithId(id) {
    return document.getElementById(id);
}

/* Creates a new cell in  a table */
function createCell(value) {
    var cell = createElement('td');
    setElementText(cell, value);
    return cell;
}

/* Adds a new row to the specified table */
function addNewRow(table, id) {
    var newRow = createElement('tr');
    setElementId(newRow, id);
    table.appendChild(newRow);
    return newRow;
}

/* Creates a button with specified text and id */
function createButton(text, id) {
    var button = createElement('button');
    setElementText(button, text);
    setElementId(button, id);
    return button;
}

/* creates an icon with the specified class */
function createIcon(id, iconClass) {
    var icon = createElement('i');
    setElementId(icon, id);
    setElementClass(icon, iconClass);
    return icon;
}

/* Creates an input element with specified type. Sets required by default */
function createInput(id, type) {
    var input = createElement('input');
    setElementId(input, id);
    input.setAttribute('type', type);
    input.required = true;
    return input;
}

/* Sets the input attributes for the number type */
function numberInputAttributes(input, min, max, step) {
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    input.setAttribute('step', step);
}

/* Creates a comboBox */
function createCombo(id) {
    var combo = createElement('select');
    setElementId(combo, id);
    return combo;
}

/* Adds an option with an id to the specified combobox */
function addComboOption(combo, id, value) {
    var option = createElement('option');
    setElementId(option, id);
    setElementText(option, value);
    combo.appendChild(option);
    return option;
}

/* Resets the input to the orginal value if invalid */
function resetIfInvalid(input, value) {
    if (!input.checkValidity()) {
        input.value = value;
    }
}

/* Sets an elements content to null */
function clearHTML(element) {
    element.innerHTML = '';
}

/* Clears the content div */
function clearContent() {
    clearHTML(content);
}

/* Returns all characters in a string after an underscore */
function splitAtUnderscore(string) {
    return string.split('_')[1];
}

/* Obtains the product cell */
function getProductCell(id, name) {
    return document.querySelector('#product_' + id + ' .' + name);
}

/* Function to sort a JSON array by a property,
          taken from http://jsfiddle.net/dFNva/1/  */
var sort_by = function(field, reverse, primer) {
    var key = function(x) {
        return primer ? primer(x[field]) : x[field]
    };

    return function(a, b) {
        var A = key(a),
            B = key(b);
        return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
    }
}
