var url_string = window.location.href
var url123 = new URL(url_string);
var c = url123.searchParams.get("id");

$(document).ready(function () {
    if (localStorage.getItem("access-token-admin") == null) {
        location.href = "/admin/login"
    }

    loadDetails();
});

function loadDetails() {
    var current_user_id;
    if (localStorage.getItem('user-info') != null)
        current_user_id = JSON.parse(localStorage.getItem('user-info')).id;

    const url = baseUrl + `/api/v1/users/account/` + c;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                String(localStorage.getItem("access-token-admin"))
            );
        },
        async: false,
        success: function (res) {
            const obj = res.result;
            console.log(obj)
            var itemHtml = "";
            var itemDetail = "";

            itemHtml += `
            <p class="list-item-heading mb-4">Summary</p>
            <div style="display: flex;justify-content: center;">
                <a  href="#">
                   <img alt="Profile Picture" src="${obj.user.thumbnail}" class="img-thumbnail border-1 rounded-circle list-thumbnail align-self-center" />
                </a>
            </div>
            <p style="padding-top: 20px;" class="text-muted text-small mb-2">Name</p>
            <p class="mb-3">
                ${obj.user.fullName}
            </p>
            <p class="text-muted text-small mb-2">Username</p>
            <p class="mb-3">
                ${obj.user.username}
            </p>
            <p class="text-muted text-small mb-2">Email</p>
            <p class="mb-3">
                ${obj.user.email}
            </p>
            <p class="text-muted text-small mb-2">Phone</p>
            <p class="mb-3">
                ${obj.user.phone}
            </p>
            <p class="text-muted text-small mb-2">Balance</p>
            <p class="mb-3">
            $${obj.user.balance}
            </p>

            <p class="text-muted text-small mb-2">Date</p>
            <p class="mb-3">
            ${new Date(obj.user.updateAt).toLocaleDateString()}
            </p>

            <p class="text-muted text-small mb-2">Labels</p>
            <div>
                <p class="d-sm-inline-block mb-1">`;
            if (obj.business != null) {
                itemHtml +=
                    `
                <a href="#">
                <span class="badge badge-pill badge-outline-theme-3 mb-1">BUSINESS</span>
                </a>
                `
            }
            if (obj.freelancer != null) {
                itemHtml +=
                    `
                </p>
                <p class="d-sm-inline-block  mb-1">
                    <a href="#">
                        <span class="badge badge-pill badge-outline-secondary mb-1">FREELANCER</span>
                    </a>
                </p>
                   `
            }
            if (obj.user.roles == "ROLE_ADMIN") {
                itemHtml +=
                    `
             </p>
             <p class="d-sm-inline-block  mb-1">
                 <a href="#">
                     <span class="badge badge-pill badge-outline-danger mb-1">ADMIN</span>
                 </a>
             </p>
                `
            }
            itemHtml += `
            </div>            
            `;
            if (obj.business != null) {
                itemDetail += `
                <div>
                    <div class="card question d-flex mb-4 edit-quesiton">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div
                                class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <div class="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                    <span class="heading-number d-inline-block">1</span>
                                    BUSINESS
                                </div>
                            </div>
                        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                             <button class="btn btn-outline-theme-3 icon-button edit-button"><i class="simple-icon-pencil"></i></button>
                             <button class="btn btn-outline-theme-3 icon-button view-button"><i class="simple-icon-eye"></i></button>
                             <button class="btn btn-outline-theme-3 icon-button rotate-icon-click rotate" type="button" data-toggle="collapse" data-target="#q1" aria-expanded="true" aria-controls="q1"><i class="simple-icon-arrow-down with-rotate-icon"></i></button>
                        </div>
                    </div>
                    <div class="question-collapse collapse show" id="q1">
                        <div class="card-body pt-0">
                            <div class="edit-mode">
                                <div class="form-group mb-3">
                                    <h3>Location</h3>
                                    <p>${obj.business.location}</>
                                </div>
                                <div class="form-group mb-0">
                                     <h3>Average Grade</h3>
                                     <select class="rating" data-current-rating="5" data-readonly="true">
                                     <option value="1">1</option>
                                     <option value="2">2</option>
                                     <option value="3">3</option>
                                     <option value="4">4</option>
                                     <option value="5">5</option>
                                     </select>
                                </div>
                                <div class="form-group">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title ">Job Created</h5>
                                            <table class="data-table responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">
                                            <thead>
                                             <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>Price</th>
                                             </tr>
                                             </thead>
                                             <tbody>`
                                             if(obj.business.listJob != null){
                                                 for (i = 0; i < obj.business.listJob.length; i++){
                                                    itemDetail+= ` 
                                                <tr>
                                                <td>
                                                    <a class="text-muted" href="/admin/job-details?id=${obj.business.listJob[i].id}">${obj.business.listJob[i].id}</a>
                                                </td>
                                                <td>
                                                    <a class="list-item-heading" href="/admin/job-details?id=${obj.business.listJob[i].id}">${obj.business.listJob[i].name}</a>
                                                </td>
                                                <td>
                                                    <p class="text-muted">${obj.business.listJob[i].paymentAmount}</p>
                                                </td>
                                                </tr>`
                                                }
                                             }
                                                    itemDetail+=`
                                              </tbody>
                                              </table>
                                         </div>
                                    </div>
                                </div>
     
                            </div>
                            <div class="view-mode">
                                <label>Location?</label>
                                    <select class="form-control select2-single">
                                        <option label="&nbsp;">&nbsp;</option>
                                        <option value="0">18-24</option>
                                        <option value="1">24-30</option>
                                        <option value="2">30-40</option>
                                        <option value="3">40-50</option>
                                        <option value="4">50+</option>
                                    </select>
                                    <div class="form-group">
                                        <div class="separator mb-4"></div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-outline-primary btn-sm mb-2"><i class="simple-icon-plus btn-group-icon"></i>Edit</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`}
            if (obj.freelancer != null) {
                itemDetail += `
            <div>
                <div class="card question d-flex mb-4 edit-quesiton">
                    <div class="d-flex flex-grow-1 min-width-zero">
                        <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div class="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span class="heading-number d-inline-block"> 2</span> FREELANCER
                            </div>
                        </div>
                    <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <button class="btn btn-outline-theme-3 icon-button edit-button">
                            <i class="simple-icon-pencil"></i>
                        </button>
                        <button class="btn btn-outline-theme-3 icon-button view-button">
                            <i class="simple-icon-eye"></i>
                        </button>
                        <button
                            class="btn btn-outline-theme-3 icon-button rotate-icon-click"
                            type="button" data-toggle="collapse" data-target="#q2"
                            aria-expanded="false" aria-controls="q2">
                            <i class="simple-icon-arrow-down with-rotate-icon"></i>
                        </button>
                    </div>
                </div>
                <div class="collapse question-collapse" id="q2">
                    <div class="card-body pt-0">
                        <div class="edit-mode">
                            <div class="form-group mb-3">
                                    <h3>Location</h3>
                                    <p>${obj.freelancer.location}</>
                                </div>
                                <div class="form-group mb-0">
                                     <h3>Average Grade</h3>
                                     <select class="rating" data-current-rating="5" data-readonly="true">
                                     <option value="1">1</option>
                                     <option value="2">2</option>
                                     <option value="3">3</option>
                                     <option value="4">4</option>
                                     <option value="5">5</option>
                                     </select>
                                </div>
                            <div class="form-group">
                                <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title ">Proposal Sent</h5>
                                            <table class="data-table responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">
                                            <thead>
                                             <tr>
                                                <th>ID</th>
                                                <th>JOB NAME</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                             </tr>
                                             </thead>
                                             <tbody>`
                                             if(obj.freelancer.proposals != null){
                                                 for (j = 0; j < obj.freelancer.proposals.length; j++){
                                                    itemDetail+= ` 
                                                <tr>
                                                <td>
                                                    <a class="text-muted" href="/admin/job-details?id=${obj.freelancer.proposals[j].id}">${obj.freelancer.proposals[j].id}</a>
                                                </td>
                                                <td>
                                                    <a class="list-item-heading" href="/admin/job-details?id=${obj.freelancer.proposals[j].id}">${obj.freelancer.proposals[j].jobName}</a>
                                                </td>
                                                <td>
                                                    <p class="text-muted">${obj.freelancer.proposals[j].paymentAmount}</p>
                                                </td>
                                                <td>
                                                    <p class="text-muted">${obj.freelancer.proposals[j].proposalStatusCatalog.statusName}</p>
                                                </td>
                                                </tr>`
                                         }
                                     }
                                                    itemDetail+=`
                                              </tbody>
                                              </table>
                                         </div>
                                    </div>
                            </div>
                        </div>
                        <div class="view-mode">
                            <label>What is your gender?</label>
                            <div class="mb-4">
                            </div>
                             <div class="form-group">
                                 <div class="separator mb-4"></div>
                                 <div class="text-center">
                                     <button type="button" class="btn btn-outline-primary btn-sm mb-2"><i class="simple-icon-plus btn-group-icon"></i>Edit</button>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div> `
            }
            itemDetail+=`
        </div>                          
            `;
            $('#detail').html(itemHtml);
            $('#itemDetail').html(itemDetail);

        }
    })
}








