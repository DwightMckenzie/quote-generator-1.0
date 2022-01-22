// API VERSION
/////////////////////////////////////////////////
const qCntnr = document.getElementById('qte-cntnr');
const qteTxt = document.getElementById('qte');
const athrTxt = document.getElementById('athr');
const twttrBtn = document.getElementById('twttr');
const nwQteBtn = document.getElementById('nw-qte');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  qCntnr.hidden = true;
}
function complete() {
  qCntnr.hidden = false;
  loader.hidden = true;
}

function newQte() {
  loading();
  // pic random quote from quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  // substitute author if field empty
  if (!quote.author) {
    athrTxt.textContent = 'Unkown';
  } else {
    athrTxt.textContent = quote.author;
  }

  // adjust font size depending quote length
  if (quote.text.length > 100) {
    qteTxt.classList.add('lng-qte');
  } else {
    qteTxt.classList.remove('lng-qte');
  }

  // quote set, hide loader
  qteTxt.textContent = quote.text;
  complete();
}

// get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    newQte();
  } catch (error) {
    // catch error here
  }
}

// tweet quote
function twtQute() {
  const twttrUrl = `https://twitter.com/intent/tweet?text= ${qteTxt.textContent} - ${athrTxt.textContent}`;
  window.open(twttrUrl, '_blank'); // opens new tab in browser
}

nwQteBtn.addEventListener('click', newQte);
twttrBtn.addEventListener('click', twtQute);

// onload
getQuotes();

// LOCAL VERSION
/////////////////////////////////////////////////
// function newQuote() {
//   // pic random quote from quote array
//   const quote = lclQuotes[Math.floor(Math.random() * lclQuotes.length)];
//   console.log(quote);
// }
// newQuote();