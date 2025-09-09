// API **

// category-container
const categoryContainer = document.getElementById(`category-container`);

// Card Container
const cardContainer = document.getElementById(`card-container`);

// card Title

const cardTitle = document.getElementsByClassName(`card-title`);
// cart
let carts = []
const cartTotal = document.getElementById('total-price');
const cartContainer = document.getElementById('cart-container');
const cartCount = document.getElementById('cartCount');
const crossBTN = document.getElementsByClassName('cross');
//Modal
const modalContainer = document.getElementById("modal-container")
const modalBody = document.getElementById("modal-body")

// Categories **

const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
showCategory = (categories) => {
  categoryContainer.innerHTML=``
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
        <li id=${category.id} class="category-li hover:bg-green-700 hover:text-white w-full justify-start my-1 px-2 py-2 rounded-md cursor-pointer">${category.category_name}</li>
        `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const categoryLi = document.querySelectorAll("li");
    categoryLi.forEach((li) => {
      li.classList.remove("bg-green-800", "text-white");
    });
    if (e.target.localName == "li") {
      e.target.classList.add("bg-green-800", "text-white");
      loadPlantsByCategory(e.target.id);
      showLoading();
      // loadPlantsDetails(e.target.id);
    }
  });
};

// Plants by Categories **

const loadPlantsByCategory = (id) => {
  //console.log(id)
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log("Category ID: ", data);

      showPlantsByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showPlantsByCategory = (plants) => {
  
  cardContainer.innerHTML = ``;
  // console.log(plants[0].image.url)
  plants.forEach((plant) => {
    //console.log(plant.description)
    cardContainer.innerHTML += `
        <div class="card bg-base-100 shadow-sm">
              <figure class="mx-3 mt-3 h-[150px] rounded-xl">
                <img
                  src="${plant.image}"
                  alt=""
                  />
              </figure>
              <div id="${plant.id}" class="card-body items-start text-left">
                <h2 class="card-title cursor-pointer">${plant.name}</h2>
                <p class="text-sm">${plant.description}</p>
                <div class="flex justify-between items-center w-full">
                  <div><p class="text-green-800 bg-green-100 px-3 py-1 rounded-2xl">${plant.category}</p></div>
                  <div><p>৳<span id="tree-price">${plant.price}</span></p></div>
                </div>
                <div class="card-actions w-full">
                  <button class="btn add-cart-btn bg-green-800 text-white w-full mt-2 rounded-4xl">Add to Cart</button>
                </div>
              </div>
          </div>
        `;
  });
};


// All Plants **

const loadAllPlants = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
      
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAllPlants = (plants) => {
  cardContainer.innerHTML = ``
  plants.forEach((plant) => {
    //console.log(plant.name)
    cardContainer.innerHTML += `
        <div class="card bg-base-100 shadow-sm">
              <figure class="mx-3 mt-3 h-[150px] rounded-xl">
                <img
                  src="${plant.image}"
                  alt=""
                  />
              </figure>
              <div id="${plant.id}"  class="card-body items-start text-left">
                <h2 class="card-title cursor-pointer">${plant.name}</h2>
                <p class="line-clamp-2 text-sm">${plant.description}</p>
                <div class="flex justify-between items-center w-full">
                  <div><p class="text-green-800 bg-green-100 px-3 py-1 rounded-2xl">${plant.category}</p></div>
                  <div><p>৳<span id="tree-price">${plant.price}</span></p></div>
                </div>
                <div class="card-actions w-full">
                  <button class="btn add-cart-btn bg-green-800 text-white w-full mt-2 rounded-4xl">Add to Cart</button>
                </div>
              </div>
          </div>
        `;
  });
};

// Add to cart
cardContainer.addEventListener('click',(e)=>{
    if(e.target.innerHTML==="Add to Cart"){  
      handleCarts(e)
  }
  if(e.target.tagName==='H2'){
    
    handleModal(e)}
})

const handleCarts = (e) => {
      const price = e.target.parentNode.parentNode.children[2].children[1].children[0].children[0].innerText
    const title = e.target.parentNode.parentNode.children[0].innerText
    const id = e.target.parentNode.parentNode.id

    carts.push({
      title: title,
      id: id,
      price: price
    })

    //const cartTitle = cartContainer.children[0].children[0].children[0].innerText
    //const cartPrice = cartContainer.children[0].children[0].children[1].children[0].innerText
    //const cartCount = cartContainer.children[0].children[0].children[1].children[1].innerText
    // const cartTotal= cartTotal.children[1].children[0]
    console.log()
    showCarts(carts)
}
const showCarts = (carts) => {
  //console.log(carts)
  cartContainer.innerHTML=``
  let totalPrice = 0;
  carts.forEach(cart => {
    let count = 1;
    const price = Number(cart.price)
    
    

    // console.log("cart: ",price)
    cartContainer.innerHTML += `
    <div class="bg-gray-200 rounded-xl flex justify-between items-center p-4">
                  <div class="">
                    <h2 id="" class="font-bold">${cart.title}</h2>
                    <p class="text-gray-500">৳<span>${price}</span> x <span id="cartCount">${count}</span></p>
                  </div>
                  <i onclick="handleCross('${cart.id}')" class="fa-solid fa-xmark text-sm text-gray-500 cross"></i>
                </div>
    `
    // cartTotal.innerHTML +=`
    // <h2>Total:</h2>
    //         <p>৳ <span id="total-price">0</span></p>`
    totalPrice+= price;
    count++;
  })
  
  cartTotal.innerText = totalPrice;
}
//Cross Button
const handleCross =(cartID)=>{
  const filteredCart = carts.filter(cart=>cart.id !== cartID)
  console.log(filteredCart)
  carts = filteredCart
  showCarts(carts)
}
//Loading
const showLoading=()=>{
  cardContainer.innerHTML=`
  <p class="text-slate-500 text-md pt-5">Loading PLant Trees
            <span class="loading loading-spinner loading-md"></span></p> 
  `
}
const handleModal = (e) =>{
  const id = e.target.parentNode.id
  
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then((res)=>res.json())
  .then((data)=>{
    showModalDetails(data.plants)
  })
  .catch(err => {
    console.log(err)
  })
  //console.log(id)
}
//Modal Details
const showModalDetails=(plant)=>{
  modalBody.showModal()
  
  modalContainer.innerHTML=`
      <h2 class="text-2xl font-bold mb-3">${plant.name}</h2>
      <div class="card mb-3"> 
      <figure class="h-[250px] rounded-xl">
                <img
                  src="${plant.image}"
                  alt=""
                  />
              </figure>
              </div>
      <p class="mb-3"><span class="font-bold">Category: </span>${plant.category}</p>
      <p class="mb-3"><span class="font-bold">Price: </span>${plant.price}</p>
      <p class="mb-3"><span class="font-bold">Description: </span>${plant.description}</p>
      `
}

loadAllPlants();


loadCategories();
