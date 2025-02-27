import { remote } from "webdriverio";
import { config } from "../wdio.conf.js";
import LoginPage from "./pageobjects/login.page.js";

let driver;

async function getDriver() {
    if (!global.driver) {
        console.log("🚀 Iniciando WebDriver...");
        global.driver = await remote(config);
    }
    return global.driver;
}

async function ensureLoggedIn() {
    driver = await getDriver();
    const loginPage = new LoginPage(driver);

    console.log("🔍 Verificando si el usuario ya está logueado...");
    const isUserLoggedIn = await loginPage.isLoggedIn();

    if (!isUserLoggedIn) {
        console.log("🔑 No hay sesión activa, iniciando login...");
        await loginPage.login("65502050", "2110");
        console.log("✅ Sesión iniciada correctamente.");
    } else {
        console.log("✅ Usuario ya estaba logueado.");
    }
}

before(async function () {
    await ensureLoggedIn();
});

// ❌ Elimina terminateApp para evitar que la app se cierre en cada ejecución.
after(async function () {
    if (global.driver) {
        console.log("♻️ WebDriver finalizado pero la app sigue abierta.");
    }
});

export { getDriver };
