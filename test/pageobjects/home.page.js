  /**
    * @param {import("webdriverio").Browser} driver
  */
import { safeClick } from "../utils/actionsCommons.js";
import { scrollToElement } from "../utils/scrollToElement.js";

class HomePage {

   
    constructor(driver) {
        this.driver = driver;
    }

    get VerifiingUserSplash() {
        return this.driver.$('android=new UiSelector().text("Validando información")');
    }

    get movementsUser() {
        return this.driver.$('android=new UiSelector().text("Ve tus movimientos")');
    }

    get tittleMovements() {
        return this.driver.$('android=new UiSelector().text("Actividad de cuenta")')
    }

    get chargueMoneyOption() {
        return this.driver.$('android=new UiSelector().text("Carga dinero a YOLO pago")')
    }

    get sendOrReceibeMoneyOption() {
        return this.driver.$('android=new UiSelector().text("Envía o cobra\ndinero")')
    }

    get chargeCreditOption() {
        return this.driver.$('android=new UiSelector().text("Recarga\n crédito")')
    }

    get sendOrReceibeMoneyQROption() {
        return this.driver.$('android=new UiSelector().text("Cobra o\npaga con QR")')
    }

    get attentionPoints() {
        return this.driver.$('android=new UiSelector().text("Puntos de\natención")')
    }

    get inviteFriendsToYoloOption() {
        return this.driver.$('android=new UiSelector().text("Invita amigos a YOLO pago")')
    }

    get viewBalanceOption() {
        return this.driver.$('android= new UiSelector().className("android.widget.ImageView").instance(3)')
    }

    get balanceAmmount() {
        return this.driver.$('android=new UiSelector().textContains("Bs")')
    }


    get menuOption() {
        return this.driver.$('android=new UiSelector().className("android.view.View").instance(0)')
    }
    
    async scrollToSendOrReceiveMoneyOption() {
        return (await scrollToElement("Envía o cobra\ndinero", this.driver));
    }

    async scrollToReceiveOrPayMoneyQROption() {
        return (await scrollToElement("Cobra o\npaga con QR", this.driver));
    }

    async scrollToServicesPayment() {
        return (await scrollToElement("Paga\n servicios", this.driver));
    }

    async scrollToChargueCreditOption() {
        return (await scrollToElement("Recarga\n crédito", this.driver));
    }

    async scrollToWithdrawCashOption() {
        return (await scrollToElement("Retira dinero\nen efectivo", this.driver));
    }

    async scrollToAtentionPointsOption() {
        return (await scrollToElement("Puntos de\natención", this.driver));
    }

    async scrollToCollectMoneyOption() {
        return (await scrollToElement("Cobra giros\ny remesas", this.driver));
    }

    async scrollToBenefitsClubOption() {
        return (await scrollToElement("Club de\nBeneficios", this.driver));
    }

    async scrollToStoresPaymentOption() {
        return (await scrollToElement("Paga a\ncomercios", this.driver));
    }

    async clickMovements() {
        await safeClick(this.movementsUser);
    }

    async clickAttentionPoints() {
        await this.scrollToAtentionPointsOption();
        await safeClick(this.attentionPoints);
    }

    async clickSendOrReceiveMoneyOption() {
        await safeClick(this.sendOrReceibeMoneyOption);
    }

    async clickSendOrReceiveMoneyQROption() {
        await safeClick(this.sendOrReceibeMoneyQROption);
    }

    async clickChargeCreditOption() {
        await safeClick(this.chargeCreditOption);
    }

    async clickMenuOptions() {
        await this.driver.pause(5000);
        await safeClick(this.menuOption);
    }

    async clickViewBalanceOption() {
        await safeClick(this.viewBalanceOption);
    }

    async getBalanceText() {
        await this.driver.pause(3000);
        return await this.balanceAmmount.getText();
    }

    async getBalanceValue() {
        const balanceText = await this.getBalanceText();
        console.log("Balance mostrado después del click:", balanceText);

        const balanceMatch = balanceText.match(/Bs[.\s]*([\d,]+)/);

        if (balanceMatch) {
            const balanceValue = parseFloat(balanceMatch[1].replace(',', ''));
            return isNaN(balanceValue) ? null : balanceValue;
        }
        return null;
    }

    async isBalanceVisible() {
        return (await this.getBalanceValue()) !== null;
    }

    async isLoggedIn() {
        try {
            return await this.tittleMovements.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    
}

export default HomePage;
