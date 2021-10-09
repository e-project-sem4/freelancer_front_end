$(document).ready(function() {
    $('#login').on("click", function(event) {
        const name = $("#username").val();
        const pass = $("#pass").val();
        $.ajax({
            type: 'POST',
            url: `http://localhost:8081/api/v1/users/login?username=${name}&password=${pass}`,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function(res) {
                if (res) {
                    localStorage.setItem('access-token', res.message)
                    localStorage.setItem('user-info', JSON.stringify(res.result))
                    location.href = '/home'
                }
            },
            // error(e) {
            //     show_default_popup('Login Fail')
            // },
        });
        event.preventDefault()
    })

})