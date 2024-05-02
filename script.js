fetch("https://api.tvmaze.com/shows")
.then(res => res.json())
.then(data => {
    console.log(data);
    const filmRow = document.querySelector(".filmRow");
    for (let i = 0; i < data.length; i++) {
        filmRow.innerHTML += `
            <div class="col-sm-12 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="${data[i].image.medium}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].name}</h5>
                        <p class="card-text">${data[i].summary.length>60 ? data[i].summary.substring(3,60)+ "...":data[i].summary}</p>
                        <a href="${data[i].officialSite}" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        `;
    }
})
.catch(error => {
    console.error('Fetch problem', error);
});


const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchTerm = document.querySelector("#searchInput").value;
    searchFilms(searchTerm);
});


function searchFilms(searchTerm) {
    const searchUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        const filmRow = document.querySelector(".filmRow");
        filmRow.innerHTML = ''; 
        for (let i = 0; i < data.length; i++) {
            filmRow.innerHTML += `
                <div class="col-sm-12 col-md-4 col-lg-3 mb-4">
                    <div class="card">
                        <img src="${data[i].show.image.medium}"
                            class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].show.name}</h5>
                            <p class="card-text">${data[i].show.summary}</p>
                            <a href="${data[i].show.officialSite}" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Fetch problem', error);
    });
}
