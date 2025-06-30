     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../utils/actionsCommons";

     class FirstViewPage {
        constructor(driver) {
            this.driver = driver;
        }
    
        get withAccountButton() {
            return this.driver.$('android=new UiSelector().text("Ya tengo cuenta ")');
        }
    
        get registerNowButton() {
            return this.driver.$('android=new UiSelector().text("¡Regístrate ya!")');
        }
    
    
        async clickWithAccount() {
            await safeClick(this.withAccountButton);
        }

        async clickRegisterNowButton() {
            await safeClick(this.registerNowButton);
        }
    }
    
    export default FirstViewPage;
    