const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
  updateDOM();
}

//Add data
function addData(userData) {
  data.push(userData);
}

//Update DOM
function updateDOM() {
  //Clear main
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  data.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${user.name}</strong>${formatMoney(user.money)}`;
    main.appendChild(div);
  });
}

//Format money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double user money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Filter millionaires
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}

//Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((total, user) => (total += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    wealth
  )}</strong> </h3>`;

  main.appendChild(wealthElement);
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
