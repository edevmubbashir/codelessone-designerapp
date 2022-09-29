import { BasePageOb } from "./basepageob";

export class NewAppPageOb extends BasePageOb {
  //#region NEW APPLICATION UI MAPS

  public readonly appLoader: string = ".Authloader";
  public readonly newAppButton: string = "button[title='Create new App']";
  public readonly useOurSolution: string = "//p[contains(text(),'domain')]";
  public readonly buildYourOwn: string = "//p[contains(text(),'Build')]";
  public readonly spreadSheet: string = "//p[contains(text(),'spreadsheet')]";

  public elemGetApplicationName(appName: any) {
    return `text=${appName}`;
  }

  public readonly buildYourOwnSpan: string =
    "//h5[contains(text(),'Build your own')]";
  public readonly newAppName: string = "#project-name-field";
  //public readonly newAppName: string = "input[name$='name']";
  public readonly createAppButton: string =
    "//button[contains(text(),'Create')]";

  public readonly elemImportJSON: string = "text=Import a spreadsheet / JSON";
  public readonly elemImportAppName: string =
    'xpath=//*[@name="Application name"]';
  public readonly elemSelectFiles: string = '[name="files"]';
  public readonly elemImport: string = "//button[text()='Import']";
  //#endregion
}
