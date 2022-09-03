const displayAllCategories = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/category/01'
        fetch(url)
            .then(res => res.json())
            .then(data => displaySort(data.data));

    }
    catch (error) {
        console.log('The error is:', error);

    }
}

const displaySort = (id) => {
    id.sort((a, b) => {
        return b.total_view - a.total_view;
    })

    id.forEach((e) => {
        console.log(` ${e.total_view}`);
    });

}





displayAllCategories();