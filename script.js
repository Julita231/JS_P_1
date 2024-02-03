import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const availableAmount = document.getElementById("available-amount");

const incomeForm = document.getElementById("incomeForm");
const incomeName = document.getElementById("income-name");
const incomeValue = document.getElementById("income-value");
const incomeList = document.getElementById("income-list");
const totalIncome = document.getElementById("total-income");
const incomeArray = [];
let incomesSum = 0;

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expense-name");
const expenseValue = document.getElementById("expense-value");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const expenseArray = [];
let expenseSum = 0;

// funkcje dodawania:
const updateAvailableSum = () => {
  const availableSum = incomesSum - expenseSum;
  if (availableSum === 0) {
    availableAmount.innerText = "Bilans wynosi zero";
  } else if (availableSum > 0) {
    availableAmount.innerText = `Możesz jeszcze wydać ${availableSum} złotych`;
  } else {
    const absoluteSum = Math.abs(availableSum);
    availableAmount.innerText = `Bilans jest ujemny. Jesteś na minusie ${absoluteSum} złotych`;
  }
};

const updateIncomeSum = () => {
  incomesSum = incomeArray.reduce(
    (acc, currentValue) => acc + currentValue.amount,
    0
  );
  totalIncome.innerText = incomesSum;
};

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

const addIncome = () => {
  const income = {
    name: incomeName.value,
    amount: Number(incomeValue.value),
    id: uuidv4(),
  };
  incomeArray.push(income);
  displayIncomes();
};

const displayIncomes = () => {
  incomeList.innerHTML = "";
  incomeArray.forEach((income) => {
    const li = document.createElement("li");
    const nameParagraph = document.createElement("p");
    const valueParagraph = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameParagraph.textContent = income.name;
    valueParagraph.textContent = `${income.amount} zł`;

    editButton.textContent = "Edytuj";
    deleteButton.textContent = "Usuń";

    li.className = "form";
    nameParagraph.className = "income";
    valueParagraph.className = "income";

    li.appendChild(nameParagraph);
    li.appendChild(valueParagraph);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    incomeList.appendChild(li);

    deleteButton.addEventListener("click", () => removeIncome(income.id));
    editButton.addEventListener("click", () => editIncome(income, li));
  });
  updateIncomeSum();
  updateAvailableSum();
};

const removeIncome = (id) => {
  const indexToRemove = incomeArray.findIndex((item) => item.id === id);
  console.log(indexToRemove);
  incomeArray.splice(indexToRemove, 1);
  console.log(removeIncome);
  displayIncomes();
};

const editIncome = (income, li) => {
  const editForm = document.createElement("form");
  const nameInput = document.createElement("input");
  const valueInput = document.createElement("input");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  nameInput.value = income.name;
  valueInput.value = income.amount;
  saveButton.textContent = "Zapisz";
  saveButton.type = "submit";
  cancelButton.textContent = "Anuluj";
  cancelButton.type = "button";
  editForm.className = "edit-form";

  editForm.appendChild(nameInput);
  editForm.appendChild(valueInput);
  editForm.appendChild(saveButton);
  editForm.appendChild(cancelButton);

  li.appendChild(editForm);

  cancelButton.addEventListener("click", () => {
    li.removeChild(editForm);
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    incomeArray.find((item) => {
      if (item.id === income.id) {
        item.name = nameInput.value;
        item.amount = Number(valueInput.value);
        displayIncomes();
      }
    });
  });
};

//poniżej js do wydatków

const updateExpenseSum = () => {
  expenseSum = expenseArray.reduce(
    (acc, currentValue) => acc + currentValue.amount,
    0
  );
  totalExpenses.innerText = expenseSum;
};

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpense();
});

const addExpense = () => {
  const expense = {
    name: expenseName.value,
    amount: Number(expenseValue.value),
    id: uuidv4(),
  };
  expenseArray.push(expense);
  displayExpenses();
};

const displayExpenses = () => {
  expenseList.innerHTML = "";
  expenseArray.forEach((expense) => {
    const li = document.createElement("li");
    const nameParagraph = document.createElement("p");
    const valueParagraph = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameParagraph.textContent = expense.name;
    valueParagraph.textContent = `${expense.amount} zł`;

    editButton.textContent = "Edytuj";
    deleteButton.textContent = "Usuń";

    li.className = "form";
    nameParagraph.className = "income";
    valueParagraph.className = "income";

    li.appendChild(nameParagraph);
    li.appendChild(valueParagraph);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    expenseList.appendChild(li);

    deleteButton.addEventListener("click", () => removeExpense(expense.id));
    editButton.addEventListener("click", () => editExpense(expense, li));
  });
  updateExpenseSum();
  updateAvailableSum();
};

const removeExpense = (id) => {
  const indexToRemove = expenseArray.findIndex((item) => item.id === id);

  expenseArray.splice(indexToRemove, 1);

  displayExpenses();
};

const editExpense = (expense, li) => {
  const editForm = document.createElement("form");
  const nameInput = document.createElement("input");
  const valueInput = document.createElement("input");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  nameInput.value = expense.name;
  valueInput.value = expense.amount;
  saveButton.textContent = "Zapisz";
  saveButton.type = "submit";
  cancelButton.textContent = "Anuluj";
  cancelButton.type = "button";
  editForm.className = "edit-form";

  editForm.appendChild(nameInput);
  editForm.appendChild(valueInput);
  editForm.appendChild(saveButton);
  editForm.appendChild(cancelButton);

  li.appendChild(editForm);

  cancelButton.addEventListener("click", () => {
    li.removeChild(editForm);
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    expenseArray.find((item) => {
      if (item.id === expense.id) {
        item.name = nameInput.value;
        item.amount = Number(valueInput.value);
        displayExpenses();
      }
    });
  });
};
