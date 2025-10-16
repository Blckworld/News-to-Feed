const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

let newsDataArr = [];


const BASE_URL = "https://newsdata.io/api/1/news";
const API_KEY = "pub_ed7c7f02e34c443091ad96b9f85f7e12"; // 

const HEADLINES_NEWS = `${BASE_URL}?country=in&language=en&apikey=${API_KEY}`;
const GENERAL_NEWS = `${BASE_URL}?country=in&language=en&category=top&apikey=${API_KEY}`;
const BUSINESS_NEWS = `${BASE_URL}?country=in&language=en&category=business&apikey=${API_KEY}`;
const SPORTS_NEWS = `${BASE_URL}?country=in&language=en&category=sports&apikey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `${BASE_URL}?country=in&language=en&category=entertainment&apikey=${API_KEY}`;
const TECHNOLOGY_NEWS = `${BASE_URL}?country=in&language=en&category=technology&size=8&apikey=${API_KEY}`;
const SEARCH_NEWS = (query) => `${BASE_URL}?q=${encodeURIComponent(query)}&language=en&apikey=${API_KEY}`;


window.onload = function () {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};


generalBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
    if (newsQuery.value.trim() !== "") {
        newsType.innerHTML = `<h4>Search : ${newsQuery.value}</h4>`;
        fetchQueryNews();
    }
});


const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchQueryNews = async () => {
    const response = await fetch(SEARCH_NEWS(newsQuery.value));
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.results;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

// ======================
// Display Function 
// ======================
function displayNews() {
    newsdetails.innerHTML = "";

    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    newsDataArr.forEach(news => {
        const date = news.pubDate ? news.pubDate.split(" ")[0] : "No date";

        // limit description length
        let shortDescription = news.description || "";
        const maxLength = 100; // you can change this length
        if (shortDescription.length > maxLength) {
            shortDescription = shortDescription.substring(0, maxLength) + "...";
        }

        
        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 d-flex";

       
        const card = document.createElement('div');
        card.className = "card flex-fill h-100 shadow-sm";

       
        const image = document.createElement('img');
        image.className = "card-img-top";
        image.src = news.image_url || "https://via.placeholder.com/300x200?text=No+Image";
        image.alt = "news-image";
        image.style.height = "180px";
        image.style.objectFit = "cover";

        
        const cardBody = document.createElement('div');
        cardBody.className = "card-body d-flex flex-column";

        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title || "No Title";

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary mb-2";
        dateHeading.innerHTML = date;

        const description = document.createElement('p');
        description.className = "card-text text-muted flex-grow-1";
        description.innerHTML = shortDescription;

        const link = document.createElement('a');
        link.className = "btn btn-dark mt-auto";
        link.setAttribute("target", "_blank");
        link.href = news.link || "#";
        link.innerHTML = "Read more";

       
        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);
        col.appendChild(card);
        newsdetails.appendChild(col);
    });
}



// ======================
// Google Translate (Optional)
// ======================
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}
