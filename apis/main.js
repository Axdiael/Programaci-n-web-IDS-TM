import { getBreeds } from './api.js';
import { showBreeds, updateButtons, updatePageInfo } from './ui.js';

let currentPage = 1;
let limit = 5;
let totalPages = 1;

async function loadBreeds(page) {
    const data = await getBreeds(page, limit);
    showBreeds(data.breeds);
    totalPages = data.pageCount;
    updateButtons(currentPage, totalPages);
    updatePageInfo(currentPage, totalPages);
}

document.getElementById('prevPage').addEventListener('click', () => {
    if(currentPage > 1){
        currentPage--;
        loadBreeds(currentPage);
    }
})

document.getElementById('nextPage').addEventListener('click', () => {
    if(currentPage < totalPages){
        currentPage++;
        loadBreeds(currentPage);
    }
})

document.getElementById('limitSelect').addEventListener('change', (e) => {
    limit = parseInt(e.target.value);
    currentPage = 1;
    loadBreeds(currentPage);
})

window.addEventListener('DOMContentLoaded', () => loadBreeds(currentPage));