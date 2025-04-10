class ModalEditEmailPage {

    /**
    * @param {import("webdriverio").Browser} driver
    */
    constructor(driver) {
        this.driver = driver;
    }

    get emailField() {
        return this.driver.$('android=new UiSelector().resourceId("Correo electrónico")');
    }

    get updateEmailButton() {
        return this.driver.$('android=new UiSelector().text("Actualizar datos")')
    }

    get returnButton() {
        return this.driver.$('android=new UiSelector().text("Volver")')
    }

    async changeEmail(newEmail) {
        await this.emailField.setValue(newEmail)
        await this.driver.hideKeyboard();
        await this.updateEmailButton.click();
        // @ts-ignore
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await this.returnButton.click();
    }
}

export default ModalEditEmailPage;
