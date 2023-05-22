const formEl = document.querySelector('form');

const inputEl = document.getElementById('search-id');

// const searchButtonEl = document.getElementById('search-button');

const accessKey = "ol4a2NEkB4KMThq1BSQFYYbjumR_SnCKH2KKD2vPLd8";

const searchResultsEl = document.getElementById('search-results');

const showMoreEl = document.getElementById('showmore-button');

let page =1;
async function searchImage(){
    // let inputData;
   let inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if(page === 1){
            searchResultsEl.innerHTML ='';
    }

    const results = data.results;

    results.map((result)=>{
        const imageWraper = document.createElement('div')
        imageWraper.classList.add('search-result') 
        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description

        imageWraper.appendChild(image)
        imageWraper.appendChild(imageLink)

        searchResultsEl.appendChild(imageWraper)
    })
    
     page = page+1;
    if(page > 1){
        showMoreEl.style.display = 'block';
    }

}

formEl.addEventListener('submit', (event)=>{
    event.preventDefault();
    page=1;
    searchImage();
})

showMoreEl.addEventListener('click',()=>{
    searchImage();
})