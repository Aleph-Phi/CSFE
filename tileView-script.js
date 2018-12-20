
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

function showAll() {
    clearSet();
    conferenceObject = JSON.parse(sessionStorage.conferenceObject);
    currentList = conferenceObject.presentationDrafts;
    pagify(showAll);
    for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
        presentationListLoop(currentList[limitedIndex]);
    }
}

//     let xhr = new XMLHttpRequest();
//     xhr.open("GET",SERVER+PORT+"/api/conference/"+this.conferenceObject.id,true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             document.getElementById("container").innerHTML = "";
//             var conferenceOb = JSON.parse(this.responseText);
//             currentList = conferenceObject.presentationDrafts;
//             pagify(showPresentationDrafts);
//             for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
//                     presentationListLoop(currentList[limitedIndex]);
//             }
//         }
//     }
//     xhr.send();
// }




// function showAll() {
//     clearSet()
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
// }

function showUndetermined(otherPresentationList) { //called by showUnlabeled
    let presentationList2=otherPresentationList;
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft/findbylabel/4",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            currentList = presentationList2.concat(presentationList);
            pagify(showUnlabeled);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
            presentationListLoop(currentList[limitedIndex]);
            }

      }
   }
    xhr.send();
}

function showUnlabeled() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft/findbylabel/0",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            showUndetermined(presentationList);
      }
   }
    xhr.send();
}

function responseHandler(xhr){
  let status=xhr.status;
  let statusText=(xhr.responseText);
  console.log(xhr);
  switch(status){
      case 200:
              // show new app phase
              break;
      case 400:
              break;
      case 404:
             break;
      case 412:
              if (statusText.includes("deadline")){
                alert("The deadline hasn't passed yet");
                //display remaining time
                break;
              } else {
                alert("There are unlabeled presentation drafts remaining");
                showUnlabeled(pageReset());
                break;
              }
           }
}

function finalizeSelection(){
  clearSet()
  let xhr = new XMLHttpRequest();
  xhr.open("GET",SERVER+PORT+"/api/presentationdraft/finalize",true);
  xhr.onreadystatechange = function() {
      if(this.readyState == 4){
      responseHandler(xhr);
      }
  }
  xhr.send();
}

function showDenied() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft/findbylabel/1",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            pagify(showDenied);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                presentationListLoop(currentList[limitedIndex]);
           }
        }
    }
    xhr.send();
}

function showAccepted() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft/findbylabel/2",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            pagify(showAccepted);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                presentationListLoop(currentList[limitedIndex]);
          }
        }
    }
    xhr.send();
}

function showReserved() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft/findbylabel/3",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            currentList = JSON.parse(this.responseText);
            pagify(showReserved);
            for(limitedIndex; limitedIndex < loopLimit; limitedIndex++) {
                presentationListLoop(currentList[limitedIndex]);
          }
        }
    }
    xhr.send();
}

//Loopt over de objecten om de tegels aan te maken met de betreffende info
function presentationListLoop(presentationObject) {
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", presentationObject.id);
        tile.setAttribute("draggable","true");

        var id_p = document.createElement("p");
        id_p.innerHTML = presentationObject.id;
        id_p.setAttribute("id","id"+presentationObject.id);
        id_p.style.display = "none";
        tile.appendChild(id_p);

        var subject_p = document.createElement("p");
        subject_p.innerHTML = presentationObject.subject;
        subject_p.setAttribute("id","subject"+presentationObject.id);
        tile.appendChild(subject_p);

        var summary_p = document.createElement("p");
        summary_p.innerHTML = presentationObject.summary;
        summary_p.setAttribute("id","summary"+presentationObject.id);
        summary_p.style.display = "none";
        tile.appendChild(summary_p);

        var type_p = document.createElement("p");
        type_p.innerHTML = presentationObject.type;
        type_p.setAttribute("id","type"+presentationObject.id);
        tile.appendChild(type_p);

        var duration_p = document.createElement("p");
        duration_p.innerHTML = presentationObject.duration;
        duration_p.setAttribute("id","duration"+presentationObject.id);
        duration_p.style.display = "none";
        tile.appendChild(duration_p);

        var time_of_creation_p = document.createElement("p");
        time_of_creation_p.innerHTML = presentationObject.timeOfCreation;
        time_of_creation_p.setAttribute("id","time_of_creation"+presentationObject.id);
        time_of_creation_p.style.display = "none";
        tile.appendChild(time_of_creation_p);

        var label_p = document.createElement("p");
        label_p.innerHTML = presentationObject.label;
        label_p.setAttribute("id","label"+presentationObject.id);
        label_p.style.display = "none";
        tile.appendChild(label_p);

        var category_p = document.createElement("p");
        category_p.innerHTML = presentationObject.category;
        category_p.setAttribute("id","category"+presentationObject.id);
        category_p.style.display = "none";
        tile.appendChild(category_p);

        document.getElementById("container").appendChild(tile);
        borderColor(presentationObject.id);
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

// Create categoriesDropdown defined in conference to the presenationReview
function createDropdownCategories(presentationID) {
    let categoryDropdown = document.createElement("select");
    categoryDropdown.setAttribute("id","categoryDropdown"+presentationID);
    categoryDropdown.onchange = function() { changeReview(presentationID, "changeCategory") };
    categoryDropdown.classList.add("categoryDropdown");

    let disabledOption = document.createElement("option");
    let text_disabledOption = document.createTextNode("Kies een categorie");
    disabledOption.appendChild(text_disabledOption);
    categoryDropdown.appendChild(disabledOption);


    if (conferenceObject.categories != null){ 
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
        let changedPresentationObject = { "presentationDraft": presentationObject };
        xhreq.send(JSON.stringify(changedPresentationObject));
        alert("Voorstel is gewijzigd.");
    }
}

function postChangedReviewCategory(presentationObject) {
    let xhreq = new XMLHttpRequest();
    xhreq.open("POST",SERVER+PORT+"/api/presentationdraft",true);
    xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    presentationObject.category = document.getElementById("categoryDropdown"+presentationObject.id).value;
    let changedPresentationObject = { "presentationDraft": presentationObject };
    xhreq.send(JSON.stringify(changedPresentationObject));
}
