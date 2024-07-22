///<reference types="../@types/jquery" />


/* Side Bar */

// make the side bar tabs visible and not visible and toggle the side bar icon
$(".open-close").on("click", function () {
    $("aside").toggleClass("start-0"),
    $(".open-close").toggleClass("fa-x"),
    $(".side-bar-links li").toggleClass("top-0")
})


/* Show loading spinner function */
function showLoadingSpineer() {
    $(".spinner-wrapper").fadeIn();
}


/* hide loading spinner function */
function hideLoadingSpineer() {
    $(".spinner-wrapper").fadeOut();
}


/* API */

// Home Page
// Get random meals
async function getRandomMeals() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}


// show the respone in the page
async function displayRandomMeals() {
    // Show loading spinner
    showLoadingSpineer();

    let allMealsData = await getRandomMeals();
    console.log(allMealsData.meals[0]);
    let box = "";
    for (let i = 0; i < allMealsData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsDetailsById(${allMealsData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                    <img src="${allMealsData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                    <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                        <h2>${allMealsData.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer();
}

displayRandomMeals();
// Get all meals categories
async function getAllMealsCategories() {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}


// show the respone in the page
async function displayAllMealsData() {
    // Show loading spinner
    showLoadingSpineer()

    let allMealsData = await getAllMealsCategories();
    let box = "";
    for (let i = 0; i < allMealsData.categories.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsByCategory('${allMealsData.categories[i].strCategory}')" class="meal position-relative rounded-2 overflow-hidden clickable">
                    <img src="${allMealsData.categories[i].strCategoryThumb}" alt="" class="w-100 rounded">
                    <div class="meal-layer position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center">
                        <h3 class="pt-3">${allMealsData.categories[i].strCategory}</h3>
                        <p>${allMealsData.categories[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
                    </div>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}

// displayAllMealsData()

// Filter by Category
async function getMealsByCategory(category) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}


// show the meals by category in the page
async function displayMealsByCategory(category) {
    // Show loading spinner
    showLoadingSpineer()

    let mealsByCategoryData = await getMealsByCategory(category);
    let box = "";
    for (let i = 0; i < mealsByCategoryData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsDetailsById(${mealsByCategoryData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                    <img src="${mealsByCategoryData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                    <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                        <h2>${mealsByCategoryData.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}

// displayMealsByCategory("Seafood")

// Lookup full meal details by id
async function getMealsDetailsById(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}

// getMealsDetailsById("52959")

// show meal details by id
async function displayMealsDetailsById(id) {
    // Show loading spinner
    showLoadingSpineer()

    let mealDetails = await getMealsDetailsById(id);

    // get strIngredient items
    let strIngredientBox = "";
    for (let i = 1; i <= 20; i++) {
        if (mealDetails.meals[0][`strIngredient${i}`] == "") {
            break;
        }
        strIngredientBox += `
            <li class="alert alert-info m-2 p-1">${mealDetails.meals[0][`strIngredient${i}`]}</li>
        `
    }
    // get strMeasure items
    let strMeasureBox = "";
    for (let i = 1; i <= 20; i++) {
        if (mealDetails.meals[0][`strMeasure${i}`] == " " || mealDetails.meals[0][`strMeasure${i}`] == "") {
            break;
        }
        strMeasureBox += `
            <li class="alert alert-danger m-2 p-1">${mealDetails.meals[0][`strMeasure${i}`]}</li>
        `
    }
    $("#rowData").html(`
            <div class="col-md-4  text-white">
                <img class="w-100 rounded-3" src="${mealDetails.meals[0].strMealThumb}" alt="">
                <h2>${mealDetails.meals[0].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${mealDetails.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealDetails.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealDetails.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${strIngredientBox}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${strMeasureBox}
                </ul>
                <a target="_blank" href="${mealDetails.meals[0].strSource}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${mealDetails.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `);

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}


// Get all meals categories
async function getAllAreas() {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}


// show all areas in the page
async function displayAllAreas() {
    // Show loading spinner
    showLoadingSpineer()

    let allAreasData = await getAllAreas();
    let box = "";
    for (let i = 0; i < allAreasData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsByArea('${allAreasData.meals[i].strArea}')" class="rounded-2 text-center clickable text-white">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${allAreasData.meals[i].strArea}</h3>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}


// Filter by Area
async function getMealsByArea(area) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}

// show the meals by Area in the page
async function displayMealsByArea(area) {
    // Show loading spinner
    showLoadingSpineer()

    let mealsByAreaData = await getMealsByArea(area);
    let box = "";
    for (let i = 0; i < mealsByAreaData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsDetailsById(${mealsByAreaData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                    <img src="${mealsByAreaData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                    <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                        <h2>${mealsByAreaData.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}


// Get all meals Ingredients
async function getAllIngredients() {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}


// show all meals Ingredients in the page
async function displayAllAIngredients() {
    // Show loading spinner
    showLoadingSpineer()

    let allIngredientsData = await getAllIngredients();

    let box = "";
    for (let i = 0; i < allIngredientsData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsByIngredient('${allIngredientsData.meals[i].strIngredient}')" class="rounded-2 text-center clickable text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${allIngredientsData.meals[i].strIngredient}</h3>
                    <p>${allIngredientsData.meals[i].strDescription ? allIngredientsData.meals[i].strDescription.split(" ").slice(0, 6).join(" ") : ""}</p>
                </div>
            </div>
        `
    }

    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}

// Filter by Ingredient
async function getMealsByIngredient(ingredient) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }
}

// show meals by ingredient in the page
async function displayMealsByIngredient(ingredient) {
    // Show loading spinner
    showLoadingSpineer()

    let mealsByIngredientData = await getMealsByIngredient(ingredient);
    let box = "";
    for (let i = 0; i < mealsByIngredientData.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div onclick="displayMealsDetailsById(${mealsByIngredientData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                    <img src="${mealsByIngredientData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                    <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                        <h2>${mealsByIngredientData.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    }
    $("#rowData").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}

// search by name function
async function searchByName(inputValue) {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }

}

// show search respone in the page
async function displaySearchedData(inputValue) {
    // Show loading spinner
    showLoadingSpineer();

    let allsearchedData = await searchByName(inputValue);
    let box = "";
    if (allsearchedData && allsearchedData.meals) {
        for (let i = 0; i < allsearchedData.meals.length; i++) {
            box += `
                <div class="col-md-3">
                    <div onclick="displayMealsDetailsById(${allsearchedData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                        <img src="${allsearchedData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                        <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                            <h2>${allsearchedData.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    $("#searched-data").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}


// search by first letter function
async function searchByFirstLetter(inputValue) {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Can't fetch data:", error.message);
    }

}

// display search by first respone in the page
async function displaySearchedDataByFirstLetter(inputValue) {
    // Show loading spinner
    $(".inner-loading-screen").attr("style", "display: flex;");

    let allsearchedData = await searchByFirstLetter(inputValue);
    let box = "";
    if (allsearchedData && allsearchedData.meals) {
        for (let i = 0; i < allsearchedData.meals.length; i++) {
            box += `
                <div class="col-md-3">
                    <div onclick="displayMealsDetailsById(${allsearchedData.meals[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden clickable">
                        <img src="${allsearchedData.meals[i].strMealThumb}" alt="" class="w-100 rounded">
                        <div class="meal-layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                            <h2>${allsearchedData.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
                `;
        }
    }
    $("#searched-data").html(box)

    // Hide loading spinner after async operation completes
    hideLoadingSpineer()
}
// form validation // Hold on
function validateInput(e) {
    var string = e.value.trim();

    var regex = {
        nameInput: /^[a-zA-Z]{3,}$/,
        emailInput: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        phoneInput: /^01[0-25]\d{8}$/,
        ageInput: /^[1-9][0-9]?$/,
        passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        passwordInput2: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    };

    if (regex[e.id].test(string)) {
        e.classList.add("is-valid");
        e.classList.remove("is-invalid");
        e.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        e.classList.remove("is-valid");
        e.classList.add("is-invalid");
        e.nextElementSibling.classList.replace("d-none", "d-block");
    }

    // Check all input fields for validity
    var isValidForm = true;
    var inputs = document.querySelectorAll('.form-control');
    inputs.forEach(function(input) {
        if (!regex[input.id].test(input.value.trim())) {
            isValidForm = false;
        }
    });

    // Enable or disable submit button based on isValidForm flag
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = !isValidForm;
}


/* Navigation Bar */

// search page
$("#search").on("click", function() {

    // Side Bar Control
    $("aside").toggleClass("start-0");
    $(".open-close").toggleClass("fa-x");
    $(".side-bar-links li").toggleClass("top-0");

    let searchPageContent = `
    <!-- search section -->
    <div class="row py-4">
        <div class="col-md-6 ">
            <input oninput="displaySearchedData(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="displaySearchedDataByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
        <!-- search container -->
        <div class="row py-5 g-3" id="searched-data">
        </div>
    </div>
    `
    $("#rowData").html(searchPageContent)
})

// Categories page
$("#categories").on("click", function() {

    // Side Bar Control
    $("aside").toggleClass("start-0");
    $(".open-close").toggleClass("fa-x");
    $(".side-bar-links li").toggleClass("top-0");

    displayAllMealsData();
})

// Area page
$("#area").on("click", function() {

    // Side Bar Control
    $("aside").toggleClass("start-0");
    $(".open-close").toggleClass("fa-x");
    $(".side-bar-links li").toggleClass("top-0");

    displayAllAreas();
})

// Ingredients page
$("#ingredients").on("click", function() {

    // Side Bar Control
    $("aside").toggleClass("start-0");
    $(".open-close").toggleClass("fa-x");
    $(".side-bar-links li").toggleClass("top-0");

    displayAllAIngredients();
})

// Contact Us page
$("#contact-us").on("click", function() {

    // Side Bar Control
    $("aside").toggleClass("start-0");
    $(".open-close").toggleClass("fa-x");
    $(".side-bar-links li").toggleClass("top-0");


    let contactPageContent = `
<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="validateInput(this)" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="invalid-name" class="alert alert-danger w-100 mt-2 d-none">
                    Invalid Name! at least 3 chars, Special characters and numbers not allowed.
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="validateInput(this)" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="invalid-email" class="alert alert-danger w-100 mt-2 d-none">
                    Invalid Email address.
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validateInput(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="invalid-phone" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validateInput(this)" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="invalid-age" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="validateInput(this)()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="invalid-password" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput2" onkeyup="validateInput(this)()" type="password" class="form-control " placeholder="Repassword">
                <div id="invalid-password2" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
    `
    $("#rowData").html(contactPageContent)
})