import { count } from "console";
import Driver from "../../../Main/Driver";
import { PortalNavigationPageOb } from "../../PageObjects/portalnavigationpage";

var portalNavPageOb = new PortalNavigationPageOb();
export default class PortalNavigationService extends Driver {
  private async GetEntityCountsShowingOnPortal() {
    await Driver.waitForSelector(portalNavPageOb.entityNavigation);
    var result = await Driver.findElement(portalNavPageOb.entityNavigation);
    var count = await result.count();

    console.log(count);

    var entityList: Array<string> = [];
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        var singleEntity = await result.nth(i).textContent();
        if (singleEntity != null) {
          entityList.push(singleEntity);
          console.log(entityList[i]);
        }
      }
    }
    return entityList;
  }

  public async GetEntitiesShowingOnRuntime() {
    var result = await this.GetEntityCountsShowingOnPortal();
    return result;
  }

  public async SelectEntity(entityName: string) {
    await Driver.waitForSelector(portalNavPageOb.entityNavigation);

    var result = await Driver.findElement(portalNavPageOb.entityNavigation);
    var count = await result.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        var singleEntity = await result.nth(i).textContent();
        if (singleEntity != null) {
          console.log(singleEntity + "from different method");
          if (singleEntity.match(entityName)) {
            await result.nth(i).click();
          }
        }
      }
    }
  }

  public async SelectNewButton(){
    await Driver.findElement(portalNavPageOb.elemAddNewEntity).click();
  }

  public async VerifyAttributesName(){
    const numberOfAttributes =  Driver.findElement(portalNavPageOb.elemAddNewEntity);
    //for()
  }
}
