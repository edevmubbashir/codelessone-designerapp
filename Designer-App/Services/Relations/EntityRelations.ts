import Driver from "../../../main/Driver";
import { NewEntityRelationshipPageOB } from "../../pageObjects/newentityrelationshippageob";

const newEntityRelationshipPO = new NewEntityRelationshipPageOB();

export default class NewEntityRelationsService extends Driver {
  async createOneToManyEntityRelationship(firstEntity, secondEntity) {
    await this.clickOnNewRelationButton();
    await this.selectEntitiesForRelation(firstEntity, secondEntity);
    await this.selectEntityRelationOption("One to Many");
    await this.isEntityRelationCreated("One to Many");
  }

  async publishNewApplication() {
    await Driver.findElement(newEntityRelationshipPO.elemPublish).click();
    await Driver.findElement(newEntityRelationshipPO.elemPublishApp).click();
  }
  async isApplicationPublished() {
    await Driver.waitToExpectElement(
      newEntityRelationshipPO.elemPublishAppText
    ).toBeHidden();
    // await Driver.waitToExpectElement(
    //   newEntityRelationshipPO.elemPublishAppText
    // ).toHaveText("App is being  successfully published");
  }
  async clickGoToApp() {
    await Driver.findElement(newEntityRelationshipPO.elemGoToApp).click();
  }
  async isDefaultPortalShowing() {
    await Driver.waitToExpectElement(
      newEntityRelationshipPO.elemDefaultPortal
    ).toHaveText("Default Portal");
  }

  private async clickOnNewRelationButton() {
    await Driver.findElement(
      newEntityRelationshipPO.newEntityRelations
    ).click();
    await Driver.findElement(newEntityRelationshipPO.addItemClass).click();
  }

  private async selectEntitiesForRelation(firstEntity, secondEntity) {
    await Driver.findElement(
      newEntityRelationshipPO.selectFirstEntityDropdown
    ).click();
    await Driver.findElement(
      newEntityRelationshipPO.getEntityText(firstEntity)
    ).click();

    await Driver.findElement(
      newEntityRelationshipPO.selectSecondEntityDropdown
    ).click();
    await Driver.findElement(
      newEntityRelationshipPO.getEntityText(secondEntity)
    ).click();
  }

  private async selectEntityRelationOption(relationType: string) {
    await Driver.findElement(
      newEntityRelationshipPO.getElemEntityRelationType(relationType)
    ).click();
    await this.clickOnCreatRelationButton();
  }

  private async clickOnCreatRelationButton() {
    await Driver.findElement(
      newEntityRelationshipPO.createEntityRelationship
    ).click();
  }

  private async isEntityRelationCreated(relationType: string) {
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
