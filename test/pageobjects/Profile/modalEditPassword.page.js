import { safeClick, safeSetValue } from "../../utils/actionsCommons";

class ModalEditPasswordPage {

    /**
    * @param {import("webdriverio").Browser} driver
    */
    constructor(driver) {
        this.driver = driver;
    }

    get currentPasswordField() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Contraseña actual"]/android.view.ViewGroup');
    }

    get newPasswordField() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Nueva contraseña"]/android.view.ViewGroup')
    }

    get repeatNewPasswordField() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Repetir nueva contraseña"]/android.view.ViewGroup')
    }

    get changePasswordButton() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Cambiar contraseña"]/android.view.View')
    }

    async changuePassword(oldPassword, newPassword) {
        await safeSetValue(this.currentPasswordField, oldPassword)
        await safeSetValue(this.newPasswordField, newPassword)
        await safeSetValue(this.repeatNewPasswordField, newPassword)
        await safeClick(this.changePasswordButton);
    }
}

export default ModalEditPasswordPage;
