/**
 * 
 */
function showDocument() {
	return showElement(document.documentElement, '');
}
function showElement(elem, indent) {
	// elem = document.documentElement;
	var result = indent + elem.nodeName + '\n';
	var children = elem.childNodes;
	for (var i = 0, len = children.length; i < len; i++) {
		if (children[i].nodeType == elem.ELEMENT_NODE) {
			result += showElement(children[i], indent + "  ");
		}
	}
	return result;
}
function init() {
	alert(document.readyState + "-" + showDocument());

}
var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		init();
		clearInterval(readyStateCheckInterval);
	}
}, 10);

