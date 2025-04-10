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
        await this.currentPasswordField.setValue(oldPassword)
        await this.newPasswordField.setValue(newPassword)
        await this.repeatNewPasswordField.setValue(newPassword)
        await this.changePasswordButton.click();
    }
}

export default ModalEditPasswordPage;
