import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  const error = document.querySelector('.error');

  function populateBreeds() {
    fetchBreeds()
      .then(breeds => {
        breedSelect.innerHTML = '';
        let markSelect = breeds
          .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
          .join('');
        breedSelect.insertAdjacentHTML('beforeend', markSelect);
        new SlimSelect({
          select: breedSelect,
        });
      })

      .catch(err => {
        showError(err);
      });
  }

  function showCatInfo(cat) {
    if (Array.isArray(cat) && cat.length > 0) {
      const firstCat = cat[0];
      catInfo.innerHTML = `
                <h2>${firstCat.breeds[0].name}</h2>
                <p>Description: ${firstCat.breeds[0].description}</p>
                <p>Temperament: ${firstCat.breeds[0].temperament}</p>
                <img src="${firstCat.url}" alt="Cat Image" width = 100%>
            `;
    } else {
      showError(new Error('Invalid cat data received.'));
    }
  }

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  function showError(err) {
    error.style.display = 'block';
    console.error(err);
  }

  function hideError() {
    error.style.display = 'none';
  }

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    hideError();
    showLoader();
    catInfo.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        showCatInfo(cat);
      })
      .catch(err => {
        showError(err);
      })
      .finally(() => {
        hideLoader();
      });
  });

  populateBreeds();
  hideError();
  hideLoader();
});
