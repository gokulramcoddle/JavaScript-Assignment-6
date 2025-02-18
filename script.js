document.addEventListener("DOMContentLoaded",listItem);
var items=[];
function listItem(){
    fetch('data.json')
    .then((res)=>res.json())
    .then(dta =>{
        document.getElementById("description").textContent=dta.description;
        items=dta.items;
        displayItems(items);
        displayMeta(dta.metadata);
    })
}

function displayItems(itemArr){
    var listContainer=document.getElementById("items-div");
    listContainer.innerHTML="";
    itemArr.forEach(item =>{
        var card=document.createElement("div");
        card.className="card-div";
        card.innerHTML=
        `<h2>${item.name}</h2>
        <p>${item.description}</p>
        <strong>Price: $${item.price}</strong>`;
        listContainer.appendChild(card);
    });
}
function filterItems(){
    var price=document.getElementById("filterPrice").value;
    if(!isNaN(price)){
        var filteredItem=items.filter(item => item.price > price);
        displayItems(filteredItem);
    }
    document.getElementById("filterPrice").value="";
}

function displayMeta(forDate){

    var formatchanged= new Date(forDate.creationDate).toLocaleDateString("en-us",{
        year:"numeric",month:"long",day:"numeric",
    });

    document.getElementById("metadata-info").textContent=`Created by ${forDate.author} on ${formatchanged}`;
}

function sortItems(key,value){
    var itemsToSort=Array.from(items);
    itemsToSort.sort((a,b)=>{
        if(value === 'asc'){
            return a[key] > b[key] ? 1:-1;
        }
        return a[key] < b[key] ? 1:-1;
    })
    displayItems(itemsToSort);
}

function addItem(){
    var name=document.getElementById("itemName").value.trim();
    var description=document.getElementById("itemDescription").value.trim();
    var price=document.getElementById("itemPrice").value.trim();

    if(name && description && !isNaN(price) && price > 0){
        var addedItem= { name, description, price};
        items.push(addedItem);
        displayItems(items);

        document.getElementById("itemName").value="";
        document.getElementById("itemDescription").value="";
        document.getElementById("itemPrice").value="";
    }
    else{
        alert("Enter valid data !");
    }
}