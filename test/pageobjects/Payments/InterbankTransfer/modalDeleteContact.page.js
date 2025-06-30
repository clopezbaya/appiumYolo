import 'dotenv/config';
import { safeClick } from '../../../utils/actionsCommons';
 /**
    * @param {import("webdriverio").Browser} driver
    */
class ModalDeleteContact {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("¿Deseas eliminar esta cuenta de tu agenda?")');
    }

    get cancelButton() {
        return this.driver.$('android=new UiSelector().text("Cancelar")');
    }

    get deleteButton() {
        return this.driver.$('//android.view.ViewGroup[@index="2"]//android.view.ViewGroup[@content-desc="Eliminar"]');
    }

    get closeViewButton() {
        return this.driver.$('android=new UiSelector().className("android.view.View").instance(0)');
    }

    async clickContinueButton(){
        const eliminarBtn = await this.driver.$$('//android.widget.TextView[@text="¿Deseas eliminar esta cuenta de tu agenda?"]/ancestor::android.view.ViewGroup//android.widget.TextView[@text="Eliminar"]');
        await safeClick(eliminarBtn[eliminarBtn.length-1]);
    }
}

export default ModalDeleteContact;
