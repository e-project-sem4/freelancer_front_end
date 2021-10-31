$(document).ready(function() {
    $('#change-pass').on("click", function(event) {
        const name =JSON.parse(localStorage.getItem('user-info')).username
        const pass = $("#pass").val();
        const passNew = $("#passNew").val();
        const url = baseUrl + `/api/v1/users/changepassword`;
        const token=  localStorage.getItem('access-token')
        const param = {
            username: name,
            oldPassword: pass,
            newPassword: passNew,
        };
        $.ajax({
            type: 'PATCH',
            url: url,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr){
                xhr.setRequestHeader(
                    "Authorization", token
                );
            },
            data:JSON.stringify(param),
            dataType:"JSON",
            async: false,
            success: function(res) {
               console.log(res.message)
            },
        });
        event.preventDefault()
    })
    $(".passwordChange_form").validate({
        rules: {
            pass: {
                required: true,
                minlength: 8,
                equalTo: "#pass"
            },
            
            passNew: {
                required: true,
                minlength: 8,
               
            },
           
        },
        messages: {
            pass: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            passNew: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long",
               
            },
           
        },
        
    });

})
