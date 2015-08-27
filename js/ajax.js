/* Sets up an Async GET XMLHttpRequest with a callback fuction */
function ajaxGet(URL, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200)
            if (xhr.readyState == 4)
                callback(xhr.responseText);
    };
    xhr.send();
};

/* Sets up an Async POST XMLHttpRequest with a callback fuction */
function ajaxPost(URL, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200)
            if (xhr.readyState == 4)
                callback(xhr.responseText);
    };
    xhr.send(data);
};

/* Sets up an Async PUT XMLHttpRequest with a callback fuction */
function ajaxPut(URL, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', URL, true);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200)
            if (xhr.readyState == 4)
                callback(xhr.responseText);
    };
    xhr.send()
};

/* Sets up an Async Delete XMLHttpRequest with a callback fuction */
function ajaxDelete(URL, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', URL, true);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200)
            if (xhr.readyState == 4)
                callback(xhr.responseText);
    };
    xhr.send();
};
