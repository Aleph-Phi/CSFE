function showCreateConferenceForm() {
    document.getElementById("conference_view").innerHTML = "";
    document.getElementById("container").innerHTML = "";
    //SUPERDIV
    let create_conference_window = document.createElement("div");
    create_conference_window.classList.add("form_addconference");
    create_conference_window.setAttribute("id","create_conference_window");

    //HEADER BOVENAAN
    let header = document.createElement("h3");
    header.innerHTML = "Aanmaken conferentie";
    create_conference_window.appendChild(header);

    //INVULVAK CONFERENTIENAAM
    let conferenceName = document.createElement("span");
    let conferenceNameTextarea = document.createElement("textarea");
    conferenceNameTextarea.setAttribute("id","conferenceNameTextarea");
    conferenceName.innerHTML = "Conferentie naam:";
    create_conference_window.appendChild(conferenceName);
    create_conference_window.appendChild(conferenceNameTextarea);

    //DROPDOWNMENU DETAILS TOEVOEGEN
    let conferentiedetails = document.createElement("div");
    conferentiedetails.classList.add("conferentiedetails");
    let voegdetailstoebutton = document.createElement("button");
    let text_voegdetailstoebutton = document.createTextNode("Details toevoegen");
    voegdetailstoebutton.appendChild(text_voegdetailstoebutton);
    conferentiedetails.appendChild(voegdetailstoebutton);
    voegdetailstoebutton.onclick = function() {

        conferentiedetails.removeChild(voegdetailstoebutton);
        let startdatum = document.createElement("span");
        startdatum.innerHTML = "Startdatum:";
        conferentiedetails.appendChild(startdatum);
        let einddatum = document.createElement("span");
        einddatum.innerHTML = "Einddatum:";
        conferentiedetails.appendChild(einddatum);
        let deadlinedatum = document.createElement("span");
        deadlinedatum.innerHTML = "Inleverdeadline:";
        conferentiedetails.appendChild(deadlinedatum);

        var mybr = document.createElement("br");
        conferentiedetails.appendChild(mybr);

        let setstartdatum = document.createElement("input");
        setstartdatum.setAttribute("id", "startdate");
        setstartdatum.setAttribute("type", "date");
        let seteinddatum = document.createElement("input");
        seteinddatum.setAttribute("id", "enddate");
        seteinddatum.setAttribute("type", "date");
        let setdeadlinedatum = document.createElement("input");
        setdeadlinedatum.setAttribute("id", "deadlinedate");
        setdeadlinedatum.setAttribute("type", "date");

        conferentiedetails.appendChild(setstartdatum);
        conferentiedetails.appendChild(seteinddatum);
        conferentiedetails.appendChild(setdeadlinedatum);
        conferentiedetails.appendChild(document.createElement("br"));

        let podia = document.createElement("span");
        podia.innerHTML = "Podia:";
        conferentiedetails.appendChild(podia);
        conferentiedetails.appendChild(document.createElement("br"));
       
        var dropdownPodia = document.createElement("select");
        var optiePodia = document.createElement("option");
        var optiePodia_text = document.createTextNode("Selecteer aantal podia");
        optiePodia.appendChild(optiePodia_text);
        dropdownPodia.appendChild(optiePodia);
        conferentiedetails.appendChild(document.createElement("br"));

        let podiadiv = document.createElement("div");
        conferentiedetails.appendChild(dropdownPodia);
        conferentiedetails.appendChild(podiadiv);

        conferentiedetails.appendChild(document.createElement("br"));

        let categories = document.createElement("span");
        categories.innerHTML = "Categorieën: ";
        conferentiedetails.appendChild(categories);
        conferentiedetails.appendChild(document.createElement("br"));

        var dropdownCategories = document.createElement("select");
        var optieCat = document.createElement("option");
        var optieCat_text = document.createTextNode("Selecteer aantal categorieën");
        optieCat.appendChild(optieCat_text);
        dropdownCategories.appendChild(optieCat);
        conferentiedetails.appendChild(document.createElement("br"));

        let categorydiv = document.createElement("div");
        conferentiedetails.appendChild(dropdownCategories);
        conferentiedetails.appendChild(categorydiv);

        //Create the fields for podia
            for(let i = 1; i < 9; i++) {
                let optie = document.createElement("option");
                optie.setAttribute("id", i);
                let text_optie = document.createTextNode(i);
                optie.appendChild(text_optie);
                dropdownPodia.appendChild(optie);
            }
            dropdownPodia.onchange = function () {
            
                while (podiadiv.firstChild) {
                    podiadiv.removeChild(podiadiv.firstChild);
                }
                for(let t = 1; t <= dropdownPodia.options[dropdownPodia.selectedIndex].id ; t++) {
                    podiadiv.appendChild(document.createElement("br")); 
    
                    let dropdownobject = document.createElement("span");
                    dropdownobject.setAttribute("id","podium"+t);
                    dropdownobject.innerHTML = "Podium " + t + ":";
                    podiadiv.appendChild(dropdownobject);
    
                    podiadiv.appendChild(document.createElement("textarea")); 
                }
            }

            //Create the fields for categories
            for(let i = 1; i < 9; i++) {
                let optie = document.createElement("option");
                optie.setAttribute("id", i);
                let text_optie = document.createTextNode(i);
                optie.appendChild(text_optie);
                dropdownCategories.appendChild(optie);
            }
            dropdownCategories.onchange = function () {
            
                while (categorydiv.firstChild) {
                    categorydiv.removeChild(categorydiv.firstChild);
                }
                for(let t = 1; t <= dropdownCategories.options[dropdownCategories.selectedIndex].id ; t++) {
                    categorydiv.appendChild(document.createElement("br")); 
    
                    let dropdownobject2 = document.createElement("span");
                    //dropdownobject2.setAttribute("id","category"+t);
                    dropdownobject2.innerHTML = "Categorie " + t + ":";
                    categorydiv.appendChild(dropdownobject2);
    

                    let textareaCategory = document.createElement("textarea");
                    textareaCategory.setAttribute("id", "textareaCategory" + t);
                    textareaCategory.setAttribute('onclick','go(this)');

                    categorydiv.appendChild(textareaCategory); 
                }
            } 
    }

    create_conference_window.appendChild(conferentiedetails);

    //DIV MET DAARIN CONFERENTIE AANMAKEN BUTTON
    let create_conference_sendbutton = document.createElement("div");
    create_conference_sendbutton.classList.add("create_conference_sendbutton");
    create_conference_sendbutton.setAttribute("id","create_conference_sendbutton");
    let sendButton = document.createElement("button");
    let text_sendButton = document.createTextNode("Conferentie aanmaken");
    sendButton.appendChild(text_sendButton);
    create_conference_sendbutton.appendChild(sendButton);
    sendButton.onclick = function() { 
        createConference() };

    create_conference_window.appendChild(create_conference_sendbutton);
    document.getElementById("conference_view").appendChild(create_conference_window);
    
}

