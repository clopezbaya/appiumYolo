export async function scrollToElement(elementText, driver) {
    try {
        // @ts-ignore
        let element = await $(`//*[@text='${elementText}']`);

        // Verificar si el elemento ya está visible antes de hacer scroll
        if (await element.isDisplayed()) {
            console.log("Elemento ya visible");
            return element;
        }

        let attempts = 0;
        const maxAttempts = 2; // Evitar bucles infinitos

        while (attempts < maxAttempts) {
            // Verificar si el elemento es visible antes de hacer scroll
            if (await element.isDisplayed()) {
                console.log("ELEMENTO ENCONTRADO");
                await element.waitForDisplayed({ timeout: 5000 });
                return element;
            }

            try {
                console.log(`Intento ${attempts + 1}: Haciendo swipe hacia arriba`);

                // Hacer swipe manualmente con coordenadas
                await driver.performActions([
                    {
                        type: "pointer",
                        id: "finger1",
                        parameters: { pointerType: "touch" },
                        actions: [
                            { type: "pointerMove", duration: 0, x: 500, y: 1500 }, // Punto inicial
                            { type: "pointerDown", button: 0 },
                            { type: "pause", duration: 500 },
                            { type: "pointerMove", duration: 1000, x: 500, y: 500 }, // Punto final (Swipe arriba)
                            { type: "pointerUp", button: 0 }
                        ],
                    }
                ]);
            } catch (scrollError) {
                console.warn(`Error en intento ${attempts + 1}: `, scrollError);
            }

            attempts++;
        }

        console.error(`No se encontró el elemento después de ${maxAttempts} intentos`);
        return null;

    } catch (error) {
        console.error("Error general en scrollToElement: ", error);
        return null;
    }
}