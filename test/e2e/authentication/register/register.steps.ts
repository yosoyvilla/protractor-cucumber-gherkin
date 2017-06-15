let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import { binding, given, when, then } from 'cucumber-tsflow';
import { CallbackStepDefinition } from 'cucumber';

import { RegisterPageObject } from './register.page';
import { LoginPageObject } from '../login';
import { AuthenticationPageObject } from '../authentication.page';

@binding()
class RegisterSteps {

  private authenticationModule = new AuthenticationPageObject();
  private loginPageObject = new LoginPageObject();
  private registerPageObject = new RegisterPageObject();

  @given(/^user clicks the register link$/)
  private givenUserClicksTheLoginLink(callback: CallbackStepDefinition) {
    this.authenticationModule.goToLoginPage();
    this.loginPageObject.navigateToRegisterPage();
    callback();
  };

  @given(/^'(.*)' is the user name used in the register form$/)
  private givenUsername(name: string, callback: CallbackStepDefinition) {
    this.registerPageObject.setName(name);
    callback();
  };

  @given(/^'(.*)' is the user email used in the register form$/)
  private givenUserEmail(email: string, callback: CallbackStepDefinition) {
    this.registerPageObject.setEmail(email);
    callback();
  };

  @given(/^'(.*)' is the provided password used in the register form$/)
  private givenPassword(password: string, callback: CallbackStepDefinition) {
    this.registerPageObject.setPassword(password);
    callback();
  };

  @given(/^'(.*)' is the repeated password used in the register form/)
  private givenRepeatPassword(repeatPassword: string, callback: CallbackStepDefinition) {
    this.registerPageObject.setRepeatPassword(repeatPassword);
    callback();
  };

  @when(/^submitting the register form$/)
  private whenSubmitForm(callback: CallbackStepDefinition) {
    this.registerPageObject.submitForm();
    callback();
  };

  @then(/^the register form is validated '(.*)'$/)
  private thenFormIsValidated(valid: string, callback: CallbackStepDefinition) {
    let isValid = valid === 'true';
    expect(this.registerPageObject.formIsValid()).to.become(isValid).and.notify(callback);
  }

}

export = RegisterSteps;
