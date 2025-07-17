import 'dotenv/config';
import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/home.page.js';
import MenuPage from '../../pageobjects/menu.page.js';
import ProfilePage from '../../pageobjects/Profile/profile.page.js';
import ModalEditEmailPage from '../../pageobjects/Profile/modalEditEmail.page.js';
import ModalEditAddressPage from '../../pageobjects/Profile/modalEditAddress.page.js';
import ModalEditBillingPage from '../../pageobjects/Profile/modalEditBilling.page.js';
import ViewTermsAndConditionsPage from '../../pageobjects/Profile/viewTermsAndConditions.page.js';

describe('Test Perfil @smoke', () => {
    let homePage;
    let menuPage;
    let profilePage;
    let modalEditEmail;
    let modalEditAddress;
    let modalEditBilling;
    let viewTermsAndConditions;

    before(async () => {
        homePage = new HomePage(await getDriver());
        menuPage = new MenuPage(await getDriver());
        profilePage = new ProfilePage(await getDriver());
        modalEditAddress = new ModalEditAddressPage(await getDriver());
        modalEditEmail = new ModalEditEmailPage(await getDriver());
        modalEditBilling = new ModalEditBillingPage(await getDriver());
        viewTermsAndConditions = new ViewTermsAndConditionsPage(await getDriver());
    });

    it('Se edita correctamente el email', async () => {
        await homePage.clickMenuOptions();
        await menuPage.clickProfile();
        await profilePage.clickEditEmail();
        await modalEditEmail.changeEmail(process.env.EMAIL_EDIT_PROFILE);
       
        await modalEditEmail.updateEmailButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de Email'
        });
        const emailElement = await profilePage.newEmailLocator(process.env.EMAIL_EDIT_PROFILE);
        await expect(emailElement).toBeDisplayed();
    });

    it('Se edita correctamente los datos de Facturacion', async () => {
        await profilePage.clickEditInvoice();
        await modalEditBilling.changeBillingData(process.env.NIT_EDIT_PROFILE, process.env.BILLING_NAME_EDIT_PROFILE);
       
        await modalEditBilling.updateBillingDataButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de datos de facturacion'
        });
        const billingElement = await profilePage.newBillingLocator(process.env.NIT_EDIT_PROFILE, process.env.BILLING_NAME_EDIT_PROFILE);
        await expect(billingElement).toBeDisplayed();
    });

    it('Se edita correctamente la direccion del cliente', async () => {
        await profilePage.clickEditAddress();
        await modalEditAddress.changeAddress(process.env.ADDRESS_EDIT_PROFILE);
       
        await modalEditEmail.updateEmailButton.waitForDisplayed({
            reverse: true,
            timeout: 5000,
            timeoutMsg: 'Fallo el cambio de direccion'
        });
        const addressElement = await profilePage.newAddressLocator(process.env.ADDRESS_EDIT_PROFILE);
        await expect(addressElement).toBeDisplayed();
    });

    it('Se descarga correctamente los terminos y condiciones de servicio', async () => {
        const oldActivity = await viewTermsAndConditions.getCurrentActivity();
        await viewTermsAndConditions.scrollToTermsAndConditionsOption(); 
        await profilePage.clickSeeTermsAndConditions();
        await viewTermsAndConditions.downloadTermsAndConditions();
        const newActivity = await viewTermsAndConditions.getCurrentActivity();
        expect(newActivity).not.toEqual(oldActivity);
    });

});
