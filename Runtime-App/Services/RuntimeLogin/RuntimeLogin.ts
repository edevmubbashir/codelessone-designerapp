import { expect } from "@playwright/test";
import exp from "constants";
import { ADDRGETNETWORKPARAMS } from "dns";
import Driver from "../../../Main/Driver";
import { ApplicationDashboardPageOb } from "../../PageObjects/applicationdashboard";
import { RuntimeLoginPageOb } from "../../PageObjects/runtime-loginpageob";
import ApplicationDashboard from "./ProjectDashboard";

var loginPO = new RuntimeLoginPageOb();

export default class RuntimeLoginService extends Driver {
  public async LoginToCodelessOne(
    url: string,
    userName: string,
    password: string,
    appName: string
  ) {
    await Driver.navigateToURL(url);
    await Driver.waitForNavigation();

    await Driver.waitToExpectElement(loginPO.emailaddress).toBeVisible();
    await Driver.waitToExpectElement(loginPO.password).toBeVisible();

    await Driver.findElement(loginPO.emailaddress).fill(userName);
    await Driver.findElement(loginPO.password).fill(password);

    await Driver.waitToExpectElement(loginPO.submitButton).toBeVisible();
    await Driver.findElement(loginPO.submitButton).click();

    await Driver.waitForNavigation();

    //  CREATED APPLICATION IS VISISBLE
    //await Driver.waitToExpectElement(applicationDashboard.getApplicationDashboardName(appName)).toBeVisible();
  }
}
