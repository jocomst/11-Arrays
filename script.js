'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}
    </div>
    <div class="movements__date">24/01/2037</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const getInitials = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(fullName => fullName.at(0))
      .join('');
  });
};
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((accum, cur) => accum + cur, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

getInitials(accounts);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((accum, cur) => accum + cur, 0);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} EUR`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} EUR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};

const updateUI = function (acc) {
  displayMovements(acc);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // display movements
    updateUI(currentAccount);
    console.log('log in!');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //delete accoutn
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});
// console.log(account1.username);
// console.log(account2.username);
// console.log(account3.username);
// console.log(account4.username);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
//slice returns new array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(0, -2));
console.log(arr.slice());

// splice does change the original array

// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// reverse method changes original array
console.log(arr2.reverse());

// concat method

const letters = arr.concat(arr2);

console.log(letters);
console.log([...arr, ...arr2]);

// join

console.log(letters.join('-'));

// at method

const arr = [23, 11, 64];

console.log(arr.at(0));

console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('john'.at(-1));



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const value of movements) {
  if (value > 0) {
    console.log(`You deposited ${value}`);
  } else {
    console.log(`You withdrew ${Math.abs(value)}`);
  }
}

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement: ${index} You deposited ${movement}`);
  } else {
    console.log(`Movement: ${index} You withdrew ${Math.abs(movement)}`);
  }
});


// looping map foreach
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});



const [dogsJulia1, dogsJulia2] = [
  [3, 5, 2, 12, 7],
  [9, 16, 6, 8, 3],
];

const [dogsKate1, dogsKate2] = [
  [4, 1, 15, 8, 3],
  [10, 5, 6, 1, 4],
];

const checkDogs = function (juliaDogs, kateDogs) {
  const totalDogs = juliaDogs.slice(1, 3).concat(kateDogs);
  totalDogs.forEach(function (age, i) {
    console.log(
      `Dog number ${i + 1} ${
        totalDogs.at(i) >= 3 ? `is ${totalDogs.at(i)}` : `is still a puppy`
      }`
    );
  });
};
console.log(dogsJulia1, dogsJulia2);

checkDogs(dogsJulia1, dogsKate1);
checkDogs(dogsJulia2, dogsKate2);



//map filter reduce

//map takes and loops over an array, runs callback function on each element
// then adds new element to new array

// map function

const eurToUsd = 1.1;

const convertedMovements = movements.map(mov => mov * eurToUsd);

console.log(movements, convertedMovements);

const movementsUSD = [];
for (const mov of movements) {
  movementsUSD.push(mov * eurToUsd);
}
console.log(movementsUSD);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement: ${i + 1} ${
      mov > 0 ? `You deposited ${mov}` : `You withdrew ${Math.abs(mov)}`
    }`
);

console.log(movementsDescriptions);


//filter methods
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);


// reduce : array to single value

//first paramter in reduce callback is accumulated value
const globalBalance = movements.reduce((accum, cur) => accum + cur, 0);
// console.log(globalBalance);

//maximum value of the array

const maximumValue = movements.reduce((acc, cur) => {
  if (acc >= cur) {
    return acc;
  } else {
    return cur;
  }
}, movements[0]);

// console.log(maximumValue);

const averageHumanAge = function (dogArr) {
  const humanAgeOfDogs = dogArr.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAgeOfDogs);
  const adults = humanAgeOfDogs.filter(age => {
    return age > 18;
  });
  console.log(adults);
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return average;
};
console.log(averageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(averageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

// pipeline

// const averageHumanAge = function (dogArr) {
//   const humanAgeOfDogs = dogArr
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return humanAgeOfDogs;
// };

// console.log(averageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(averageHumanAge([16, 6, 10, 5, 1, 6, 4]));

const firstWithdrawal = movements.find(mov => mov < 0);

//find only returns the first element found in the array it is called on
const accountz = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accountz);
