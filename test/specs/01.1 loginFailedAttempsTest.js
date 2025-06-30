process.env.SKIP_AUTO_LOGIN = 'true';
import { resetLogin } from '../utils/db.js';
import 'dotenv/config';
import { getDriver } from '../utils/setup.js';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import FirstViewPage from '../pageobjects/firstView.page.js';

describe('Test de Login fallido con attemps en App Android @smoke', () => {
    let loginPage;
    let firstViewBeforeLogin;

    before(async () => {
        loginPage = new LoginPage(await getDriver());
        firstViewBeforeLogin = new FirstViewPage(await getDriver());
    });
    after(async () => {
        await resetLogin(process.env.CELULAR);
    });

    it('Debería fallar el inicio de sesión mostrando los modales respectivos', async () => {
        await firstViewBeforeLogin.clickWithAccount();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(loginPage.modalInvalidPasswordTittle).toBeDisplayed();
        await loginPage.clickBtnSubmitInvalidPassword();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(loginPage.modalInvalidPasswordTittle).toBeDisplayed();
        await loginPage.clickBtnSubmitInvalidPassword();
        await loginPage.login(process.env.CELULAR, process.env.INVALID_PASSWORD);
        await expect(loginPage.modalRecoveryPasswordTittle).toBeDisplayed();
        await loginPage.clickReturnModalRecoveryPassword();
    });
});
