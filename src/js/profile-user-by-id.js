var url_string = window.location.href
var urlId = new URL(url_string);
var id = urlId.searchParams.get("id");
const url = baseUrl + `/api/v1/users/` + id;
const token = localStorage.getItem('access-token')
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr){
            xhr.setRequestHeader(
                "Authorization", token
            );
        },
        async: false,
        success: function (res) {
            let itemTempHtml = "";
            const userDetails = res.result;
            itemTempHtml = `
     <img src="${userDetails.user.thumbnail}" height="150" alt="" class="d-block mx-auto shadow rounded-pill mb-4">
            <h2 class="text-white mb-2">${userDetails.user.fullName}</h5>              
            <p class="text-white-50 h5 mb-2">${userDetails.freelancer.overview}</p>
            <p class="text-white-50 h5 mb-2">${userDetails.freelancer.location}</p>
            <ul class="candidates-profile-icons list-inline mb-3">
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
            </ul>`;
        $('#user-profile-by-id').html(itemTempHtml)
            let itemHtmlProfile = `<div class="container emp-profile">
    <form method="post">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                    <img src="${userDetails.user.thumbnail}" style="width: 207px;height: 140px;border-radius: 16%"
                         alt=""/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                    <h5>
                        ${userDetails.user.fullName}
                    </h5>
                    <h6>
                        ${userDetails.freelancer.overview}
                    </h6>
    </form>
</div>
            `
            $('#profile').html(itemHtmlProfile)
            let itemHtmlFreelancer ="";
            let itemHtmltempFreelancer ="";
            itemHtmltempFreelancer =`
            <div class="col-lg-12 mt-4 pt-2 pb-4 ">
            <div id="modal-freelancer" class="row" >
              <div class="col-md-9 ">`


            itemHtmltempFreelancer +=
                `       
                </h4>
              </div>
                            </div>
                                <h4 class="text-dark">Education :</h4>
                                <div id="CertificationsProfileList" class="row">
                                <div class="col-lg-4 col-md-6 mt-4 pt-5">
                                <div class="border rounded candidates-profile-education text-center text-muted">
                                    <div class="profile-education-icon border rounded-pill bg-white text-primary">
                                        <i class="mdi mdi-36px mdi-school"></i>
                                    </div>
                                    <h6 class="text-uppercase f-17"><a href="#" class="text-muted">${userDetails.freelancer?.certifications}</a></h6>
                                    <p class="f-14 mb-1">May 2016 - April 2017</p>
                                    <p class="pb-3 mb-0">Diploma In Management Studies</p>
                                    
                                    <p class="pt-3 border-top mb-0">Suspendisse faucibus et pellentesque egestas lacus ante convallis.</p>
                                </div>
                            </div>
                                </div>

                            </div>
                            <div class="col-lg-12 mt-4 pt-2">
                                <h4 class="text-dark">Skills :</h4>
                                <div  class=" p-4">`;
            let Listskill =""
            Skills = userDetails.freelancer?.hasSkills
            for (let i = 0; i < Skills?.length; i++) {
                Listskill  += `
                                   <Button class="btn btn-light"># ${Skills[i].skill.skillName}</Button>
                                    `;
            }
            itemHtmltempFreelancer += Listskill;
            itemHtmltempFreelancer +=` 
                          </div>
                          
                          
                          
                            </div>
                            
                            <div class="col-lg-12 mt-4 pt-2">
                                <h4 class="text-dark">Rate Freelancer :</h4>
                                <div class="row">`
            let ListProposals =""
            proposals = userDetails.freelancer.proposals

            for (let i = 0; i < proposals?.length; i++) {
                ListProposals+=`<div class="col-md-6 mt-3 mt-md-0 pt-3">
                                                            
                                    <div class="border rounded job-list-box p-4">
                                        <div class="row">
                                        <div class="col-lg-3">
                                                <div class="company-brand-logo text-center mb-4">
                                                    <img src="images/featured-job/img-2.png" alt="" class="img-fluid mx-auto d-block">
                                                </div>
                                            </div>
                                            
                                           
                                            <div class="col-lg-9 ">
                                                <div class="job-list-desc candidates-profile-exp-desc">
                                                    <h5   class="f-19 mb-2"><a href="#"  class="text-dark"> ${proposals[i].jobName}</a></h5>           
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-tooltip"></i> Des: ${proposals[i].description}</h6>
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-message-processing"></i> Comment: ${proposals[i].clientComment}</h6>
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-star-circle"></i> Rate: ${proposals[i].clientGrade}</h6>
                                                    
                                                    ${proposals[i].proposal_status_catalog_id == 2 ? '<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status: InProgress' : proposals[i].proposal_status_catalog_id == 3 ? '<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status:Done':'<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status:null'}

                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>                                 
                                </div>`;

            }
            itemHtmltempFreelancer += ListProposals;
            itemHtmltempFreelancer+=`
                                </div>
                </div>`;

            itemHtmlFreelancer +=itemHtmltempFreelancer
            $('#Freelancer').html(itemHtmlFreelancer)



        }
    })

});