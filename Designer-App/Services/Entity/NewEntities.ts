import Driver from "../../../main/Driver";
import { expect } from "@playwright/test";
import { NewEntityPageOB } from "../../pageObjects/newentitypageob";

const newEntityPO = new NewEntityPageOB();

export default class NewEntityService extends Driver {
  async createNewEntityViaCreateButton(entityName: string) {
    await this.clickAddEntityButton();
    await this.enterEntityName(entityName);
    await this.clickEntityCreateButton();
    await this.clickBackToEntity();
  }

  async selectEntityFromGrid(entityName: string, clickBack2Entity: boolean) {
    await this.verifyEntityIsShowingOnGrid(entityName);
    await this.selectEntity(entityName);
    if (clickBack2Entity) {
      await this.clickBackToEntity();
    }
  }

  private async clickAddEntityButton() {
    await Driver.findElement(newEntityPO.addItemClass).click();

    /**
     * VERIFY FOLLOWING ASSERTION AFTER CLICK ON ADD NEW ENTITY BUTTON
     * 1.   Text box to be enable and editable.
     * 2.   Cancel button should be enable.
     * 3.   Create And New button should be disable.
     * 4.   Create Button should be disable.
     * 5.   Cross icon shoud be visible
     * 6.   Manadatory text box
     */
    await Driver.waitToExpectElement(
      newEntityPO.newEntityTextBox
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.modalCancelBtn).toBeEnabled();
    await Driver.waitToExpectElement(
      newEntityPO.modalCreateAndNewBtn
    ).toBeDisabled();
    await Driver.waitToExpectElement(newEntityPO.modalCreateBtn).toBeDisabled();

    await Driver.waitToExpectElement(
      newEntityPO.elemModalCrossIcon
    ).toBeVisible();

    await Driver.expectElement(
      Driver.findElement(newEntityPO.elemIconDropDown).last()
    ).toBeEnabled();

    Driver.expectElement(
      Driver.findElement('xpath=//*[@class="form-label d-inline-block"]')
        .last()
        .getAttribute("required")
    ).not.toBeNull();
  }

  private async enterEntityName(entityName: string) {
    await Driver.findElement(newEntityPO.newEntityTextBox).fill(entityName);

    // VERIFY AFTER ENTERING ENTITY NAME, CREATE AND NEW BUTTON , CREATE BUTTON SHOULD BE ENABLE.
    await Driver.waitToExpectElement(
      newEntityPO.modalCreateAndNewBtn
    ).toBeEnabled();
    await Driver.waitToExpectElement(newEntityPO.modalCreateBtn).toBeEnabled();
  }

  private async clickEntityCreateButton() {
    await Driver.findElement(newEntityPO.modalCreateBtn).click();

    await Driver.waitForNavigation();

    //  VERIFY BACK TO ENTITY and ADD NEW ATTRIBUTE BUTTON IS VISIBLE AND ENBABLE.
    await Driver.waitToExpectElement(
      newEntityPO.entitySuccessBackToEntity
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.addItemClass).toBeVisible();
  }

  async clickBackToEntity() {
    await Driver.findElement(newEntityPO.entitySuccessBackToEntity).click();

    //  ADD ASSERTION: TO VERIFY THAT BACK TO ENTITY PAGE IS SUCCESSFULL
  }

  private async verifyEntityIsShowingOnGrid(entityName: string) {
    await Driver.waitToExpectElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).toBeVisible();
  }

  private async selectEntity(entityName: string) {
    await Driver.findElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).click();
    await Driver.waitToExpectElement(
      newEntityPO.entitySuccessBackToEntity
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.addItemClass).toBeVisible();
  }
}
