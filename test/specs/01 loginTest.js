import 'dotenv/config';
import { getDriver } from '../setup.js';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

describe('Test de Login en App Android', () => {
    let loginPage;

    before(async () => {
        loginPage = new LoginPage(await getDriver());
    });

    it('Debería iniciar sesión correctamente', async () => {
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        await expect(loginPage.homeScreen).toBeDisplayed();
    });
});
