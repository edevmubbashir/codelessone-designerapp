import { expect } from "@playwright/test";
import Driver from "../../../Main/Driver";
import { LoginPageOb } from "../../PageObjects/loginpageob";
import { NewAppPageOb } from "../../PageObjects/newapppageob";

var loginPO = new LoginPageOb();
var newappPO = new NewAppPageOb();

export default class LoginService extends Driver{

    public async LoginToCodelessOne(url:string  ,userName:string, password:string){

        await Driver.navigateToURL(url);
        await Driver.waitForNavigation();

        await Driver.waitToExpectElement(loginPO.emailaddress).toBeVisible();
        await Driver.waitToExpectElement(loginPO.password).toBeVisible();

        
        await Driver.findElement(loginPO.emailaddress).fill(userName)
        await Driver.findElement(loginPO.password).fill(password)


        await Driver.waitToExpectElement(loginPO.submitButton).toBeVisible();
        await Driver.findElement(loginPO.submitButton).click();

        await Driver.waitForNavigation();

        await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible();
    }

    public async LoginAndOpenSpecificOrgAndProject(url:string, organizatioName:string, appName:string, userName:string, password:string){

        await Driver.navigateToURL(url);
        await Driver.waitForNavigation();

        await Driver.waitToExpectElement(loginPO.emailaddress).toBeVisible();
        await Driver.waitToExpectElement(loginPO.password).toBeVisible();

        
        await Driver.findElement(loginPO.emailaddress).fill(userName)
        await Driver.findElement(loginPO.password).fill(password)


        await Driver.waitToExpectElement(loginPO.submitButton).toBeVisible()
        ;
        await Driver.findElement(loginPO.submitButton).click();

        await Driver.waitForNavigation();

        await Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible();

        var actualUrl = url+organizatioName+"/"+appName+"/Entities";
        console.log(actualUrl);

        await Driver.navigateToURL(actualUrl);

    }
}