var addButton = document.getElementById("addItem");
var userInput = document.getElementById("userInput");
var ul = document.querySelector("ul");
var li = document.querySelectorAll("li");

function userInputLength() {
	return userInput.value.length;
}

// Inspired by Kirupa's method using Bubbling and capturing instead of 
// creating multiple event listeners (inefficient) .

/* 1. Listen for all clicks in a parent DOM node (UL element)
   2. Make sure we are not clicking the UL element but its children instead,
   if so then store the clicked item in a variable.
   3. If element clicked it's a LI then toggle cross it.
   4. If element clicked it's the button, then remove whole LI */

function clickHandler(event) {
	if (event.target !== event.currentTarget) {
		var clickedItem = event.target;	
		if (clickedItem.nodeName === "LI") {
			crossListItem(clickedItem);
		} else if (clickedItem.className === "del-btn") {
			removeItem(clickedItem);
		}
	}
}

function removeItem (removeBtn) {
	var listItem = removeBtn.parentElement;
	listItem.remove();
}

function crossListItem(listItem) {
	listItem.classList.toggle ("done");
}

function createListItem(){
	var li = document.createElement("li");
		li.appendChild(document.createTextNode(userInput.value));
		li.appendChild(document.createElement("button")).className = "del-btn";
		ul.appendChild(li);
		userInput.value="";
}

function addListItemOnClick(){
	if (userInputLength() > 0) {
		createListItem();
	}
}

function addListItemOnKey(){
	if (userInputLength() > 0 && event.keyCode === 13) {
		createListItem();
	}
}

addButton.addEventListener("click", addListItemOnClick);
userInput.addEventListener("keypress", addListItemOnKey);
ul.addEventListener("click", clickHandler, false);
