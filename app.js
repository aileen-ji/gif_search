//global constants
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H'
const limit = 9
const rating = 'g'

let gifForm = document.querySelector("form")
let gifResults = document.getElementById("results")
let userInput = document.getElementById("box")
let moreButton = document.getElementById("more")
let currentPage = 0
let offset
let currSearch;

gifForm.addEventListener("submit", getUserInput)
moreButton.addEventListener("click", showMore)

async function getUserInput(evt){
    evt.preventDefault();
    gifResults.innerHTML = ``
    let input = userInput.value;
    currSearch = input;
    let result = await getResults(input);
    displayResults(result)
    moreButton.classList.remove("hidden")
    userInput.value = ""
}

async function getResults(input_param){
    let apiUrl = "http://api.giphy.com/v1/gifs/search"+"?api_key="+API_KEY+"&q="+input_param+"&limit="+limit+"&rating="+rating+"&offset="+offset;
    console.log(apiUrl);
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    console.log(responseData.data);
    return responseData.data;
}



async function displayResults(result_param){
    //result_param.forEach(i => {
    console.log(result_param);
    for(let i = 0; i < result_param.length; i++){  
        console.log() 
        gifResults.innerHTML += `
        <div id = "eachGif">
            <img class="gif" src = ${result_param[i].images.fixed_width.url} alt = ${result_param[i].title}>
            <p id = "title">${result_param[i].title}</p>
            <p id = "user">${result_param[i].username}</p>
        </div>
`   }
    
}

async function showMore(){
    currentPage += 1
    offset = currentPage*limit
    let more_result = await getResults(currSearch);
    userInput.value = ""
    displayResults(more_result)
    
}
