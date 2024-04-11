exports.config = {
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://jsonplaceholder.typicode.com/',
      defaultHeaders: {
        Authorization: 'Bearer 11111',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      prettyPrintJson: true,
      onRequest: (request) => {
        request.headers.auth = '123';
      },
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    fakerTransform: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  name: 'api-codeceptjs'
}