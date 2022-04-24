'use strict';
///////////////////
//Acount
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  pin: 1111,
};
const account2 = {
  owner: 'Jessica Davis',
  pin: 2222,
};
let order = [];
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
const buildMenu = function (tableID, addBuyButton) {
  plates.forEach(plate => {
    const table = document.getElementById(tableID);
    const td =
      table === null || table === void 0
        ? void 0
        : table.querySelector('#' + plate.Day + '-' + plate.Type);
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
      console.log('Added ' + plate.Name);
      let currentOrder = { name: plate.Name, price: plate.Price };
      order.push(currentOrder);
      window.localStorage.setItem('order', JSON.stringify(currentOrder));
    });
    div.append(name);
    div.append(price);
    div.append(image);
    if (addBuyButton) div.append(btn);
    if (td !== null) {
      td === null || td === void 0 ? void 0 : td.append(div);
    }
  });
};
buildMenu('section--2', false);
buildMenu('section--4', true);
///////////////////////////////////////
//variables
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const btnLogin = document.querySelector('.login__btn');
//////////////////////////////////
////////////////////////////////
// Event handlers
let currentAccount;
