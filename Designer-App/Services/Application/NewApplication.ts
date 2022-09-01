import { expect } from "@playwright/test";
import { UserCredentials } from "../../../appsettings/variables";
import Driver from "../../../main/Driver";
import { NewAppPageOb } from "../../pageObjects/newapppageob";

const newappPO = new NewAppPageOb();
export default class NewApplicationService extends Driver {
  //#region  PUBLIC METHODS

  async createNewApplication(appName: string) {
    expect(Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible());
    await Driver.findElement(newappPO.newAppButton).click();

    await this.verifyNewApplicationOptionsAreVisible();
    await this.clickBuildYourOwnSolutionButton();
    await this.enterAppName(appName);
    await this.clickCreateButton();
  }

  async openOrganization() {
    const organizatioName = UserCredentials.organizatioName;
    await Driver.navigateToURL(
      `https://appmaker.xtremecodeless.com/${organizatioName}`
    );
    await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible();
  }

  async openApplication() {
    const appName = UserCredentials.applicationName;
    await Driver.findElement(newappPO.elemGetApplicationName(appName)).click();
  }
  //#endregion PUBLIC METHODS

  //#region PRIVATE METHODS

  //  NEW APPLICATION METHODS
  private async verifyNewApplicationOptionsAreVisible() {
    await Driver.waitToExpectElement(newappPO.useOurSolution).toBeVisible();
    await Driver.waitToExpectElement(newappPO.buildYourOwn).toBeVisible();
    //expect(Driver.waitToExpectElement(newappPO.useOurSolution).toBeVisible());
  }

  private async clickBuildYourOwnSolutionButton() {
    await Driver.findElement(newappPO.buildYourOwnSpan).click();
    await Driver.waitToExpectElement(newappPO.newAppName).toBeVisible();
  }

  private async enterAppName(appName: string) {
    await Driver.findElement(newappPO.newAppName).fill(appName);
    await Driver.waitToExpectElement(newappPO.createAppButton).toBeEnabled();
  }

  private async clickCreateButton() {
    await Driver.findElement(newappPO.createAppButton).click();

    await Driver.waitForNavigation();
    await Driver.waitToExpectElement(newappPO.addItemClass).toBeVisible();
  }

  //  NEW ENTITY METHODS
}
