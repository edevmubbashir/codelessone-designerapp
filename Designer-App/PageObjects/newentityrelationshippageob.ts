import { BasePageOb } from "./basepageob";

export class NewEntityRelationshipPageOB extends BasePageOb {
  //#region NEW RELATIONSHIP ENTITIES MAPING

  //public readonly newEntityRelations: string = "text=Entity Relations";
  public readonly newEntityRelations: string = "//i[@title='Entity Relations']";

  public readonly selectFirstEntityDropdown: string = ".k-input >> nth=0";


  public readonly selectSecondEntityDropdown: string =
    "span:nth-child(3) > .k-dropdown-wrap > .k-input";


  public readonly createEntityRelationship: string = "text=Create >> nth=2";

  public readonly waitForCreationOfRelation: string =
    "text=Wait while relation is being created";

  public readonly elemPublish:string = 'xpath=//*[@title="Publish"]';

  public readonly elemPublishApp:string = 'text=Publish App';
  public readonly elemPublishAppText:string = 'xpath=//*[contains(@class,"text-success")] >> nth=0';


  public  getEntityText(firstEntity: any) {
   return  `li[role="option"]:has-text("${firstEntity}")`;
  }

  public getElemEntityRelationText(relationText: string) {
    return `u:has-text('${relationText}')`;
  }

  public getElemEntityRelationType(relationType: string) {
    return `div[role="dialog"] >> text=${relationType}`;
  }
}
