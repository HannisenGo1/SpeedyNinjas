
const button = document.querySelector('#get-flower');
const ul = document.querySelector('.product-list');

button.addEventListener('click', async () => {
  try {
    
    const response = await fetch('/flowers', { method: 'GET' });

    if (!response.ok) {
      console.error("Failed to fetch flowers:", response.status);
      return;
    }

    const flowersdata = await response.json();
    console.log('Svar från servern: ', flowersdata)
  
    ul.innerHTML = '';

   
    flowersdata.forEach(flower => {
      const li = document.createElement('li');
      li.innerText = `${flower.name} - $${flower.price}`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching flowers:", error);
  }
});
