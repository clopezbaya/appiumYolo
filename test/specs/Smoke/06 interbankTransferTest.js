import 'dotenv/config';
import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/home.page.js';
import ModalSendOrTranser from '../../pageobjects/Payments/Common Payments/modalSendOrTransfer.page.js';
import ModalConfirmAccessContacts from '../../pageobjects/Payments/P2P/modalConfirmAccessContacts.page.js';
import EnterAmountOrReason from '../../pageobjects/Payments/Common Payments/enterAmountAndReason.page.js';
import ViewConfirmTransaction from '../../pageobjects/Payments/Common Payments/viewConfirmTransaction.page.js';
import ViewTransactionSuccess from '../../pageobjects/Payments/Common Payments/viewTransactionSuccess.page.js';
import TransferMoneyView from '../../pageobjects/Payments/InterbankTransfer/transferMoneyView.page.js';
import AddDataToAccount from '../../pageobjects/Payments/InterbankTransfer/addDataToAccount.page.js';
import ModalVerifyData from '../../pageobjects/Payments/InterbankTransfer/modalVerifyData.page.js';

describe('Test Transaccion interbancaria BG @smoke', () => {
    let homePage;
    let modalSendOrTransfer;
    let modalConfirmAccessContacts;
    let transferMoneyView;
    let addDataToAccount;
    let modalVerifyData;
    let enterAmountAndReason;
    let viewConfirmTransaction;
    let viewTransactionSuccess;
    

    before(async () => {
        homePage = new HomePage(await getDriver());
        modalSendOrTransfer = new ModalSendOrTranser(await getDriver());
        modalConfirmAccessContacts = new ModalConfirmAccessContacts(await getDriver());
        addDataToAccount = new AddDataToAccount(await getDriver());
        modalVerifyData = new ModalVerifyData(await getDriver());
        transferMoneyView = new TransferMoneyView(await getDriver());
        enterAmountAndReason = new EnterAmountOrReason(await getDriver());
        viewConfirmTransaction = new ViewConfirmTransaction(await getDriver());
        viewTransactionSuccess = new ViewTransactionSuccess(await getDriver());
    });

    it('Ingreso al modal de "Envia o transfiere dinero"', async () => {
        await homePage.clickSendOrReceiveMoneyOption();
        await expect(modalSendOrTransfer.tittleView).toBeDisplayed();
    });

    it('Ingreso a la seccion de transferencias bancarias', async () => {
        await modalSendOrTransfer.clickTransferMoneyButton();
        await expect(transferMoneyView.tittleView).toBeDisplayed();
    });

    it('Se elimina registro previo del contacto en caso de existir', async () => {
        await transferMoneyView.eliminarContactoPorNombre(process.env.CONTACT_TEST);
        await expect(await transferMoneyView.rowContact(process.env.CONTACT_TEST)).not.toBeDisplayed();
    });

    it('Se ingresa al formulario de registro de datos para transeferir', async () => {
        await transferMoneyView.agregateNewContactButton();
        await expect(addDataToAccount.tittleView).toBeDisplayed();
    });

    it('Se agrega la nueva cuenta y confirma los datos', async () => {
        await addDataToAccount.enterNewDataToBankTransaction(process.env.CONTACT_TEST, process.env.ACCOUNT_NUMBER, process.env.BANK_NAME);
        await expect(modalVerifyData.tittleView).toBeDisplayed();
    });

    it('Se agrega la nueva cuenta y confirma los datos', async () => {
        await modalVerifyData.clickContinueButton();
        await enterAmountAndReason.setAmountAndReason(process.env.AMOUNT_TEST, process.env.REASON_TEST);
        await expect(viewConfirmTransaction.tittleView).toBeDisplayed();
    });

    it('Confirmo la transferencia', async () => {
        await viewConfirmTransaction.clickSendButton();
        await expect(viewTransactionSuccess.tittleView).toBeDisplayed();
    });
});
