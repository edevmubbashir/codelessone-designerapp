import MainCall from "../../main/MainCall";
import { test } from "../../fixtures/codelessTest";
import * as testdata from "../../appsettings/testdata.json";
import * as app from "../../appsettings/appName.json";
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

  await test.step("Creating new application", async () => {
    await newApp.openOrganization();
    await newApp.createNewApplication(appName);
  });

  await test.step("Creating first entity", async () => {
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
  });

  await test.step("Creating second entity", async () => {
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
  });

  await test.step("Create one to many relation between two entities", async () => {
    await entityRelationPage.createOneToManyEntityRelationship(
      testdata.entityNames[0],
      testdata.entityNames[1]
    );
  });

  await test.step("Publish appllcation", async () => {
    await entityRelationPage.publishNewApplication();
    await entityRelationPage.isApplicationPublished();
    await userContext.waitForEvent("page");
    const numberOfPages = await userContext.pages();
    const entityRelationNewPage = new NewEntityRelationsService(
      numberOfPages[1]
    );
    await entityRelationNewPage.isDefaultPortalShowing();
  });

  await userContext.close();
});

test("TC_04, 06, 07 Verify when you click on Create and New Entity button, it creates the Entity and resets the Create entity pop up fields", async ({
  firstUser,
}) => {
  const newApp = new NewApplicationService(firstUser);
  const newEntity = new NewEntityService(firstUser);
  await newApp.openOrganization();
  await newApp.openApplication(app.appName);

  await test.step("Create new entity with create and new button", async () => {
    await newEntity.createNewEntityViaCreateAndNewButton(
      testdata.entityNames[2]
    );
    await newEntity.verifyEntityNotCreatedWhenClickOnCancelButton(
      testdata.entityNames[3]
    );
  });

  await test.step("Clicking on cross icon", async () => {
    await newEntity.clickAddEntityButton();
    await newEntity.verifyEntityNotCreatedWhenClickOnCrossIconButton(
      testdata.entityNames[3]
    );
  });

  await firstUser.close();
});
