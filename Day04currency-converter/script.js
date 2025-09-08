const apiKey = "02c0396d4701b4d19f9948d6";
const fromCurrency = document.getElementById("from-currency-select");
const toCurrency = document.getElementById("to-currency-select");
const amountInput = document.getElementById("amount");
const convertedAmount = document.getElementById("converted-amount");
const fromCurrencyLabel = document.getElementById("from-currency-label");
const toCurrencyLabel = document.getElementById("to-currency-label");

const swapBtn = document.getElementById("swap-btn");
const convertBtn = document.getElementById("convert-btn");

let rates = {};

//fetch exchange rates and populate dropdowns

async function loadRates() {
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        console.log(data);
        
        rates = data.conversion_rates;
        

        Object.keys(rates).forEach(code => {
            fromCurrency.add(new Option(code, code));
            toCurrency.add(new Option(code, code));
        });

        fromCurrency.value = "USD";
        toCurrency.value = 'EUR';

        convert();

    } catch(error){
        console.error("Error fetching rates:", error);
        
    }
}



// convert function
function convert() {
    const from = fromCurrency.value;
    const to  = toCurrency.value;    
    const amount = parseFloat(amountInput.value);

    if(isNaN(amount)) return;

    const result = (amount/ rates[from]) * rates[to];
    convertedAmount.value = result.toFixed(2);

    fromCurrencyLabel.innerText = `${amount} ${from}`;
    toCurrencyLabel.innerText = `${result} ${to}`;


    
}
//swap function 
function swapCurrencies(){
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convert();
}

// event listener
convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swapCurrencies);

// Load rates on startup
loadRates();