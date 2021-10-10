$(document).ready(function() {
    $('#change').on("click", function(event) {

        const name = $("#username").val();
        const pass = $("#oldPassword").val();
        const passNew = $("#newPassword").val();
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

})