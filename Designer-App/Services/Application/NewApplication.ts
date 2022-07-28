import { expect } from "@playwright/test";
import Driver from "../../../Main/Driver";
import { NewAppPageOb } from "../../PageObjects/newapppageob";


var newappPO = new NewAppPageOb();
export default class NewApplicationService extends Driver{
    
    //#region  PUBLIC METHODS

    public async CreateNewApplication(appName:string){
        
        expect(Driver.waitToExpectElement(newappPO.newAppButton).toBeVisible());
        await Driver.findElement(newappPO.newAppButton).click();

        await this.VerifyNewApplicationOptionsAreVisible();
        await this.ClickBuildYourOwnSolutionButton();
        await this.EnterAppName(appName);
        await this.ClickCreateButton();
    }
    
    

    //#endregion PUBLIC METHODS

    //#region PRIVATE METHODS

    //  NEW APPLICATION METHODS
    private async VerifyNewApplicationOptionsAreVisible(){
        await Driver.waitToExpectElement(newappPO.useOurSolution).toBeVisible();
        await Driver.waitToExpectElement(newappPO.buildYourOwn).toBeVisible();
        //expect(Driver.waitToExpectElement(newappPO.useOurSolution).toBeVisible());
    }

    private async ClickBuildYourOwnSolutionButton(){
        await Driver.findElement(newappPO.buildYourOwnSpan).click();
        await Driver.waitToExpectElement(newappPO.newAppName).toBeVisible();
    }

    private async EnterAppName(appName:string){
        await Driver.findElement(newappPO.newAppName).fill(appName);
        await Driver.waitToExpectElement(newappPO.createAppButton).toBeEnabled();
    }

    private async ClickCreateButton(){
        await Driver.findElement(newappPO.createAppButton).click();

        await Driver.waitForNavigation();
        await Driver.waitToExpectElement(newappPO.addItemClass).toBeVisible();
    }

    //  NEW ENTITY METHODS
    
    


    

    
    
}