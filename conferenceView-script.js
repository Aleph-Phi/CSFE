//Maakt tile-set leeg.
function clearSet() {
    var myNode = document.getElementById("container");
    myNode.innerHTML = '';
}

function pageReset(){
    currentPage=0;
}

function pagify(showPage){
    document.getElementById("page_nav_container").innerHTML="";
    let pages = Math.floor(currentList.length/DISPLAYLIMIT);

    if (currentPage==0 && (currentPage==pages)){
        limitedIndex=0;
        loopLimit=currentList.length;
    } else if (currentPage>0 && (currentPage!=pages)){
        loopLimit=(DISPLAYLIMIT*currentPage)+DISPLAYLIMIT;
        limitedIndex=DISPLAYLIMIT*currentPage;
    } else if (currentPage>0 && (currentPage==pages)){
        loopLimit=currentList.length;
        limitedIndex=DISPLAYLIMIT*currentPage;
    } else {
        limitedIndex=0;
        loopLimit=DISPLAYLIMIT;
    }

    let page_button_panel=document.createElement("div");
    page_button_panel.classList.add("page_button_panel");

    let prevpagecontainer=document.createElement("div");
    prevpagecontainer.classList.add("pageleftcontainer");

    let nextpagecontainer=document.createElement("div");
    nextpagecontainer.classList.add("pagerightcontainer");

    if (currentPage>0){
        let prev_page = document.createElement("div");
        prev_page.classList.add("prevPageButton");
        prev_page.onclick = function() {showPage(--currentPage)};
        prevpagecontainer.appendChild(prev_page);
        page_button_panel.appendChild(prevpagecontainer)
    }

    if (currentPage!=pages){
        let next_page = document.createElement("div");
        next_page.classList.add("nextPageButton");
        next_page.onclick = function() {showPage(++currentPage)};
        nextpagecontainer.appendChild(next_page);
        page_button_panel.appendChild(nextpagecontainer)
    }
    document.getElementById("page_nav_container").appendChild(page_button_panel);
}

//Toont alle conferenties
function showAllConferences() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/conference",true); 
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            pagify(showAllConferences);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                conferenceListLoop(currentList[limitedIndex]);
            }
        }
    }
    xhr.send();
}

//Loopt over de objecten om de tegels aan te maken met de betreffende info
function conferenceListLoop(conferenceO) {
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", conferenceO.id);
        tile.setAttribute("draggable","true");

        var id_p = document.createElement("p");
        id_p.innerHTML = conferenceO.id;
        id_p.setAttribute("id","id"+conferenceO.id);
        id_p.style.display = "none";
        tile.appendChild(id_p);

        var name_p = document.createElement("p");
        name_p.innerHTML = conferenceO.name;
        name_p.setAttribute("name","name"+conferenceO.id);
        tile.appendChild(name_p);

        var startDate_p = document.createElement("p");
        startDate_p.innerHTML = conferenceO.startDate;
        startDate_p.setAttribute("id","startDate"+conferenceO.id);
        startDate_p.style.display = "none";
        tile.appendChild(startDate_p);

        var endDate_p = document.createElement("p");
        endDate_p.innerHTML = conferenceO.endDate;
        endDate_p.setAttribute("id","endDate"+conferenceO.id);
        endDate_p.style.display = "none";
        tile.appendChild(endDate_p);

        var deadlinePresentationDraft_p = document.createElement("p");
        deadlinePresentationDraft_p.innerHTML = conferenceO.deadlinePresentationDraft;
        deadlinePresentationDraft_p.setAttribute("id","deadline"+conferenceO.id);
        deadlinePresentationDraft_p.style.display = "none";
        tile.appendChild(deadlinePresentationDraft_p);

        tile.onclick = function() {
            conferenceObject = conferenceO; 
            sessionStorage.conferenceObject = JSON.stringify(conferenceObject);
            conferenceOptions(); 
            deleteAllButtonsNavBar(); 
            var terugknop = createButton("Terug","{deleteAllButtonsNavBar(); createHomeButton(); showAllConferences();}");
            document.getElementsByClassName("menu")[0].append(terugknop);
            var mailsetupknop = createButton("Mail setup", "setupmail()");
            document.getElementsByClassName("menu")[0].append(mailsetupknop);
        }

        document.getElementById("container").appendChild(tile);
        borderColorConference(conferenceO);
}

