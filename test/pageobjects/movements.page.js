class MovementsPage {
     /**
    * @param {import("webdriverio").Browser} driver
    */
    constructor(driver) {
        this.driver = driver;
    }

    get movementsUser() {
        return this.driver.$('android=new UiSelector().text("Ve tus movimientos")');
    }

    get tittleMovements() {
        return this.driver.$('android=new UiSelector().text("Actividad de cuenta")')
    }

    async clickMovements() {
        await this.movementsUser.click();
    }
}

export default MovementsPage;
