     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class ViewChargeMoney {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Cobrar con QR")');
        }
    
        get qrGenerated() {
            return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(3)');
        }
    
        get shareButton() {
            return this.driver.$('android=new UiSelector().text("Compartir")');
        }

        get backButton() {
            return this.driver.$('android=new UiSelector().className("android.view.View").instance(0)');
        }
    
        async clickBackButton(){
            await safeClick(this.backButton);
        }
    
    }
    
    export default ViewChargeMoney;
    