function createConference() {
    if(document.getElementById("conferenceNameTextarea").value == ""){
        alert("U heeft geen naam aan uw conferentie gegeven.");
    }else {
        let conf = confirm("Conferentie '"+document.getElementById("conferenceNameTextarea").value+"' aanmaken?");
        if (conf == true) {
            let xhreq = new XMLHttpRequest();
            xhreq.open("POST",SERVER+PORT+"/api/conference",true);
            xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
            var name = document.getElementById("conferenceNameTextarea").value;
            var startDate;
            var endDate;
            var deadlinePresentationDraft;

            if (document.getElementById("startdate") != null){
                if (document.getElementById("startdate").value != ""){
                    startDate = document.getElementById("startdate").value;
                    startDate += ("T00:00:00");
        
                } else {
                    startDate = null;       
                }
            }

            if (document.getElementById("enddate") != null){
                if (document.getElementById("enddate").value != ""){
                    endDate = document.getElementById("enddate").value;
                    endDate += ("T00:00:00");
        
                } else {
                    endDate = null;       
                }
            }

            if (document.getElementById("deadlinedate") != null){
                if (document.getElementById("deadlinedate").value != ""){
                    deadlinePresentationDraft = document.getElementById("deadlinedate").value;
                    deadlinePresentationDraft += ("T00:00:00");
        
                } else {
                    deadlinePresentationDraft = null;       
                }
            }
            
            //var allPodia = new Set();
            var allCategories = new Set();

            /*for(m=0;m<10;m++){
                if(document.getElementById("podium"+(m+1)) != undefined ){
                    allPodia.add(document.getElementById("podium"+(m+1)));
                }
            }*/

            for(n=0;n<10;n++){
                if(document.getElementById("textareaCategory"+(n+1)) != null){
                    console.log(document.getElementById("textareaCategory"+ (n+1)).value);
                    allCategories.add(document.getElementById("textareaCategory"+(n+1)).value);

                }
            }
            console.log(allCategories);

            
            var conference = { "name":name, "startDate":startDate, "endDate":endDate, "deadlinePresentationDraft":deadlinePresentationDraft, "categories": Array.from(allCategories) };
            console.log(JSON.stringify(conference));
            
            xhreq.send(JSON.stringify(conference));
            alert("Conferentie is aangemaakt.");
            document.getElementById("conference_view").innerHTML = "";
            //location.reload();

        }

    }
   
}
function go(elem){
    console.log(document.getElementById("textareaCategory5").value);
    console.log(elem.value);
}
