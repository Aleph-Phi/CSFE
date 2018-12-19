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
        var mybr = document.createElement("br");
        conferentiedetails.appendChild(mybr);
        let setstartdatum = document.createElement("input");
        setstartdatum.setAttribute("id", "startdate");
        setstartdatum.setAttribute("type", "date");
        let seteinddatum = document.createElement("input");
        seteinddatum.setAttribute("id", "enddate");
        seteinddatum.setAttribute("type", "date");
        conferentiedetails.appendChild(setstartdatum);
        conferentiedetails.appendChild(seteinddatum);
        var mybr2 = document.createElement("br");
        conferentiedetails.appendChild(mybr2);
        let podia = document.createElement("span");
        podia.innerHTML = "Podia:";
        conferentiedetails.appendChild(podia);
        var mybr3 = document.createElement("br");
        conferentiedetails.appendChild(mybr3);
       
        var dropdown = document.createElement("select");
        var optie1 = document.createElement("option");
        var optie1_text = document.createTextNode("Selecteer aantal podia");
        optie1.appendChild(optie1_text);
        dropdown.appendChild(optie1);
        var mybr4 = document.createElement("br");
        conferentiedetails.appendChild(mybr4);
        let podiadiv = document.createElement("div");
        conferentiedetails.appendChild(dropdown);
        conferentiedetails.appendChild(podiadiv);
        

        for(let i = 1; i < 9; i++) {
            let optie = document.createElement("option");
            optie.setAttribute("id", i);
            let text_optie = document.createTextNode(i);
            optie.appendChild(text_optie);
            dropdown.appendChild(optie);
        }
        dropdown.onchange = function () {
        
            while (podiadiv.firstChild) {
                podiadiv.removeChild(podiadiv.firstChild);
            }
            for(let t = 1; t <= dropdown.options[dropdown.selectedIndex].id ; t++) {
                var mybr5 = document.createElement("br");
                podiadiv.appendChild(mybr5); 
                let podium = document.createElement("span");
                podium.innerHTML = "Podium " + t + ":";
                podiadiv.appendChild(podium);
                let podia_text = document.createElement("textarea"); 
                podiadiv.appendChild(podia_text); 
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
    sendButton.onclick = function() { createConference() };

    create_conference_window.appendChild(create_conference_sendbutton);
    document.getElementById("conference_view").appendChild(create_conference_window);
    
}

function createConference() {
    if(document.getElementById("conferenceNameTextarea").value == ""){
        alert("U heeft geen naam aan uw conferentie gegeven.");
    } else {
        let conf = confirm("Conferentie '"+document.getElementById("conferenceNameTextarea").value+"' aanmaken?");
        if (conf == true) {
            let xhreq = new XMLHttpRequest();
            xhreq.open("POST",SERVER+PORT+"/api/conference",true);
            xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
            var name = document.getElementById("conferenceNameTextarea").value;
            var startDate;
            var endDate;
            
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
            
            var conference = { "name":name, "startDate":startDate, "endDate":endDate };
            xhreq.send(JSON.stringify(conference));
            alert("Conferentie is aangemaakt.");
            document.getElementById("conference_view").innerHTML = "";
            location.reload();

        }

    }
   
}
