const { I } = inject();

const { dataTableArgument } = require('codeceptjs');
const { fakerPT_BR } = require('@faker-js/faker');

let productsArray = []; // Array para armazenar os produtos
let testTableArray = []; // Array para armazenar a tabela de teste
let testHashesJSON = {}; // JSON para armazenar os hashes do teste
let testRowHashJSON = {}; // JSON para armazenar o rowHash do teste

const headers = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  origin: 'https://web-next.test.com',
};

Given('I have products in my cart', (table) => {
  // eslint-disable-line
  for (const id in table.rows) {
    if (id < 1) {
      continue; // skip a header of a table
    }

    // go by row cells
    const cells = table.rows[id].cells;

    // take values
    const name = cells[0].value;
    const category = cells[1].value;
    const price = cells[2].value;

    productsArray.push({ name, category, price });
  }
  console.log(productsArray);
});

Given('test com tabela usando raw', (table) => {
  const dataTable = new dataTableArgument(table);

  const raw = dataTable.raw();
  // row = [['Harry', 'Potter'], ['Chuck', 'Norris']]
  dataTable.transpose();
  const transposedRaw = dataTable.raw();
  // transposedRaw = [['Harry', 'Chuck'], ['Potter', 'Norris']];

  testTableArray.push(transposedRaw);

  // [
  //   [
  //     [ 'Harry', 'Chuck', 'Jogo' ],
  //     [ 'Potter', 'Norris', 'FC' ]
  //   ]
  // ]

  console.log(testTableArray[0]);

  // [
  //   [ 'Harry', 'Chuck', 'Jogo' ],
  //   [ 'Potter', 'Norris', 'FC' ]
  // ]
});

Given('test com tabela usando hashes', (table) => {
  const dataTable = new dataTableArgument(table);
  const hashes = dataTable.hashes();
  // hashes = [{ name: 'Harry', surname: 'Potter', position: 'Seeker' }];

  testHashesJSON = hashes[0];
  console.log(testHashesJSON);
});

Given('test com tabela usando rowrash', (table) => {
  const dataTable = new dataTableArgument(table);
  const rowsHash = dataTable.rowsHash();
  // rowsHash = { name: 'Harry', surname: 'Potter', position: 'Seeker' };

  testRowHashJSON = rowsHash;
  console.log(testRowHashJSON);
});

Given('que gere a massa', () => {
  const animal = fakerPT_BR.animal.cat();
  const jobDescriptor = fakerPT_BR.person.jobDescriptor();
  const personFullName = fakerPT_BR.person.fullName();
  const phoneNumber = fakerPT_BR.phone.number();
  const buildingNumber = fakerPT_BR.location.buildingNumber();
  const city = fakerPT_BR.location.city();
  const countryCode = fakerPT_BR.location.countryCode();
  const zipCode = fakerPT_BR.location.zipCode();

  console.log(
    animal,
    jobDescriptor,
    personFullName,
    phoneNumber,
    buildingNumber,
    city,
    countryCode,
    zipCode,
  );
});

Given('que faça uma chamada na api', async () => {
  try {
    const response = await I.sendGetRequest(`/posts/1`, headers);
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);

    console.log(response.data);
  } catch (error) {
    console.error('Erro ao recuperar um post: ', error.message);
    throw new Error('Erro ao recuperar um post: ', error.message);
  }
});

Given('tenha um produto {string}', (data) => {
  console.log(data);
});

When('seja uma pessoa com nome {string}', (data) => {
  console.log(data);
});

When('tenha um email {string}', (data) => {
  console.log(data);
});

When('dado do tipo {string}', (data) => {
  console.log(data);
});

Given('I have product with price {int}$ in my cart', (price) => {
  console.log(price);
});

Then('I should see overall price is {string} $', (expectedTotal) => {
  console.log(expectedTotal);
});

Given('I use {string}', (browser) => {
  console.log(browser);
});

When('I see {string} text and {string}', (text1, text2) => {
  console.log(text1);
  console.log(text2);
});
