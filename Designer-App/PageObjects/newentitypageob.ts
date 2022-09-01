import { BasePageOb } from "./basepageob";

export class NewEntityPageOB extends BasePageOb {
  //#region NEW ENTITIES MAPING

  public readonly newEntityTextBox: string = "//input[@name='EntityNameInput']";

  // public readonly entityModalCancelBtn:string = "//button[contains(text(),'Cancel')]";
  // public readonly entityModalCreateAndNewBtn:string = "//button[contains(text(),'Create and New')]";
  // public readonly entityModalCreateBtn:string = "//button[text()='Create']";
  public readonly entitySuccessBackToEntity: string =
    "//button[@title='Back to Entities']";

  public readonly elemModalCreateAndNewButton: string = "text=Create and New";

  public readonly elemEntityModalTitle: string = "text=Create Entity";

  public readonly elemModelLabel =
    'xpath=//*[@class="form-label d-inline-block"]';

  public readonly elemLoader = ".loader";

  //Back to Entities
}
