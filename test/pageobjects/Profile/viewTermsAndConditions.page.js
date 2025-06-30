import { safeClick } from "../../utils/actionsCommons";
import { scrollToElement } from "../../utils/scrollToElement";

    /**
    * @param {import("webdriverio").Browser} driver
    */
class ViewTermsAndConditionsPage {
    constructor(driver) {
        this.driver = driver;
    }


    get downloadButton() {
        return this.driver.$('android=new UiSelector().text("Descargar")')
    }

    get returnButton() {
        return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }

    async downloadTermsAndConditions() {
        await safeClick(this.downloadButton);
    }

    async clickReturn() {
        await safeClick(this.returnButton);
    }

    async getCurrentActivity() {
        await this.driver.pause(1000);
        return await this.driver.getCurrentActivity();
    }

    async scrollToTermsAndConditionsOption() {
        return (await scrollToElement("Ver", this.driver));
    }
}

export default ViewTermsAndConditionsPage;
