import { Page, test as base } from "@playwright/test";

// Declare the types of your fixtures.
type MyFixtures = {
  firstUser: any;
  secondUser: any;
  userContext: any;
  secondUserContext: any;
};

export const test = base.extend<MyFixtures>({
  firstUser: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "firstUser.json",
    });
    let firstUser = await context.newPage();
    await use(firstUser);
  },

  secondUser: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "secondUser.json",
    });
    const secondUser = await context.newPage();
    await use(secondUser);
  },

  userContext: async ({ browser }, use) => {
    const firstUserContext = await browser.newContext({
      storageState: "firstUser.json",
    });
    await use(firstUserContext);
  },

  secondUserContext: async ({ browser }, use) => {
    const secondUserContext = await browser.newContext({
      storageState: "secondUser.json",
    });
    await use(secondUserContext);
  },
});
