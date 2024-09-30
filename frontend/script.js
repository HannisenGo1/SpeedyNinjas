
const flowerButton = document.querySelector('#get-flower');
const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('#search-button')
const productDiv = document.querySelector('.product-list');


getFlowers()

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
      flowerP.innerText = flower.price
      flowerName.innerText = flower.name
      flowerImage.src = flower.image
      flowerDiv.appendChild(flowerName)
      flowerDiv.appendChild(flowerImage)
      flowerDiv.appendChild(flowerP)
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
  }
  );
  
})