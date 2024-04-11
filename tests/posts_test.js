const assert = require('assert');

const moment = require('moment');
var Factory = require('rosie').Factory;
const { fakerPT_BR } = require('@faker-js/faker');
const {
  validationBody,
  validationBodyArray,
} = require('../components/validationData');
const { posts_data } = require('../resources/posts');

Feature('posts');

let postId;

const headers = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  origin: 'https://web-next.test.com',
};

Scenario('test Factory matches', () => {
  Factory.define('matches')
    .attr('seasonStart', '2016-01-01')
    .option('numMatches', 2)
    .attr(
      'matches',
      ['numMatches', 'seasonStart'],
      (numMatches, seasonStart) => {
        let matches = [];
        for (let i = 1; i <= numMatches; i++) {
          matches.push({
            matchDate: moment(seasonStart).add(i, 'week').format('YYYY-MM-DD'),
            homeScore: Math.floor(Math.random() * 5),
            awayScore: Math.floor(Math.random() * 5),
          });
        }
        return matches;
      },
    );

  let fac = Factory.build(
    'matches',
    { seasonStart: '2016-03-12' },
    { numMatches: 3 },
  );
  // Built object (note scores are random):
  //{
  //  seasonStart: '2016-03-12',
  //  matches: [
  //    { matchDate: '2016-03-19', homeScore: 3, awayScore: 1 },
  //    { matchDate: '2016-03-26', homeScore: 0, awayScore: 4 },
  //    { matchDate: '2016-04-02', homeScore: 1, awayScore: 0 }
  //  ]
  //}
});

Scenario('test Factory Game', () => {
  Factory.define('game')
    .sequence('id')
    .attr('is_over', false)
    .attr('created_at', () => new Date())
    .attr('random_seed', () => Math.random())

    // Default to two players. If players were given, fill in
    // whatever attributes might be missing.
    .attr('players', ['players'], (players) => {
      if (!players) {
        players = [{}, {}];
      }
      return players.map((data) => Factory.attributes('player', data));
    });

  Factory.define('player')
    .sequence('id')
    .sequence('name', (i) => {
      return 'player' + i;
    })

    // Define `position` to depend on `id`.
    .attr('position', ['id'], (id) => {
      const positions = ['pitcher', '1st base', '2nd base', '3rd base'];
      return positions[id % positions.length];
    });

  Factory.define('disabled-player').extend('player').attr('state', 'disabled');
  const game = Factory.build('game', { is_over: true });
  // Built object (note scores are random):
  //{
  //    id:           1,
  //    is_over:      true,   // overriden when building
  //    created_at:   Fri Apr 15 2011 12:02:25 GMT-0400 (EDT),
  //    random_seed:  0.8999513240996748,
  //    players: [
  //                {id: 1, name:'Player 1'},
  //                {id: 2, name:'Player 2'}
  //    ]
  //}

  console.log(game);
});

Scenario('test library Faker', () => {
  const animal = fakerPT_BR.animal.cat();
  const jobDescriptor = fakerPT_BR.person.jobDescriptor();
  const personFullName = fakerPT_BR.person.fullName();
  const phoneNumber = fakerPT_BR.phone.number();
  const buildingNumber = fakerPT_BR.location.buildingNumber();
  const city = fakerPT_BR.location.city();
  const countryCode = fakerPT_BR.location.countryCode();
  const zipCode = fakerPT_BR.location.zipCode();

  console.log(animal, jobDescriptor, personFullName, phoneNumber, buildingNumber, city, countryCode, zipCode)
});

Scenario('Get Posts', async ({ I }) => {
  try {
    const response = await I.sendGetRequest('/posts', headers);
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);

    // console.log(response.headers)
    // console.log(response.data)
    // console.log(response.status)

    for (const key in response.data) {
      validationBodyArray(posts_data, response.data[key]);
    }
    postId = response.data[0]['id'];
  } catch (error) {
    console.error('Erro ao recuperar posts: ', error.message);
    throw new Error('Erro ao recuperar posts: ', error.message);
  }
});

Scenario('Get one post', async ({ I }) => {
  try {
    const response = await I.sendGetRequest(`/posts/${postId}`, headers);
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);

    validationBodyArray(posts_data, response.data);
  } catch (error) {
    console.error('Erro ao recuperar um post: ', error.message);
    throw new Error('Erro ao recuperar um post: ', error.message);
  }
});

Scenario('Get comments of one post', async ({ I }) => {
  try {
    const response = await I.sendGetRequest(
      `/posts/${postId}/comments`,
      headers,
    );
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);
  } catch (error) {
    console.error('Erro ao recuperar comentários do post: ', error.message);
    throw new Error('Erro ao recuperar comentários do post: ', error.message);
  }
});

Scenario('Creat post', async ({ I }) => {
  const payload = {
    title: 'title test',
    body: 'body test',
    userId: 'userId test',
  };
  try {
    const response = await I.sendPostRequest(
      `/posts/${postId}/comments`,
      payload,
      headers,
    );
    assert.equal(response.status, 201);
    validationBody(payload, response.data);
    validationBodyArray(posts_data, response.data);
  } catch (error) {
    console.error('Erro ao criar post: ', error.message);
    throw new Error('Erro ao criar post: ', error.message);
  }
});

Scenario('Update post completely', async ({ I }) => {
  const payload = {
    title: 'title test 2',
    body: 'body test 2',
    userId: 'userId test 2',
  };
  try {
    const response = await I.sendPutRequest(
      `/posts/${postId}`,
      payload,
      headers,
    );
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson(payload);
  } catch (error) {
    console.error('Erro ao atualizar post: ', error.message);
    throw new Error('Erro ao atualizar post: ', error.message);
  }
});

Scenario('Update item in post', async ({ I }) => {
  const payload = {
    title: 'title test 3',
  };
  try {
    const response = await I.sendPatchRequest(
      `/posts/${postId}`,
      payload,
      headers,
    );
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson(payload);
  } catch (error) {
    console.error('Erro ao atualizar item do post: ', error.message);
    throw new Error('Erro ao atualizar item do post: ', error.message);
  }
});

Scenario('Delete post', async ({ I }) => {
  try {
    const response = await I.sendDeleteRequest(`/posts/${postId}`, headers);
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(200);
  } catch (error) {
    console.error('Erro ao deletar post: ', error.message);
    throw new Error('Erro ao deletar post: ', error.message);
  }
});
