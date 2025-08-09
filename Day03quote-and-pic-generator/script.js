const quoteEl = document.getElementById('quote');
const generateBtn =  document.getElementById('Generate-btn');
const saveBtn =  document.getElementById('Save-btn');
const resetBtn =  document.getElementById('Reset-btn');
const defaultContent = quoteEl.textContent;



const API_KEY = 'mNpzvJcFqNlxbH5e0fbi8vSjXD3zvOACfihdVaSGXAdCldYqxprjwxU2';
const query  = 'old architecture';

function preloadImage(url, callback) {
  const img = new Image();
  img.src = url;
  img.onload = () => callback();
}
async function setRandomBackground() {
    const page =  Math.floor(Math.random() * 100) + 1;
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=${page}`;
    
    const response = await fetch(url, {

        headers: {
            Authorization: API_KEY
        }
    });

    const data = await response.json();
    if(data.photos && data.photos.length > 0){
        const photoUrl = data.photos[0].src.landscape;
        document.getElementById("quote-container").style.backgroundImage = `url('${photoUrl}')`;
      
    } else{
        console.error("No photo found");
    }
}
async function fetchQuote() {
  try {
    quoteEl.textContent = "Loading...";
    generateBtn.style.display = 'none';

    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) throw new Error("Quote API error");

    const quote = await response.json();
    quoteEl.textContent = `"${quote.slip.advice}"`;

    saveBtn.style.display = "block";
    resetBtn.style.display = "block";

  } catch (error) {
    quoteEl.textContent = "Failed to load advice, try again.";
    generateBtn.style.display = 'block';
    saveBtn.style.display = "none";
    resetBtn.style.display = "none";
    console.error(error);
  }
}
async function saveQuote() {
  const quoteContainer = document.getElementById('quote-container');
  const bgImage = quoteContainer.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
  
  try {
    await preloadImage(bgImage);
    html2canvas(quoteContainer, {useCORS: true}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = "quote.png";
      link.click();
    });
  } catch (err) {
    console.error('Image failed to load or cross-origin error', err);
  }
}
function resetContent(){
  quoteEl.textContent = defaultContent;
  resetBtn.style.display = "none";
  saveBtn.style.display = "none";
  generateBtn.style.display = "block";
  document.getElementById("quote-container").style.background = "none";

}
generateBtn.addEventListener('click',() => {
    fetchQuote();
    setRandomBackground();
});
saveBtn.addEventListener('click', saveQuote);
resetBtn.addEventListener('click', resetContent);