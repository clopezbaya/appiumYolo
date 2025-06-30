     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class ViewConfirmTransaction {
        constructor(driver) {
            this.driver = driver;
        }
    
        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Verifica los datos")');
        }

        get backButton() {
            return this.driver.$('android=new UiSelector().text("Atrás")');
        }

        get sendButton() {
            return this.driver.$('android=new UiSelector().text("Enviar")');
        }

        get sendPaymentButton() {
            return this.driver.$('android=new UiSelector().text("Realizar el pago")');
        }

        async clickBackButton(){
            await this.backButton.click()
        }

        async clickSendButton() {
            if (await this.sendButton.isDisplayed().catch(() => false)) {
                console.log("🟢 Clic en botón 'Enviar'");
                await safeClick(this.sendButton);
            } else if (await this.sendPaymentButton.isDisplayed().catch(() => false)) {
                console.log("🟢 Clic en botón 'Realizar el pago'");
                await safeClick(this.sendPaymentButton);
            } else {
                throw new Error("❌ No se encontró ningún botón de envío ('Enviar' o 'Realizar el pago')");
            }
        }
        
    }
    
    export default ViewConfirmTransaction;
    