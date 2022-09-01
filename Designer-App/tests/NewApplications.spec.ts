import MainCall from "../../main/MainCall";
import { test } from "../../fixtures/my-test";
import * as testdata from "../../appsettings/testdata.json";
import NewEntityService from "../services/entity/newEntities";
import NewAttributeService from "../services/attributes/newAttributes";
import NewApplicationService from "../services/application/newApplication";
import NewEntityRelationsService from "../services/relations/entityRelations";

test("Scenario: To verify creation and publication of Application", async ({
  userContext,
}) => {
  const firstUser = await userContext.newPage();
  const entityPage = new NewEntityService(firstUser);
  const attributePage = new NewAttributeService(firstUser);
  const appName = MainCall.getAppName();
  const newApp = new NewApplicationService(firstUser);
  const newEntity = new NewEntityService(firstUser);
  const entityRelationPage = new NewEntityRelationsService(firstUser);

  /*creating new application */
  await newApp.openOrganization();
  await newApp.createNewApplication(appName);

  /*creating first entity*/
  await newEntity.createNewEntityViaCreateButton(testdata.entityNames[0]);
  await entityPage.selectEntityFromGrid(testdata.entityNames[0], false);
  await attributePage.addNewAttribute(
    testdata.attributesNames[0],
    testdata.attributesType.Txt
  );
  await attributePage.addNewAttribute(
    testdata.attributesNames[1],
    testdata.attributesType.Num
  );

  /*creating second entity*/
  await newEntity.clickBackToEntity();
  await newEntity.createNewEntityViaCreateButton(testdata.entityNames[1]);
  await entityPage.selectEntityFromGrid(testdata.entityNames[1], false);
  await attributePage.addNewAttribute(
    testdata.attributesNames[2],
    testdata.attributesType.Txt
  );
  await attributePage.addNewAttribute(
    testdata.attributesNames[3],
    testdata.attributesType.Num
  );

  /*create one to many relation between two entities*/
  await entityRelationPage.createOneToManyEntityRelationship(
    testdata.entityNames[0],
    testdata.entityNames[1]
  );

  /*Publish appllcation*/
  await entityRelationPage.publishNewApplication();
  await entityRelationPage.isApplicationPublished();
  await userContext.waitForEvent("page");
  const numberOfPages = await userContext.pages();
  const entityRelationNewPage = new NewEntityRelationsService(numberOfPages[1]);
  await entityRelationNewPage.isDefaultPortalShowing();
});
