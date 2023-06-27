//NOTE: BONUS FORFEITED OR NOT ATTEMPTED; NO TIME; ALREADY SPENT ENOUGH TIME ON THIS

function removeApiFromUrl(url)
{
    if (url == undefined) return "";
    else if (url == null) return null;
    else if (url.length < 1) return url;
    else
    {
        let indxapi = url.indexOf("api.");
        if (indxapi < 0 || indxapi > url.length - 1) return url;
        else
        {
            return url.substring(0, indxapi) + url.substring(indxapi + 4);
        }
    }
}

function removeUsersFromUrl(url)
{
    if (url == undefined) return "";
    else if (url == null) return null;
    else if (url.length < 1) return url;
    else
    {
        let indxapi = url.indexOf("users/");
        if (indxapi < 0 || indxapi > url.length - 1) return url;
        else
        {
            return url.substring(0, indxapi) + url.substring(indxapi + 6);
        }
    }
}

function cleanUrl(url)
{
    let mytempurl = "" + removeApiFromUrl(url);
    return removeUsersFromUrl(mytempurl);
}

function getReposInfo(event, repurl)
{
    console.log("event in getReposInfo() = " + event);
    console.log("repurl right before fetch in getReposInfo() = " + repurl);
    if (repurl == undefined || repurl == null || repurl.length < 10)
    {
        throw "illegal url found and used for the repos for the fetch request info!";
    }
    //else;//do nothing safe to proceed
    //debugger;
    
    fetch(repurl).then((res) => res.json()).
    then(function(response){
        console.log("response = " + response);
        //returns an array of objects
        //in these objects are the we want the name and the html_url and the description
        let myresarr = response;
        for (let n = 0; n < myresarr.length; n++)
        {
            console.log("myresarr[" + n + "].name = " + myresarr[n].name);
            console.log("myresarr[" + n + "].description = " + myresarr[n].description);
            console.log("myresarr[" + n + "].html_url = " + myresarr[n].html_url);
            let myli = document.createElement("li");
            let mypname = document.createElement("p");
            let mypdesc = document.createElement("p");
            let myurl = document.createElement("a");
            myurl.href = "" + myresarr[n].html_url;
            myurl.target = "_blank";
            myurl.textContent = "" + myresarr[n].html_url;
            mypname.textContent = "" + myresarr[n].name;
            mypdesc.textContent = "" + myresarr[n].description;
            myli.appendChild(mypname);
            myli.appendChild(mypdesc);
            myli.appendChild(myurl);
            document.getElementById("repos-list").appendChild(myli);
            console.log("successfully added the repo!");
        }//end of n for loop
        console.log("successfully added all of the repos!");
        //debugger;
    }).
    catch(function(err){
        console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("github-form").addEventListener("submit", function(event){
        event.preventDefault();
        console.log("event.target = " + event.target);
        let usrname = "" + event.target[0].value;
        console.log("usrname = " + usrname);
        //debugger;
        
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
            //console.log("response = " + response);
            console.log("response.items.length = " + response.items.length);
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
            
            //link to their profile
            //their username
            //and their avatar
            //the onclick will open the repos_url
            
            //might be wise to lay it out in a table
            //one colum for the picture and two rows for the name and link
            //<li>
                //<table>
                    //<tr>
                        //<td>image</td>
                        //<td>
                            //<table>
                                //<tr><td>username</td></tr>
                                //<tr><td>url</td></tr>
                            //</table>
                        //</td>
                    //</tr>
                //</table>
            //</li>
            //debugger;
            let myusrlist = document.getElementById("user-list");
            //for each result do the following:
            for (let n = 0; n < response.items.length; n++)
            {
                console.log("response.items[" + n + "].repos_url = " +
                    response.items[n].repos_url);
                console.log("response.items[" + n + "].avatar_url = " +
                    response.items[n].avatar_url);
                console.log("response.items[" + n + "].url = " +
                    response.items[n].url);
                console.log("actual profile url = " + cleanUrl(response.items[n].url));
                console.log("response.items[" + n + "].login = " +
                    response.items[n].login);
                
                //let myreposa = document.createElement("a");
                //myreposa.href = "" + response.items[n].repos_url;//repos_url value
                //myreposa.target = "_blank";
                let myli = document.createElement("li");
                //myli.onclick = getReposInfo(response.items[n].repos_url);
                //console.log("myli = " + myli);
                //console.log("myreposa = " + myreposa);
                myli.addEventListener("click", function(repurl, event)
                {
                    console.log("event in listener = " + event);
                    console.log("repurl in listener = " + repurl);
                    getReposInfo(event, repurl);
                }.bind(this, response.items[n].repos_url));

                let myimgtble = document.createElement("table");
                let myuserdatatable = document.createElement("table");
                let myimgtblerw = document.createElement("tr");
                let myimgtblecl = document.createElement("td");
                let myimgtbleusrdtcl = document.createElement("td");
                let myusrnmrw = document.createElement("tr");
                let myurlrw = document.createElement("tr");
                let myusrnmcl = document.createElement("td");
                let myurlcl = document.createElement("td");
                let myimg = document.createElement("img");
                myimg.src = "" + response.items[n].avatar_url;//avatar_url
                myimg.style.width = "100px";
                myimg.style.height = "100px";
                let myurla = document.createElement("a");
                myusrnmcl.textContent = "" + response.items[n].login;//login
                myurla.href = "" + cleanUrl(response.items[n].url);//url
                myurla.target = "_blank";
                myurla.textContent = "" + cleanUrl(response.items[n].url);//url
                myimgtblecl.appendChild(myimg);
                myurlcl.appendChild(myurla);
                myurlrw.appendChild(myurlcl);
                myusrnmrw.appendChild(myusrnmcl);
                myuserdatatable.appendChild(myusrnmrw);
                myuserdatatable.appendChild(myurlrw);
                myimgtbleusrdtcl.appendChild(myuserdatatable);
                myimgtblerw.appendChild(myimgtblecl);
                myimgtblerw.appendChild(myimgtbleusrdtcl);
                myimgtble.appendChild(myimgtblerw);
                myli.appendChild(myimgtble);
                myusrlist.appendChild(myli);
                console.log("successfully added the data for one user!");
                //debugger;
            }//end of n for loop
            console.log("successfully added the data for all of the users!");
            //debugger;
        })
        .catch(function (err) {
            console.error(err);
            });
    });
});
