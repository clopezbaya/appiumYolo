     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

class ModalSendOrTranser {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Envía o cobra dinero")');
    }

    get sendMoneyButton() {
        return this.driver.$('android=new UiSelector().resourceId("button-modal-send-money")');
    }

    get transferMoneyButton() {
        return this.driver.$('android=new UiSelector().resourceId("button-modal-transfer-money")');
    }

    get cancelButton() {
        return this.driver.$('android=new UiSelector().text("Cancelar")');
    }

    async clickSendMoneyButton(){
        await safeClick(this.sendMoneyButton);
    }

    async clickTransferMoneyButton(){
        await safeClick(this.transferMoneyButton);
    }

    async clickCancelButton(){
        await safeClick(this.cancelButton);
    }
}

export default ModalSendOrTranser;
