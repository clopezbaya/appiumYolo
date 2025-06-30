import { safeClick } from "../utils/actionsCommons";

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
        await safeClick(this.profile);
    }

    async clickClientAttention() {
        await safeClick(this.clientAttention);
    }

    async clickRateOurApp() {
        await safeClick(this.rateOurApp);
    }

    async clickSingOut() {
        await safeClick(this.singOut);
    }
}

export default MenuPage;
