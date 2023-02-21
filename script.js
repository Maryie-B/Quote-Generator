const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const progressBar = document.getElementById('bar');

let apiQutoes = [];

function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQutoes[Math.floor(Math.random() *apiQutoes.length)];
    
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length for styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    // resets the animation every time the button is clicked or the progress bar reaches zero
    progressBar.classList.remove('progress-bar');
    void progressBar.offsetWidth;
    progressBar.classList.add('progress-bar');

}

// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQutoes = await response.json();
        newQuote();
    } catch (error) {
        console.log('Ooops, something went wrong!');
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

progressBar.addEventListener('animationend', () => { newQuote() });
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();