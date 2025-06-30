import 'dotenv/config';
import { safeClick, safeSetValue } from '../utils/actionsCommons';
 /**
    * @param {import("webdriverio").Browser} driver
    */

class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }

    get inputUsername() {
        return this.driver.$('android=new UiSelector().resourceId("Número celular")');
    }

    get inputPassword() {
        return this.driver.$('android=new UiSelector().resourceId("Contraseña")');
    }

    get btnSubmit() {
        return this.driver.$('//android.widget.TextView[@content-desc="Inicia sesión"]');
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

    async login(username, password) {
        await safeSetValue(this.inputUsername, username);
        await safeSetValue(this.inputPassword, password);
        await safeClick(this.btnSubmit);
    }

    async clickBtnSubmitInvalidPassword(){
        await safeClick(this.btnSubmitInvalidPassword)
    }

    async clickReturnModalRecoveryPassword(){
        await safeClick(this.modalRecoveryPasswordReturnButton);
    }
}

export default LoginPage;
