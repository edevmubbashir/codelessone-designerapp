import Driver from "../../../Main/Driver";
import { CrudOperationsPageObject } from "../../PageObjects/crud-operationpageob";

var crudOperation = new CrudOperationsPageObject();
export default class AddNewEntity extends Driver {
  private async ClickNewButton() {
    await Driver.findElement(crudOperation.addItemClass).click();
  }
  private async EnterAttributeName(attributeName: string) {}
}
