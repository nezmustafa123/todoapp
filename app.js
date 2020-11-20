
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


//edit option
//edit element is element to be edited
let editElement;
let editFlag = false;
let editID = "";


///**** event listeners ****
//submit form
form.addEventListener('submit',addItem);
//clear items

clearBtn.addEventListener('click',clearItems);



// **** functions ******
function addItem(e) {
    e.preventDefault();
    //target the input
    const value = grocery.value;
    const id = new Date().getTime().toString();
    //options and conditions
    //if value not equal to empty string and not editing
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        //add id
        let attr = document.createAttribute("data-id");
         //add dynmaic id
        attr.value = id;
       //add the value to attribute 
        // set the attribute value of the element

        element.setAttributeNode(attr);
        //add class
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                  <button type="button" class="edit-btn">
                   <i class="fas fa-edit"></i>

                  </button>
                 <button type="button" class="delete-btn">
                   <i class="fas fa-trash"></i>
                 </button>
              </div>
              `;
        const deleteBtn = element.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', deleteItem);

        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', editItem);
        //append child
        //add element to the list
        list.appendChild(element);
        //display alert
        
        displayAlert("item added to the list", "success");
        
        //show container
        container.classList.add("show-container");
        
        // add to local storage
        
        addToLocalStorage(id, value);
        
        //set back to default 
        
        setBackToDefault();
        
    } else if (value && editFlag) {
           //edit set to true when clicking on edit button
        
//        grab value and assign it back to paragraph
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        //edit local storage pass global editID down
        editLocalStorage(editID, value);
        setBackToDefault();
     }
    else {
       displayAlert("please enter value", "danger");
    }
    
    
//    
//    
//    e.preventDefault();
//  const value = grocery.value;
//  const id = new Date().getTime().toString();
//
//  if (value !== "" && !editFlag) {
//    const element = document.createElement("article");
//    let attr = document.createAttribute("data-id");
//    attr.value = id;
//    element.setAttributeNode(attr);
//    element.classList.add("grocery-item");
//    element.innerHTML = `<p class="title">${value}</p>
//            <div class="btn-container">
//              <!-- edit btn -->
//              <button type="button" class="edit-btn">
//                <i class="fas fa-edit"></i>
//              </button>
//              <!-- delete btn -->
//              <button type="button" class="delete-btn">
//                <i class="fas fa-trash"></i>
//              </button>
//            </div>
//          `;
//    // add event listeners to both buttons;
//    const deleteBtn = element.querySelector(".delete-btn");
//    deleteBtn.addEventListener("click", deleteItem);
//    const editBtn = element.querySelector(".edit-btn");
//    editBtn.addEventListener("click", editItem);
//
//    // append child
//    list.appendChild(element);
//    // display alert
//    displayAlert("item added to the list", "success");
//    // show container
//    container.classList.add("show-container");
//    // set local storage
//    addToLocalStorage(id, value);
//    // set back to default
//    setBackToDefault();
//  } else if (value !== "" && editFlag) {
//    editElement.innerHTML = value;
//    displayAlert("value changed", "success");
//
//    // edit  local storage
//    editLocalStorage(editID, value);
//    setBackToDefault();
//  } else {
//    displayAlert("please enter value", "danger");
//  }
//    
    
}

//display alert

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    //remove alert 
    //add set timeout with a callback function inside original display alert function to reset the alert text and colour
    
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1500);
    
    
}

//clear items 
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    //if length of node list bigger than zero iterate through and remove
    if(items.length > 0) {
        items.forEach(function(item){
            //use removechild list = grocery list
            list.removeChild(item);
            
        });
    }
    container.classList.remove("show-container");
    //set up the colour as danger 
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
    
}

//delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        //remove container class list
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove from local storage
     removeFromLocalStorage(id);
}


//edit function
function editItem(e) {
   const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    //paragraph to edit
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //get the sibling of the parent
    //set form value
    
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
    
}


//set back to default


//set everything back to default

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Submit";
}



// **** local storage ******
function addToLocalStorage(id, value) {
   const grocery = {id: id, value: value};
   
    //if list exists parse it otherwise set to empty array
    let items = getLocalStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
//    console.log("added to local storage");
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    
    items = items.filter(function (item){
        if (item.id !== id) {
        return item;
        }
    });
    
    //set the new items in local storage
    
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
//    either get items or empty array
    let items = getLocalStorage();
    items = items.map(function (item){
        if (item.id === id){
            item.value = value;
        }
//        set old value equal to new value passed in
        return item;
    });
   localStorage.setItem("list", JSON.stringify(items));

}


function getLocalStorage() {
  return  localStorage.getItem("list") ?
      JSON.parse(localStorage.getItem("list"))
    : [];
}
// **** setup item ******

