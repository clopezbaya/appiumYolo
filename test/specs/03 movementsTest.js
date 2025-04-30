import { getDriver } from '../utils/setup.js';
import { expect } from '@wdio/globals';
import MovementsPage from '../pageobjects/movements.page.js';

describe('Test de movimientos', () => {
    let movementsPage;

    before(async () => {
        movementsPage = new MovementsPage(await getDriver());
    });

    it('Debería verse correctamente la vista de movimientos', async () => {
        movementsPage.clickMovements()
        await expect(movementsPage.tittleMovements).toBeDisplayed();
    });
});
