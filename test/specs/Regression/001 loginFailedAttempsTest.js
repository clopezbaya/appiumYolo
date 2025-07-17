process.env.SKIP_AUTO_LOGIN = 'true';
import { resetLogin } from '../../utils/db.js';
import 'dotenv/config';
import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import LoginPage from '../../pageobjects/login.page.js';
import FirstViewPage from '../../pageobjects/firstView.page.js';
import ModalRecoverPassword from '../../pageobjects/modalRecoverPassword.page.js';

describe('Test de Login fallido con attemps en App Android @regression', () => {
    let loginPage;
    let firstViewBeforeLogin;
    let modalRecoverPassword; 

    before(async () => {
        loginPage = new LoginPage(await getDriver());
        firstViewBeforeLogin = new FirstViewPage(await getDriver());
        modalRecoverPassword = new ModalRecoverPassword(await getDriver());
    });
    after(async () => {
        await resetLogin(process.env.CELULAR);
    });

    it('Debería fallar el inicio de sesión mostrando los modales respectivos', async () => {
        await firstViewBeforeLogin.clickWithAccount();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(modalRecoverPassword.modalInvalidPasswordTittle).toBeDisplayed();
        await modalRecoverPassword.clickBtnSubmitInvalidPassword();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(modalRecoverPassword.modalInvalidPasswordTittle).toBeDisplayed();
        await modalRecoverPassword.clickBtnSubmitInvalidPassword();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(modalRecoverPassword.modalRecoveryPasswordTittle).toBeDisplayed();
        await modalRecoverPassword.clickReturnModalRecoveryPassword();
    });
});
