'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Gaurav Singh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-02-18T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-12-10T14:43:26.374Z',
    '2021-02-15T18:49:59.371Z',
    '2021-02-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Avinash Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', 
};

const account3 = {
  owner: 'Vipul Pathak',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Ankit Anand',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-02-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', 
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

/////////////////////////////////////////////////

const createUser = function(acc){
  acc.forEach(function(ac){
    ac.username = ac.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
}
createUser(accounts);

const updateTheUI = function(acc){
    totalBalance(acc);

    currentBalance(acc);

    displayInOutData(acc.movements);
}

const formatDate = function (date) {

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;

};

const displayInOutData = function(movements , sort=false){
  containerMovements.innerHTML = ' ';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i, arr){
    const typeOfInOut = (mov > 0) ? 'deposit' : 'withdrawal' ;
    const date = new Date(currentUser.movementsDates[i]);
    console.log(date);
    const displayDate = formatDate(date) ;
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${typeOfInOut}">${i+1} ${typeOfInOut}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${Math.abs(mov)}€</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html);
  });

}


const currentBalance = function(acc){
  const deposited = acc.movements.filter((mov) => mov > 0)
  .reduce((ac, mov)=> ac + mov, 0);
  labelSumIn.textContent = `${deposited}€`;

  const withdrew = acc.movements.filter((withd) => withd < 0)
  .reduce((ac, mov)=> ac + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrew)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((ac, int) => ac + int, 0);
  labelSumInterest.textContent = `${interest}€`;
  }

const totalBalance = function(acc){
  acc.balance = acc.movements.reduce((ac, mov) => ac + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

let currentUser, timer;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  currentUser = accounts.find(ac => 
    (ac.username === inputLoginUsername.value));

    if((currentUser) && (currentUser.pin === Number(inputLoginPin.value))){
      labelWelcome.textContent = `Welcome back ${currentUser.owner.split(' ')[0]}`
      containerApp.style.opacity = 100 ;

      const date = new Date();
      const day = `${date.getDate()}`.padStart(2, 0);
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const year = date.getFullYear();
      const hour =`${date.getHours()}`.padStart(2, 0);
      const min =`${date.getMinutes()}`.padStart(2, 0); 

      labelDate.textContent = `${day}/${month}/${year}  ${hour}:${min}`;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      if (timer) clearInterval(timer);
      timer = loggedOutTimer();
  

      updateTheUI(currentUser);
    }
})


btnTransfer.addEventListener('click',function(e){

  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const transTo = accounts.find ((acc)=> acc.username === inputTransferTo.value);

  if((amount > 0 ) && (transTo) && (currentUser.balance > amount) 
  && (transTo?.username !== currentUser.username) ){
    currentUser.movements.push(-amount);
    currentUser.movementsDates.push( new Date().toISOString());
    transTo.movements.push(amount);
    transTo.movementsDates.push( new Date().toISOString());
    

    inputTransferAmount.value = inputTransferTo.value = '';

    updateTheUI(currentUser);
  
  }
})

btnClose.addEventListener('click',function(e){

  e.preventDefault();

  currentUser = accounts.find ((acc)=> 
  acc.username === inputCloseUsername.value);

  if((currentUser) && 
  (currentUser.pin === Number(inputClosePin.value))){
  
    const index = accounts.findIndex((acc) => 
    acc.username === currentUser.username);
    console.log(index);
    accounts.splice(index,1);

    containerApp.style.opacity = 0 ;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = '';

  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amountOfLoan = Number(inputLoanAmount.value);

  if((amountOfLoan > 0) && 
  (currentUser.movements.some((acc) => acc >= amountOfLoan * 0.1))){
    currentUser.movements.push(amountOfLoan);
    currentUser.movementsDates.push( new Date().toISOString());
    updateTheUI(currentUser);
    inputLoanAmount.value = '';
  }
})
let time = 300;
const loggedOutTimer = function(){
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

let sort = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();

  displayInOutData(currentUser.movements, !sort);
  sort = !sort ;
  
});