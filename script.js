const apiKey = '1589491d59a24ce0a2c78c0ce2a1f296';
const blogContainer = document.getElementById("block-container"); // Corrected ID

const searchfield = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`; // Corrected URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displaybox(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    articles.forEach(article => {
        const boxcard = document.createElement("div");
        boxcard.classList.add("box1");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "......" : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = article.description;

        boxcard.appendChild(img);
        boxcard.appendChild(title);
        boxcard.appendChild(description);
        boxcard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(boxcard);
    });
}

searchbutton.addEventListener("click", async () => {
    const query = searchfield.value.trim(); // Use value instead of ariaValueMax
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displaybox(articles);
        } catch(error) {
            console.error("Error fetching news", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchRandomNews();
        console.log(articles);
        displaybox(articles);
    } catch(error) {
        console.error("Error fetching random news", error);
    }
})();
