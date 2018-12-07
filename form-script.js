function postForm() {
    let xhreq = new XMLHttpRequest();
    xhreq.open("POST","http://localhost:8082/api/presentationdraft",true);
    xhreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    var subject = document.getElementById("form_subject").value;
    var summary = document.getElementById("form_summary").value;
    var type = document.getElementById("form_type").value;
    var duration = document.getElementById("form_duration").value;

    var name = document.getElementById("form_name").value;
    var email = document.getElementById("form_email").value;
    var occupation = document.getElementById("form_occupation").value;
    var gender = document.getElementById("form_gender").value;
    var date_of_birth = document.getElementById("form_date_of_birth").value;
    date_of_birth = date_of_birth.split('-');
    date_of_birth = date_of_birth.reverse().join('-');
    var requests = document.getElementById("form_requests").value;

    var applicants = [];
    var applicant = { "name":name, "email":email, "occupation":occupation, "gender":gender, "dateOfBirth":date_of_birth, "requests":requests };
    applicants.push(applicant);

    let y = document.getElementById("form_cohost").value;
    for(let i = 1; i<=y; i++) {                                  // Checkt of er co-hosts zijn aangemeld en maakt deze aan.
        applicant = postCoHost(i);
        applicants.push(applicant);
    }

    var presentationDraftApplicant = { "presentationDraft": { "subject":subject, "summary":summary, "type":type, "duration":duration },
                                      "applicants": applicants };

    xhreq.send(JSON.stringify(presentationDraftApplicant));
    alert("Bedankt voor je aanmelding!");
}

function postCoHost(x) {
    var name = document.getElementById("form_name"+x).value;
    var email = document.getElementById("form_email"+x).value;
    var applicant = { "name":name, "email":email, "requests":"Ik ben een cohost." };
    return applicant;
}

function addCoHost() {               // Toont extra velden voor naam en e-mail van de co-host(s).
    let x = document.getElementById("form_cohost").value;
    document.getElementById("extra").innerHTML = "";
    for(let i = 1; i<=x; i++) {
        var div1 = document.createElement("div");
        var text1 = document.createTextNode("Naam:");
        div1.appendChild(text1);
        document.getElementById("extra").appendChild(div1);
        var field1 = document.createElement("input");
        field1.setAttribute("id", "form_name"+i);
        document.getElementById("extra").appendChild(field1);

        var div2 = document.createElement("div");
        var text2 = document.createTextNode("E-mailadres:");
        div2.appendChild(text2);
        document.getElementById("extra").appendChild(div2);
        var field2 = document.createElement("input");
        field2.setAttribute("id", "form_email"+i);
        document.getElementById("extra").appendChild(field2);
    }
}
