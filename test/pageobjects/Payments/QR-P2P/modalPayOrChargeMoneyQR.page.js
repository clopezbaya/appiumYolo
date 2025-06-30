     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class ModalPayOrChargeMoneyQR {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Escanea un código QR para pagar o genera uno para cobrar dinero.")');
        }
    
        get payButton() {
            return this.driver.$('android=new UiSelector().text("Pagar")');
        }
    
        get chargeButton() {
            return this.driver.$('android=new UiSelector().text("Cobrar")');
        }

        get cancelButton() {
            return this.driver.$('android=new UiSelector().text("Cancelar")');
        }
    
        async clickPayButton(){
            await safeClick(this.payButton);
        }
    
        async clickChargeButton(){
            await safeClick(this.chargeButton);
        }

        async clickCancelButton(){
            await safeClick(this.cancelButton);
        }
    
    }
    
    export default ModalPayOrChargeMoneyQR;
    