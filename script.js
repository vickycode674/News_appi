const api_key="8b2b610e83ba479eb1610431e2e1fa19";

const url="https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${api_key}`);
    const data=await res.json();  //json(function is critcal)
    bindData(data.articles);
} 

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

    function fillDataInCard(cardClone,article){
        const newsImg=cardClone.querySelector('#news-img');
        const newsTitle=cardClone.querySelector('#news-title');
        const newsSource=cardClone.querySelector('#news-source');
        const newsDesc=cardClone.querySelector('#news-desc');

        newsImg.src= article.urlToImage
        newsTitle.innerHTML=article.title
        newsDesc.innerHTML=article.description

        const date=new Date(article.publishedAt).toLocaleDateString("en-us",{
            timeZone:"Asia/Jakarta"
        });

        newsSource.innerHTML=`${article.source.name} . ${date}`;

        //userclick reach to website

        cardClone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });
    }

    let curSelectedNav = null;
    function onNavItemClick(id) {
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }

let searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");  //after searching new element active will be reomved
    curSelectedNav = null; //an keep it fresh
});
