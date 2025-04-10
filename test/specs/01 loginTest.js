import { getDriver } from '../setup.js';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

describe('Test de Login en App Android', () => {
    let loginPage;

    before(async () => {
        loginPage = new LoginPage(await getDriver());
    });

    it('Debería iniciar sesión correctamente', async () => {
        await loginPage.login("65502050", "2110");
        await expect(loginPage.homeScreen).toBeDisplayed();
    });
});
