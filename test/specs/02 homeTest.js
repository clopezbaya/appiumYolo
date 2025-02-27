import { getDriver } from '../setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';

describe('Test de la vista Home en Android @smoke', () => {
    let homePage;

    before(async () => {
        homePage = new HomePage(await getDriver());
    });

    it('Debería verse correctamente los botones principales', async () => {
        homePage.clickMovements()
        await expect(homePage.tittleMovements).toBeDisplayed();
    });
});
