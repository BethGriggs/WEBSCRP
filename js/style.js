/* Taken from http://stackoverflow.com/questions/524696/
  Allows the creation / handling of a stylesheet in JS */
if (typeof document.createStyleSheet === 'undefined') {
    document.createStyleSheet = (function() {
        function createStyleSheet(href) {
            if (typeof href !== 'undefined') {
                var element = document.createElement('link');
                element.type = 'text/css';
                element.rel = 'stylesheet';
                element.href = href;
            } else {
                var element = document.createElement('style');
                element.type = 'text/css';
            }

            document.getElementsByTagName('head')[0].appendChild(element);
            var sheet = document.styleSheets[document.styleSheets.length - 1];

            if (typeof sheet.addRule === 'undefined')
                sheet.addRule = addRule;

            if (typeof sheet.removeRule === 'undefined')
                sheet.removeRule = sheet.deleteRule;

            return sheet;
        }

        function addRule(selectorText, cssText, index) {
            if (typeof index === 'undefined')
                index = this.cssRules.length;

            this.insertRule(selectorText + ' {' + cssText + '}', index);
        }

        return createStyleSheet;
    })();
}

/* Updates the style of the online store */
function updateStyle(response) {

    if (response != '{}') {
        var json = JSON.parse(response);
        // creates a new stylesheet
        var sheet = document.createStyleSheet();

        // adds new rules to the style sheet based on the JSON response
        sheet.addRule('header', 'background:#' + json.headerColor + ';');
        sheet.addRule('nav', 'background:#' + json.navColor + ';');
        sheet.addRule('.product', 'background:#' + json.listProduct + ';');
        sheet.addRule('#productName', 'color:#' + json.nameColor + ';');
        sheet.addRule('.tg .tg-yvat', 'background:#' + json.tableColor + ';');
    }
}


/* Gets the JSON style information */
function getStyle() {
    ajaxGet('css/style.php', updateStyle);
}
