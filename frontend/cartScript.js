
let cart = [];

export const addToCart = (flower) => {
  cart.push(flower);
};


export const renderCart = () => {

  const cartDiv = document.createElement('div');
  cartDiv.className = 'divcart';
  cartDiv.innerHTML = '<h1> KUND VAGNEN</h1> ';

  if (cart.length === 0) {
    cartDiv.innerHTML += '<p> Din kundvagn är tom </p>';
  } else {
    const cartList = document.createElement('div'); 
    cartList.classList.add('cart-list');

    cart.forEach(flower => {
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
      });

    cartDiv.appendChild(cartList);
  }

  document.getElementById('viewContainer').appendChild(cartDiv);
};
