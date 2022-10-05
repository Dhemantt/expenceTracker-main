var addExpenceList = document.getElementById('second-row') ;
const itemList = document.getElementById('expenceAdd');

var editingitem = null

// itemList.addEventListener("click" , addItem);

// addExpenceList.addEventListener('click', deleteItem);
// addExpenceList.addEventListener("click", editItem);

function onsignup(e) {
    e.preventDefault();
    //get the value of each id
    // const newItemAmount = document.getElementById("amount-id").value;
    // const newItemDescription = document.getElementById("description-id").value;
    // const newItemCatagory = document.getElementById("catagory-id").value;
    const newItemAmount = e.target.amountid.value
            // localStorage.setItem('Name', name )
            var newItemDescription = e.target.descriptionid.value
            // localStorage.setItem('Email',email)
            var newItemCatagory = e.target.catagoryid.value
    const obj = {
        newItemAmount,
        newItemDescription,
        newItemCatagory
    }

    if (editingitem) {
        id = editingitem
        axios.put(`https://crudcrud.com/api/924a4d51633144308feb9b9c326cea26/ExpenseData/${id}`,obj)
        .then((response) => {
            removeUserFromScreen(id)
            AdduserToDom(obj)
            })
            .catch((err) => {
                console.log(err);
            })        
    }
    else {
        axios.post('https://crudcrud.com/api/924a4d51633144308feb9b9c326cea26/ExpenseData', obj)
        .then((response) => {
            AdduserToDom(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    editingitem = null
    e.target.amountid = '';
    e.target.descriptionid = "";
    //send api post request
    
}

window.addEventListener("DOMContentLoaded", () => {
    console.log('hiii')
    axios.get('https://crudcrud.com/api/924a4d51633144308feb9b9c326cea26/ExpenseData')
        .then((response) => {
        console.log(response)
        for(let i=0; i<response.data.length; i++){
            AdduserToDom(response.data[i]);
        }
        if(localStorage.getItem(user.email)!== null){
        removeUserFromScreen(user.email);
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

function AdduserToDom(user) {
    const childnode = `<li id=${user._id}> ${user.newItemAmount} - ${user.newItemDescription} - ${user.newItemCatagory} 
        <button onclick="editItem('${user._id}',${user.newItemAmount},'${user.newItemDescription}','${user.newItemCatagory}')">Edit</button>
        <button onclick="deleteItem('${user._id}')">Delete</button></li>`
    addExpenceList.innerHTML = addExpenceList.innerHTML + childnode
}

function deleteItem(id) {
    console.log(id);
    axios.delete(`https://crudcrud.com/api/924a4d51633144308feb9b9c326cea26/ExpenseData/${id}`)
        .then((response) => {
       removeUserFromScreen(id)
    })
    .catch((err) => {
        console.log(err);
    })
    // if(e.target.classList.contains("delete")) {
    //     if(confirm("Are u wanna delete ?")){
    //         const li = e.target.parentElement;
    //         addExpenceList.removeChild(li);
    //     }
    // }
}
function removeUserFromScreen(id){
    // const parentnode = document.getElementById('listOfUsers')
    const childnodetobedeleted = document.getElementById(id)
    if(childnodetobedeleted){
        addExpenceList.removeChild(childnodetobedeleted);
    }
}


function editItem(id,amount,description,category) {
   // e.preventDefault();
    const newItemAmount = document.getElementById('amountid')
    newItemAmount.value = amount;

    const newItemDescription = document.getElementById('descriptionid')
    newItemDescription.value = description;

    const newItemCatagory = document.getElementById('catagoryid')
    newItemCatagory.value = category;

    editingitem = id

    const childnodetobedeleted = document.getElementById(id)
    addExpenceList.removeChild(childnodetobedeleted);    
}

