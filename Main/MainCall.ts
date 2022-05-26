class MainCall{
    static  GetAppName(){
        const time = new Date();
        var name = 'CodelessApp'+time.toISOString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').split('-')[2];
        console.log('ApplicationName:-'+name);
        return name;
    }
}
export default MainCall