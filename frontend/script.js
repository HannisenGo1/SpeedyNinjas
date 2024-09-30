
const flowerButton = document.querySelector('#get-flower');
const productDiv = document.querySelector('.product-list');

flowerButton.addEventListener('click', async () => {
  try {
    
    const response = await fetch('/flowers', { method: 'GET' });

    if (!response.ok) {
      console.error("Failed to fetch flowers:", response.status);
      return;
    }

    const flowersData = await response.json();
    console.log('Svar från servern: ', flowersData)
  
    productDiv.innerHTML = '';

   
    flowersData.forEach(flower => {
      const flowerDiv = document.createElement('div')
      flowerDiv.classList.add('flower-card')
      const flowerName = document.createElement('h2')
      const flowerImage = document.createElement('img')
      // li.innerText = `${flower.name} - $${flower.price}`;
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
});
