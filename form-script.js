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

    var presentationDraftApplicant = { "presentationDraft": { "subject":subject, "summary":summary, "type":type, "duration":duration },
                                      "applicants": [{ "name":name, "email":email, "occupation":occupation, "gender":gender, "dateOfBirth":date_of_birth, "requests":requests }] };

    xhreq.send(JSON.stringify(presentationDraftApplicant));
    alert("Bedankt voor je aanmelding");
}
