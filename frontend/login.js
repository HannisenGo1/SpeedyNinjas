import { removeFlowers, getFlowers } from "./script.js";
const productDiv = document.querySelector('.product-list');
const loginBtn = document.querySelector(".login-btn")

let loggedIn = false
let whoIsLoggedIn
let wrongUser = document.createElement("p")

export async function logIn() {
    const response = await fetch('/users', { method: 'GET' });
    if (!response.ok) {
        console.error("Failed to fetch users:", response.status);
    }
    if(!loggedIn && response.ok){
        const userData = await response.json();
        console.log('Click')
        
        removeFlowers()
        
        const loginwindow = document.createElement("div")
        loginwindow.classList.add("login-div")
        const user = document.createElement("p")
        const userInput = document.createElement("input")
        const loginbutton = document.createElement("button")
        user.innerText = "Username: "
        loginbutton.innerText = "Logga in"
        loginwindow.appendChild(user)
        loginwindow.appendChild(userInput)
        loginwindow.appendChild(loginbutton)
        productDiv.appendChild(loginwindow)
        loggedIn = true
        loginbutton.addEventListener("click", () => {
            let OKuser 
            userData.forEach(user => {
                
                if(user.name.toLowerCase() === userInput.value.toLowerCase()) {
                    OKuser = true
                    whoIsLoggedIn = user._id
                }else {
                    wrongUser.innerText = "Fel användarnamn."
                    
                    loginwindow.appendChild(wrongUser)
                }
            })
            if (OKuser) {
                removeLogin()
                getFlowers()
                loginBtn.innerText = "Logga ut"

            }
        })
        
    }
    else {
        loggedIn = !loggedIn
        getFlowers()
        loginBtn.innerText = "Logga in"
    }

}

function removeLogin() {
    const loginelements = document.querySelectorAll(".product-list *")
    loginelements.forEach(element => {
        element.remove()
    })
}


export {whoIsLoggedIn, loggedIn}