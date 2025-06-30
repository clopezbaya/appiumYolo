     /**
    * @param {import("webdriverio").Browser} driver
    */

import { safeClick } from "../../../utils/actionsCommons";

     class ModalConfirmAccessContacts {
        constructor(driver) {
            this.driver = driver;
        }
    
        get acceptButton() {
            return this.driver.$('android=new UiSelector().text("Aceptar")');
        }
    
        get notPermitButton() {
            return this.driver.$('android=new UiSelector().text("No permitir")');
        }
    
        async clickAcceptButton(){
            await safeClick(this.acceptButton);
        }
    
        async clickNotPermitButton(){
            await safeClick(this.notPermitButton);
        }
    
    }
    
    export default ModalConfirmAccessContacts;
    