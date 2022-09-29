import { expect } from "@playwright/test";
import { UserCredentials } from "../../../appsettings/variables";
import Driver from "../../../main/Driver";
import { NewAppPageOb } from "../../pageObjects/newapppageob";

const newappPO = new NewAppPageOb();
export default class NewApplicationService extends Driver {
  //#region  PUBLIC METHODS

  async createNewApplication(appName: string) {
    expect(Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible());
    await Driver.waitToExpectElement(newappPO.appLoader).toBeHidden();
    await Driver.findElement(newappPO.newAppButton).click();

    await this.verifyNewApplicationOptionsAreVisible();
    await this.clickBuildYourOwnSolutionButton();
    await this.enterAppName(appName);
    await this.clickCreateButton();
  }

  async createNewApplicationUsingImportJSON(appName: string) {
    await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible();
    await Driver.waitToExpectElement(newappPO.appLoader).toBeHidden();
    await Driver.findElement(newappPO.newAppButton).click();

    await this.verifyNewApplicationOptionsAreVisible();
    await this.clickImportSpreadsheetJSON();
    await this.enterJSONAppName(appName);
    await this.uploadAppJSONFile();
    await this.clickImportButton();
  }

  async openOrganization() {
    const organizatioName = UserCredentials.organizatioName;
    await Driver.navigateToURL(
      `https://appmaker.xtremecodeless.com/${organizatioName}`
    );
    await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible({
      timeout: 120000,
    });
  }

  async openApplication(appName) {
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

  private async clickImportSpreadsheetJSON() {
    await Driver.findElement(newappPO.elemImportJSON).click();
    await Driver.waitToExpectElement(newappPO.elemImportAppName).toBeVisible();
  }

  private async enterJSONAppName(appName: string) {
    await Driver.findElement(newappPO.elemImportAppName).fill(appName);
  }

  private async uploadAppJSONFile() {
    await Driver.findElement(newappPO.elemSelectFiles).setInputFiles(
      UserCredentials.runTimeApp
    );
    await Driver.waitToExpectElement(newappPO.elemImport).toBeEnabled();
  }

  private async clickImportButton() {
    await Driver.findElement(newappPO.elemImport).click();
    await Driver.waitForNavigation();
    await Driver.waitToExpectElement(newappPO.addItemClass).toBeVisible();
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
