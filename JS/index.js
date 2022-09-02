const displayAllCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);

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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    news(data.data);
}







const news = (allnews) => {
    const newsField = document.getElementById('display-news');
    newsField.textContent = '';
    for (const news of allnews) {
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
                                    <img src="${news.author.img}" class="img-fluid rounded-start  rounded-5  my-3 " alt="...">
                                 </div>
                                <div class="p-3">
                                    <p>${news.author.name} </p>
                                    <p>${news.author.published_date} </p>
                                 </div> 
                                 </div>             
                                 <div class="d-flex">
                                    <p class="p-3">View: ${news.total_view} </p>
                                    

                            </div>
                                 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
`;


        newsField.appendChild(divField);

    }

}

displayAllCategories();