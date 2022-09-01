import { expect } from "@playwright/test";
import { UserCredentials } from "../../../appsettings/variables";
import Driver from "../../../main/Driver";
import { LoginPageOb } from "../../pageObjects/loginpageob";
import { NewAppPageOb } from "../../pageObjects/newapppageob";

const loginPO = new LoginPageOb();
const newappPO = new NewAppPageOb();

export default class LoginService extends Driver {
  async loginToCodelessOne(url: string, userName: string, password: string) {
    await Driver.navigateToURL(url);
    await Driver.waitForNavigation();

    await Driver.waitToExpectElement(loginPO.emailaddress).toBeVisible();
    await Driver.waitToExpectElement(loginPO.password).toBeVisible();

    await Driver.findElement(loginPO.emailaddress).fill(userName);
    await Driver.findElement(loginPO.password).fill(password);

    await Driver.waitToExpectElement(loginPO.submitButton).toBeVisible();
    await Driver.findElement(loginPO.submitButton).click();

    await Driver.waitForNavigation();
    await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible({
      timeout: 90000,
    });
  }
}
