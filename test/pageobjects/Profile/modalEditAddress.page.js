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
        await this.addressField.setValue(newAddress)
        await this.driver.hideKeyboard();
        await this.updateAddressDataButton.click();
        await this.driver.pause(5000);
    }

    async clickReturn() {
        await this.returnButton.click();
    }
}

export default ModalEditAddressPage;
