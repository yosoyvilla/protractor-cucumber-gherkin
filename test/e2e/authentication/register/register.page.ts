import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class RegisterPageObject {

  private form;
  private title;
  private nameInput;
  private emailInput;
  private passwordInput;
  private repeatPasswordInput;
  private submitButton;
  private goToForgotPasswordLink;
  private goToLoginLink;

  constructor() {

    // get the relevant elements
    this.form = element(by.id('register-form'));
    this.title = element(by.id('register-title'));
    this.nameInput = this.form.element(by.id('register-name'));
    this.emailInput = this.form.element(by.id('register-email'));
    this.passwordInput = this.form.element(by.id('register-password'));
    this.repeatPasswordInput = this.form.element(by.id('register-repeat-password'));
    this.submitButton = this.form.element(by.id('register-submit'));

    this.goToForgotPasswordLink = element(by.id('register-forgot-password-link'));
    this.goToLoginLink = element(by.id('register-login-link'));

  }

  setName(value: string): wdpromise.Promise<void> {
    return this.nameInput.clear().sendKeys(value);
  }

  setEmail(value: string): wdpromise.Promise<void> {
    return this.emailInput.clear().sendKeys(value);
  }

  setPassword(value: string): wdpromise.Promise<void> {
    return this.passwordInput.clear().sendKeys(value);
  }

  setRepeatPassword(value: string): wdpromise.Promise<void> {
    return this.repeatPasswordInput.clear().sendKeys(value);
  }

  getTitle(): wdpromise.Promise<string> {
    return this.title.getText();
  }

  submitForm(): wdpromise.Promise<void> {
    return this.submitButton.sendKeys(protractor.Key.ENTER);
  }

  formIsValid(): wdpromise.Promise<boolean> {
    return this.getAllErrorMessages().count().then(value => {
      return value === 0;
    });
  }

  private getAllErrorMessages(): ElementArrayFinder {
    return element.all(by.css('.error-group'));
  }

}
