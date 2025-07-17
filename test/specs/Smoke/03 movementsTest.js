import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import MovementsPage from '../../pageobjects/movements.page.js';
import HomePage from '../../pageobjects/home.page.js';

describe('Test de movimientos @smoke', () => {
    let movementsPage;
    let homePage;

    before(async () => {
        homePage = new HomePage(await getDriver());
        movementsPage = new MovementsPage(await getDriver());
    });

    it('Debería verse correctamente la vista de movimientos', async () => {
        movementsPage.clickMovements()
        await expect(movementsPage.tittleMovements).toBeDisplayed();
    });
});
