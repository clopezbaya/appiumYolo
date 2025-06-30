import sharp from 'sharp';
import { getDriver } from '../utils/setup.js';
import ModalPayOrChargeMoneyQR from '../pageobjects/Payments/QR-P2P/modalPayOrChargeMoneyQR.page.js';
import ViewChargeMoney from '../pageobjects/Payments/QR-P2P/viewChargeMoney.page.js';
import { expect } from '@wdio/globals';
import { compareQR } from '../utils/compareQR.js';
import HomePage from '../pageobjects/home.page.js';
import fs from 'fs';

describe('🔍 Verificar generación de QR @smoke', () => {
  let homePage;
  let modalQR;
  let viewCharge;

  before(async () => {
    // Instancia las páginas con el driver configurado
    homePage = new HomePage(await getDriver());
    modalQR = new ModalPayOrChargeMoneyQR(await getDriver());
    viewCharge = new ViewChargeMoney(await getDriver());
  });

  it('Debe verificar que el QR se genera correctamente', async () => {
    // Abre la opción de enviar o recibir dinero por QR
    await homePage.clickSendOrReceiveMoneyQROption();

    // Verifica que estamos en la vista del modal QR
    await expect(modalQR.tittleView).toBeDisplayed();

    // Haz clic en "Cobrar"
    await modalQR.clickChargeButton();

    // Verifica que se muestra la pantalla con el QR
    await expect(viewCharge.tittleView).toBeDisplayed();

    // Captura imagen del elemento QR como base64 y conviértelo a buffer
    const qrElement = await viewCharge.qrGenerated;
    const base64Image = await qrElement.takeScreenshot();
    const fullBuffer = Buffer.from(base64Image, 'base64');

    // Recorta el área del QR de la imagen y la redimensiona
    const croppedBuffer = await sharp(fullBuffer)
      .extract({ left: 108, top: 350, width: 864, height: 864 }) // bounds del contenedor QR
      .resize(420, 376) // tamaño deseado para comparación
      .png()
      .toBuffer();

    // Carga la imagen de referencia (QR vacío)
    const blankBuffer = fs.readFileSync('./data/blank.png');

    // Compara las imágenes y obtiene cantidad de píxeles diferentes
    const diff = await compareQR(croppedBuffer, blankBuffer);

    console.log(`🕳️ Diferencias con vacía: ${diff}`);

    // Asegura que el QR generado no sea igual al vacío
    expect(diff > 1000).toBe(true, '❌ El QR no se generó correctamente');
  });
});
