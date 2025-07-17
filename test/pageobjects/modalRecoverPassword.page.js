import { safeClick } from '../utils/actionsCommons';
 /**
    * @param {import("webdriverio").Browser} driver
    */

class ModalRecoverPassword {
    constructor(driver) {
        this.driver = driver;
    }

    //Invalid Login Modal "Recupera tu contraseña"
    get modalInvalidPasswordTittle() {
        return this.driver.$('android=new UiSelector().text("Credenciales inválidas")');
    }

    get btnSubmitInvalidPassword() {
        return this.driver.$('android=new UiSelector().text("Entendido")');
    }

    get modalRecoveryPasswordTittle() {
        return this.driver.$('android=new UiSelector().text("Recupera tu cuenta")');
    }

    get modalRecoveryPasswordReturnButton() {
        return this.driver.$('android=new UiSelector().text("Volver")');
    }


    async clickBtnSubmitInvalidPassword(){
        await safeClick(this.btnSubmitInvalidPassword)
    }

    async clickReturnModalRecoveryPassword(){
        await safeClick(this.modalRecoveryPasswordReturnButton);
    }
}

export default ModalRecoverPassword;
