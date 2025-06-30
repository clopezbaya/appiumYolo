import { safeClick, safeSetValue, simulateTyping, swipe } from "../../utils/actionsCommons";

    /**
    * @param {import("webdriverio").Browser} driver
    */
class ViewAttentionPoints {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Puntos de atención")');
    }
    get mapIndicator() {
        return this.driver.$('android=new UiSelector().text("Usa este gesto para ampliar o reducir tu ubicación en el mapa")');
    } 

    get showATMsRadioButton() {
        return this.driver.$('android=new UiSelector().className("android.widget.Switch").instance(0)');
    }

    get showYoloPointsRadioButton() {
        return this.driver.$('android=new UiSelector().className("android.widget.Switch").instance(1)')
    }

    get returnButton() {
        return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }

    get myLocattionButton() {
        return this.driver.$('android=new UiSelector().description("Mi ubicación")')
    }

    async clickShowATMsRadioButton() {
        await safeClick(this.showATMsRadioButton);
    }

    async clickShowYoloPointsRadioButton() {
        await safeClick(this.showYoloPointsRadioButton);
    }

    async clickMapIndicator() {
        await safeClick(this.mapIndicator);
        await swipe(this.driver, { x: 500, y: 1500 }, { x: 500, y: 500 });
    }

    async clickReturn() {
        await safeClick(this.returnButton);
    }
}

export default ViewAttentionPoints;
