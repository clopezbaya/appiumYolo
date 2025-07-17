# AppiumYolo

Automatización de pruebas móviles utilizando **WebdriverIO**, **Appium** y **BrowserStack**, con soporte para Mocha, reportes Allure y Mochawesome.

## Características

- Uso de WebdriverIO para automatización de pruebas.
- Soporte para pruebas locales y en BrowserStack.
- Subida automática de APKs para testing.
- Uso de etiquetas (`@smoke`, `@test`) para filtrar pruebas.
- Reportes visuales generados con Allure y Mochawesome.

## Requisitos

- Node.js v16 o superior
- Cuenta en [BrowserStack](https://www.browserstack.com/)
- APK para probar

## ⚙️ Instalación

```bash
npm install
cp .env_example .env
```

Completa el archivo `.env` con tus credenciales de BrowserStack y algunos datos para las pruebas:

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

## Ejecución de pruebas

### Ejecutar pruebas de humo a todos los tests con el tag @smoke:
```bash
npm run testSmoke
```

### Ejecutar pruebas especificas por tag al implementar nuevos tests con el tag @test:
```bash
npm run test
```

## Generar reportes

```bash
npm run report
```

Esto abrirá un reporte Allure en tu navegador.

## Estructura del proyecto

```
appiumYolo/
├── test/              # Casos de prueba automatizados
├── utils/             # Funciones auxiliares (e.g., subida a BrowserStack)
├── wdio.conf.mjs      # Configuración principal de WebdriverIO
├── .env_example       # Variables de entorno necesarias
└── package.json       # Scripts y dependencias
```

## 🌐 Integraciones

- [BrowserStack App Automate](https://www.browserstack.com/app-automate)
- [Allure Reports](https://docs.qameta.io/allure/)
- [Mochawesome](https://github.com/adamgruber/mochawesome)

## Autor

Proyecto mantenido por el equipo de QA. Si necesitas soporte o mejoras, ¡no dudes en contribuir o abrir un issue!

## Licencia

MIT
