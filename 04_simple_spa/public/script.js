// luodaan lomakke
window.onload = function () {
  createForm();
  //getContactList();
};
// '0' means a false in JS
var mode = 0;

// nuolifunktio
createForm = () => {
  let anchor = document.getElementById("anchor");
  let form = document.createElement("form");
  form.setAttribute("id", "form"); //<form id="form">

  //first name input <input type= name= id= ><input/>
  let firstnameinput = document.createElement("input");
  firstnameinput.setAttribute("type", "text");
  firstnameinput.setAttribute("name", "firstnameinput");
  firstnameinput.setAttribute("id", "firstnameinput");
  //<label type name id><label/>
  let firstnamelabel = document.createElement("label");
  firstnamelabel.setAttribute("id", "firstnamelabel");
  firstnamelabel.setAttribute("for", "firstnameinput");
  //next writes a name of 'label' element, so the name will be input's vieress
  let firstnametext = document.createTextNode("First name");
  firstnamelabel.appendChild(firstnametext);

  //last name input <input type name id><input/>
  let lastnameinput = document.createElement("input");
  lastnameinput.setAttribute("type", "text");
  lastnameinput.setAttribute("name", "lastnameinput");
  lastnameinput.setAttribute("id", "lastnameinput");
  //<label type name id><label/>
  let lastnamelabel = document.createElement("label");
  lastnamelabel.setAttribute("id", "lastnamelabel");
  lastnamelabel.setAttribute("for", "lastnameinput");
  let lastnametext = document.createTextNode("Last name");
  lastnamelabel.appendChild(lastnametext);

  // email input
  let emailinput = document.createElement("input");
  emailinput.setAttribute("type", "email");
  emailinput.setAttribute("name", "emailinput");
  emailinput.setAttribute("id", "emailinput");
  //<label type name id><label/>
  let emaillabel = document.createElement("label");
  emaillabel.setAttribute("id", "emaillabel");
  emaillabel.setAttribute("for", "emailinput");
  let emailtext = document.createTextNode("Email");
  emaillabel.appendChild(emailtext);

  // phone input
  let phoneinput = document.createElement("input");
  phoneinput.setAttribute("type", "phone");
  phoneinput.setAttribute("name", "phoneinput");
  phoneinput.setAttribute("id", "phoneinput");
  //<label type name id><label/>
  let phonelabel = document.createElement("label");
  phonelabel.setAttribute("id", "phonelabel");
  phonelabel.setAttribute("for", "phoneinput");
  let phonetext = document.createTextNode("Phone");
  phonelabel.appendChild(phonetext);

  //submit Button
  let submitbutton = document.createElement("input");
  submitbutton.setAttribute("type", "submit");
  submitbutton.setAttribute("value", "Add");
  submitbutton.setAttribute("id", "submitbutton");

  //Append to form, lomakkeen rakentamiseen yllä olevista elementeistä input, submitbutton
  let br = document.createElement("br");
  form.appendChild(firstnamelabel);
  form.appendChild(firstnameinput);
  form.appendChild(br);
  form.appendChild(lastnamelabel);
  form.appendChild(lastnameinput);
  form.appendChild(br.cloneNode()); //br.cloneNode() liittää 'br' alekkäin

  form.appendChild(emaillabel);
  form.appendChild(emailinput);
  form.appendChild(br.cloneNode());

  form.appendChild(phonelabel);
  form.appendChild(phoneinput);
  form.appendChild(br.cloneNode());

  form.appendChild(submitbutton);

  // syötetty inputiin data menee tietokantaan submit näppäimen painaluksen jälkeen
  // siis tässä tapauksessa vain addToList(), perus toiminto on lakkautettu preventDefault():lla
  form.addEventListener("submit", function (event) {
    //Вызов preventDefault на любой стадии выполнения
    // потока событий отменяет событие, а это означает,
    // что любое действие по умолчанию обычно принимается
    //реализацией, как  результат события, которое  не произойдёт.
    // Отменяем переход по ссылке!
    event.preventDefault(); //To cancel an event, call the preventDefault()
    //method on the event. This keeps the implementation
    //from executing the default action that is associated with the event.
    addToList();
  });

  anchor.appendChild(form);
};
//async makes a function return a Promise,
//it waits when client puts the data to the form
//and press commitButton
addToList = async () => {
  // data from input form moves to own variabels
  let firstname = document.getElementById("firstnameinput");
  let lastname = document.getElementById("lastnameinput");
  let email = document.getElementById("emailinput");
  let phone = document.getElementById("phoneinput");
  // here we make a object from goten data from input
  let contact = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    phone: phone.value,
  };

  // how to make basic request to server to load(POST) database data into it and edit(PUT)
  let method = "POST";
  let url = "/api/contact";
  // '0' is false in JS, client ID start from '100'
  if (mode) {
    method = "PUT";
    url = "/api/contact/" + mode;
  }
  // this is configuration for fetch
  let request = {
    method: method,
    mode: "cors", //Web pages often make requests to load resources on other servers. Here is where CORS comes in.
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(contact), // change JS-data to JS-json object for http-protocol requests
  };
  // tässä lähetetään yllä valmistetty pyynnön(fetch(url, request)) ja odotan vastausta(response) serverilta async-lla
  //(fetch () выполняется асинхронно без блокировки,
  //выполнение кода продолжается после кода, связанного с промисом
  let response = await fetch(url, request); //await makes a function wait for a Promise.
  if (response.ok) {
    // responsen (when data is succefully moved to server,
    //sen jälkeen tyhjennetaan formia, että tuleville käytäjälle se tulee tyhjää.
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    phone.value = "";
    if (mode) {
      mode = 0; // '0' is false in JS
      let submitbutton = document.getElementById("submitbutton");
      submitbutton.value = "Add";
    }
    //getContactList();
  } else {
    console.log("Server responded with a status:", response.status);
  }
};

