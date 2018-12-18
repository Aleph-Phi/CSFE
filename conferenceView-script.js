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
    console.log(currentPage);
    prevpagecontainer.appendChild(prev_page);
    page_button_panel.appendChild(prevpagecontainer)
  }

  if (currentPage!=pages){
    let next_page = document.createElement("div");
    next_page.classList.add("nextPageButton");
    next_page.onclick = function() {showPage(++currentPage)};
    console.log(currentPage);
    nextpagecontainer.appendChild(next_page);
    page_button_panel.appendChild(nextpagecontainer)
  }

  document.getElementById("page_nav_container").appendChild(page_button_panel);
}

function showAll() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/conference",true); 
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            pagify(showAll);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                    conferenceListLoop(currentList[limitedIndex]);
            }
        }
    }
    xhr.send();
}

//Loopt over de objecten om de tegels aan te maken met de betreffende info
function conferenceListLoop(conferenceObject) {

        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", conferenceObject.id);
        tile.setAttribute("draggable","true");

        var id_p = document.createElement("p");
        id_p.innerHTML = conferenceObject.id;
        id_p.setAttribute("id","id"+conferenceObject.id);
        id_p.style.display = "none";
        tile.appendChild(id_p);

        var name_p = document.createElement("p");
        name_p.innerHTML = conferenceObject.name;
        name_p.setAttribute("name","name"+conferenceObject.id);
        tile.appendChild(name_p);

        var startDate_p = document.createElement("p");
        startDate_p.innerHTML = conferenceObject.startDate;
        startDate_p.setAttribute("id","startDate"+conferenceObject.id);
        startDate_p.style.display = "none";
        tile.appendChild(startDate_p);

        var endDate_p = document.createElement("p");
        endDate_p.innerHTML = conferenceObject.endDate;
        endDate_p.setAttribute("id","endDate"+conferenceObject.id);
        endDate_p.style.display = "none";
        tile.appendChild(endDate_p);

        var deadlinePresentationDraft_p = document.createElement("p");
        deadlinePresentationDraft_p.innerHTML = conferenceObject.deadlinePresentationDraft;
        deadlinePresentationDraft_p.setAttribute("id","deadline"+conferenceObject.id);
        deadlinePresentationDraft_p.style.display = "none";
        tile.appendChild(deadlinePresentationDraft_p);

        document.getElementById("container").appendChild(tile);
        //borderColor(conferenceObject.id);

        var terugButton = document.createElement("button");
        terugButton.setAttribute("value", "nieuwe knop");

        tile.onclick = function() { 
            conferenceOptions(conferenceObject); 
            deleteAllButtonsNavBar(); 
            var terugknop = createButton("Terug","{deleteAllButtonsNavBar(); createHomeButton(); showAll();}");
            document.getElementsByClassName("menu")[0].append(terugknop);

            //var terugknop = createButton("Terug","{deleteAllButtonsNavBar(document.getElementsByClassName(\"menu\")[0]); createHomeButton();}");
            //menubalk.append(terugknop);
            
            //document.getElementsByClassName("menu")[0].removeChild(createConferenceButton);
        };
}

function showCreateConferenceForm(){
    alert("Nog te implementeren.");
}

function conferenceOptions(conferenceObject){
    clearSet();
    var tegels = ["Presentatievoorstellen","Planning"];
    
    for(i=0;i<tegels.length;i++){
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", conferenceObject.id);
        tile.setAttribute("draggable","true");

        var variable = document.createElement("p");
        variable.innerHTML = tegels[i];
        variable.setAttribute(tegels[i], tegels[i]+conferenceObject.id);
        tile.appendChild(variable);
        tile.onclick = function() { 
            showConference(this.id);
        };
        document.getElementById("container").appendChild(tile);
    }
}

//Creert en toont het overzichtscherm van de inhoud van een conferentie (na klik op tegel)
function showConference(conferenceID) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/conference/"+conferenceID,true); 
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                    conferenceListLoop(currentList[limitedIndex]);
            }
        }
    }
    xhr.send();
}

function findIndexOfDiv(conferenceID){
    let isolated_div=document.getElementById(conferenceID); // div isolator inside of parentNode - used for flipping through form reviews
    let pNode = isolated_div.parentNode;
    let pNClass = pNode.class;
    console.log(pNode.id);
    let index_of_div = Array.prototype.indexOf.call(pNode.children, isolated_div);
    return index_of_div;
}

function determineCollectionSize(conferenceID){
    let isolated_div=document.getElementById(conferenceID);
    return isolated_div.parentNode.children.length;
}

//Get conferenceObject by id number, variable is saved in properties.js
function getConferenceById(conferenceID) {
    let xhr = new XMLHttpRequest();
    let url = SERVER+PORT+"/api/conference/"+conferenceID;
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            conferenceObject = JSON.parse(this.responseText);
            console.log(conferenceObject);
        }
    }
    xhr.send();
}

//Create categoriesDropdown defined in conference to the presenationReview
function createDropdownCategories(presentationID) {
    let categoryDropdown = document.createElement("select");
    categoryDropdown.setAttribute("id","categoryDropdown"+presentationID);
    categoryDropdown.onchange = function() { changeReview(presentationID, "changeCategory") };
    categoryDropdown.classList.add("categoryDropdown");

    let disabledOption = document.createElement("option");
    let text_disabledOption = document.createTextNode("Kies een categorie");
    disabledOption.appendChild(text_disabledOption);
    categoryDropdown.appendChild(disabledOption);

    let categoriesList = conferenceObject.categories;
    for(let i = 0; i < categoriesList.length; i++) {
        let category = document.createElement("option");
        if(document.getElementById("category"+presentationID).textContent === categoriesList[i]){
            category.setAttribute("selected", "selected");
        }
        category.setAttribute("value",categoriesList[i]);
        let text_category = document.createTextNode(categoriesList[i]);
        category.appendChild(text_category);
        categoryDropdown.appendChild(category);
    }
    return categoryDropdown;
}

