import { safeClick, safeSetValue, simulateTyping } from "../../utils/actionsCommons";

    /**
    * @param {import("webdriverio").Browser} driver
    */
class ModalEditBillingPage {
    constructor(driver) {
        this.driver = driver;
    }

    get nitField() {
        return this.driver.$('android=new UiSelector().resourceId("Número de NIT")');
    }

    get nameBillingField() {
        return this.driver.$('android=new UiSelector().resourceId("Nombre a facturar")');
    }

    get updateBillingDataButton() {
        return this.driver.$('android=new UiSelector().text("Actualizar datos")')
    }

    get returnButton() {
        return this.driver.$('android=new UiSelector().text("Volver")')
    }

    async changeBillingData(newNit, newNameBilling) {
        await safeSetValue(this.nitField, newNit)
        await simulateTyping(this.nameBillingField, newNameBilling, this.driver)
        await safeClick(this.updateBillingDataButton);
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await safeClick(this.returnButton);
    }
}

export default ModalEditBillingPage;