getContactList = async () => {
  let request = {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json" },
  };
  let response = await fetch("/api/contact", request);
  if (response.ok) {
    // this will take just text, cause there much more data
    let data = await response.json();
    populateTable(data);
    //one more line
  } else {
    console.log(
      "Failed to load contacts. Server responded with a status:",
      response.status
    );
  }
};

removeFromList = async (id) => {
  let request = {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-type": "application/json" },
  };
  let response = await fetch("/api/contact/" + id, request);
  if (response.ok) {
    getContactList();
  } else {
    console.log(
      "Failed to remove id " + id + ". Server responde with a status:",
      response.status
    );
  }
};

changeToEditMode = (contact) => {
  // mode is contact id like a 100, 101, ... etc., '0' is false in JS
  mode = contact.id; // the first contact is 100
  console.log(mode);
  let firstname = document.getElementById("firstnameinput");
  let lastname = document.getElementById("lastnameinput");
  let email = document.getElementById("emailinput");
  let phone = document.getElementById("phoneinput");
  let submitbutton = document.getElementById("submitbutton");
  firstname.value = contact.firstname;
  lastname.value = contact.lastname;
  email.value = contact.email;
  phone.value = contact.phone;
  submitbutton.value = "Save";
};

populateTable = (data) => {
  let anchor = document.getElementById("anchor");
  let oldTable = document.getElementById("table");
  // remove before made table if it exist, oldTable = true
  if (oldTable) {
    anchor.removeChild(oldTable);
  }

  let table = document.createElement("table");
  //Table header
  let header = document.createElement("thead");
  let headerRow = document.createElement("tr"); //The tr(table row) element defines a row in a table:

  // next lines to show a client id on web
  //let clientId = document.createElement("th"); //<th> tag defines a header cell in an HTML table. Bold and centered
  //let clientIdtext = document.createTextNode(" id ");
  //clientId.appendChild(clientIdtext);

  let firstnameheader = document.createElement("th"); //<th> tag defines a header cell in an HTML table. Bold and centered
  let firstnametext = document.createTextNode("First Name");
  firstnameheader.appendChild(firstnametext);

  let lastnameheader = document.createElement("th");
  let lastnametext = document.createTextNode("Last Name");
  lastnameheader.appendChild(lastnametext);

  let emailheader = document.createElement("th");
  let emailtext = document.createTextNode("Email");
  emailheader.appendChild(emailtext);

  let phoneheader = document.createElement("th");
  let phonetext = document.createTextNode("Phone");
  phoneheader.appendChild(phonetext);

  let removeheader = document.createElement("th");
  let removetext = document.createTextNode("Remove");
  removeheader.appendChild(removetext);

  let editheader = document.createElement("th");
  let edittext = document.createTextNode("Edit");
  editheader.appendChild(edittext);

  //headerRow.appendChild(clientId); to see 'id' in html
  headerRow.appendChild(firstnameheader);
  headerRow.appendChild(lastnameheader);
  headerRow.appendChild(emailheader);
  headerRow.appendChild(phoneheader);
  headerRow.appendChild(removeheader);
  headerRow.appendChild(editheader);
  header.appendChild(headerRow);
  table.appendChild(header);

  //table body

  let tablebody = document.createElement("tbody");
  // [i]x is data where data.length is 5 ([0]id, [1]fistname, [2]lastname [3]email, [4]phone)
  for (let i = 0; i < data.length; i++) {
    let tableRow = document.createElement("tr");
    console.log(data[i]);
    for (x in data[i]) {
      // x is name of param, for instance: 'id: 100' this is not passing through
      if (x === "id") {
        continue;
      }
      let column = document.createElement("td"); //<td> tag defines a standard data cell in an HTML table. font: regular and left-aligned
      let info = document.createTextNode(data[i][x]); // it works like index, which means the first item is [0], second is [1], and so on.
      column.appendChild(info);
      tableRow.appendChild(column);
    }
    let removeColumn = document.createElement("td");
    let removeButton = document.createElement("input");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "Remove");
    removeButton.setAttribute("name", data[i].id);
    removeButton.addEventListener("click", function (event) {
      removeFromList(event.target.name);
    });
    removeColumn.appendChild(removeButton);

    let editColumn = document.createElement("td");
    let editButton = document.createElement("input");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("value", "Edit");

    editButton.addEventListener("click", function (event) {
      changeToEditMode(data[i]);
    });
    editColumn.appendChild(editButton);
    tableRow.appendChild(removeColumn);
    tableRow.appendChild(editColumn);
    tablebody.appendChild(tableRow);
  }
  table.appendChild(tablebody);
  table.setAttribute("id", "table");
  anchor.appendChild(table);
};
