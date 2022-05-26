import Driver from "../../Main/Driver";
import { NewEntityRelationshipPageOB } from "../../PageObjects/newentityrelationshippageob";

const newEntityRelationshipPO = new NewEntityRelationshipPageOB();

export default class NewEntityRelationsService extends Driver {
  public async CreateOneToManyEntityRelationship() {
    await this.ClickOnNewRelationButton();
    await this.SelectEntitiesForRelation();
    await this.SelectEntityRelationOption("One to Many");
    await this.IsEntityRelationCreated("One to Many");
  }

  private async ClickOnNewRelationButton() {
    await Driver.findElement(
      newEntityRelationshipPO.newEntityRelations
    ).click();
    await Driver.findElement(newEntityRelationshipPO.addItemClass).click();
  }

  private async SelectEntitiesForRelation() {
    await Driver.findElement(
      newEntityRelationshipPO.selectFirstEntityDropdown
    ).click();
    await Driver.findElement(newEntityRelationshipPO.firstEntityText).click();

    await Driver.findElement(
      newEntityRelationshipPO.selectSecondEntityDropdown
    ).click();
    await Driver.findElement(newEntityRelationshipPO.secondEntityText).click();
  }

  private async SelectEntityRelationOption(relationType: string) {
    await Driver.findElement(
      newEntityRelationshipPO.getElemEntityRelationType(relationType)
    ).click();
    await this.ClickOnCreatRelationButton();
  }

  private async ClickOnCreatRelationButton() {
    await Driver.findElement(
      newEntityRelationshipPO.createEntityRelationship
    ).click();
  }

  private async IsEntityRelationCreated(relationType: string) {
    await this.waitForRelationCreation();

    await Driver.waitToExpectElement(
      newEntityRelationshipPO.getElemEntityRelationText(relationType)
    ).toHaveText(relationType);
  }

  private async waitForRelationCreation() {
    await Driver.waitToExpectElement(
      newEntityRelationshipPO.waitForCreationOfRelation
    ).toBeHidden();
  }
}
