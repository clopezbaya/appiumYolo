     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class VerifyDataView {
        constructor(driver) {
            this.driver = driver;
        }

        get tittleView() {
            return this.driver.$('android=new UiSelector().text("Verifica los datos ")');
        }

        get continueButton(){
            return this.driver.$('android=new UiSelector().text("Continuar")');
        }

        get backButton(){
            return this.driver.$('android=new UiSelector().text("Atrás")');
        }

        async clickContinueButon(){
            await safeClick(this.continueButton);
        }

        async clickBackButon(){
            await safeClick(this.backButton);
        } 
    }
    
    export default VerifyDataView;
    