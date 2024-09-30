import { addToCart, renderCart } from './cartScript.js'; 

const flowerButton = document.querySelector('#get-flower');
const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('#search-button')
const productDiv = document.querySelector('.product-list');

let currentView = 'home';

const handleSwitchView = () => {
  currentView = currentView === 'home' ? 'cart' : 'home';
  updateView();
};


const updateView = () => {
  const viewContainer = document.getElementById('viewContainer');
  viewContainer.innerHTML = ''; 
  if (currentView === 'home') {
    document.getElementById('switchButton').textContent = 'Kundvagn';
    renderHome();
  } else {
    document.getElementById('switchButton').textContent = 'Tillbaka';
    renderCart()
  }
};

const renderHome = () => {
  
  productDiv.innerHTML = '';
  getFlowers();  
  document.getElementById('viewContainer').appendChild(productDiv);
};


async function getFlowers() {
  try {
    const response = await fetch('/flowers', { method: 'GET' });
    if (!response.ok) {
      console.error("Failed to fetch flowers:", response.status);
    }
    const flowersData = await response.json();
    console.log('Svar från servern: ', flowersData)
    
    flowersData.forEach(flower => {
      const flowerDiv = document.createElement('div')
      flowerDiv.classList.add('flower-card')
      const flowerName = document.createElement('h2')
      const flowerImage = document.createElement('img')
      const flowerP = document.createElement("p")
      
      const addButton = document.createElement("button");
      addButton.innerText = "Lägg till i kundvagnen";
      addButton.addEventListener('click', () => addToCart(flower));
      flowerP.innerText = flower.price
      
      
      flowerName.innerText = flower.name
      flowerImage.src = flower.image
      flowerDiv.appendChild(flowerName)
      flowerDiv.appendChild(flowerImage)
      flowerDiv.appendChild(flowerP)
      flowerDiv.appendChild(addButton);
      productDiv.appendChild(flowerDiv)
    });
  } catch (error) {
    console.error("Error fetching flowers:", error);
  }
}

function removeFlowers() {
  const existingFlowers = document.querySelectorAll('.product-list > div')
  
  existingFlowers.forEach(flower => {
    flower.remove()
  })
}


searchInput.addEventListener('keyup', (e) => {
  console.log(e.target.value)
  const searchValue = searchInput.value
  if (searchValue === '') {
    removeFlowers()
    getFlowers()
  }
})

searchButton.addEventListener('click', async () => {
  const searchValue = searchInput.value
  console.log(searchValue)
  
  const response = await fetch(`/flowers/search?q=${searchValue}`, { method: 'GET' });
  const matchingFlowers = await response.json()
  
  removeFlowers()
  
  matchingFlowers.forEach(flower => {
    
    const flowerDivS = document.createElement('div')
    flowerDivS.classList.add('flower-card-s')
    const flowerName = document.createElement('h2')
    const flowerImage = document.createElement('img')
    
    const flowerP = document.createElement("p")
    flowerP.innerText = flower.price
    flowerName.innerText = flower.name
    flowerImage.src = flower.image
    flowerDivS.appendChild(flowerName)
    flowerDivS.appendChild(flowerImage)
    flowerDivS.appendChild(flowerP)
    productDiv.appendChild(flowerDivS)
    const addButton = document.createElement("button");
    addButton.innerText = "Lägg till i kundvagnen";
    addButton.addEventListener('click', () => addToCart(flower));
  });
})

document.getElementById('switchButton').addEventListener('click', handleSwitchView);
updateView();

