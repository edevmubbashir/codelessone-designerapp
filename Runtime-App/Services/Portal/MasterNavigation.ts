import { count } from "console";
import Driver from "../../../main/driver";
import { PortalNavigationPageOb } from "../../pageObjects/portalnavigationpage";

const portalNavPageOb = new PortalNavigationPageOb();
export default class PortalNavigationService extends Driver {
  private async getEntityCountsShowingOnPortal() {
    await Driver.waitForSelector(portalNavPageOb.entityNavigation);
    let result = await Driver.findElement(portalNavPageOb.entityNavigation);
    const count = await result.count();

    console.log(count);

    let entityList: Array<string> = [];
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        let singleEntity = await result.nth(i).textContent();
        if (singleEntity != null) {
          entityList.push(singleEntity);
          console.log(entityList[i]);
        }
      }
    }
    return entityList;
  }

  async getEntitiesShowingOnRuntime() {
    const result = await this.getEntityCountsShowingOnPortal();
    return result;
  }

  async selectEntity(entityName: string) {
    await Driver.waitForSelector(portalNavPageOb.entityNavigation);

    let result = await Driver.findElement(portalNavPageOb.entityNavigation);
    const count = await result.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        let singleEntity = await result.nth(i).textContent();
        if (singleEntity != null) {
          console.log(singleEntity + "from different method");
          if (singleEntity.match(entityName)) {
            await result.nth(i).click();
          }
        }
      }
    }
  }

  async selectNewButton() {
    await Driver.findElement(portalNavPageOb.elemAddNewEntity).click();
  }

  async verifyAttributesName() {
    const numberOfAttributes = Driver.findElement(
      portalNavPageOb.elemAddNewEntity
    );
    //for()
  }
}
