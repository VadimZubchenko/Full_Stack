function changeColor() {
  let header = document.getElementById("header");
  let color = "#"; //RGB: Hex Color
  let letters = "ABCDEF0123456789";
  for (let i = 0; i < 6; i++) {
    let temp = Math.floor(Math.random() * 16); // floor delete all after ,
    //each iteration color grows up by one of letters[array index]
    color = color + letters[temp];
    console.log(color);
  }
  header.style.color = color;
  console.log(color);
}

function toggleBox() {
  // get button element in html
  let domButton = document.getElementById("dombutton");
  // get div element from DOM-html
  let anchor = document.getElementById("anchor");
  if (domButton.value === "Show") {
    domButton.value = "Hide";
    // create a new div-element with size and color
    let box = document.createElement("div");
    box.style.height = "200px";
    box.style.width = "200px";
    box.style.backgroundColor = "red";
    //put the id into the "div"
    box.id = "redbox";
    // Append the "div" box node to the "p" node 'anchor':
    anchor.appendChild(box);
  } else {
    domButton.value = "Show";
    // get element from DOM, and if it exists, then remove it.
    let redbox = document.getElementById("redbox");
    if (redbox) {
      anchor.removeChild(redbox);
    }
  }
}
