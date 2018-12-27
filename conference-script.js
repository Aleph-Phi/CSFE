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
    xhr.open("GET",SERVER+PORT+"/api/conference",true); //niet dry - meer flexibiliteit - bijv. vd poort
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
        console.log(conferenceObject);
        tile.setAttribute("id", conferenceObject.id);
        tile.setAttribute("draggable","true");

        var id_p = document.createElement("p");
        id_p.innerHTML = conferenceObject.id;
        id_p.setAttribute("id","id"+conferenceObject.id);
        id_p.style.display = "none";
        tile.appendChild(id_p);

        var startDate_p = document.createElement("p");
        startDate_p.innerHTML = conferenceObject.startDate;
        startDate_p.setAttribute("id","startDate"+conferenceObject.id);
        tile.appendChild(startDate_p);

        var endDate_p = document.createElement("p");
        endDate_p.innerHTML = conferenceObject.endDate;
        endDate_p.setAttribute("id","endDate"+conferenceObject.id);
        endDate_p.style.display = "none";
        tile.appendChild(endDate_p);

        var deadlinePresentationDraft_p = document.createElement("p");
        deadlinePresentationDraft_p.innerHTML = conferenceObject.deadlinePresentationDraft;
        deadlinePresentationDraft_p.setAttribute("id","deadline"+conferenceObject.id);
        tile.appendChild(deadlinePresentationDraft_p);

        document.getElementById("container").appendChild(tile);
        borderColor(conferenceObject.id);
        tile.onclick = function() { showFormReview(this.id) };
}

//Creert en toont het overzichtscherm van de inhoud van een presentatie (na klik op tegel)
function showFormReview(presentationID) {
    let review_window = document.createElement("div");
    review_window.classList.add("form_review");
    createButtonsReviewForm(review_window, presentationID);
    review_window.setAttribute("id","review_window_div"+presentationID);

    let id = document.createElement("p");
    id.innerHTML = "ID: "+document.getElementById("id"+presentationID).textContent+"<br>Status: "+document.getElementById("label"+presentationID).textContent;
    review_window.appendChild(id);

    let subject = document.createElement("span");
    let subjectTextarea = document.createElement("textarea");
    subjectTextarea.setAttribute("id","subjectTextarea"+presentationID);
    subject.innerHTML = "Onderwerp presentatievoorstel:";
    subjectTextarea.innerHTML = document.getElementById("subject"+presentationID).textContent;
    review_window.appendChild(subject);
    review_window.appendChild(subjectTextarea);

    let type = document.createElement("span");
    let typeTextarea = document.createElement("textarea");
    typeTextarea.setAttribute("id","typeTextarea"+presentationID);
    type.innerHTML = "Type presentatievoorstel:";
    typeTextarea.innerHTML = document.getElementById("type"+presentationID).textContent;
    review_window.appendChild(type);
    review_window.appendChild(typeTextarea);

    let duration = document.createElement("span");
    let durationTextarea = document.createElement("textarea");
    durationTextarea.setAttribute("id","durationTextarea"+presentationID);
    duration.innerHTML = "Tijdsduur presentatievoorstel:";
    durationTextarea.innerHTML = document.getElementById("duration"+presentationID).textContent;
    review_window.appendChild(duration);
    review_window.appendChild(durationTextarea);

    let summary = document.createElement("span");
    let summaryTextarea = document.createElement("textarea");
    summaryTextarea.classList.add("textAreaSummary");
    summaryTextarea.setAttribute("id","summaryTextarea"+presentationID);
    summary.innerHTML = "Samenvatting presentatievoorstel:";
    summaryTextarea.innerHTML = document.getElementById("summary"+presentationID).textContent;
    review_window.appendChild(summary);
    review_window.appendChild(summaryTextarea);

    generatePageNavigators(review_window, presentationID);

    document.getElementById("form_review").appendChild(review_window);
}

function findIndexOfDiv(presentationID){
    let isolated_div=document.getElementById(presentationID); // div isolator inside of parentNode - used for flipping through form reviews
    let pNode = isolated_div.parentNode;
    let pNClass = pNode.class;
    console.log(pNode.id);
    let index_of_div = Array.prototype.indexOf.call(pNode.children, isolated_div);
    return index_of_div;
}

function determineCollectionSize(presentationID){
    let isolated_div=document.getElementById(presentationID);
    return isolated_div.parentNode.children.length;
}

