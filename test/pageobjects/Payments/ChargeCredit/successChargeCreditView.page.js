     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class SuccessChargeCreditView {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("0  Recarga realizada")');
        }
    
        get shareButton() {
            return this.driver.$('android=new UiSelector().text("Compartir")');
        }

        async clickShareButton(){
            await safeClick(this.shareButton);
        }
    
    }
    
    export default SuccessChargeCreditView;
    