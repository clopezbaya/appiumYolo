import { safeClick } from "../../utils/actionsCommons";

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
        await safeClick(this.editPassword);
    }

    async clickEditEmail() {
        await safeClick(this.editEmail);
    }

    async clickEditInvoice() {
        await safeClick(this.editInvoice);
    }

    async clickEditAddress() {
        await safeClick(this.editAddress);
    }

    async clickSeeTermsAndConditions() {
        await safeClick(this.seeTermsAndConditions);
    }

    async clickReturnBack() {
        await safeClick(this.returnBack);
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
