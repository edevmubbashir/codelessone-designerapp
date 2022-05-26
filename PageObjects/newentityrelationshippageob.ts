import { BasePageOb } from "./basepageob";

export class NewEntityRelationshipPageOB extends BasePageOb {
  //#region NEW RELATIONSHIP ENTITIES MAPING

  public readonly newEntityRelations: string = "text=Entity Relations";
  public readonly selectFirstEntityDropdown: string = ".k-input >> nth=0";

  public readonly firstEntityText: string =
    'li[role="option"]:has-text("Entity01")';

  public readonly selectSecondEntityDropdown: string =
    "span:nth-child(3) > .k-dropdown-wrap > .k-input";

  public readonly secondEntityText: string =
    'li[role="option"]:has-text("Entity02")';

  public readonly createEntityRelationship: string = "text=Create >> nth=2";

  public readonly waitForCreationOfRelation: string =
    "text=Wait while relation is being created";

  public getElemEntityRelationText(relationText: string) {
    return `u:has-text('${relationText}')`;
  }

  public getElemEntityRelationType(relationType: string) {
    return `div[role="dialog"] >> text=${relationType}`;
  }
}
