import 'dotenv/config';
import { getDriver } from '../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import ModalSendOrTranser from '../pageobjects/Payments/Common Payments/modalSendOrTransfer.page.js';
import ModalConfirmAccessContacts from '../pageobjects/Payments/P2P/modalConfirmAccessContacts.page.js';
import ContactsPayment from '../pageobjects/Payments/P2P/contactsPayment.page.js';
import EnterAmountOrReason from '../pageobjects/Payments/Common Payments/enterAmountAndReason.page.js';
import ViewConfirmTransaction from '../pageobjects/Payments/Common Payments/viewConfirmTransaction.page.js';
import ViewTransactionSuccess from '../pageobjects/Payments/Common Payments/viewTransactionSuccess.page.js';

describe('Test Transaccion P2P @smoke', () => {
    let homePage;
    let modalSendOrTransfer;
    let modalConfirmAccessContacts;
    let contactsPayment;
    let enterAmountAndReason;
    let viewConfirmTransaction;
    let viewTransactionSuccess;

    before(async () => {
        homePage = new HomePage(await getDriver());
        modalSendOrTransfer = new ModalSendOrTranser(await getDriver());
        modalConfirmAccessContacts = new ModalConfirmAccessContacts(await getDriver());
        contactsPayment = new ContactsPayment(await getDriver());
        enterAmountAndReason = new EnterAmountOrReason(await getDriver());
        viewConfirmTransaction = new ViewConfirmTransaction(await getDriver());
        viewTransactionSuccess = new ViewTransactionSuccess(await getDriver());
    });

    it('Ingreso al modal de "Envia o transfiere dinero"', async () => {
        await homePage.clickSendOrReceiveMoneyOption();
        await expect(modalSendOrTransfer.tittleView).toBeDisplayed();
    });

    it('Selecciono contacto para transferir', async () => {
        await modalSendOrTransfer.clickSendMoneyButton();
        await (await contactsPayment.tittleView).waitForDisplayed({ timeout: 10000 });
        await expect(contactsPayment.tittleView).toBeDisplayed();
        await contactsPayment.selectContact(process.env.CONTACT_TEST);
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
