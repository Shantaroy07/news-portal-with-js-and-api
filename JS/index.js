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
        <p onclick ="displaynews('${category.category_id.data}')">${category.category_name}</p>
        
        `;
        categoryField.appendChild(divField);
    }
}

const displaynews = (news) => {
    const newsField = document.getElementById('display-news');
    const divField = document.createElement('div');
    divField.innerHTML = `
            <div class="card mb-3 mx-4">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=".." class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
`;


    newsField.appendChild(divField);
    const img = id.data;
    console.log(id);
}

displayAllCategories();