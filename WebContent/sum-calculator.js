function generate0(sum, len)
{
//	alert("sum:" + sum + " len:" + len + " filter:" + filter);
	var r = new Array();
	for (var i=1 ; i<=0x1ff ; i++) {
		var b = i.toString(2);
		var l = lenf(b);
		if (l != len) continue;
		var s = sumf(b);
		if (s != sum) continue;
		var digits = digitize(b);
		r[r.length] = digits;  
	}
	r.sort();
	return r;
}
function generate1(sum, len, filter) {
	var r = new Array();
	var filtertab = filter.split(" ");
	for (var i=1 ; i<=0x1ff ; i++) {
		var b = i.toString(2);
		var l = lenf(b);
		if (l != len) continue;
		var s = sumf(b);
		if (s != sum) continue;
		var digits = digitize(b);
		if (!valid(digits, filtertab)) continue;
		r[r.length] = digits;  
	}
	r.sort();
	return r;
}
function generate(sum, len, filter, res)
{
	r = generate1(sum, len, filter);
	res.innerHTML = toString(r);
}
function adjust(tab, filtertab) {
	for (var i=0 ; i<tab.length ; i++) {
		if (valid(tab[i], filtertab)) {
			tab[i] = "<b>" + tab[i] + "</b>";
		}
	}
}
function valid(digits, filtertab) {
	for (var i=0 ; i<filtertab.length ; i++) {
		if (!valid1(digits, filtertab[i])) return false;
	}
	return true;
}
function valid1(digits, con) {
	var tab = con.split(/[<>=]/);
	var c = count(tab[0], digits);
	if (tab.length == 1) {
		return tab[0].length == c;
	}
	var c2 = new Number(tab[1]);
	if (con.indexOf('=') > 0) {
		return c == c2;
	}
	if (con.indexOf('>') > 0) {
		return c > c2;
	}
	if (con.indexOf('<') > 0) {
		return c < c2;
	}
	alert("invalid filtertraint: " + con);
	return false;
}
function count(digits, number) {
	var sum = 0;
	for (var i=0 ; i<digits.length ; i++) {
		if (number.indexOf(digits[i]) >= 0) sum++;
	}
	return sum;
}
function lenf(b) {
	var l = 0;
	for (var i=0 ; i<b.length ; i++) {
		if (b[i] == '1') l++;
	}
	return l;
}
function sumf(b) {
	var s = 0;
	for (var i=0 ; i<b.length ; i++) {
		if (b[i] == '1') s += (b.length-i);
	}
	return s;
}
function digitize(b) {
	var result = "";
	for (var i=0 ; i<b.length ; i++) {
		if (b[b.length-i-1] == '1') result += (i+1);
	}
	return result;
}
function toString(r) {
	var s = "";
	var pre = "";
	for (var i=0 ; i<r.length ; i++) {
		s += pre + r[i];
		pre = " ";
	}
	return s;
}
function supportsTemplate() {
  return 'content' in document.createElement('template');
}
function openWindow(window_src) {
    window.open(window_src,	'', 
    	config='height=205,width=520, toolbar=no, menubar=no, address=no, scrollbars=no, resizable=no,location=0, directories=no, status=no');
}
function update(node1) {
	var node = node1.parentNode.parentNode;
	var sumNode = node.querySelector('td.sum');
	var lenNode = node.querySelector('td.len');
	var filterNode = node.querySelector('input.filter');
	var resNode = node.querySelector('td.result');
	var sum = new Number(sumNode.textContent);
	var len = new Number(lenNode.textContent);
	var filter = filterNode.value;
//	alert("sum:" + sum + " len:" + len + " filter:" + filter);
	generate(sum,len,filter, resNode);
}
function newRow() {
	var result = null;
	if (supportsTemplate()) {
		var content = document.querySelector('template').content;
		result = content.cloneNode(true);
		result = result.querySelector('tr.row');
	} else {
		var s = "<tr class='row' draggable='true'><td class='sum' align='center'/><td class='len' align='center'/>" +
				"<td><input type='text' class='filter' style='width:100px' onchange='update(this)'></td>" +
				"<td class='result' style='width:260px;background-color:#F7D700'></td>" +
				"<td><div onclick='del(this)'><img src='images/action_stop.gif' width='70%'/></div></td></tr>";
		var tr = document.createElement("tr");
		tr.innerHTML = s;
		result = tr; 
	}
	return result;
}
function add() {
	var sum = document.querySelector('#sum').value;
	var len = document.querySelector('#len').value;
	t = generate0(sum, len);
	if (t.length == 0)
		alert("Illegal values:" + sum + ", " + len + " - No possible sums");
	else {
		var row = newRow();
		addListeners(row);
		var sumNode = row.querySelector('td.sum');
		var lenNode = row.querySelector('td.len');
		var resNode = row.querySelector('td.result');
		sumNode.textContent = sum;
		lenNode.textContent = len;
		resNode.textContent = toString(t);
//		alert(sumNode);
		document.querySelector('#sums').appendChild(row);
	}
}
function del(node) {
//	alert(node);
	var row = node.parentNode.parentNode;
	var t = row.parentNode;
	t.removeChild(row);
}
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
function toggleHelp() {
	var ele = document.getElementById("help");
	if (ele.style.display == "none") {
		ele.style.display = "block";
	}
	else {
		ele.style.display = "none";
	}
}

//window.alert = function(title, message){
//    var myElementToShow = document.getElementById("someElementId");
//    myElementToShow.innerHTML = title + "</br>" + message; 
//}
function init() {
	if (!supportsTemplate()) {
		var t = document.querySelector('template');
		t.parentNode.removeChild(t);
	}
//	alert(document.readyState + "-" + showDocument());
}
var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		init();
		clearInterval(readyStateCheckInterval);
	}
}, 10);
