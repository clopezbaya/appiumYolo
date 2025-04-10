  /**
    * @param {import("webdriverio").Browser} driver
  */

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

    get inviteFriendsToYoloOption() {
        return this.driver.$('android=new UiSelector().text("Invita amigos a YOLO pago")')
    }

    get viewBalanceOption() {
        return this.driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.widget.ImageView')
    }

    get balanceAmmount() {
        return this.driver.$('android=new UiSelector().textContains("Bs")')
    }

    get menuOption() {
        return this.driver.$('android=new UiSelector().className("android.view.View").instance(0)')
    }
    
    async scrollToSendOrReceiveMoneyOption() {
        return (await this.scrollToElement("Envía o cobra\ndinero"));
    }

    async scrollToReceiveOrPayMoneyQROption() {
        return (await this.scrollToElement("Cobra o\npaga con QR"));
    }

    async scrollToServicesPayment() {
        return (await this.scrollToElement("Paga\n servicios"));
    }

    async scrollToChargueCreditOption() {
        return (await this.scrollToElement("Recarga\n crédito"));
    }

    async scrollToWithdrawCashOption() {
        return (await this.scrollToElement("Retira dinero\nen efectivo"));
    }

    async scrollToAtentionPointsOption() {
        return (await this.scrollToElement("Puntos de\natención"));
    }

    async scrollToCollectMoneyOption() {
        return (await this.scrollToElement("Cobra giros\ny remesas"));
    }

    async scrollToBenefitsClubOption() {
        return (await this.scrollToElement("Club de\nBeneficios"));
    }

    async scrollToStoresPaymentOption() {
        return (await this.scrollToElement("Paga a\ncomercios"));
    }

    async clickMovements() {
        await this.movementsUser.click();
    }

    async clickMenuOptions() {
        await this.driver.pause(5000);
        await this.menuOption.click();
    }

    async clickViewBalanceOption() {
        await this.viewBalanceOption.click();
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

    async scrollToElement(elementText) {
        try {
            // @ts-ignore
            let element = await $(`//*[@text='${elementText}']`);
    
            // Verificar si el elemento ya está visible antes de hacer scroll
            if (await element.isDisplayed()) {
                console.log("Elemento ya visible");
                return element;
            }
    
            let attempts = 0;
            const maxAttempts = 2; // Evitar bucles infinitos
    
            while (attempts < maxAttempts) {
                // Verificar si el elemento es visible antes de hacer scroll
                if (await element.isDisplayed()) {
                    console.log("ELEMENTO ENCONTRADO");
                    await element.waitForDisplayed({ timeout: 5000 });
                    return element;
                }
    
                try {
                    console.log(`Intento ${attempts + 1}: Haciendo swipe hacia arriba`);
    
                    // Hacer swipe manualmente con coordenadas
                    await this.driver.performActions([
                        {
                            type: "pointer",
                            id: "finger1",
                            parameters: { pointerType: "touch" },
                            actions: [
                                { type: "pointerMove", duration: 0, x: 500, y: 1500 }, // Punto inicial
                                { type: "pointerDown", button: 0 },
                                { type: "pause", duration: 500 },
                                { type: "pointerMove", duration: 1000, x: 500, y: 500 }, // Punto final (Swipe arriba)
                                { type: "pointerUp", button: 0 }
                            ],
                        }
                    ]);
                } catch (scrollError) {
                    console.warn(`Error en intento ${attempts + 1}: `, scrollError);
                }
    
                attempts++;
            }
    
            console.error(`No se encontró el elemento después de ${maxAttempts} intentos`);
            return null;
    
        } catch (error) {
            console.error("Error general en scrollToElement: ", error);
            return null;
        }
    }
    
}

export default HomePage;
