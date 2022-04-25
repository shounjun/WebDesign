'use strict';

///////////////////
//Acount
// Data
const account1: {
  owner: string;
  pin: number;
} = {
  owner: 'Jonas Schmedtmann',
  pin: 1111,
};

const accounts = [account1];

let orders = [];
let totalPrice = 0;

let plates = [
  {
    Name: 'Salmon',
    Day: 'Monday',
    Type: 'Fish',
    Price: 8,
    img: 'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg',
  },
  {
    Name: 'Lasagna',
    Day: 'Monday',
    Type: 'Meat',
    Price: 7,
    img: 'https://cdn.pixabay.com/photo/2016/12/11/22/41/lasagna-1900529_960_720.jpg',
  },
  {
    Name: 'Sardines',
    Day: 'Tuesday',
    Type: 'Fish',
    Price: 6,
    img: 'https://cdn.pixabay.com/photo/2016/06/30/18/49/sardines-1489626_960_720.jpg',
  },
  {
    Name: 'Chicken',
    Day: 'Tuesday',
    Type: 'Meat',
    Price: 5,
    img: 'https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg',
  },
  {
    Name: 'Fish And Chips',
    Day: 'Wednesday',
    Type: 'Fish',
    Price: 5,
    img: 'https://cdn.pixabay.com/photo/2019/11/05/00/07/fish-and-chips-4602434_960_720.jpg',
  },
  {
    Name: 'Hamburguer',
    Day: 'Wednesday',
    Type: 'Meat',
    Price: 4,
    img: 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459_960_720.jpg',
  },
  {
    Name: 'Sushi',
    Day: 'Thursday',
    Type: 'Fish',
    Price: 10,
    img: 'https://cdn.pixabay.com/photo/2016/11/25/16/08/sushi-1858696_960_720.jpg',
  },
  {
    Name: 'Spaghetti bolognese',
    Day: 'Thursday',
    Type: 'Meat',
    Price: 7,
    img: 'https://image.freepik.com/free-photo/plate-basil-cherry-gourmet-menu_1220-1184.jpg',
  },
  {
    Name: 'Chicken',
    Day: 'Friday',
    Type: 'Meat',
    Price: 6,
    img: 'https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg',
  },
  {
    Name: 'Fish Soup',
    Day: 'Friday',
    Type: 'Fish',
    Price: 7,
    img: 'https://cdn.pixabay.com/photo/2018/01/01/17/57/fish-soup-3054627_960_720.jpg',
  },
];

let user = {};

const initFromLocalStorage = function () {
  const userString = localStorage.getItem('user');
  if (userString != null) {
    user = JSON.parse(localStorage.getItem('user'));
    document?.getElementById('section--4').style.visibility = 'visible';
  }

  const ordersString = localStorage.getItem('orders');
  if (ordersString != null) {
    orders = JSON.parse(localStorage.getItem('orders'));
    orders.forEach(order => {
      addOrder(order, false);
    });
  }
};

const addOrder = function (plate: object, saveInLocalStorage: boolean) {
  const orderTableBody = document.getElementById('orderBody');
  const row = document.createElement('tr');
  const plateTD = document.createElement('td');
  const priceTD = document.createElement('td');

  plateTD.innerHTML = plate.Name;
  priceTD.innerHTML = plate.Price + '€';

  row.appendChild(plateTD);
  row.appendChild(priceTD);

  orderTableBody?.appendChild(row);
  console.log('Added ' + plate.Name);
  let currentOrder = { Name: plate.Name, Price: plate.Price };
  if (saveInLocalStorage) {
    orders.push(currentOrder);
    window.localStorage.setItem('orders', JSON.stringify(orders));
  }
  const totalPriceText = document.getElementById('totalPrice');
  totalPrice += plate.Price;
  totalPriceText?.innerHTML = totalPrice.toString() + '€';
};

const buildMenu = function (tableID: string, addBuyButton: boolean) {
  plates.forEach(plate => {
    const table = document.getElementById(tableID);
    const td = table?.querySelector('#' + plate.Day + '-' + plate.Type);
    const div = document.createElement('div');
    const name = document.createElement('p');
    const image = document.createElement('img');
    const price = document.createElement('p');
    const btn = document.createElement('button');

    name.innerText = plate.Name;
    image.src = plate.img;
    price.innerText = `Price: ${plate.Price}€`;
    btn.innerHTML = 'Buy';
    btn.addEventListener('click', function (e) {
      addOrder(plate, true);
      btn.style.visibility = 'hidden';
    });

    div.append(name);
    div.append(price);
    div.append(image);
    if (addBuyButton) div.append(btn);

    if (td !== null) {
      td?.append(div);
    }
  });
};

buildMenu('section--2', false);
buildMenu('section--4', true);
initFromLocalStorage();
//////////////////////////

//Login
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const btnSubmit = document.querySelector('.btnSubmit');
const btnLogout = document.querySelector('.btnLogout');

//////////////////////////////////
const createUsernames = function (accs: object[]) {
  accs.forEach(function (acc: object) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
let currentUser;

btnSubmit?.addEventListener('click', function (e) {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentUser);
  if (
    (currentUser === null || currentUser === void 0
      ? void 0
      : currentUser.pin) === Number(inputLoginPin?.value)
  ) {
    document?.getElementById('section--4').style.visibility = 'visible';
    window.localStorage.setItem('user', JSON.stringify(currentUser));
  } else {
    const newUser = {
      username: inputLoginUsername.value,
      pin: Number(inputLoginPin?.value),
    };
    window.localStorage.setItem('user', JSON.stringify(newUser));
    location.reload();
  }
});

btnLogout?.addEventListener('click', function (e) {
  e.preventDefault();
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('orders');
  location.reload();
});
