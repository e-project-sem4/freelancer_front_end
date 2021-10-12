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
                if (res) {
                    localStorage.setItem('access-token', res.message)
                    localStorage.setItem('user-info', JSON.stringify(res.result))
                    location.href = '/home'
                }
            },

        });
        event.preventDefault()
    })

})