     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class ViewTransactionSuccess {
        constructor(driver) {
            this.driver = driver;
        }
    
        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Comprobante")');
        }

        get shareButton() {
            return this.driver.$('android=new UiSelector().text("Compartir ")');
        }

        async clickShareButton(){
            await safeClick(this.shareButton);
        }
    }
    
    export default ViewTransactionSuccess;
    