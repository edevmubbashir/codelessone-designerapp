import Driver from "../../../main/driver";
import { ApplicationDashboardPageOb } from "../../pageObjects/applicationdashboard";

const applicationDashboardsPageOb = new ApplicationDashboardPageOb();

export default class ApplicationDashboard extends Driver {
  async verifyThatAppNameIsVisibleOnDashboard(appName: string) {
    await Driver.waitToExpectElement(
      applicationDashboardsPageOb.getApplicationDashboardName(appName)
    ).toBeVisible();
  }

  async selectApplicationFromDashboard(appName: string) {
    await Driver.findElement(
      applicationDashboardsPageOb.getApplicationDashboardName(appName)
    ).click();
    await Driver.waitForNavigation();
  }

  async seletPortal() {
    await Driver.findElement(applicationDashboardsPageOb.portalViews).click();
  }
}
