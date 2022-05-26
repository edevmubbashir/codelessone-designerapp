import { BasePageOb } from "./basepageob";

export class NewAppPageOb extends BasePageOb{

    //#region NEW APPLICATION UI MAPS
    
    public readonly newAppButton:string = "button[title='Create new Application']";
    public readonly useOurSolution:string = "//p[contains(text(),'solution')]";
    public readonly buildYourOwn:string = "//p[contains(text(),'Build')]";
    public readonly spreadSheet:string = "//p[contains(text(),'spreadsheet')]";

    public readonly buildYourOwnSpan:string = "//h5[contains(text(),'Build your own')]";
    public readonly newAppName:string = "input[name$='name']";
    public readonly createAppButton:string = "button[type='submit']";

    //#endregion
       
}