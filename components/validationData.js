const assert = require('assert');

module.exports = {
  // validação quando se tem um json para comparar com outro
  // comparação de chaves entre jsons diferentes
  validationBody(payload, response) {
    for (const key of Object.keys(payload)) {
      assert.equal(
        response[key],
        payload[key],
        `O valor de ${key} na resposta não corresponde ao valor enviado.`,
      );
    }
  },
  // validação usada quando se tem as chaves de um array para comparar com as chaves de um json
  // comparação de chaves entre array e json
  validationBodyArray(array, response) {
    for (const key of array) {
      assert.ok(
        response.hasOwnProperty(key),
        `O campo ${key} não está presente na resposta.`,
      );
    }
  },
};
