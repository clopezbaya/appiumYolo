import { safeClick, simulateTyping } from "../../utils/actionsCommons";
   /**
    * @param {import("webdriverio").Browser} driver
    */
class ModalEditAddressPage {
    constructor(driver) {
        this.driver = driver;
    }

    get addressField() {
        return this.driver.$('android=new UiSelector().resourceId("Dirección domicilio")');
    }

    get updateAddressDataButton() {
        return this.driver.$('android=new UiSelector().text("Actualizar datos")')
    }

    get returnButton() {
        return this.driver.$('android=new UiSelector().text("Volver")')
    }

    async changeAddress(newAddress) {
        await simulateTyping(this.addressField, newAddress, this.driver)
        await safeClick(this.updateAddressDataButton);
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await safeClick(this.returnButton);
    }
}

export default ModalEditAddressPage;
