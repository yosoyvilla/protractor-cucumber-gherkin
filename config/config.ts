require('babel-core/register');
require('protractor');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: 'http://www.google.com',

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../features/*.feature'
    ],

    onPrepare: () => {

        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty'],
        require: ['../stepdefinitions/*.ts', '../support/*.ts'],
        tags: '@TypeScriptScenario or @CucumberScenario or @ProtractorScenario'
    }
};