import { getPictures } from './helpers/apiService';
import  cardCreate from './templates/cardCreate.hbs';
import * as basicLightbox from '../node_modules/basiclightbox';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};



// getPictures('cat', '1')

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('#load-more')
}

const state = {page: 1, value: ''}
refs.loadMore.style.visibility = 'hidden';

 

 refs.form.addEventListener('submit', onSearchImg)
 refs.loadMore.addEventListener('click', onLoadMore)
 
 async function onSearchImg(event) {
    event.preventDefault()
    refs.loadMore.style.visibility = 'hidden';
    // if(!event.currentTarget.elements.query.value.trim()) {
    //     return
    // }
    try {
        state.value = event.currentTarget.elements.query.value
        const pictures = await getPictures(state.value, state.page)
        refs.gallery.innerHTML = cardCreate(pictures)
        if(pictures.length > 11) {
            refs.loadMore.style.visibility = 'visible';
        }
        if(!pictures.length){
            alert({
                text: 'No matches! Try again!'
            })
        }
    } catch(err) {
        console.log(err.message)
    }

 }

//  кнопка loadMore

async function onLoadMore() {
    state.page += 1 
    const pictures = await getPictures(state.value, state.page)
    refs.gallery.insertAdjacentHTML('beforeend', cardCreate(pictures))
// создаем экземпляр класса Intersection Observer
if(state.page === 2) {
    const observer = new IntersectionObserver(onLoadMore, options)
    observer.observe(refs.loadMore)
}

    // refs.gallery.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    //   });
}

refs.gallery.addEventListener('click', onOpenGallery)
function onOpenGallery(event){
    if(event.target.nodeName !== "IMG") {
        return
    }
    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`).show()

}
 


