// API ** 

// category-container
const categoryContainer = document.getElementById(`category-container`)

// Categories
const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
.then((res) => res.json())
.then((data) => {
    const categories = data.categories
    showCategory(categories)
})
.catch((err)=>{
    console.log(err);
})
}
showCategory = (categories) => {
    categories.forEach(category => {
        categoryContainer.innerHTML+=`
        <li id=${category.id} class="category-li hover:bg-green-700 hover:text-white w-full justify-start my-1 px-2 py-2 rounded-md cursor-pointer">${category.category_name}</li>
        `     
    });
    categoryContainer.addEventListener('click', (e)=>{
        const categoryLi = document.querySelectorAll("li")
        categoryLi.forEach( li => {
            li.classList.remove("bg-green-800", "text-white")
            // .remove("bg-green-800", "text-white")
        })
            if(e.target.localName=="li"){
                e.target.classList.add("bg-green-800", "text-white")
            }
        }) 
}

loadCategories();

// All Plants
const loadPlants = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log("all plants: ",data)
    })
}
loadPlants()

// Plants by Categories

const loadCategoryID = () =>{
    fetch(`https://openapi.programming-hero.com/api/category/1`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log("Category ID: ",data)
    })
}
loadCategoryID()

// Plants Details

const loadPlantsDetails = () =>{
    fetch(`https://openapi.programming-hero.com/api/plant/1`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log("Plants Details: ",data)
    })
}
loadPlantsDetails()