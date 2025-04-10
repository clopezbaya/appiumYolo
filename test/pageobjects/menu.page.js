class MenuPage {
     /**
    * @param {import("webdriverio").Browser} driver
    */
    constructor(driver) {
        this.driver = driver;
    }

    get profile() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Perfil"]');
    }

    get clientAttention() {
        return this.driver.$('android=new UiSelector().description("Atención al cliente")')
    }

    get rateOurApp() {
        return this.driver.$('android=new UiSelector().description("Califica nuestra app")')
    }

    get singOut() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Cierra sesión"]')
    }


    async clickProfile() {
        await this.profile.click();
    }

    async clickClientAttention() {
        await this.clientAttention.click();
    }

    async clickRateOurApp() {
        await this.rateOurApp.click();
    }

    async clickSingOut() {
        await this.singOut.click();
    }
}

export default MenuPage;
