const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


//edit option
let editElement;
let editFlag = false;
let editID = "";


///**** event listeners ****
//submit form
form.addEventListener("submit", addItem);
// **** functions ******
function addItem(e) {
    
    e.preventDefault();
    //target the input
    const value = grocery.value;
    const id = new Date().getTime().toString();
    //options and conditions
    //if value not equal to empty string and not editing
    if(value && !editFlag === false) {
        const element = document.createElement('article');
        //add class
        element.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id');
        //add dynmaic id
        //add the value to attribute 
        attr.value = id;
        element.setAttributeNode(attr);
//        set the attribute value of the element
        
        element.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                  <button type="button" class="edit-btn"><i class="fa fa-edit"></i></button>
                 <button type="button" class="delete-btn"><i class="fa fa-trash"></i></button>
              </div>`;
        //append child
        //add element to the list
        list.appendChild(element);
        //display alert
        
        displayAlert("item added to the list","success")
    }
       else if(value && editFlag) {
           //edit set to true when clicking on edit button
        console.log('editing');
    }
    else {
       displayAlert("please enter value", "danger");
    }
    

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
// **** local storage ******

// **** setup item ******

