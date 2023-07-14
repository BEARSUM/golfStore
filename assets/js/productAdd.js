import { API_URL, getAPI } from './common.js';

const form = document.getElementById('product-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  addProduct(formData);
});

async function addProduct(formData) {
  for (const [key, value] of formData) {
    console.log(key, value);
  }
  try {
    const data = await getAPI(`${API_URL}/products`, {
      method: 'POST',
      body: formData,
    });
  } catch (e) {
    alert(e);
  }
}
