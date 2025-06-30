import 'dotenv/config';
import { safeClick, safeSetValue } from '../../../utils/actionsCommons';
 /**
    * @param {import("webdriverio").Browser} driver
    */
class ModalVerifyData {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Verifica antes de continuar")');
    }

    get continueButton() {
        return this.driver.$('android=new UiSelector().text("Continuar").instance(1)');
    }

    get backButton() {
        return this.driver.$('android=new UiSelector().text("Atrás").instance(1)');
    }

    async clickContinueButton(){
        await safeClick(this.continueButton);

    }

    async clickBackButton(){
        await safeClick(this.backButton);

    }
}

export default ModalVerifyData;
