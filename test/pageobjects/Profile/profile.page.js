class ProfilePage {
     /**
    * @param {import("webdriverio").Browser} driver
    */
    constructor(driver) {
        this.driver = driver;
    }

    get editPassword() {
        return this.driver.$('android=new UiSelector().description("Editar").instance(0)');
    }

    get editEmail() {
        return this.driver.$('android=new UiSelector().description("Editar").instance(1)')
    }

    get editInvoice() {
        return this.driver.$('android=new UiSelector().description("Editar").instance(2)')
    }

    get editAddress() {
        return this.driver.$('android=new UiSelector().description("Editar").instance(3)')
    }

    get seeTermsAndConditions() {
        return this.driver.$('android=new UiSelector().text("Ver")')
    }

    get returnBack() {
        return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }

    async clickEditPassword() {
        await this.editPassword.click();
    }

    async clickEditEmail() {
        await this.editEmail.click();
    }

    async clickEditInvoice() {
        await this.editInvoice.click();
    }

    async clickEditAddress() {
        await this.editAddress.click();
    }

    async clickSeeTermsAndConditions() {
        await this.seeTermsAndConditions.click();
    }

    async clickReturnBack() {
        await this.returnBack.click();
    }

    async newEmailLocator(newEmail) {
        return this.driver.$(`android=new UiSelector().text("${newEmail}")`)
    }

    async newBillingLocator(newNIT, newNameBilling) {
        return this.driver.$(`android=new UiSelector().text("${newNameBilling} - ${newNIT}")`)
    }

    async newAddressLocator(newAddress) {
        return this.driver.$(`android=new UiSelector().text("${newAddress}")`)
    }
}

export default ProfilePage;