//Geeft elke conferentie een bordercolor op basis van actief-zijn (einddatum, deadline, open)
function borderColorConference(conferenceO) {
    let einddatum = new Date(conferenceO.endDate);
    let deadlinedatum = new Date(conferenceO.deadlinePresentationDraft);
    let huidigedatum = new Date(Date.now());

    if(huidigedatum > deadlinedatum && huidigedatum < einddatum){
        document.getElementById(conferenceO.id).style.borderBottomColor = "orange";
    }else if(huidigedatum > deadlinedatum && huidigedatum > einddatum){
        document.getElementById(conferenceO.id).style.borderBottomColor = "red";
    }else{
        document.getElementById(conferenceO.id).style.borderBottomColor = "green";
    }
}

//Creeert navigatietiles binnen de conferentie, zoals 'Presentatievoorstellen' en 'Planning'.
function conferenceOptions(){
    clearSet();
    var tegels = ["Presentatievoorstellen","Planning"];
    var locatie = ["loadPage()","planning"];
    
    for(i=0;i<tegels.length;i++){
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", conferenceObject.id);
        tile.setAttribute("draggable","true");

        var variable = document.createElement("p");
        variable.innerHTML = tegels[i];
        variable.setAttribute(tegels[i], tegels[i]+conferenceObject.id);
        
        tile.appendChild(variable);

        tile.setAttribute("onclick", locatie[i]);
        document.getElementById("container").appendChild(tile);
    }
}

function loadPage() {
    window.location.href = "tileView.html";  
}

function setupmail() {
    clearSet();
  
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/email/configs",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 404){
            window.open('mailsetupconfig.html', '_blank', 'width=600px, height=200px');
        }
        else if (this.readyState ==4 && this.status == 200){
            alert("config is er");
            haalTemplateMailsOp();

            notSendList = JSON.parse(this.responseText);
                    for(i = 0; i < notSendList.length; i++) {
                        alerttext += notSendList[i].name + ", " + notSendList[i].email + ". ";
                        if (i != notSendList.length-1) {
                            alerttext += "& "
                        } 
                    }
        }
    }  
    xhr.send(); 
}

function haalTemplateMailsOp(){
    
}





//VOOR DE TEST, MOET GEINTEGREERD WORDEN MET TILEVIEW-SCRIPT

// function showPresentationDrafts(conferenceID) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET",SERVER+PORT+"/api/conference/"+conferenceID,true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             document.getElementById("container").innerHTML = "";
//            //    var conferenceObject = JSON.parse(this.responseText);
//             currentList = conferenceObject.presentationDrafts;
//             pagify(showPresentationDrafts);
//             for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
//                     presentationListLoop(currentList[limitedIndex]);
//             }
//         }
//     }
//     xhr.send();
// }



// clearSet()
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET",SERVER+PORT+"/api/presentationdraft",true); //niet dry - meer flexibiliteit - bijv. vd poort
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             currentList = JSON.parse(this.responseText);
//             pagify(showAll);
//             for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
//                     presentationListLoop(currentList[limitedIndex]);
//             }
//         }
//     }
//     xhr.send();


//ONDERSTAANDE LATER IMPLEMENTEREN/AANPASSEN

//Creert en toont het overzichtscherm van de inhoud van een conferentie (na klik op tegel)
// function showConference(conferenceID) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET",SERVER+PORT+"/api/conference/"+conferenceID,true); 
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             currentList = JSON.parse(this.responseText);
//             for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
//                     conferenceListLoop(currentList[limitedIndex]);
//             }
//         }
//     }
//     xhr.send();
// }

// //Get conferenceObject by id number, variable is saved in properties.js
// function getConferenceById(conferenceID) {
//     let xhr = new XMLHttpRequest();
//     let url = SERVER+PORT+"/api/conference/"+conferenceID;
//     xhr.open("GET",url,true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             conferenceObject = JSON.parse(this.responseText);
//             console.log(conferenceObject);
//         }
//     }
//     xhr.send();
// }