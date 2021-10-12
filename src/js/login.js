$(document).ready(function() {
    $('#login').on("click", function(event) {
        const name = $("#username").val();
        const pass = $("#pass").val();
        const url = baseUrl + `/api/v1/users/login?username=${name}&password=${pass}`;
        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function(res) {
                if (res.status == -1) {
                    var template = `<div class="alert-login">
                                        <span id="error-content-login">${res.message}</span>
                                    </div>`
                    $("#error").html(template)
                    $('.alert-login').show();
                    return;
                }
                if (res.status != -1) {
                    localStorage.setItem('access-token', res.message)
                    localStorage.setItem('user-info', JSON.stringify(res.result))
                    location.href = '/home'
                }
            },

        });
        event.preventDefault()
    })

})