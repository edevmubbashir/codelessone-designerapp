import { UserCredentials } from "../../appsettings/variables";
export class ApplicationDashboardPageOb {
  getApplicationDashboardName(applicationName: string) {
    let returnParam = "//div[@title='" + applicationName + "']";
    console.log(returnParam);

    return returnParam;
  }

  readonly portalViews: string =
    "//div[contains(text(),'" + UserCredentials.portal + "')]";
}
