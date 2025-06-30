import 'dotenv/config';
import { remote } from "webdriverio";
import { config } from "../../wdio.conf.mjs"
import LoginPage from "../pageobjects/login.page.js";
import FirstViewPage from '../pageobjects/firstView.page.js';
import HomePage from '../pageobjects/home.page.js';

let driver;

async function getDriver() {
    if (!global.driver) {
        console.log("🚀 Iniciando WebDriver...");
        // @ts-ignore
        global.driver = await remote(config);
    }
    return global.driver;
}

async function ensureLoggedIn() {
    if (process.env.SKIP_AUTO_LOGIN === 'true') {
        console.log("🚫 Auto-login omitido por test.");
        return;
    }

    driver = await getDriver();
    const loginPage = new LoginPage(driver);
    const homePage = new HomePage(driver);

    console.log("🔍 Verificando si el usuario ya está logueado...");
    const isUserLoggedIn = await homePage.isLoggedIn();
    const firstViewBeforeLogin = new FirstViewPage(driver);

    if (isUserLoggedIn == false) {
        console.log("🔑 No hay sesión activa, iniciando login...");
        await firstViewBeforeLogin.clickWithAccount();
        await loginPage.login(process.env.CELULAR, process.env.PASSWORD);
        console.log("✅ Sesión iniciada correctamente.");
    } else {
        console.log("✅ Usuario ya estaba logueado.");
    }
}


before(async function () {
    await ensureLoggedIn();
});

export { getDriver };
