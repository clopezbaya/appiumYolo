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

    async login(username, password) {
        await safeSetValue(this.inputUsername, username);
        await safeSetValue(this.inputPassword, password);
        await safeClick(this.btnSubmit);
    }
}

export default LoginPage;
