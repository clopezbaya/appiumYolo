import 'dotenv/config';

import { getDriver } from '../../utils/setup.js';
import ModalPayOrChargeMoneyQR from '../../pageobjects/Payments/QR-P2P/modalPayOrChargeMoneyQR.page.js';
import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/home.page.js';
import ViewPayMoneyQR from '../../pageobjects/Payments/QR-P2P/viewPayMoneyQR.page.js';
import EnterAmountOrReason from '../../pageobjects/Payments/Common Payments/enterAmountAndReason.page.js';
import ViewConfirmTransaction from '../../pageobjects/Payments/Common Payments/viewConfirmTransaction.page.js';
import ViewTransactionSuccess from '../../pageobjects/Payments/Common Payments/viewTransactionSuccess.page.js';

describe('🔍 Verificar pago por QR @smoke @test', () => {
  let homePage;
  let modalQR;
  let viewPayment;
  let enterAmountAndReason;
  let viewConfirmTransaction;
  let viewTransactionSuccess;

  before(async () => {
    homePage = new HomePage(await getDriver());
    modalQR = new ModalPayOrChargeMoneyQR(await getDriver());
    viewPayment = new ViewPayMoneyQR(await getDriver());
    enterAmountAndReason = new EnterAmountOrReason(await getDriver());
    viewConfirmTransaction = new ViewConfirmTransaction(await getDriver());
    viewTransactionSuccess = new ViewTransactionSuccess(await getDriver());
  });

  it('Debe verificar que se puede abrir el QR para pago', async () => {
    await viewPayment.chargeQR();
    await homePage.clickSendOrReceiveMoneyQROption();
    await expect(modalQR.tittleView).toBeDisplayed();
    await modalQR.clickPayButton();
    await expect(enterAmountAndReason.tittleView).toBeDisplayed();
  });

  it('Ingreso los datos de transferencia', async () => {
    await enterAmountAndReason.setAmountAndReason(process.env.AMOUNT_TEST, process.env.REASON_TEST);
    await expect(viewConfirmTransaction.tittleView).toBeDisplayed();
  });

  it('Confirmo la transferencia', async () => {
      await viewConfirmTransaction.clickSendButton();
      await expect(viewTransactionSuccess.tittleView).toBeDisplayed();
  });
});

