import { getPictures } from './helpers/apiService';
import  cardCreate from './templates/cardCreate.hbs';

// getPictures('cat', '1')

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('#load-more')
}

const state = {page: 1, value: ''}

 refs.form.addEventListener('submit', onSearchImg)
 
 async function onSearchImg(e) {
    e.preventDefault()
    try {
        state.value = e.currentTarget.elements.query.value
        const pictures = await getPictures(state.value, state.page)
        refs.gallery.innerHTML = cardCreate(pictures)
    } catch(err) {
        console.log(err.message)
    }

 }

//  кнопка loadMore



