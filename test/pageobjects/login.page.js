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

    get homeScreen() {
        return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(1)');
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

    async isLoggedIn() {
        try {
            return await this.homeScreen.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async clickBtnSubmitInvalidPassword(){
        await this.btnSubmitInvalidPassword.click()
    }

    async clickReturnModalRecoveryPassword(){
        await this.modalRecoveryPasswordReturnButton.click()
    }
}

export default LoginPage;
