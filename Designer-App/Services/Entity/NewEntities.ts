import Driver from "../../../Main/Driver";
import { expect } from "@playwright/test";
import { NewEntityPageOB } from "../../PageObjects/newentitypageob";

var newEntityPO = new NewEntityPageOB();

export default class NewEntityService extends Driver {
  public async CreateNewEntityViaCreateButton(entityName: string) {
    await this.ClickAddEntityButton();

    await this.EnterEntityName(entityName);
    await this.ClickEntityCreateButton();

    await this.ClickBackToEntity();
  }

  public async SelectEntityFromGrid(
    entityName: string,
    clickBack2Entity: boolean
  ) {
    await this.VerifyEntityIsShowingOnGrid(entityName);
    await this.SelectEntity(entityName);

    if (clickBack2Entity) {
      await this.ClickBackToEntity();
    }
  }

  private async ClickAddEntityButton() {
    await Driver.findElement(newEntityPO.addItemClass).click();

    /**
     * VERIFY FOLLOWING ASSERTION AFTER CLICK ON ADD NEW ENTITY BUTTON
     * 1.   Text box to be enable and editable.
     * 2.   Cancel button should be enable.
     * 3.   Create And New button should be disable.
     * 4.   Create Button should be disable.
     */
    await Driver.waitToExpectElement(
      newEntityPO.newEntityTextBox
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.modalCancelBtn).toBeEnabled();
    await Driver.waitToExpectElement(
      newEntityPO.modalCreateAndNewBtn
    ).toBeDisabled();
    await Driver.waitToExpectElement(newEntityPO.modalCreateBtn).toBeDisabled();
  }

  private async EnterEntityName(entityName: string) {
    await Driver.findElement(newEntityPO.newEntityTextBox).fill(entityName);

    // VERIFY AFTER ENTERING ENTITY NAME, CREATE AND NEW BUTTON , CREATE BUTTON SHOULD BE ENABLE.
    await Driver.waitToExpectElement(
      newEntityPO.modalCreateAndNewBtn
    ).toBeEnabled();
    await Driver.waitToExpectElement(newEntityPO.modalCreateBtn).toBeEnabled();
  }

  private async ClickEntityCreateButton() {
    await Driver.findElement(newEntityPO.modalCreateBtn).click();

    await Driver.waitForNavigation();

    //  VERIFY BACK TO ENTITY and ADD NEW ATTRIBUTE BUTTON IS VISIBLE AND ENBABLE.
    await Driver.waitToExpectElement(
      newEntityPO.entitySuccessBackToEntity
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.addItemClass).toBeVisible();
  }

  public async ClickBackToEntity() {
    await Driver.findElement(newEntityPO.entitySuccessBackToEntity).click();

    //  ADD ASSERTION: TO VERIFY THAT BACK TO ENTITY PAGE IS SUCCESSFULL
  }

  private async VerifyEntityIsShowingOnGrid(entityName: string) {
    await Driver.waitToExpectElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).toBeVisible();
  }

  private async SelectEntity(entityName: string) {
    await Driver.findElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).click();
    await Driver.waitToExpectElement(
      newEntityPO.entitySuccessBackToEntity
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.addItemClass).toBeVisible();
  }
}
