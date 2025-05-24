document.addEventListener("DOMContentLoaded", () => {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const totalBudgetInput = document.getElementById("total-budget");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalExpensesEl = document.getElementById("total-expenses");
  const remainingBudgetEl = document.getElementById("remaining-budget");

  let totalBudget = 0;
  let expenses = [];

  function updateExpenseList() {
    expenseList.innerHTML = '';
    let totalExpenses = 0;

    expenses.forEach(item => {
      const li = document.createElement("li");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = item.name;
      nameSpan.classList.add("name-span");

      const priceSpan = document.createElement("span");
      priceSpan.textContent = `৳${Number.isInteger(item.amount) ? item.amount : item.amount.toFixed(2)}`;
      priceSpan.classList.add("price-span");

      li.appendChild(nameSpan);
      li.appendChild(priceSpan);
      expenseList.appendChild(li);

      totalExpenses += item.amount;
    });

    const remaining = totalBudget - totalExpenses;
    totalExpensesEl.textContent = Number.isInteger(totalExpenses) ? totalExpenses : totalExpenses.toFixed(2);
    remainingBudgetEl.textContent = Number.isInteger(remaining) ? remaining : remaining.toFixed(2);
  }

  budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    totalBudget = parseFloat(totalBudgetInput.value);
    if (!isNaN(totalBudget) && totalBudget > 0) {
      budgetForm.style.display = "none";
      expenseForm.style.display = "flex";
      updateExpenseList();
    }
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (name !== "" && !isNaN(amount)) {
      expenses.push({ name, amount });
      updateExpenseList();
      expenseForm.reset();
    }
  });
});
