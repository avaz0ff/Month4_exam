let elUsers = document.querySelector(".user")

function fetchUsers (url , callBack) {
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
    arr.forEach((value, index, array) => {
        console.log(value);
        let html = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${value.avatar} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"  id=${value.id}>${value.name}</h5>
              <h5 class="card-title">${value.email}</h5>
              <h6 class="card-title">${value.password}</h6>
              <p class="card-text">${value.role}</p>
            </div>
          </div>
        </div>
      </div>
        `
        elUsers.insertAdjacentHTML("beforeend", html)
    })
}



fetchUsers("https://api.escuelajs.co/api/v1/users", renderData)

elUsers.addEventListener("click" , e => {
    if(e.target.matches(".delete-btn")){
        e.preventDefault()
       deleteFetch(e.target.id)
    }

    if (e.target.matches(".card-title")) {
        if(e.target.parentElement.childElementCount == 2) {
            let input = document.createElement("input")
            let buttonEdit = document.createElement("button")

            buttonEdit.textContent = "Create"
            buttonEdit.setAttribute("id" , e.target.id)
            buttonEdit.setAttribute("class", "update-btn")
            input.setAttribute("class", "card-title")

            e.target.parentElement.appendChild(input)
            e.target.parentElement.appendChild(buttonEdit)
        }
    }

    if(e.target.matches(".update-btn")) {
        console.log(e.target.previousSibling.value);
    }
   
})


function deleteFetch (id){
    fetch(`https://api.escuelajs.co/api/v1/products/${id}` ,{
    method: "DELETE"
}) .then(res => res.json())
.then(data =>  {
    fetchUsers("https://api.escuelajs.co/api/v1/products" , renderData)
    window.location.reload()
})
}

function updateFetch(id , value, price) {
    fetch(`https://api.escuelajs.co/api/v1/users/${id}` ,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
       
      },
    body: JSON.stringify({
        name: name,
        role: role
    })
}) .then(res => res.json())
.then(data =>  {
    console.log(data);
    fetchUsers("https://api.escuelajs.co/api/v1/users/" , renderData)
    window.location.reload()
})
}
