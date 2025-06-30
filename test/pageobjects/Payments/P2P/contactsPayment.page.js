import 'dotenv/config';
 /**
    * @param {import("webdriverio").Browser} driver
    */
class ContactsPayment {
    constructor(driver) {
        this.driver = driver;
    }

    get tittleView() {
        return this.driver.$('android=new UiSelector().text("Selecciona un contacto")');
    }

    async selectContact(contact){
        await this.driver.$(`android=new UiSelector().text("${contact}")`).click();
    }
}

export default ContactsPayment;