//Genereert de pagina navigators van het reviewForm
function generatePageNavigators(review_window, presentationID){
    let i=findIndexOfDiv(presentationID);
    let arrSize=determineCollectionSize(presentationID);
    let isolated_div=document.getElementById(presentationID)

    let form_navigator_panel=document.createElement("div");
    form_navigator_panel.classList.add("form_navigator_panel");
    form_navigator_panel.setAttribute("id", "form_navigator_panel"+presentationID);

    let prevpagecontainer=document.createElement("div");
    prevpagecontainer.classList.add("pagebuttoncontainer");
    prevpagecontainer.setAttribute("id", "prevpagecontainer"+presentationID);

    let nextpagecontainer=document.createElement("div");
    nextpagecontainer.classList.add("pagebuttoncontainer");
    nextpagecontainer.setAttribute("id", "nextpagecontainer"+presentationID);

    if (i<(arrSize-1)){
      let nextPageButton = document.createElement("button");
      nextPageButton.classList.add("nextPageButton");
      nextpagecontainer.appendChild(nextPageButton);
      nextPageButton.onclick = function() {showFormReview(isolated_div.parentNode.children[++i].id)};
    }

    if (i>0){
      let prevPageButton = document.createElement("button");
      prevPageButton.classList.add("prevPageButton");
      prevpagecontainer.appendChild(prevPageButton);
      prevPageButton.onclick = function() {showFormReview(isolated_div.parentNode.children[--i].id)};
    }

      form_navigator_panel.appendChild(prevpagecontainer);
      form_navigator_panel.appendChild(nextpagecontainer);
      review_window.appendChild(form_navigator_panel);
}

//Ontwerp knoppen van het reviewForm
function createButtonsReviewForm(review_window, presentationID) {
    let backButton = document.createElement("button");
    let text_backButton = document.createTextNode("Terug");
    backButton.classList.add("backButton");
    backButton.appendChild(text_backButton);
    review_window.appendChild(backButton);
    backButton.onclick = function() { document.getElementById("form_review").innerHTML = ''; refreshFields(presentationID) };

    let acceptButton = document.createElement("button");
    let text_acceptButton = document.createTextNode("Voorstel accepteren");
    acceptButton.classList.add("acceptButton");
    acceptButton.appendChild(text_acceptButton);
    review_window.appendChild(acceptButton);
    acceptButton.onclick = function() { let labelIdentifier = 2; changeLabelStatus(presentationID, labelIdentifier) };

    let reserveButton = document.createElement("button");
    let text_reserveButton = document.createTextNode("Voorstel op reserve");
    reserveButton.classList.add("reserveButton");
    reserveButton.appendChild(text_reserveButton);
    review_window.appendChild(reserveButton);
    reserveButton.onclick = function() { let labelIdentifier = 3; changeLabelStatus(presentationID, labelIdentifier) };

    let deniedButton = document.createElement("button");
    let text_deniedButton = document.createTextNode("Voorstel afwijzen");
    deniedButton.classList.add("deniedButton");
    deniedButton.appendChild(text_deniedButton);
    review_window.appendChild(deniedButton);
    deniedButton.onclick = function() { let labelIdentifier = 1; changeLabelStatus(presentationID, labelIdentifier) };

    let undeterminedButton = document.createElement("button");
    let text_undeterminedButton = document.createTextNode("Voorstel to-do");
    undeterminedButton.classList.add("undeterminedButton");
    undeterminedButton.appendChild(text_undeterminedButton);
    review_window.appendChild(undeterminedButton);
    undeterminedButton.onclick = function() { let labelIdentifier = 4; changeLabelStatus(presentationID, labelIdentifier) };

    review_window.appendChild(createDropdownCategories(presentationID));

    let deleteButton = document.createElement("button");
    let text_deleteButton = document.createTextNode("Voorstel verwijderen");
    deleteButton.classList.add("generalButton");
    deleteButton.appendChild(text_deleteButton);
    review_window.appendChild(deleteButton);
    deleteButton.onclick = function() { deletePresentation(presentationID) };

    let changeButton = document.createElement("button");
    let text_changeButton = document.createTextNode("Voorstel wijzigen");
    changeButton.classList.add("generalButton");
    changeButton.appendChild(text_changeButton);
    review_window.appendChild(changeButton);
    changeButton.onclick = function() { changeReview(presentationID, "changeReview") };
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

//Functie voor het aanpassen van een labelStatus
function changeLabelStatus(presentationID, labelIdentifier) {
    let url = SERVER+PORT+"/api/presentationdraft/"+presentationID+"/label/"+labelIdentifier;
    let xhreq = new XMLHttpRequest();
    xhreq.open("POST",url,true);
    xhreq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            refreshFields(presentationID);
            document.getElementById("form_review").innerHTML = '';
        }
    }
    xhreq.send();
}

