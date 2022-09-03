const displayAllCategories = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories'
        fetch(url)
            .then(res => res.json())
            .then(data => displayCategories(data.data.news_category));

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
        <h5 onclick ="displaynews('${category.category_id}')">${category.category_name}</h5>       
        `;
        categoryField.appendChild(divField);


    }
}


const displaynews = (id) => {
    try {
        toggleSpiner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => newsAll(data.data));
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
    allnews.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    allnews.forEach(news => {
        const divField = document.createElement('div');
        divField.innerHTML = `
        <div class="card mb-3 ">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}</p>
                    
                    <div class="d-flex  align-items-center flex-wrap">
                        <div class="w-25 h-25 d-flex justify-content-center align-items-center ">
                            <img src="${news.author.img}" class="img-fluid my-3 author-img w-25 h-25" alt="...">
                        </div>
                        <div class="p-3">
                            <p>${news.author.name ? news.author.name : 'Name not found'} </p>
                            <p>${news.author.published_date ? news.author.published_date : 'Date not found'} </p>
                        </div>
                        <div class="">
                            <p class="p-3"> <i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view ? (news.total_view) + 'M' : 'Viewers Not Found'} </p>
                        </div>
                        <div>
                            <p onclick="infoData('${news._id}')" id="details-button" type="button"
                                class="btn btn-primary ms-2 " data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i>
                                
                            </p>
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

}

const infoData = (newsId) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newsId}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayInfo(data.data[0]));
    }

    catch (error) {
        console.error(error);
    }

}

const displayInfo = data => {
    const modalTitle = document.getElementById('news-tittle');
    modalTitle.innerText = data.title;

    const modalBody = document.getElementById('news-deatils');
    modalBody.innerHTML = `
    
    <p>Published date:${data.author.published_date ? data.author.published_date : "Not Found"}</p>
    <p>Author: ${data.author.name ? data.author.name : 'Not found'}</p>
    <p>Ratings: ${data.rating.number ? data.rating.number : 'Not Found'}</p>
    <p>Total View: ${data.total_view ? data.total_view : 'Not found'}</p>
    <p>Trending: ${data.others_info.is_trending ? data.others_info.is_trending : "Not Found"}</p>
    <p>Detail News: ${data.details ? data.details : "Not found"}</p>
    
    
    `;

}



displayAllCategories();
displaynews('08');