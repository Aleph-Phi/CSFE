// 0=UNLABELED
// 1=DENIED
// 2=ACCEPTED
// 3=RESERVED
// 4=UNDETERMINED -> valt voor nu samen met label 0

function clearSet() {
    var myNode = document.getElementById("container");
    myNode.innerHTML = '';
}

function showAll() { //test met currentpage multi
    clearSet()
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                    presentationListLoop(presentationList[j]);
            }
        }
    }
    xhr.send();
}

function showDenied() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/1",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                    presentationListLoop(presentationList[j]);
            }
        }
    }
    xhr.send();
}

function showAccepted() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/2",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            console.log(presentationList);
            for(let j = 0; j < presentationList.length; j++) {
                    presentationListLoop(presentationList[j]);
            }
        }
    }
    xhr.send();
}

function showUnlabeled() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                if(presentationList[j].label === "UNLABELED" || presentationList[j].label === "UNDETERMINED" ){
                    presentationListLoop(presentationList[j]);
                  }
            }
        }
    }
    xhr.send();
}

function showReserved() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/3",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                    presentationListLoop(presentationList[j]);
            }
        }
    }
    xhr.send();
}

function presentationListLoop(presentationObject) {
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", presentationObject.id);

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

        document.getElementById("container").appendChild(tile);
        borderColor(presentationObject.id);
        tile.onclick = function() {showFormReview(this.id)};
        // let x=presentationList[i];  // new
        // tilecounter.push(presentationList[i]);
        // console.log(tilecounter.length); //new
        // console.log(tilecounter); //new
}


function showFormReview(presentationID) {

    let review_window = document.createElement("div");
    review_window.classList.add("form_review");
    createButtonsReviewForm(review_window, presentationID);

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

    document.getElementById("form_review").appendChild(review_window);
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
    changeButton.onclick = function() { postChangedReview(presentationID) };
}

//Functie voor het aanpassen van een labelStatus
function changeLabelStatus(presentationID, labelIdentifier) {
    let url = "http://localhost:8082/api/presentationdraft/"+presentationID+"/label/"+labelIdentifier;
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
        let url = "http://localhost:8082/api/presentationdraft/delete/"+presentationID;
        let xhreq = new XMLHttpRequest();
        xhreq.open("DELETE",url,true);  
        refreshFields(presentationID);
        document.getElementById("form_review").innerHTML = '';
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
        showUndertermined();
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
        showUndertermined();
    } else if (presentationLabel === "UNLABELED"){
        showUnlabeled();
    } 
}

//Wijziging in presentationObject verzenden
function postChangedReview(presentationID) {
    let conf = confirm("Weet je zeker dat je de inhoud wilt wijzigen?");
    if (conf == true) {
        let xhreq = new XMLHttpRequest();
        xhreq.open("POST","http://localhost:8082/api/presentationdraft",true);
        xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        let subject = document.getElementById("subjectTextarea"+presentationID).value;
        let summary = document.getElementById("summaryTextarea"+presentationID).value;
        let type = document.getElementById("typeTextarea"+presentationID).value;
        let duration = document.getElementById("durationTextarea"+presentationID).value;
        let label = document.getElementById("label"+presentationID).innerHTML;
        
        let changedPresentationObject = { "presentationDraft":{ "id":presentationID, "subject":subject, "summary":summary, "type":type, "duration":duration, "label":label } };

        console.log(changedPresentationObject);

        xhreq.send(JSON.stringify(changedPresentationObject));
        refreshFields(presentationID);
    }
}


// var tilecounter=[]; //mogelijk eruit slopen
// var currentpage=1;
// var displaylimit=45;
// var presentationcounter=[]; //gebruiken in showUnlabeled om UNLABELED en UNDETERMINED samen te brengen.

//
// function generatePages(x){ // use the array.length as argument
//   // var number_of_pages = Math.floor(sorted_presentations_amount/45);
//   let hasNextPage=Math.floor(x/45);
//   console.log(hasNextPage);
//   if (hasNextPage>0){
//     let next_page = document.createElement("div");
//     next_page.classList.add("next_page");
//     next_page.onclick = function() {showUndetermined(++currentpage)};
//     document.getElementById("container").appendChild(next_page);
//   }
//   if (currentpage>1){
//     let prev_page = document.createElement("div");
//     prev_page.classList.add("prev_page");
//     prev_page.onclick = function() {showUndetermined(--currentpage)};
//     document.getElementById("container").appendChild(prev_page);
// }
//   tilecounter=[];
// }

// 0=UNLABELED
// 1=DENIED
// 2=ACCEPTED
// 3=RESERVED
// 4=UNDETERMINED -> valt voor nu samen met label 0

// function showAll() { //test met currentpage multi
//     clearSet();
//     calculateSortedPresentations(0);
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             if (currentpage==1){
//             for(let j = 0; j < (displaylimit); j++) {
//                     presentationListLoop(presentationList, j);
//                   }
//             } else {
//                     for(let j = 0; ((j+displaylimit)*currentpage) < (displaylimit*currentpage); j++) {
//                             presentationListLoop(presentationList, ((j+displaylimit)*currentpage));
//                             }
//                   }
//         }
//         generatePages(tilecounter.length);
//     }
//     xhr.send();
// }
//
// function showUnlabeled() {
//     clearSet();
//     presentationcounter=[];
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             for(let j = 0; j < displaylimit; j++) {
//                 if(presentationList[j].label === "UNLABELED" || presentationList[j].label === "UNDETERMINED" ) {
//                     presentationcounter.push(presentationList[j]);
//                 }
//               }
//               console.log(presentationcounter.length);
//
//             if (currentpage==1){
//             for(let j = 0; j < displaylimit; j++) {
//                 if(presentationList[j].label === "UNLABELED" || presentationList[j].label === "UNDETERMINED" ) {
//                     presentationListLoop(presentationList, j);
//                 }
//             }
//           }
//         if (currentpage>1){
//           for(let j = 0; ((j+displaylimit)*currentpage) < (displaylimit*currentpage); j++) {
//                   presentationListLoop(presentationList, ((j+displaylimit)*currentpage));
//         }
//       }
//             console.log(currentpage);
//             console.log("In showUnlabeled");
//             console.log(presentationcounter.length);
//             generatePages(tilecounter.length);
//             console.log(tilecounter.length);
//         }
//     }
//     xhr.send();
// }
//
//
// function calculateSortedPresentations(labelnum) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/"+labelnum,true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             console.log(presentationList.length);
//             var sorted_presentations_amount=presentationList.length;
//         }
//     }
//     xhr.send();
// }
//
//
// function showAccepted() {
//     clearSet();
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/2",true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             for(let j = 0; j < presentationList.length; j++) {
//                     presentationListLoop(presentationList, j);
//             }
//             generatePages(tilecounter.length);
//         }
//     }
//     xhr.send();
// }
//
// function showDenied() {
//     clearSet();
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft/findbylabel/1",true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             for(let j = 0; j < presentationList.length; j++) {
//                     presentationListLoop(presentationList, j);
//             }
//             generatePages(tilecounter.length);
//         }
//     }
//     xhr.send();
// }



// function showUnlabeled() {
//     clearSet();
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
//     xhr.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             let presentationList = JSON.parse(this.responseText);
//             for(let j = 0; j < presentationList.length; j++) {
//                 if(presentationList[j].label === "UNLABELED") {
//                     presentationListLoop(presentationList, j);
//                 }
//             }
//             generatePages(tilecounter.length);
//         }
//     }
//     xhr.send();
// }
