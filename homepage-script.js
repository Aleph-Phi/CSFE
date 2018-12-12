function showCreateConferenceForm() {
    let create_conference_window = document.createElement("div");
    create_conference_window.classList.add("form_review");
    create_conference_window.setAttribute("id","create_conference_window");

    let header = document.createElement("h3");
    header.innerHTML = "Aanmaken conferentie";
    create_conference_window.appendChild(header);

    let conferenceName = document.createElement("span");
    let conferenceNameTextarea = document.createElement("textarea");
    conferenceNameTextarea.setAttribute("id","conferenceNameTextarea");
    conferenceName.innerHTML = "Conferentie naam:";
    create_conference_window.appendChild(conferenceName);
    create_conference_window.appendChild(conferenceNameTextarea);

    let deadlineForPresentationDraft = document.createElement("span");
    let deadlineForPresentationDraftTextarea = document.createElement("textarea");
    deadlineForPresentationDraftTextarea.setAttribute("id","deadlineForPresentationDraftTextarea");
    deadlineForPresentationDraft.innerHTML = "Deadline presentatievoorstellen:";
    create_conference_window.appendChild(deadlineForPresentationDraft);
    create_conference_window.appendChild(deadlineForPresentationDraftTextarea);

    let sendButton = document.createElement("button");
    let text_sendButton = document.createTextNode("Conferentie aanmaken");
    sendButton.classList.add("generalButton");
    sendButton.appendChild(text_sendButton);
    create_conference_window.appendChild(sendButton);
    sendButton.onclick = function() { createConference() };

    document.getElementById("form_create_conference").appendChild(create_conference_window);
}

// function createConference() {
//     let conf = confirm("Conferentie '"+document.getElementById("conferenceNameTextarea").value+"' aanmaken?");
//     if (conf == true) {
//         let xhreq = new XMLHttpRequest();
//         xhreq.open("POST","http://localhost:"+PORT+"/api/conference",true);
//         xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
//         let conferenceName = document.getElementById("conferenceNameTextarea").value;
//         let conferenceDeadline = document.getElementById("deadlineForPresentationDraftTextarea").value;

//         let conferenceObject = {  };
//         xhreq.send(JSON.stringify(conferenceObject));
//         alert("Conferentie is aangemaakt.");
//         document.getElementById("form_create_conference").innerHTML = "";
//     }
// }