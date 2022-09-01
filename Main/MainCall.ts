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
    return name;
  }
}
export default MainCall;
