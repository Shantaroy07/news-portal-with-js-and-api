const displayAllCategories = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories'
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);

    }
    catch (error) {
        console.log('The error is:', error);

    }
}

const displayCategories = (categories) => {
    for (category of categories) {
        const categoryField = document.getElementById('display-category');
        const divField = document.createElement('div');
        divField.classList.add('style');
        divField.innerHTML = `
        <p onclick ="displaynews('${category.category_id}')">${category.category_name}</p>       
        `;
        categoryField.appendChild(divField);


    }
}


const displaynews = async (id) => {
    try {
        toggleSpiner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        const res = await fetch(url);
        const data = await res.json();
        newsAll(data.data);
    }
    catch (error) {
        console.log('The error is:', error);

    }


}

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}



const newsAll = (allnews) => {
    const newsField = document.getElementById('display-news');
    newsField.textContent = '';
    allnews.forEach(news => {
        const divField = document.createElement('div');
        divField.innerHTML = `
        <div class="card mb-3 mx-5">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details}</p>
                        <div class="d-flex">
                            <div class="d-flex w-25 h-25">

                                <div class="w-25 h-25  ">
                                    <img src="${news.author.img}" class="img-fluid rounded-start  rounded-5  my-3 "
                                        alt="...">
                                </div>
                                <div class="p-3">
                                    <p>${news.author.name ? news.author.name : 'Name not found'} </p>
                                    <p>${news.author.published_date} </p>
                                </div>
                            </div>
                            <div class="d-flex">
                                <p class="p-3">View: ${news.total_view ? news.total_view : 'Viewers Not Found'} </p>
                            </div>
                            <div>
                                <button onclick ="infoData('${news._id}')" id="details-button" type="button" class="btn btn-primary"
                                    data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                                    Show Details
                                </button>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
    </div>

`;
        newsField.appendChild(divField);

    });

    toggleSpiner(false);
    const countNews = newsField.childElementCount;
    const numberField = document.getElementById('news-number');
    numberField.innerText = countNews;
    const categoryName = document.getElementById('category-name');



}

const infoData = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayInfo(data.data[0]));

}

const displayInfo = data => {
    const modalTitle = document.getElementById('news-tittle');
    modalTitle.innerText = data.title;

    const modalBody = document.getElementById('news-deatils');
    modalBody.innerHTML = `
    
    <p>Published date:${data.author.published_date}</p>
    <p>Author: ${data.author.name ? data.author.name : 'Not found'}</p>
    <p>Ratings: ${data.rating.number}</p>
    <p>Total View: ${data.total_view ? data.total_view : 'Not found'}</p>
    <p>Trending: ${data.others_info.is_trending}</p>
    
    
    `;

}



displayAllCategories();
displaynews('08');