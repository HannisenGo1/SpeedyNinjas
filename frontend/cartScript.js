import { whoIsLoggedIn, loggedIn } from "./login.js";

let cart = [];
let totalPrice = 0;


export const addToCart = (flower) => {
  cart.push(flower);
};


export const renderCart = () => {

  const cartDiv = document.createElement('div');
  cartDiv.className = 'divcart';
  cartDiv.innerHTML = '<h1> KUND VAGNEN</h1> ';
  if(loggedIn) {
    loggedInCart()
    
  }
  if (!loggedIn && cart.length === 0) {
    cartDiv.innerHTML += '<p> Din kundvagn är tom </p>';
  } else {
    const cartList = document.createElement('div'); 
    cartList.classList.add('cart-list');

    cart.forEach(flower => {
        const flowerDiv = document.createElement('div');
        flowerDiv.classList.add('cart-card');
        const flowerName = document.createElement('h2')
        const flowerImage = document.createElement('img')
        const flowerP = document.createElement("p")
        flowerP.innerText = flower.price
        flowerName.innerText = flower.name
        flowerImage.src = flower.image
        flowerDiv.appendChild(flowerName)
        flowerDiv.appendChild(flowerImage)
        flowerDiv.appendChild(flowerP)
    
        cartList.appendChild(flowerDiv);
      });

    cartDiv.appendChild(cartList);
    totalPrice += flower.price;
  const priceDiv = document.createElement('div')
  priceDiv.classList.add('total-price-div')
  priceDiv.innerHtml= ' <h2> Totala pris: ${totalPrice} kronor </h2>'
  cartDiv.appendChild(priceDiv)
  }


  document.getElementById('viewContainer').appendChild(cartDiv);
};

async function loggedInCart() {
  const responseCart = await fetch('/carts', { method: 'GET' })
  const responseUsers = await fetch('/users', { method: 'GET' })
  const responseFlowers = await fetch('/flowers', { method: 'GET' })
  cart = await responseCart.json()
  let users = await responseUsers.json()
  let flowers = await responseFlowers.json()
  cart.forEach(cart => {
    // users.forEach(user => {
      if(whoIsLoggedIn === cart.userId) {
        // console.log("whoIsloggedIn: ",whoIsLoggedIn) 
        //    console.log("cartId: ", cart.userId);
          //  ("cartId: ", cart._id);
        
        flowers.forEach(flower => {
          if(cart.productId === flower._id){
            console.log("kommer in i flowers");
           
            const cartDiv = document.createElement('div');
            
            const cartList = document.createElement('div'); 
            cartList.classList.add('cart-list');
            const flowerDiv = document.createElement('div');
            flowerDiv.classList.add('flower-card');
            const flowerName = document.createElement('h2')
            const flowerImage = document.createElement('img')
            const flowerP = document.createElement("p")
            flowerP.innerText = flower.price
            flowerName.innerText = flower.name
            flowerImage.src = flower.image
            flowerDiv.appendChild(flowerName)
            flowerDiv.appendChild(flowerImage)
            flowerDiv.appendChild(flowerP)
        
            cartList.appendChild(flowerDiv);
            cartDiv.appendChild(cartList);
            document.getElementById('viewContainer').appendChild(cartDiv);
          }
        })

      }
    // })
  })


}