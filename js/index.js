document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("github-form").addEventListener("submit", function(event){
        event.preventDefault();
        console.log("event.target = " + event.target);
        let usrname = "" + event.target[0].value;
        console.log("usrname = " + usrname);
        debugger;
        
        if (usrname == undefined || usrname == null || usrname.length < 1)
        {
            console.error("illegal username query found and used here!");
            return;
        }
        //else;//do nothing safe to proceed
        console.log("proceeding to the queries now!");

        //"https://api.github.com/search/users?q=" + usrname + "/repos"
        const configurationObject = {
            method: "GET",
            headers: {
            "Accept": "application/vnd.github.v3+json",
            }
        };
        fetch("https://api.github.com/search/users?q=" + usrname, configurationObject)
        .then(response => response.json())
        .then(function dosomething(response){
            console.log("response = " + response);
            //response is an object that contains:
            //incomplete_results: boolean true/false
            //items: array of objects
            //
            //the objects in the array are set up as follows:
            //avatar_url
            //events_url
            //followers_url
            //following_url
            //login is the actual username
            //repos_url
            //url is the home url for the user
            //...
            //
            //total_count: # should match the array length unless the results are partial
            
            debugger;
        })
        .catch(function (err) {
            console.error(err);
            });
    });
});
