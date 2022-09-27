var addExpenceList = document.getElementById('second-row') ;
const itemList = document.getElementById('expenceAdd');




itemList.addEventListener("click" , addItem);

addExpenceList.addEventListener('click', deleteItem);
addExpenceList.addEventListener("click", editItem);

function addItem (e) {
    e.preventDefault();
    //get the value of each id
    const newItemAmount = document.getElementById("amount-id").value;
    const newItemDescription =document.getElementById("description-id").value;
    const newItemCatagory = document.getElementById("catagory-id").value;

    //creation of li
    var newLi = document.createElement('li');
    
    //now add value to the li 
    newLi.textContent = `${newItemAmount} ${newItemDescription}  ${newItemCatagory}`;

    //add button edit and delete

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";

    deleteBtn.appendChild(document.createTextNode("delete"));

    newLi.appendChild(deleteBtn);


    const editBtn = document.createElement("button");
    editBtn.className = 'edit';
    editBtn.id = 'edit-id';
    editBtn.appendChild(document.createTextNode("edit"));

    newLi.appendChild(editBtn);

    addExpenceList.appendChild(newLi);

   



}

function deleteItem(e) {
    if(e.target.classList.contains("delete")) {
        if(confirm("Are u wanna delete ?")){
            const li = e.target.parentElement;
            addExpenceList.removeChild(li);
        }
    }
}

function editItem(e) {
   // e.preventDefault();
    if(e.target.classList.contains("edit")) {
        var details =document.getElementsByTagName(li).value;
        details.textContent.contentEditable= true;

     

    } 
}

