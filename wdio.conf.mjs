import path from 'path';
import fs from 'fs';
import axios from 'axios';
import allure from '@wdio/allure-reporter';
import 'dotenv/config';
import FormData from 'form-data';
import { closeConnection, resetEmail } from './test/utils/db.js';

// 🔼 Sube el APK al endpoint correcto
async function uploadApp(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), path.basename(filePath));
  
    const response = await axios.post(
      'https://api-cloud.browserstack.com/app-automate/upload',
      formData,
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`).toString('base64'),
          ...formData.getHeaders(),
        },
      }
    );
    return response.data.app_url;
  }
  
  // 📎 Sube otros archivos
  async function uploadMedia(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), path.basename(filePath));
  
    const response = await axios.post(
      'https://api-cloud.browserstack.com/app-automate/upload-media',
      formData,
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`).toString('base64'),
          ...formData.getHeaders(),
        },
      }
    );
    return response.data.media_url;
  }

export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 1,

    //Config for BrowserStack (Comment to use phisic tests)
    port: 443,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '12.0',
        'appium:deviceName': 'Samsung Galaxy S22 Ultra',
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,  
        'appium:fullReset': false, 
        'appium:dontStopAppOnReset': false,
        'appium:autoGrantPermissions' : true,
        'appium:language': 'es',
        'appium:locale': 'ES',
        'appium:app': '',  // Será llenado dinámicamente en onPrepare
        'bstack:options': {
            projectName: 'Mi Proyecto AppAutomate',
            buildName: 'Build #1',
            sessionName: 'Test Samsung',
            appiumVersion: '2.15.0',
            networkLogs: true,
            idleTimeout: 300,
            interactiveDebugging: true,
            uploadMedia: [],
            enableCameraVideoInjection: true,
        }
    }],
    services: [['browserstack'],['appium']],

    //Config for phisic Execution (Uncomment to use)
    // port: 4723,
    // capabilities: [{
    //     platformName: 'Android',
    //     'appium:deviceName': 'b598cd0',
    //     'appium:platformVersion': '15',
    //     'appium:automationName': 'UiAutomator2',
    //     'appium:appPackage': 'bo.com.yolopago.qa',
    //     'appium:appActivity': 'bo.com.yolopago.MainActivity',
    //     'appium:autoGrantPermissions' : true,
    //     'appium:noReset': false,  
    //     'appium:fullReset': false, 
    //     'appium:dontStopAppOnReset': false,
    //     'appium:appiumVersion': '2.0.0'
    // }],
    // services: [['appium']],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 5,
    framework: 'mocha',
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        timeout: 50000,
        //bail: true,
        ui: 'bdd',
    },

    // Coment to changue to phisical Test
    onPrepare: async function (config, capabilities, specs) {
        try {
          const appPath = process.env.BROWSERSTACK_APP_PATH;
          const contactsPath = process.env.BROWSERSTACK_CONTACT_PATH;
          const qrPath = process.env.BROWSERSTACK_QR_PATH;
    
          // Subimos el APK y el archivo .vcf de contactos
          const [appId, contactId, qrId] = await Promise.all([
            uploadApp(appPath),
            uploadMedia(contactsPath),
            uploadMedia(qrPath)
          ]);
    
          console.log('📤 App ID:', appId);
          console.log('📤 Contact ID (.vcf):', contactId);
          process.env.QR_ID = qrId
          console.log('📤 QR ID (.mp4):', process.env.QR_ID);
          // Asignamos el APK
          capabilities[0]['appium:app'] = appId;
          capabilities[0]['bstack:options'].uploadMedia = [contactId, qrId];
    
        } catch (error) {
          console.error('❌ Error en beforeSession:', error.response?.data || error.message);
          process.exit(1);
        }
    },

    afterTest: async function (test, context, { error, passed }) {
      // Reset Email
      await resetEmail(process.env.CELULAR);
  
      if (!passed) {
          const timestamp = new Date().toISOString().replace(/:/g, '-');
          const dir = './errorShots';
          const filepath = path.join(dir, `${test.title}-${timestamp}.png`);
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
          }
  
          const screenshot = await globalThis.browser.takeScreenshot();
  
          try {
              fs.writeFileSync(filepath, Buffer.from(screenshot, 'base64'));
              console.log(`✅ Imagen guardada correctamente en ${filepath}`);
  
              // 📎 Adjuntar screenshot a Allure manualmente
              allure.addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
          } catch (e) {
              console.error(`❌ Error al guardar la imagen: ${e.message}`);
          }
      }
  },
  

    onComplete: async function() {
        //Close connection DB
        await closeConnection();
        console.log("🧹 Pool de conexión cerrado correctamente.");
    },
}
