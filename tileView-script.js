function clearSet() {
    var myNode = document.getElementById("container");
    myNode.innerHTML = '';
}

function showAccepted() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                if(presentationList[j].label === "ACCEPTED") {
                    presentationListLoop(presentationList, j);
                }
            }
        }
    }
    xhr.send();
}

function showDenied() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                if(presentationList[j].label === "DENIED") {
                    presentationListLoop(presentationList, j);
                }
            }
        }
    }
    xhr.send();
}

function showUndertermined() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                    presentationListLoop(presentationList, j);
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
                if(presentationList[j].label === "UNLABELED") {
                    presentationListLoop(presentationList, j);
                }
            }
        }
    }
    xhr.send();
}

function showReserved() {
    clearSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8082/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let presentationList = JSON.parse(this.responseText);
            for(let j = 0; j < presentationList.length; j++) {
                if(presentationList[j].label === "RESERVED") {
                    presentationListLoop(presentationList, j);
                }
            }
        }
    }
    xhr.send();
}

function presentationListLoop(presentationList, i) {
        var tile = document.createElement("div");
        tile.classList.add("tileNew");
        tile.setAttribute("id", presentationList[i].id);

        var id_p = document.createElement("p");
        id_p.innerHTML = presentationList[i].id;
        id_p.setAttribute("id","id"+presentationList[i].id);
        id_p.style.display = "none";
        tile.appendChild(id_p);

        var subject_p = document.createElement("p");
        subject_p.innerHTML = presentationList[i].subject;
        subject_p.setAttribute("id","subject"+presentationList[i].id);
        tile.appendChild(subject_p);

        var summary_p = document.createElement("p");
        summary_p.innerHTML = presentationList[i].summary;
        summary_p.setAttribute("id","summary"+presentationList[i].id);
        summary_p.style.display = "none";
        tile.appendChild(summary_p);

        var type_p = document.createElement("p");
        type_p.innerHTML = presentationList[i].type;
        type_p.setAttribute("id","type"+presentationList[i].id);
        tile.appendChild(type_p);
       
        var duration_p = document.createElement("p");
        duration_p.innerHTML = presentationList[i].duration;
        duration_p.setAttribute("id","duration"+presentationList[i].id);
        duration_p.style.display = "none";
        tile.appendChild(duration_p);

        var time_of_creation_p = document.createElement("p");
        time_of_creation_p.innerHTML = presentationList[i].timeOfCreation;
        time_of_creation_p.setAttribute("id","time_of_creation"+presentationList[i].id);
        time_of_creation_p.style.display = "none";
        tile.appendChild(time_of_creation_p);

        var label_p = document.createElement("p");
        label_p.innerHTML = presentationList[i].label;
        label_p.setAttribute("id","label"+presentationList[i].id);
        label_p.style.display = "none";
        tile.appendChild(label_p);
        
        document.getElementById("container").appendChild(tile);
        borderColor(presentationList[i].id);
        tile.onclick = function() {showFormReview(this.id)}; 
}

function showFormReview(presentationID) {
   
    let review_window = document.createElement("div");
    review_window.classList.add("form_review");
    
    createButtonsReviewForm(review_window, presentationID);
  
    let id = document.createElement("p");
    id.innerHTML = "ID: "+document.getElementById("id"+presentationID).textContent+" Status: "+document.getElementById("label"+presentationID).textContent;
    console.log(id);
    review_window.appendChild(id);

    let subject = document.createElement("p");
    subject.innerHTML = "Onderwerp: "+document.getElementById("subject"+presentationID).textContent;
    console.log(subject);
    review_window.appendChild(subject);

    let type = document.createElement("p");
    type.innerHTML = "Type: "+document.getElementById("type"+presentationID).textContent;
    console.log(type);
    review_window.appendChild(type);

    let duration = document.createElement("p");
    duration.innerHTML = "Tijdsduur: "+document.getElementById("duration"+presentationID).textContent+" minuten";
    console.log(duration);
    review_window.appendChild(duration);

    let summary = document.createElement("p");
    summary.innerHTML = document.getElementById("summary"+presentationID).textContent;
    console.log(summary);
    review_window.appendChild(summary);

    document.getElementById("form_review").appendChild(review_window);
}

function createButtonsReviewForm(review_window, presentationID) {
    let backButton = document.createElement("button");
    let text_backButton = document.createTextNode("Terug");
    backButton.classList.add("backButton");
    backButton.appendChild(text_backButton);
    review_window.appendChild(backButton);
    backButton.onclick = function() {document.getElementById("form_review").innerHTML = ''; refreshFields(presentationID) };

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
    deniedButton.onclick = function() {  let labelIdentifier = 1; changeLabelStatus(presentationID, labelIdentifier); };

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
    changeButton.onclick = function() { };
}

function changeLabelStatus(presentationID, labelIdentifier) {
    let url = "http://localhost:8082/api/presentationdraft/"+presentationID+"/label/"+labelIdentifier;
    let xhreq = new XMLHttpRequest();
    xhreq.open("POST",url,true);
    xhreq.send();
}

function deletePresentation(presentationID) {
    let conf = confirm("Weet je zeker dat je de presentatie wilt verwijderen?");
    if (conf == true) {
        let url = "http://localhost:8082/api/presentationdraft/delete/"+presentationID;
        let xhreq = new XMLHttpRequest();
        xhreq.open("DELETE",url,true);
        xhreq.send();
    }
}

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
