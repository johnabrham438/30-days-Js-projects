const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById('add');
const history = document.getElementById('history-list');

const transactions = [];

function addTransaction() {
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if(!title){
        alert('please enter valid title');
        return;
    }
    const transaction  = {title, amount};
    transactions.push(transaction);

    titleInput.value = "";
    amountInput.value ="";

    renderTransaction(transaction, transactions.length - 1);
    updateTotals();



}
function renderTransaction(transaction, index) {
    const historyItem = document.createElement('div');
    historyItem.classList.add("history-item");

    historyItem.innerHTML = `
        <span class="remove-btn">X</span>
        <p>${transaction.title}</p>
        <span class="${transaction.amount > 0 ? 'income' : 'expense'}">
            ${transaction.amount > 0 ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
        </span>
    `;

    // Remove on click — no re-render
    const removeBtn = historyItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        // Remove from array
        transactions.splice(index, 1);

        // Remove from DOM
        historyItem.remove();

        // Update totals
        updateTotals();
    });

    history.appendChild(historyItem);
}
function updateTotals() {
    const income = transactions
    .filter( t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
    
     const expense = transactions
    .filter( t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

    const total = income + expense;

    document.getElementById("income-amount").textContent = `+$${income.toFixed(2)}`;
    document.getElementById("expense-amount").textContent = `-$${Math.abs(expense.toFixed(2))}`;
    document.getElementById("total-balance").textContent = `$${total.toFixed(2)}`;

}

addBtn.addEventListener('click', addTransaction);


