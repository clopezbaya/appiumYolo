import 'dotenv/config';

import { getDriver } from '../../utils/setup.js';
import { expect } from '@wdio/globals';
import HomePage from '../../pageobjects/home.page.js';
import ViewAttentionPoints from '../../pageobjects/AttentionPoints/viewAttentionPoints.page.js';

describe('🔍 Verificar carga correcta del mapa de google @smoke', () => {
  let homePage;
  let viewAttentionPoints;

  before(async () => {
    homePage = new HomePage(await getDriver());
    viewAttentionPoints = new ViewAttentionPoints(await getDriver());
  });

  it('Debe mostrarse la vista de puntos de atencion con el mapa cargado', async () => {
    await homePage.clickAttentionPoints();
    await expect(viewAttentionPoints.tittleView).toBeDisplayed();
    await viewAttentionPoints.clickMapIndicator();
    await viewAttentionPoints.clickShowYoloPointsRadioButton();
    await viewAttentionPoints.clickShowATMsRadioButton();
    await expect(viewAttentionPoints.myLocattionButton).toBeDisplayed();
  });
});

