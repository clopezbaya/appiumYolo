import 'dotenv/config';

import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/home.page.js';
import SelectCompanyView from '../../pageobjects/Payments/ChargeCredit/chargeCreditView.page.js';
import VerifyDataView from '../../pageobjects/Payments/ChargeCredit/verifyDataView.page.js';
import SuccessChargeCreditView from '../../pageobjects/Payments/ChargeCredit/successChargeCreditView.page.js';

describe('🔍 Verificar recarga de credito @smoke', () => {
  let homePage;
  let selectCompanyView;
  let verifyDataView;
  let successChargeCreditView;

  before(async () => {
    homePage = new HomePage(await getDriver());
    selectCompanyView = new SelectCompanyView(await getDriver());
    verifyDataView = new VerifyDataView(await getDriver());
    successChargeCreditView = new SuccessChargeCreditView(await getDriver());
  });

  it('Debe verificar que se puede abrir la vista de recarga de credito', async () => {
    await homePage.clickChargeCreditOption();
    await expect(selectCompanyView.tittleView).toBeDisplayed();
  });

  it('Debe validar los datos de recarga de credito a Entel', async () => {
    await selectCompanyView.rechargeEntel(process.env.CHARGE_CREDIT_ENTEL_NUMBER, process.env.AMOUNT_TEST);
    await verifyDataView.tittleView.waitForDisplayed({ timeout: 50000 });
    await expect(verifyDataView.tittleView).toBeDisplayed();
  });

  it('Debe validar la confirmacion de recarga de credito Entel', async () => {
    await verifyDataView.clickContinueButon();
    await successChargeCreditView.tittleView.waitForDisplayed({ timeout: 20000 });
    await expect(successChargeCreditView.tittleView).toBeDisplayed();
  });
});

