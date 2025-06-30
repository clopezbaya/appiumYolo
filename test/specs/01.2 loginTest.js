process.env.SKIP_AUTO_LOGIN = 'true';
import 'dotenv/config';
import { getDriver } from '../utils/setup.js';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import FirstViewPage from '../pageobjects/firstView.page.js';
import HomePage from '../pageobjects/home.page.js';

describe('Test de Login en App Android @smoke', () => {
    let loginPage;
    let firstViewBeforeLogin;
    let homePage;

    before(async () => {
        loginPage = new LoginPage(await getDriver());
        firstViewBeforeLogin = new FirstViewPage(await getDriver());
        homePage = new HomePage(await getDriver());
    });
    after(async () => {
        process.env.SKIP_AUTO_LOGIN = 'false';
    });

    it('Debería iniciar sesión correctamente', async () => {
        await firstViewBeforeLogin.clickWithAccount();
        await loginPage.login(process.env.CELULAR, process.env.PASSWORD);
        await expect(homePage.movementsUser).toBeDisplayed();
    });
});
