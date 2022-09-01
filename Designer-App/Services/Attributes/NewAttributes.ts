import Driver from "../../../main/Driver";
import { NewAttributePageOB } from "../../pageObjects/newattributepageob";
import GeneralMethodServices from "../sharedServices/generalMethodsServices";

const attributePO = new NewAttributePageOB();
export default class NewAttributeService extends Driver {
  async addNewAttribute(attrName: string, attrType: string) {
    await this.clickAddAttributeButton();
    await this.enterAttributeName(attrName);
    await this.selectAttributeType(attrType);
    await this.clickCreateButton();
    await this.verifyAttributeIsCreatedSuccessfully(attrName, attrType);
  }

  private async clickAddAttributeButton() {
    await Driver.findElement(attributePO.addItemClass).click();

    /**
     * VERIFY FOLLOWING ASSERTION AFTER CLICK ON ADD NEW ATTRIBUTE BUTTON
     * 1.   Text box to be enable and editable.
     * 2.   Cancel button should be enable.
     * 3.   Create And New button should be disable.
     * 4.   Create Button should be disable.
     */
    await Driver.waitToExpectElement(
      attributePO.newAttributeNameTxtBx
    ).toBeVisible();
    await Driver.waitToExpectElement(attributePO.modalCancelBtn).toBeEnabled();
    await Driver.waitToExpectElement(
      attributePO.modalCreateAndNewBtn
    ).toBeDisabled();
    await Driver.waitToExpectElement(attributePO.modalCreateBtn).toBeDisabled();
  }

  private async enterAttributeName(attrName: string) {
    await Driver.findElement(attributePO.newAttributeNameTxtBx).fill(attrName);

    // VERIFY AFTER ENTERING ENTITY NAME, CREATE AND NEW BUTTON , CREATE BUTTON SHOULD BE ENABLE.
    await Driver.waitToExpectElement(
      attributePO.modalCreateAndNewBtn
    ).toBeEnabled();
    await Driver.waitToExpectElement(attributePO.modalCreateBtn).toBeEnabled();
  }

  private async selectAttributeType(attrType: string) {
    const generalMethods = new GeneralMethodServices(Driver.page);
    await generalMethods.clearTextField(attributePO.attributeSearchBox);

    await Driver.findElement(attributePO.attributeSearchBox)
      .fill(attrType)
      .then(() => {
        Driver.keyboardInteraction("press", "Enter");
      });

    await this.assertEachAttributeType(attrType);
  }

  private async assertEachAttributeType(attrType: string) {
    switch (attrType) {
      case "Text": {
        //  ADD ASSERTION OF "TEXT" TYPE ATTRIBUTE
        break;
      }
      case "Number": {
        //  ADD ASSERTION OF "NUMBER" TYPE ATTRIBUTE
        break;
      }
      case "Dropdown": {
        //  ADD ASSERTION OF "DROPDOWN" TYPE ATTRIBUTE
        break;
      }
      case "Date Time": {
        //  ADD ASSERTION OF "DATE TIME" TYPE ATTRIBUTE
        break;
      }
      case "User Identity": {
        //  ADD ASSERTION OF "USER IDENTITY" TYPE ATTRIBUTE
        break;
      }
      case "Email": {
        //  ADD ASSERTION OF "EMAIL" TYPE ATTRIBUTE
        break;
      }
      case "Link": {
        //  ADD ASSERTION OF "LINK" TYPE ATTRIBUTE
        break;
      }
      case "Rich Content": {
        //  ADD ASSERTION OF "RICH CONTENT" TYPE ATTRIBUTE
        break;
      }
    }
  }

  private async clickCreateButton() {
    //await Driver.findElement(attributePO.modalCreateBtn).click();
    const element = Driver.findElement(attributePO.modalCreateBtn);
    await element.evaluate((node: HTMLElement) => node.click());
  }

  private async verifyAttributeIsCreatedSuccessfully(
    attrName: string,
    attrType: string
  ) {
    await Driver.findElementWithOptions(attributePO.gridTableCell, {
      hasText: attrName,
    })
      .first()
      .isVisible();
    await Driver.findElementWithOptions(attributePO.gridTableCell, {
      hasText: attrType,
    })
      .first()
      .isVisible();
  }
}
