const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://jsonplaceholder.typicode.com/',
      defaultHeaders: {
        // use Bearer Authorization
        Authorization: 'Bearer 11111',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      prettyPrintJson: true,
      onRequest: (request) => {
        request.headers.auth = '123';
      },
    },
    JSONResponse: {},
  },
  include: {
    I: './steps_file.js',
  },
  plugins: {
    fakerTransform: {
      enabled: true,
    },
  },
  name: 'api-codeceptjs',
};
