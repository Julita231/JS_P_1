import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const incomeForm = document.getElementById("incomeForm");
const incomeName = document.getElementById("income-name");
const incomeValue = document.getElementById("income-value");
const incomeArray = [];

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const income = {
    name: incomeName.value,
    amount: Number(incomeValue.value),
    id: uuidv4(),
  };
  console.log(income);
});
