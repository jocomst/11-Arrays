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

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  //sorting
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mov, i) {
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

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
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
let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !isSorted);
  isSorted = !isSorted;
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



// some

console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 5000));

// every only return true if all the elements in an array pass the test
//can seperate callback into seperate variable
const deposit = mov => mov > 0;

console.log(account4.movements.every(deposit));


//flat and flat map

const nestedArr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(nestedArr.flat());

//flat only goes one level deep, parameter should be how many levels deep you want

const doubleNested = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(doubleNested.flat(2));

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((accum, cur) => accum + cur);

console.log(overallBalance);

//flatmap

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((accum, cur) => accum + cur);

console.log(overallBalance2);



// sorting
//sort method mutates og array
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort());

//return something less than 0, a is before b,
// greater than 0 b then a
movements.sort((a, b) => a - b);
console.log(movements);
movements.sort((a, b) => b - a);
console.log(movements);



// we are used to handwriting arrays

//empty array and full array fill method
const x = new Array(7);
const ranArr = [1, 2, 3, 4, 5, 6, 7, 8];

x.fill(1, 3, 5);

ranArr.fill(23, 4, 6);
console.log(x);
console.log(ranArr);

// array.from

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const randomArr = Array.from(
  { length: 100 },
  cur => (cur = Math.trunc(Math.random() * 6) + 1)
);
console.log(randomArr);

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );
  console.log(movementsUI);
});



// exercise 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((accum, cur) => accum + cur, 0);

console.log(bankDepositSum);

// exercise 2

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((accum, cur) => (cur >= 1000 ? ++accum : accum), 0);
console.log(numDeposits1000);

let a = 10;

// a++ returns value prior to increment
console.log(a++);

// exercise 3 object that contains deposits and withdrawals

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// exercise 4
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');

  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));

*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

const findOwnerDog = function (owner, dogArr) {
  const sarahDog = dogArr.find(dog => dog.owners.includes('Sarah'));
  console.log(sarahDog);
};

findOwnerDog('Sarah', dogs);

const ownersEatTooMuch = dogs
  .filter(dogs => dogs.curFood > dogs.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dogs => dogs.curFood < dogs.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch, ownersEatTooLittle);

console.log(ownersEatTooLittle.join(', ') + ` dogs eat too little`);

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
