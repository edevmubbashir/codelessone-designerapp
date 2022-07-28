
import { UserCredentials } from "../../appsettings/variables";
export class ApplicationDashboardPageOb{

    public getApplicationDashboardName(applicationName: string) {
        var returnParam = "//div[@title='"+applicationName+"']"
        console.log(returnParam);
        
        return returnParam;
      }
    
      
    public readonly portalViews:string = "//div[contains(text(),'"+UserCredentials.portal+"')]";
     
  

}