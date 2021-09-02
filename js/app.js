
// Loading Spinner
const loderToggle = (spinStyle, contentStyle) => {
    document.getElementById('loader-div').style.display = spinStyle;
    document.getElementById('main-content').style.display = contentStyle;
}

// Load Data By Search

const loadSearchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Loading spinner
    loderToggle('block', 'none');
    // Clear field 
    searchField.value = '';

    // fetch url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchBook(data));
}

// Display Search Content

const displaySearchBook = searchBook => {
    const displayBookarea = document.getElementById('display-books');
    displayBookarea.textContent = '';
    const booksArray = searchBook.docs;

    // display search result count
    countSearchResult(searchBook.numFound, booksArray.length);
    
    // loop for getting each book

    booksArray.forEach(book => {
        // Set search result as inner html
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
            <img src="${setImgUrl(book.cover_i)}" class="card-img-top h-50">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            Author: ${book.author_name ? book.author_name[0]: 'Not found'}</p>
            <p>
            Publisher: ${book.publisher ? book.publisher[0]: 'Not found'}</p>
            <p>
            First Published: ${book.first_publish_year ? book.first_publish_year: 'Not found'}</p>
            <p>
            ISBN: ${book.isbn ? book.isbn[0]: 'Not found'}</p>
            </div>
        </div>
        `;
        displayBookarea.appendChild(div);
    });
    // Loading spinner
    loderToggle('none', 'block');
}
    

    // Set Book Cover Image
    const setImgUrl = coverId => {
        if(coverId === undefined){
            const defautImg = `img/not-found.png`;
            return defautImg;
        }
        else{
            const dynamicImg = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;  
            return dynamicImg;
     }
}

    // display search result count

const countSearchResult = (totalFound, showed) => {
       const searchInfo = document.getElementById('search-info');
       if(totalFound <= 0){
           searchInfo.innerHTML = `
           <p class='text-danger'>No Results Found!</p>
       `;
       }
       else{
       searchInfo.innerHTML = `
           <p class='text-dark'>Results Found: ${totalFound}</p>
           <p class='text-primary'>Results Showing: ${showed} out of  ${totalFound}</p>
       `;
   }
}

