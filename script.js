var addExpenceList = document.getElementById('second-row') ;
const itemList = document.getElementById('expenceAdd');


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

    //send api post request
    axios.post('https://crudcrud.com/api/2ddae4226ba84265909b36e19e96148d/ExpenseData', obj)
        .then((response) => {
            AdduserToDom(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
}

window.addEventListener("DOMContentLoaded", () => {
    console.log('hiii')
    axios.get('https://crudcrud.com/api/2ddae4226ba84265909b36e19e96148d/ExpenseData')
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
    axios.delete(`https://crudcrud.com/api/2ddae4226ba84265909b36e19e96148d/ExpenseData/${id}`)
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

    const userdata = {
        amount,
        description,
        category
    }

    const childnodetobedeleted = document.getElementById(id)
    console.log(childnodetobedeleted)
    // addExpenceList.removeChild(childnodetobedeleted);
    axios.put(`https://crudcrud.com/api/2ddae4226ba84265909b36e19e96148d/ExpenseData/${id}`,userdata)
        .then((response) => {
            removeUserFromScreen(id)
            AdduserToDom(userdata)
    })
    .catch((err) => {
        console.log(err);
    })
}

