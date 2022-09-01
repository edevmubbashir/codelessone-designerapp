import Driver from "../../../main/driver";
import { CrudOperationsPageObject } from "../../pageObjects/crud-operationpageob";

const crudOperation = new CrudOperationsPageObject();
export default class AddNewEntity extends Driver {
  private async clickNewButton() {
    await Driver.findElement(crudOperation.addItemClass).click();
  }
  private async enterAttributeName(attributeName: string) {}
}
