function clearHTSet() {
    var myHostTable = document.getElementById("tableHosts");
    myHostTable.innerHTML = '';
}

function clearPTSet() {
	  var myPresentationTable = document.getElementById("tablePresentations");
	  myPresentationTable.innerHTML='';
}

function showHostTable() {
	clearHTSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/applicant",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var hostList = JSON.parse(this.responseText);
            console.log(hostList);

            let result ="<th>ID</th>"+
					 	"<th>Naam</th>"+
					 	"<th>E-mail</th>"+
					 	"<th>Beroep/Achtergrond</th>"+
					 	"<th>Geslacht</th>"+
					 	"<th>Geboortedatum</th>"+
					 	"<th>Overige opmerkingen</th>";
            for(let eenHost of hostList) {
                console.log(eenHost);
                result += "<tr><td>"+eenHost.id+"</td>"+
                              "<td>"+eenHost.name+"</td>"+
                              "<td>"+eenHost.email+"</td>"+
                              "<td>"+eenHost.occupation+"</td>" +
                              "<td>"+eenHost.gender+"</td>"+
                              "<td>"+eenHost.dateOfBirth+"</td>"+
                              "<td>"+eenHost.requests+"</td></tr>";
            }
            document.getElementById("tableHosts").innerHTML += result;
        }
    }
    xhr.send();
}

function showPresentationTable() {
	clearPTSet();
    let xhr = new XMLHttpRequest();
    xhr.open("GET",SERVER+PORT+"/api/presentationdraft",true);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var presentationList = JSON.parse(this.responseText);
            console.log(presentationList);

            let result ="<th>ID</th>"+
            			"<th>Onderwerp</th>"+
            			"<th>Omschrijving</th>"+
            			"<th>Type presentatie</th>"+
            			"<th>Duur presentatie</th>"+
            			"<th>Aanmaak datum</th>";
            for(let eenPresentation of presentationList) {
                console.log(eenPresentation);
                result += "<tr><td>"+eenPresentation.id+"</td>"+
                              "<td>"+eenPresentation.subject+"</td>"+
                              "<td>"+eenPresentation.summary+"</td>"+
                              "<td>"+eenPresentation.type+"</td>"+
                              "<td>"+eenPresentation.duration+"</td>" +
                              "<td>"+eenPresentation.timeOfCreation+"</td></tr>";
            }
            document.getElementById("tablePresentations").innerHTML += result;
        }
    }
    xhr.send();
}
