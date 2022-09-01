import Driver from "../../../main/Driver";

export default class GeneralMethodServices extends Driver {
  async clearTextField(locator: string) {
    await Driver.focusOnElement(locator);

    //  KEYBOARD DOWN.
    //  KEYBOARD PRESS A.
    //  KEYBOARD UP.
    //  KEYBOARD PRESS BACKSPACE.

    await Driver.keyboardInteraction("down", "Control");
    await Driver.keyboardInteraction("press", "A");
    await Driver.keyboardInteraction("up", "Control");
    await Driver.keyboardInteraction("press", "Backspace");
  }
}
