// API ** 

// Categories
const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
.then((res) => res.json())
.then((data) => {
    console.log("all Categories: ",data)
})
.catch((err)=>{
    console.log(err);
})
}
loadCategories();

// All Plants
const loadPlants = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log("all plants: ",data)
    })
}
loadPlants()

// Plants by Categories

const loadCategoryID = () =>{
    fetch(`https://openapi.programming-hero.com/api/category/1`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log("Category ID: ",data)
    })
}
loadCategoryID()

// Plants Details

const loadPlantsDetails = () =>{
    fetch(`https://openapi.programming-hero.com/api/plant/1`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log("Plants Details: ",data)
    })
}
loadPlantsDetails()