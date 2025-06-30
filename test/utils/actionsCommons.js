export async function simulateTyping(element, value, driver) {
    await element.click();
    await element.setValue(value);
    await driver.hideKeyboard();
}

export async function safeClick(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
    await element.click();
  }
  
  export async function safeSetValue(element, value, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
    await element.setValue(value);
  }

  export async function swipe(driver, from, to, duration = 1000) {
    try {
      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: from.x, y: from.y },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 200 },
            { type: "pointerMove", duration: duration, x: to.x, y: to.y },
            { type: "pointerUp", button: 0 }
          ]
        }
      ]);
    } catch (err) {
      throw new Error(`❌ Swipe falló: ${err.message}`);
    }
  }