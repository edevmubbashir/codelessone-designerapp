import fs from "fs";

class MainCall {
  static getAppName() {
    const time = new Date();
    let name =
      "CodelessApp" +
      time
        .toISOString()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
        .split("-")[2];
    console.log("ApplicationName:-" + name);

    let applicationName = {
      appName: name,
    };

    const data = JSON.stringify(applicationName);
    fs.writeFile("./appsettings/appName.json", data, (err) => {
      if (err) throw err;
    });

    return name;
  }

  static async getAppNameJSON() {
    return new Promise((resolve, reject) => {
      fs.readFile("./appsettings/appName.json", "utf8", (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(JSON.parse(data).appName);
      });
    });
  }
}

export default MainCall;
