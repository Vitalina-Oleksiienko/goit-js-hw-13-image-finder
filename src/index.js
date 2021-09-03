import './sass/main.scss';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import ImagesApiService from './apiService';
import cardTpl from './templates/card.hbs';
import LoadMoreBtn from './load-more';



const refs = {
    form: document.querySelector('.search-form'),
    output: document.querySelector('.js-output'),
}
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});


const imagesApiService = new ImagesApiService();
refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImage);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;

    if (imagesApiService.query === "") {
        error(
            {
                delay: 2000,
                text: "Type some request",
                maxOpen: 1,
            })
        return
    };

    loadMoreBtn.show();
    imagesApiService.resetPage();  
    clearContainer();
    fetchImage();
    
}

function createMarkup(result) {

    if (result.hits.length === 0) {
        error(
            {
                delay: 2000,
                text: "Неверный запрос",
                maxOpen: 1,
            })
        return
    }
    refs.output.insertAdjacentHTML('beforeend', cardTpl(result.hits));
    window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
    });
    
}


function clearContainer() {
    refs.output.innerHTML = '';
}

function fetchImage() {
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(result => {
        imagesApiService.incrementPage();
        loadMoreBtn.enable();
        createMarkup(result); 
    });
    
}

// back to top button
let backToTopBtn = document.getElementById("btn-back-to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
backToTopBtn.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}