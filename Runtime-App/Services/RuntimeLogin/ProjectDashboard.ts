import Driver from "../../../Main/Driver";
import { ApplicationDashboardPageOb } from "../../PageObjects/applicationdashboard";

var applicationDashboardsPageOb = new ApplicationDashboardPageOb();

export default class ApplicationDashboard extends Driver{

    public async  VerifyThatAppNameIsVisibleOnDashboard(appName:string){
        await Driver.waitToExpectElement(applicationDashboardsPageOb.getApplicationDashboardName(appName)).toBeVisible();
    }

    public async SelectApplicationFromDashboard(appName:string){
        await Driver.findElement(applicationDashboardsPageOb.getApplicationDashboardName(appName)).click();
        await Driver.waitForNavigation();
    }

    public async SeletPortal(){
        await Driver.findElement(applicationDashboardsPageOb.portalViews).click();
    }

}