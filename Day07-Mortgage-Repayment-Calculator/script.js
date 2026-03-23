const clearCalculator = document.querySelector(".calculator-clear");
const mortgageAmount = document.getElementById("mortgage-amount");
const mortgageTerm = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const amountGroup =  document.getElementById("amount-group");
const amountError = document.getElementById("amount-error");
const termGroup = document.getElementById("term-group");
const termError = document.getElementById("term-error");
const rateGroup = document.getElementById("rate-group");
const rateError = document.getElementById("rate-error");
const calculateBtn = document.querySelector(".calculator-button");

const resultEmpty = document.querySelector(".result-empty");
const resultCompleted = document.querySelector(".result-completed");

function validateInput(input, errorElement, container) {
    const prefix = container.querySelector(".input-prefix");
    const suffix = container.querySelector(".input-suffix");

    if (!input.value.trim()) {
        errorElement.style.display = "flex";
        container.classList.add("error");

        if (prefix) prefix.classList.add("error-prefix-suffix");
        if (suffix) suffix.classList.add("error-prefix-suffix");

        return false;
    } else {
        errorElement.style.display = "none";
        container.classList.remove("error");

        if (prefix) prefix.classList.remove("error-prefix-suffix");
        if (suffix) suffix.classList.remove("error-prefix-suffix");

        return true;
    }
}

function validateRadio() {
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    const typeError = document.getElementById("type-error");

    if (!mortgageType) {
        typeError.style.display = "flex";
        return false;
    } else {
        typeError.style.display = "none";
        return true;
        
    }
}

function calculateMortgage(principal, annualRate, years) {
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    let monthlyPayment;
    let totalRepayment;

    if (mortgageType.id === "repayment") {
        if (monthlyRate === 0) {
            monthlyPayment = principal / totalPayments;
        } else {
            monthlyPayment =
                principal *
                (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                (Math.pow(1 + monthlyRate, totalPayments) - 1);
        }

        totalRepayment = monthlyPayment * totalPayments;
    } else {
        monthlyPayment = principal * monthlyRate;

        const totalInterest = monthlyPayment * totalPayments;
        totalRepayment = totalInterest + principal;
    }

    document.querySelector('.monthly-repayment').innerHTML = "€" + monthlyPayment.toFixed(2);
    document.querySelector('.total-repayment').innerHTML = "€" + totalRepayment.toFixed(2);
}
function clearInput(){
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked')

    mortgageAmount.value = "";
    interestRate.value = "";
    mortgageTerm.value = "";
    mortgageType.checked = false;

    resultEmpty.style.display = "flex";
    resultCompleted.style.display = "none";

}

calculateBtn.addEventListener("click", () => {
    let isValid = true;

    if (!validateInput(mortgageAmount, amountError, amountGroup)) {
        isValid = false;
    }

    if (!validateInput(mortgageTerm, termError, termGroup)) {
        isValid = false;
    }

    if (!validateInput(interestRate, rateError, rateGroup)) {
        isValid = false;
    }
    if(!validateRadio()){
        isValid = false;
    }
 
    if (isValid) {
        calculateMortgage(mortgageAmount.value, interestRate.value, mortgageTerm.value);

        resultEmpty.style.display = "none";
        resultCompleted.style.display = "flex";
    }
    
})

clearCalculator.addEventListener('click', clearInput);
