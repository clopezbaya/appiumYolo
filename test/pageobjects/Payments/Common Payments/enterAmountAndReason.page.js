     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick, safeSetValue } from "../../../utils/actionsCommons";

     class EnterAmountOrReason {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Ingresa monto y motivo")');
        }
    
        get amoutToSend() {
            return this.driver.$('android=new UiSelector().resourceId("Bs  Ingresa el monto")');
        }
    
        get reasonToSend() {
            return this.driver.$('android=new UiSelector().resourceId("Ingresa el motivo...")');
        }

        get backButton() {
            return this.driver.$('android=new UiSelector().text("Atrás")');
        }

        get continueButton() {
            return this.driver.$('android=new UiSelector().text("Continuar")');
        }

        async setAmountAndReason(amount, reason){
            await safeSetValue(this.amoutToSend, amount);
            await safeSetValue(this.reasonToSend, reason);
            await this.clickContinueButton()
        }

        async clickBackButton(){
            await safeClick(this.backButton);
        }

        async clickContinueButton(){
            await safeClick(this.continueButton);
        }
    
    }
    
    export default EnterAmountOrReason;
    