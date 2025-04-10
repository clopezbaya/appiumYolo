
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
        await this.nitField.setValue(newNit)
        await this.nameBillingField.setValue(newNameBilling)
        await this.driver.hideKeyboard();
        await this.updateBillingDataButton.click();
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await this.returnButton.click();
    }
}

export default ModalEditBillingPage;
