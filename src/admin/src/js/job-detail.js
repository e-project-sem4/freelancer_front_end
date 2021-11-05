var url_string = window.location.href
var url123 = new URL(url_string);
var c = url123.searchParams.get("id");

$(document).ready(function () {
    if (localStorage.getItem("access-token-admin") == null) {
        location.href = "/admin/login"
    }
    loadJobDetails();
});

function loadJobDetails() {
    var current_user_id;
    if (localStorage.getItem('user-info') != null)
        current_user_id = JSON.parse(localStorage.getItem('user-info')).id;

    const url = baseUrl + `/api/v1/job/` + c;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const jobDetails = res.result;
            console.log(jobDetails)

            var itemHtml = "";

            itemHtml += `
            <div class="col-lg-6 col-12 mb-4">
             <div  class="card mb-4">
            <div class="card-body">
            <p class="text-muted mb-2">Account: <a href="/admin/user-details?id=${jobDetails.userBusiness.user.id}">${jobDetails.userBusiness.user.username}</a></p>
            <div style="display: flex;justify-content: center;">
                <a href="/admin/user-details?id=${jobDetails.userBusiness.user.id}">
                   <img alt="Profile Picture" src="${jobDetails.userBusiness.user.thumbnail}" class="img-thumbnail border-1 rounded-circle list-thumbnail align-self-center" />
                </a>
            </div>
            <p style="padding-top: 20px;" class="text-muted text-small mb-2">Job Status</p>
            `;
            if(jobDetails.status == 3){
                itemHtml+= 
                `
               <span class="badge badge-pill badge-danger">Complete</span>
                `;
            }else if (jobDetails.status == 1 || jobDetails.status == 2){
                itemHtml +=
                `
                <span class="badge badge-pill badge-secondary ">Open</span>
                `;
            }
            else if (jobDetails.status == -1) {
                itemHtml +=
                `
                <span class="badge badge-pill badge-secondary">Close</span>
                `;
            }
            else if (jobDetails.status == 0) {
                itemHtml +=
                `
                <span class="badge badge-pill badge-danger">DELETED</span>
                `;
            }
            itemHtml +=
            `
            <p style="padding-top: 20px;" class="text-muted text-small mb-2">Job Name</p>
            <div>
                <p class="mb-3">
                    ${jobDetails.name}
                </p>
            </div>
            <p class="text-muted text-small mb-2">Description</p>
            <div>
                <p class="mb-3">
                ${jobDetails.description}
                </p>
            </div>
            <p class="text-muted text-small mb-2">Price</p>
            <p class="mb-3">$${jobDetails.paymentAmount}</p>
            <p class="text-muted text-small mb-2">Payment Status</p>
            `;
            if(jobDetails.isPaymentStatus == 0){
                itemHtml+= 
                `
               <span class="badge badge-pill badge-danger  mb-3">Unpaid</span>
                `;
            }else{
                itemHtml +=
                `
               <span class="badge badge-pill badge-primary  mb-3">Paid</span>
                `;
            }
            itemHtml +=
            `
            <p class="text-muted text-small mb-2">Skill</p>
            <p class="mb-3">`;
            for (j = 0; j < jobDetails.otherSkills.length; j++) {
                temp = `
                <a href="#">
                <span class="badge badge-pill badge-outline-theme-2 mb-1">${jobDetails.otherSkills[j].skill.skillName}</span>
                </a>`
                itemHtml += temp
            }
            itemHtml += 
            `</p>
            <p class="text-muted text-small mb-2">Complexity </p>
            <p class="mb-3">${jobDetails.complexity.complexityText}</p>
            <p class="text-muted text-small mb-2">Expected Duration </p>
            <p class="mb-3">${jobDetails.expectedDuration.durationText}</p>
            </div>
            </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Proposal</h5>
                        <div>`;
                        for (h = 0; h < jobDetails.proposals.length; h++) {
                            pro = `
                            <div class="d-flex flex-row mb-3 pb-3 border-bottom">
                                <a href="#">
                                    <img alt="Profile Picture" src="/admin/src/img/logo-top-work2-ico.png"
                                        class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                                </a>
                                <div class="pl-3 pr-2">
                                    <a href="#">
                                        <p class="font-weight-medium mb-0">${jobDetails.proposals[h].description}.
                                        </p>
                                        <p class="text-muted mb-1 text-small"><a <a href="/admin/user-details?id=${jobDetails.proposals[h].userAccountId}">${jobDetails.proposals[h].freeLancerName} <a/>|
                                        ${new Date(jobDetails.proposals[h].createAt).toLocaleDateString()}</p>
                                    </a>                                   
                                     `;
                                     if(jobDetails.proposals[h].proposal_status_catalog_id == 3 ){
                                     pro +=
                                     `<div class="form-group mb-0">
                                     <p class="font-weight-medium mb-0">${jobDetails.proposals[h].freelancerComment}.
                                     </p>
                                     <select class="rating" data-current-rating="5" data-readonly="true">
                                     <option value="1">1</option>
                                     <option value="2">2</option>
                                     <option value="3">3</option>
                                     <option value="4">4</option>
                                     <option value="5">5</option>
                                     </select>
                                     </div>
                                     `;
                                     }
                                     pro += 
                                     
                                     `</div>
                            </div>`
                            itemHtml += pro
                        }
                            
                        itemHtml +=    
                        `</div>
                    </div>
                </div>
            </div>
            `
            $('#job-detail').html(itemHtml);
        }
    })
}








