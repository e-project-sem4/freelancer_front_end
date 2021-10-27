

$(document).ready(function () {
    loadHomePage();
});
function loadHomePage() {
    const url = baseUrl + "/api/v1/admin/dashboard";
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              String(localStorage.getItem("access-token"))
            );
          },
        dataType: "JSON",
        async: false,
        success: function (res) {         
            itemTempHtml = `
            <div class="col-lg-3 col-md-6 mt-4 pt-2">
                    <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-desktop-classic d-inline-block rounded-pill h3 text-primary"></i>
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Admin</h5>
                                <p class="text-success mb-0 rounded">${res[1]}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-3 col-md-6 mt-4 pt-2">
                    <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-telegram d-inline-block rounded-pill h3 text-primary"></i>
                            
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">User</h5>
                                <p class="text-success mb-0 rounded">${res[2]}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-3 col-md-6 mt-4 pt-2">
                    <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-account d-inline-block rounded-pill h3 text-primary"></i>
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Freelancer</h5>
                                <p class="text-success mb-0 rounded">${res[3]}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-3 col-md-6 mt-4 pt-2">
                <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-bank d-inline-block rounded-pill h3 text-primary"></i>
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Business</h5>
                                <p class="text-success mb-0 rounded">${res[4]}</p>
                            </div>
                        </div>
                        </a>
                </div>
            `
            $("#list_Home").html(itemTempHtml);
            
        }
    })
}