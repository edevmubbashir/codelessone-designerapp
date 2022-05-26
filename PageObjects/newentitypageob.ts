import { BasePageOb } from "./basepageob";

export class NewEntityPageOB extends BasePageOb{
     //#region NEW ENTITIES MAPING

     
     public readonly newEntityTextBox:string = "//input[@name='EntityNameInput']";
 
     // public readonly entityModalCancelBtn:string = "//button[contains(text(),'Cancel')]";
     // public readonly entityModalCreateAndNewBtn:string = "//button[contains(text(),'Create and New')]";
     // public readonly entityModalCreateBtn:string = "//button[text()='Create']";
     public readonly entitySuccessBackToEntity = "//button[@title='Back to Entities']";
     //Back to Entities

}