import 'dotenv/config';
import { safeClick, safeSetValue } from '../../../utils/actionsCommons';
 /**
    * @param {import("webdriverio").Browser} driver
    */
class AddDataToAccount {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Ingresa datos de la cuenta")');
    }

    get nameField() {
        return this.driver.$('android=new UiSelector().resourceId("Nombre de destinatario")');
    }

    get accountNumberField() {
        return this.driver.$('android=new UiSelector().resourceId("Número de cuenta")');
    }

    get destinationDropDown() {
        return this.driver.$('android=new UiSelector().text("Selecciona un banco")');
    }

    get continueButton() {
        return this.driver.$('android=new UiSelector().text("Continuar")');
    }

    get backButton() {
        return this.driver.$('android=new UiSelector().text("Atrás")');
    }

    get closeViewButton() {
        return this.driver.$('android=new UiSelector().className("android.view.View").instance(0)');
    }

    async enterNewDataToBankTransaction(accountName, accountNumber, bankName){
        await safeSetValue(this.nameField,accountName);
        await safeSetValue(this.accountNumberField,accountNumber);
        await safeClick(this.destinationDropDown);
        await safeClick(this.driver.$(`android=new UiSelector().description("${bankName}")`));
        await safeClick(this.continueButton);
    }
}

export default AddDataToAccount;
