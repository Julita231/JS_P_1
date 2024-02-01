import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const incomeForm = document.getElementById("incomeForm");
const incomeName = document.getElementById("income-name");
const incomeValue = document.getElementById("income-value");
const incomeList = document.getElementById("income-list");
const incomeArray = [];

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
    valueParagraph.textContent = income.amount;
    editButton.textContent = "Edytuj";
    deleteButton.textContent = "Usuń";

    li.appendChild(nameParagraph);
    li.appendChild(valueParagraph);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    incomeList.appendChild(li);

    deleteButton.addEventListener("click", () => removeIncome(income.id));
  });
};

const removeIncome = (id) => {
  const indexToRemove = incomeArray.findIndex((item) => item.id === id);
  console.log(indexToRemove);
  incomeArray.splice(indexToRemove, 1);
  console.log(incomeArray);
  displayIncomes();
};
