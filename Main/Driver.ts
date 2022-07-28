import { chromium, expect, Locator, Page, selectors } from "@playwright/test";


class Driver{
    static page: Page

    constructor(page: Page){
        Driver.page = page;
    }

    /* This method will be used to navigate to any URL */
    static async navigateToURL(url: string) {
        await this.page.goto(url);
    }

    /* This method will be used to wait for navigation to complete */
    static async waitForNavigation() {
        await this.page.waitForNavigation();
    }

     /* This is generic method to locate any element on the page */
    static  findElement(locator: string) {
        return this.page.locator(locator);
    }

    


    static findElementWithOptions(locator:string, options: { has?: Locator; hasText?: string | RegExp; }){
        return this.page.locator(locator,options);
    }

    static waitToExpectElementWithOptions(locator:string, options:{has?: Locator; hasText?: string | RegExp;}){
        return expect(this.findElementWithOptions(locator,options));
    }
    /* This is generic method to locate any element in the frame*/
    static findElementUsingFrame(frameLocator: string) {
        return this.page.frameLocator(frameLocator);
    }

    static async waitForSelector(locator:string){
        await (await this.page.waitForSelector(locator)).isVisible();
    }
    
    
     /* This method wait to assert an element on the page */
     static waitToExpectElement(locator: string) {
        return expect(this.page.locator(locator));
    }

    /* This method wait to assert an element in the frame*/
    static waitToExpectElementUsingFrame(frameLocator: string, elementLocator: string) {
        return expect(this.page.frameLocator(frameLocator).locator(elementLocator));
    }

    static async waitToExectToolTip(frameLocator:string, locator:string){
        expect(await this.page.frameLocator(frameLocator).locator(locator).hover());
        this.page.pause();
        return await this.page.frameLocator(frameLocator).locator(locator).getAttribute("title");
        
    }
    static async waitForResponse(frameLocator:string, locator:string){
        await Promise.all([
            this.page.frameLocator(frameLocator).locator(locator).waitFor()
        ]);
    }
/* This method will wait for element to be appear in frame and then click on it*/
static async waitForElementToClickUsingFrame(frameLocator: string, elementLocator: string) {
    expect(this.page.frameLocator(frameLocator).locator(elementLocator).click());
}

static async getUrl(){
    const url = this.page.url();
    console.log(url)
    return url
}

static async openNewBrowser() {
    const browser =  await chromium.launch();
    const seconduser = await browser.newContext();
    const secondPage = await seconduser.newPage();
    return secondPage;
}

static async focusOnElement(locator:string){
    await this.page.focus(locator);
}
/**
 * type = 
 * up
 * down
 * press
 * type
 */
static async keyboardInteraction(type:string,key:string){
    
    switch(type){
        case"up":{
            await this.page.keyboard.up(key);
            break;
        }
        
        case"down":{
            await this.page.keyboard.down(key);
            break;
        }
        
        case"press":{
            await this.page.keyboard.press(key);
            break;
        }
        
        case"type":{
            await this.page.keyboard.type(key);
            break;
        }
        
        dafault:{
            await this.page.keyboard.insertText(key);
            break;
        }
    }
}
}
export default Driver;