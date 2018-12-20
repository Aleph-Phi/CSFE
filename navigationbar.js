//functions waarmee toegang tot de menubalk worden verkregen:
function getAccessToNavBar(){
    var menubalk = document.getElementsByClassName("menu")[0];
    return menubalk;
}

function deleteAllButtonsNavBar(){
    document.getElementsByClassName("menu")[0].innerHTML="";
}

function createButton(innertext, onclick){
    var terugknop = document.createElement("button");
    terugknop.innerText= innertext;
    terugknop.setAttribute("onclick", onclick);

    return terugknop;
}

function createHomeButton(){
    deleteAllButtonsNavBar();
    var createConferenceKnop = createButton("Creëer conferentie", "showCreateConferenceForm()" );
    //  document.createElement("button");
    // createConferenceKnop.innerText= "Creëer conferentie";
    // createConferenceKnop.setAttribute("onclick", "showCreateConferenceForm()");
    
    document.getElementsByClassName("menu")[0].append(createConferenceKnop);
}
