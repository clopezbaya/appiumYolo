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

    async isLoggedIn() {
        try {
            return await this.homeScreen.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async login(username, password) {
        if (!(await this.isLoggedIn())) {
            console.log("Iniciando sesión...");
            await this.inputUsername.setValue(username);
            await this.inputPassword.setValue(password);
            await this.btnSubmit.click();
        } else {
            console.log("Ya estaba logueado.");
        }
    }
}

export default LoginPage;
