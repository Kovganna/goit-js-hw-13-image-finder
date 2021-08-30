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
 refs.loadMore.addEventListener('click', onLoadMore)
 
 async function onSearchImg(event) {
    event.preventDefault()
    try {
        state.value = event.currentTarget.elements.query.value
        const pictures = await getPictures(state.value, state.page)
        refs.gallery.innerHTML = cardCreate(pictures)
        if(pictures.length > 11) {
            refs.loadMore.style.visibility = 'visible';
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

    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
}


