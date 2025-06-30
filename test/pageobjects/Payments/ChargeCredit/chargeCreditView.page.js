     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick, simulateTyping } from "../../../utils/actionsCommons";

     class chargeCreditView {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Selecciona la empresa")');
        }
    
        get entelOption() {
            return this.driver.$('android=new UiSelector().text("Entel")');
        }
    
        get vivaOption() {
            return this.driver.$('android=new UiSelector().text("Viva")');
        }

        get tigoOption() {
            return this.driver.$('android=new UiSelector().text("Tigo")');
        }

        get rechargeBalance() {
            return this.driver.$('android=new UiSelector().text("Recargar saldo")');
        }

        get closeButton() {
            return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)');
        }

        get cellNumberField(){
            return this.driver.$('android=new UiSelector().resourceId("Número celular")');
        }

        get amountChargeField(){
            return this.driver.$('android=new UiSelector().resourceId("Monto a recargar")');
        }

        get nitCiField(){
            return this.driver.$('android=new UiSelector().resourceId("NIT / CI")');
        }

        async rechargeEntel(cellNumber, amount){
            await this.entelOption.click();
            await simulateTyping(this.cellNumberField,cellNumber, this.driver)
            await simulateTyping(this.amountChargeField,amount, this.driver)
            await this.driver.pressKeyCode(66); // Código de tecla Enter
            await this.clickRechargeBalance()
        }

        async rechargeTigo(cellNumber, amount){
            await this.tigoOption.click();
            await simulateTyping(this.cellNumberField,cellNumber, this.driver)
            await simulateTyping(this.amountChargeField,amount, this.driver)
            await this.driver.pressKeyCode(66); // Código de tecla Enter
            await this.clickRechargeBalance()
        }

        async clickCloseButton(){
            await safeClick(this.closeButton);
        }

        async clickRechargeBalance(){
            await safeClick(this.rechargeBalance);
        }
    
    }
    
    export default chargeCreditView;
    