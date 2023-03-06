let elProduct = document.querySelector ('.product')



function fetchProducts (url , callBack) {
    let deleteObj;
    fetch(url , {
        method : "GET"
    }).then (res => res.json())
    .then(data =>  {
        renderData(data)
        deleteObj = data
    }) .then (() => callBack(deleteObj))
}

function renderData (arr) {
    arr.forEach((value, index ,array) => {
        console.log(value);
        let html = `
        <div class="card" style="width: 18rem;">
          <img src=${value.images[0]} class="card-img-top" alt="...">
        <div class="card-body">
        <div class="parent-heading">
         <h5 class="card-title" id=${value.id}>${value.title}</h5>
         </div>
         <h6 class="card-title">${value.price}$</h6>
         <p class="card-text">${value.description}</p>
         <button id=${value.id} class="btn btn-danger  delete-btn">Delete</button>
         <button id=${value.id} class="btn btn-info edit-btn">Edit</button>
        </div>
        </div>
        `
        elProduct.insertAdjacentHTML("beforeend" , html)
    })
}


fetchProducts("https://api.escuelajs.co/api/v1/products" , renderData)

elProduct.addEventListener("click" , e => {
    if(e.target.matches(".delete-btn")){
        e.preventDefault()
       deleteFetch(e.target.id)
    }

    if (e.target.matches(".card-title")) {
        if(e.target.parentElement.childElementCount == 1){
            let input = document.createElement("input")
            let buttonEdit = document.createElement("button")
            let inputPrice = document.createElement("input")
            buttonEdit.textContent = "Create"
            buttonEdit.setAttribute("id" , e.target.id)
            buttonEdit.setAttribute("class" , "update-btn")
            input.setAttribute("class" , "card-title")
            inputPrice.setAttribute("class" , "card-price")
            input.placeholder = "yangi title yozing..."
            inputPrice.placeholder = "yangi narx yozing..."
            
            e.target.parentElement.appendChild(input)
            e.target.parentElement.appendChild(inputPrice)
            e.target.parentElement.appendChild(buttonEdit)
        }
    }
    if(e.target.matches(".update-btn")) {
        updateFetch(e.target.id, e.target.previousSibling.previousSibling.value,  e.target.previousSibling.value)
    }
})
 


function deleteFetch (id){
    fetch(`https://api.escuelajs.co/api/v1/products/${id}` ,{
    method: "DELETE"
}) .then(res => res.json())
.then(data =>  {
    fetchProducts("https://api.escuelajs.co/api/v1/products" , renderData)
    window.location.reload()
})
}

function updateFetch(id , value, price) {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}` ,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        title: value,
        price: price
    })
}) .then(res => res.json())
.then(data =>  {
    console.log(data);
    fetchProducts("https://api.escuelajs.co/api/v1/products" , renderData)
    window.location.reload()
})
}

