import { getDriver } from '../setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import MenuPage from '../pageobjects/menu.page.js';
import ProfilePage from '../pageobjects/Profile/profile.page.js';
import ModalEditEmailPage from '../pageobjects/Profile/modalEditEmail.page.js';
import ModalEditAddressPage from '../pageobjects/Profile/modalEditAddress.page.js';
import ModalEditBillingPage from '../pageobjects/Profile/modalEditBilling.page.js';

describe('Test Perfil @smoke', () => {
    let homePage;
    let menuPage;
    let profilePage;
    let modalEditEmail;
    let modalEditAddress;
    let modalEditBilling;
    let newEmail = "pedro3@gmail.com";
    let newNIT = 123456;
    let newNameBilling = "Pedro Campos";
    let newAddress = "Av. Beijing Sud";

    before(async () => {
        homePage = new HomePage(await getDriver());
        menuPage = new MenuPage(await getDriver());
        profilePage = new ProfilePage(await getDriver());
        modalEditAddress = new ModalEditAddressPage(await getDriver());
        modalEditEmail = new ModalEditEmailPage(await getDriver());
        modalEditBilling = new ModalEditBillingPage(await getDriver());
    });

    it('Debería editarse correctamente el email', async () => {
        await homePage.clickMenuOptions();
        await menuPage.clickProfile();
        await profilePage.clickEditEmail();
        await modalEditEmail.changeEmail(newEmail);
       
        await modalEditEmail.updateEmailButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de Email'
        });
        const emailElement = await profilePage.newEmailLocator(newEmail);
        await expect(emailElement).toBeDisplayed();
    });

    it('Debería editarse correctamente los datos de Facturacion', async () => {
        await profilePage.clickEditInvoice();
        await modalEditBilling.changeBillingData(newNIT, newNameBilling);
       
        await modalEditBilling.updateBillingDataButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de datos de facturacion'
        });
        const billingElement = await profilePage.newBillingLocator(newNIT, newNameBilling);
        await expect(billingElement).toBeDisplayed();
    });

    it('Debería editarse correctamente la direccion del cliente', async () => {
        await profilePage.clickEditAddress();
        await modalEditAddress.changeAddress(newAddress);
       
        await modalEditEmail.updateEmailButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de direccion'
        });
        const addressElement = await profilePage.newAddressLocator(newAddress);
        await expect(addressElement).toBeDisplayed();
    });
});
