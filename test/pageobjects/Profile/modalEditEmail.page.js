import { safeClick, simulateTyping } from "../../utils/actionsCommons";

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
        await simulateTyping(this.emailField,newEmail, this.driver)
        await this.updateEmailButton.click();
        // @ts-ignore
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await safeClick(this.returnButton);
    }
}

export default ModalEditEmailPage;
