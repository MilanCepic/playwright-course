export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder("e-mail");
    this.passwordInput = page.getByPlaceholder("password");
    this.registerButton = page.getByRole("button", { name: "register" });
  }
  signUpAsNewUser = async () => {
    //await this.page.pause();
    await this.emailInput.waitFor();
    await this.emailInput.fill("tester1977@test.com");

    await this.passwordInput.waitFor();
    await this.passwordInput.fill("12345");

    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.pause();
  };
}
