import { getDriver } from '../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';

describe('Test de la vista Home en Android @smoke', () => {
    let homePage;

    before(async () => {
        homePage = new HomePage(await getDriver());
    });

    it('Debería verse correctamente el Home', async () => {
        await expect(homePage.balanceAmmount).toBeDisplayed();
    });

    it('Deberia mostrar el balance en números después del click', async () => {
        await homePage.clickViewBalanceOption();
        const balanceValue = await homePage.getBalanceValue();
        console.log("🔎 Balance obtenido:", balanceValue);
        await expect(balanceValue).not.toBeNull(); 
        await expect(typeof balanceValue).toBe('number'); 
    });

    it('Deberia hacer scroll y validar que la opción de carga dinero a Yolo Pago esté visible', async () => {
        await expect(homePage.chargueMoneyOption).toBeDisplayed();
    });

    it('Deberia hacer scroll y validar que la opción de envia o cobra dinero esté visible', async () => {
        let element = await homePage.scrollToSendOrReceiveMoneyOption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de cobra o paga con QR esté visible', async () => {
        let element = await homePage.scrollToReceiveOrPayMoneyQROption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de pago de servicios esté visible', async () => {
        let element = await homePage.scrollToServicesPayment(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de invita amigos a Yolo Pago esté visible', async () => {
        await expect(homePage.inviteFriendsToYoloOption).toBeDisplayed();
    });

    it('Deberia hacer scroll y validar que la opción de recarga de credito esté visible', async () => {
        let element = await homePage.scrollToChargueCreditOption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de retira dinero en efectivo esté visible', async () => {
        let element = await homePage.scrollToWithdrawCashOption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de puntos de atencion esté visible', async () => {
        let element = await homePage.scrollToAtentionPointsOption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de cobra giros y remesas esté visible', async () => {
        let element = await homePage.scrollToCollectMoneyOption(); 
        expect(element).not.toBeNull();
    });

    it('Deberia hacer scroll y validar que la opción de club de beneficios esté visible', async () => {
        let element = await homePage.scrollToBenefitsClubOption(); 
        expect(element).not.toBeNull();
    });

    
    it('Deberia hacer scroll y validar que la opción de paga a comercios esté visible', async () => {
        let element = await homePage.scrollToStoresPaymentOption(); 
        expect(element).not.toBeNull();
    });
    
});
