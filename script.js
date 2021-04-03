const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//Hide Loading
function complete()
{
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//Show New Quote
function newQuote()
{
    loading();
    //Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
    //const quote = localQuotes[Math.floor(Math.random() *localQuotes.length)];
    //console.log(quote);

    //Check if the author field is blan and replace it with unknown
    if(!quote.author)
    {
        authorText.textContent='Unknown';
    }
    else
    {
        authorText.textContent=quote.author;  
    }
    //Check the length of the quote to determine the styling
    if(quote.text.length<100)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}




//Get Quotes from API
/*

*/

//On Load
async function getQuotes()
{
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
       //console.log(apiQuotes[12]);
    }
    catch(error)
    {
        alert("NO SE PUDO CONSEGUIR LA CITA")

    }
}

//Tweetear cita
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();
//loading();
//newQuote();