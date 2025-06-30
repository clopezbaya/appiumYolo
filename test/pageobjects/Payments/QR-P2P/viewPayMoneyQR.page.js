import 'dotenv/config';
import { safeClick } from '../../../utils/actionsCommons';

    /**
    * @param {import("webdriverio").Browser} driver
    */

     class ViewPayMoneyQR {
        constructor(driver) {
            this.driver = driver;
        }

        get openGaleryButton() {
            return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(2)');
        }

        get backButton() {
            return this.driver.$('android=new UiSelector().className("android.widget.ImageView").instance(0)');
        }

        async clickOpenGaleryButton(){
            await safeClick(this.backButton)
        }
    
        async clickBackButton(){
            await safeClick(this.backButton)
        }

        async chargeQR(){
            await this.driver.execute('browserstack_executor: {"action": "cameraVideoInjection", "arguments": {"videoUrl": "' + process.env.QR_ID + '"}}');
        }
    
    }
    
    export default ViewPayMoneyQR;
    