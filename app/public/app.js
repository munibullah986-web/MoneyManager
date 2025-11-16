// app.js

const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const financialList = document.getElementById('financial-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

let financialData = [];
let totalIncome = 0;
let totalExpenses = 0;

// Income form submission
incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('income-amount').value);
    const source = document.getElementById('income-source').value;
    const category = document.getElementById('income-category').value;
    const date = document.getElementById('income-date').value;

    if (amount && source && date) {
        financialData.push({ type: 'Income', amount, source, category, date });
        totalIncome += amount;
        updateFinancialSummary();
        incomeForm.reset();
    }
});

// Expense form submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('expense-amount').value);
    const description = document.getElementById('expense-description').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (amount && description && date) {
        financialData.push({ type: 'Expense', amount, description, category, date });
        totalExpenses += amount;
        updateFinancialSummary();
        expenseForm.reset();
    }
});

// Update financial summary
function updateFinancialSummary() {
    // Update financial table
    financialList.innerHTML = '';
    financialData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-3 border-b">${entry.date}</td>
            <td class="p-3 border-b">${entry.type === 'Income' ? entry.category : entry.description}</td>
            <td class="p-3 border-b">${entry.amount}</td>
            <td class="p-3 border-b">${entry.type === 'Income' ? entry.source : entry.category}</td>
        `;
        financialList.appendChild(row);
    });

    // Update totals
    totalIncomeEl.textContent = totalIncome;
    totalExpensesEl.textContent = totalExpenses;
    balanceEl.textContent = totalIncome - totalExpenses;
}
