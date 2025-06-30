import 'dotenv/config';
import { safeClick } from '../../../utils/actionsCommons';
import ModalDeleteContact from './modalDeleteContact.page';
 /**
    * @param {import("webdriverio").Browser} driver
    */
class TransferMoneyView {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Transferir dinero")');
    }

    get transferToNewContactButton() {
        return this.driver.$('android=new UiSelector().text("Agregar y transferir a nueva \ncuenta")');
    }

    get backButton() {
        return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    async agregateNewContactButton(){
        await safeClick(this.transferToNewContactButton);
    }

    async rowContact(contactName) {
        return this.driver.$(`//android.view.ViewGroup[.//android.widget.TextView[@text="${contactName}"]]`);
    }

    async eliminarContactoPorNombre(nombre) {
        let modalDeleteContact = new ModalDeleteContact(this.driver);
        let eliminarBtn = await this.driver.$(`//android.view.ViewGroup[.//android.widget.TextView[@text="${nombre}"]]//android.view.ViewGroup[@content-desc="Eliminar"]`);
        
        if (await eliminarBtn.isDisplayed()) {
            await eliminarBtn.click();
            await modalDeleteContact.clickContinueButton();
            console.log(`✅ Se eliminó el contacto "${nombre}"`);
            await this.driver.pause(3000);
        } else {
            console.warn(`❌ No se encontró el botón eliminar para "${nombre}"`);
        }
    }
}

export default TransferMoneyView;