//Functie voor het verwijderen van presentation
function deletePresentation(presentationID) {
    let conf = confirm("Weet je zeker dat je de presentatie wilt verwijderen?");
    var a = document.getElementById("label"+presentationID).textContent;
    if (conf == true) {
        let url = SERVER+PORT+"/api/presentationdraft/delete/"+presentationID;
        let xhreq = new XMLHttpRequest();
        xhreq.open("DELETE",url,true);
        xhreq.onreadystatechange = function() {
            if(this.readyState == 4){
                document.getElementById("form_review").innerHTML = '';
                alert("Voorstel is verwijderd.");
                refreshFieldsDeletion(a);
            }
        }
        xhreq.send();
    }
}

// Wijzigt borderColor aan de hand van het aangegeven label
function borderColor(presentationID) {
    if(document.getElementById("label"+presentationID).textContent === "ACCEPTED"){
        document.getElementById(presentationID).style.borderBottomColor = "green";
    } else if (document.getElementById("label"+presentationID).textContent === "DENIED"){
        document.getElementById(presentationID).style.borderBottomColor = "red";
    } else if (document.getElementById("label"+presentationID).textContent === "RESERVED"){
        document.getElementById(presentationID).style.borderBottomColor = "orange";
    } else if (document.getElementById("label"+presentationID).textContent === "UNDETERMINED"){
        document.getElementById(presentationID).style.borderBottomColor = "gray";
    } else if (document.getElementById("label"+presentationID).textContent === "UNLABELED"){
        document.getElementById(presentationID).style.borderBottomColor = "gray";
    }
}

//Functie voor het refreshen van de fields nadat een label gewijzigd is
function refreshFields(presentationID) {
    if(document.getElementById("label"+presentationID).textContent === "ACCEPTED"){
        showAccepted();
    } else if (document.getElementById("label"+presentationID).textContent === "DENIED"){
        showDenied();
    } else if (document.getElementById("label"+presentationID).textContent === "RESERVED"){
        showReserved();
    } else if (document.getElementById("label"+presentationID).textContent === "UNDETERMINED"){
        showUnlabeled();
    } else if (document.getElementById("label"+presentationID).textContent === "UNLABELED"){
        showUnlabeled();
    }
}

function refreshFieldsDeletion(presentationLabel) {
    if(presentationLabel === "ACCEPTED"){
        showAccepted();
    } else if (presentationLabel === "DENIED"){
        showDenied();
    } else if (presentationLabel === "RESERVED"){
        showReserved();
    } else if (presentationLabel === "UNDETERMINED"){
        showUnlabeled();
    } else if (presentationLabel === "UNLABELED"){
        showUnlabeled();
    }
}

function changeReview(presentationID, functionIdentifier) {
    let xhr = new XMLHttpRequest();
    let url = SERVER+PORT+"/api/presentationdraft/"+presentationID;
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationObject = JSON.parse(this.responseText);
            console.log(presentationObject);
            switch(functionIdentifier) {
                case "changeReview":
                    postChangedReview(presentationObject);
                    break;
                case "changeCategory":
                    postChangedReviewCategory(presentationObject);
                    break;
            }
        }
    }
    xhr.send();
}

function postChangedReview(presentationObject) {
    let conf = confirm("Weet je zeker dat je de inhoud wilt wijzigen?");
    if (conf == true) {
        let xhreq = new XMLHttpRequest();
        xhreq.open("POST",SERVER+PORT+"/api/presentationdraft",true);
        xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        presentationObject.subject = document.getElementById("subjectTextarea"+presentationObject.id).value;
        presentationObject.summary = document.getElementById("summaryTextarea"+presentationObject.id).value;
        presentationObject.type = document.getElementById("typeTextarea"+presentationObject.id).value;
        presentationObject.duration = document.getElementById("durationTextarea"+presentationObject.id).value;
        console.log(presentationObject);
        let changedPresentationObject = { "presentationDraft": presentationObject };
        xhreq.send(JSON.stringify(changedPresentationObject));
        alert("Voorstel is gewijzigd.");
    }
}

function postChangedReviewCategory(presentationObject) {
    console.log("hallo");
    let xhreq = new XMLHttpRequest();
    xhreq.open("POST",SERVER+PORT+"/api/presentationdraft",true);
    xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    presentationObject.category = document.getElementById("categoryDropdown"+presentationObject.id).value;
    console.log(presentationObject);
    let changedPresentationObject = { "presentationDraft": presentationObject };
    xhreq.send(JSON.stringify(changedPresentationObject));
}
