import Driver from "../../../main/Driver";
import { NewEntityPageOB } from "../../pageObjects/newentitypageob";

const newEntityPO = new NewEntityPageOB();

export default class NewEntityService extends Driver {
  async createNewEntityViaCreateButton(entityName: string) {
    await this.clickAddEntityButton();
    await this.enterEntityName(entityName);
    await this.clickEntityCreateButton();
    await this.clickBackToEntity();
  }

  async createNewEntityViaCreateAndNewButton(entityName: string) {
    await this.clickAddEntityButton();
    await this.enterEntityName(entityName);
    await this.selectIcon();
    await this.clickEntityCreateAndNewButton(entityName);
  }

  async selectEntityFromGrid(entityName: string, clickBack2Entity: boolean) {
    await this.verifyEntityIsShowingOnGrid(entityName);
    await this.selectEntity(entityName);
    if (clickBack2Entity) {
      await this.clickBackToEntity();
    }
  }

  async clickAddEntityButton() {
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
      Driver.findElement(newEntityPO.elemModelLabel)
        .last()
        .getAttribute("required")
    ).not.toBeNull();
  }

  private async enterEntityName(entityName: string) {
    await Driver.findElement(newEntityPO.newEntityTextBox).fill(entityName);
    /*verifying that text box has maximum length of 64 */
    await Driver.waitToExpectElement(
      newEntityPO.newEntityTextBox
    ).toHaveAttribute("maxlength", "64");

    // VERIFY AFTER ENTERING ENTITY NAME, CREATE AND NEW BUTTON , CREATE BUTTON SHOULD BE ENABLE.

    await Driver.waitToExpectElement(
      newEntityPO.modalCreateAndNewBtn
    ).toBeEnabled();
    await Driver.waitToExpectElement(newEntityPO.modalCreateBtn).toBeEnabled();
  }

  private async selectIcon() {
    await Driver.findElement(newEntityPO.elemDropDownIcon).last().click();
    await Driver.findElement(newEntityPO.elemImageIcon).first().click();
    await Driver.expectElement(
      Driver.findElement(newEntityPO.elemSelectedImageIcon).last()
    ).toHaveClass(/fa-image/);
  }

  private async isGreenLoaderShowing() {
    const loaderElement = Driver.findElement(newEntityPO.elemLoader).last();
    await Driver.expectElement(loaderElement).toBeVisible();
  }

  private async clickEntityCreateButton() {
    await Driver.findElement(newEntityPO.modalCreateBtn).click();
    await this.isGreenLoaderShowing();
    await Driver.waitForNavigation();

    //  VERIFY BACK TO ENTITY and ADD NEW ATTRIBUTE BUTTON IS VISIBLE AND ENBABLE.
    await Driver.waitToExpectElement(
      newEntityPO.entitySuccessBackToEntity
    ).toBeVisible();
    await Driver.waitToExpectElement(newEntityPO.addItemClass).toBeVisible();
  }

  private async clickEntityCreateAndNewButton(entityName: string) {
    await Driver.findElement(newEntityPO.elemModalCreateAndNewButton).click();
    await this.isGreenLoaderShowing();
    await this.verifyEntityIsShowingOnGrid(entityName);
    await Driver.waitToExpectElement(
      newEntityPO.elemEntityModalTitle
    ).toBeVisible();
  }

  async verifyEntityNotCreatedWhenClickOnCancelButton(entityName: string) {
    await this.enterEntityName(entityName);
    await this.clickCancelButton();
    await this.verifyEntityIsNotShowingOnGrid(entityName);
  }

  async verifyEntityNotCreatedWhenClickOnCrossIconButton(entityName: string) {
    await this.enterEntityName(entityName);
    await this.clickCrossIconButton();
    await this.verifyEntityIsNotShowingOnGrid(entityName);
  }

  async clickBackToEntity() {
    await Driver.findElement(newEntityPO.entitySuccessBackToEntity).click();
    await Driver.waitToExpectElement(newEntityPO.elemPageHeader).toHaveText(
      "Entities"
    );

    //  ADD ASSERTION: TO VERIFY THAT BACK TO ENTITY PAGE IS SUCCESSFULL
  }

  private async verifyEntityIsShowingOnGrid(entityName: string) {
    await Driver.waitToExpectElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).toBeVisible();
  }

  private async verifyEntityIsNotShowingOnGrid(entityName: string) {
    await Driver.waitToExpectElementWithOptions(newEntityPO.anchorTag, {
      hasText: entityName,
    }).not.toBeVisible();
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

  private async clickCancelButton() {
    await Driver.findElement(newEntityPO.modalCancelBtn).click();
  }

  private async clickCrossIconButton() {
    await Driver.findElement(newEntityPO.elemModalCrossIcon).click();
  }
}
