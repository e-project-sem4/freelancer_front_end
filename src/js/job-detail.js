var url_string = window.location.href
var url123 = new URL(url_string);
var c = url123.searchParams.get("id");
const url = baseUrl + `/api/v1/job/`+ c;

$(document).ready(function () {

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

            var proposals = jobDetails.proposals;
            const job_user_id = jobDetails.userBusiness.user.id;
            var itemHtml = "";
            let itemTempHtml = "";
            var d = new Date(jobDetails.createAt).toLocaleDateString();

            itemTempHtml +=
                `
                <div class="col-lg-8 col-md-7">
                    <div class="job-detail text-center job-single border rounded p-4">
                    <div class="job-single-img mb-2">
                        <img src="images/logo-top-work2-ico.png" alt="" class="img-fluid mx-auto d-block">
                    </div>
                    <h4 class=""><a href="#" class="text-dark">${jobDetails.name}</a></h4>
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item mr-3">
                            <p class="text-muted mb-2"><i class="mdi mdi-bank mr-1"></i>${jobDetails.userBusiness.location}</p>
                        </li>

                        <li class="list-inline-item">
                            <p class="text-muted mb-2"><i class="mdi mdi-clock-outline mr-2"></i>${d}</p>
                        </li>

                        <li class="list-inline-item">
                            <p class="text-muted mb-2"><i class="mdi mdi-currency-usd mr-1"></i><strong>${jobDetails.paymentAmount}</strong></p>
                        </li>`;
            if(jobDetails.isPaymentStatus != 1){
                itemTempHtml+= `
                                            <li class="list-inline-item" style="color:red">
                                            <p class="">(This job is unpaid)</p>
                                            </li>`;
            }
            itemTempHtml +=
                `
                    </ul>
                </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="text-dark mt-4">Complexity :</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="job-detail border rounded mt-2 p-4">
                                <div class="job-detail-desc">
                                    <div class="">
                                        <div class="float-left mr-3">
                                            <i class="mdi mdi-send text-primary"></i>
                                        </div>
                                        <p class="text-muted mb-2">${jobDetails.complexity.complexityText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="text-dark mt-4">Require Skills :</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="job-detail border rounded mt-2 p-4">
                                <div class="job-detail-desc">
                                    <div class="job-details-desc-item">
                                       

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="text-dark mt-4">Job Description :</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="job-detail border rounded mt-2 p-4">
                                <div class="job-detail-desc">                               
                                    <p class="text-muted mb-3">${jobDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>`
            var hiennutapply = 1
            if (job_user_id != current_user_id) {
                for (let y = 0; y < proposals.length; y++) {
                    if (proposals[y].userAccountId == current_user_id) {
                        if (proposals[y].proposal_status_catalog_id == 1) {
                            hiennutapply = 0;
                        }
                    }

                }
                if (hiennutapply == 1 && jobDetails.isPaymentStatus == 1 ) {
                    itemTempHtml += `<div class="row d-flex justify-content-center">
                <div class="job-detail border rounded mt-4">
                    <button class="btn btn-primary btn-block"data-toggle="modal" data-target="#exampleModal" id="apply-job">Apply For Job</button>
                </div>
            </div>`
                }

                itemTempHtml += ` 
                <div id="apply-form">
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header text-center">
                                <h5 >Apply To Proposal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <div class="form-group">
                                        <label class="col-form-label">Amount:</label>
                                        <input type="text" class="form-control" id="amount" name="amount">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label">Message:</label>
                                        <textarea class="form-control" id="description-apply" name="description"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button class="btn btn-primary" id="apply-proposal">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                `;
            }
            itemTempHtml += `<div class="row">
                        <div class="col-lg-12">
                            <h5 class="text-dark mt-4">Proposals :</h5>
                        </div>
                    </div>`
            for (let j = 0; j < proposals.length; j++) {

                var paymentAmountProposal = proposals[j].paymentAmount;
                var proposal_catalog_id = proposals[j].proposal_status_catalog_id;
                if (proposal_catalog_id == 1 || proposal_catalog_id == 2) {
                    itemTempHtml += `
<div class="row">
    <div className="col-lg-12">
            <div class="job-detail-desc">
                <div class="col-lg-12 mt-4 pt-2">
                    <div class="job-list-box border rounded">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col-lg-2">
                                    <div class="company-logo-img">
                                        <img src="images/featured-job/img-1.png" alt=""
                                             class="img-fluid mx-auto d-block">
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-9">
                                    <div class="job-list-desc">
                                    <h4 class="mb-2"><a href="/candidate-details?id=${proposals[j].userAccountId}" class="text-dark">${proposals[j].freeLancerName}</a></h4>
                                        <ul class="list-inline mb-0">
                                            <div class="list-inline-item mr-3">
                                                <p  class="text-break mb-0"><i
                                                        class="mdi mdi-animation mr-2">                
                                                    </i>Comment:
                                                    ${proposals[j].description}</p>
                                            </div>
                                            <div class="list-inline-item mr-3">
                                                <p class="text-break mb-0" id="payment-amount-proposal">
                                                <i class="mdi mdi-currency-usd mr-2"></i>Payment
                                                    : ${paymentAmountProposal}</p>
                                            </div>
                                            <div class="list-inline-item mr-3">
                                                <p class="text-break mb-0"><i class="mdi mdi-calendar-text mr-2">
                                                    </i>Date
                                                    : ${new Date(proposals[j].createAt).toLocaleDateString()}</p>
                                            </div>
                                        </ul>
                                    </div>
                                </div>`
                    if (proposals[j].userAccountId == current_user_id) {
                        itemTempHtml += `
                                <div class="col-lg-3 col-md-3">
                                    <div class="job-list-button-sm text-right">                     
                                        <div class="mt-3">
                                            <button class="btn btn-sm btn-primary" id="apply-freelancer" onclick="deleteProposal(${proposals[j].id});">Retrieve</button>
                                        </div>
                                    </div>
                                </div>`
                    }
                    if (job_user_id == current_user_id) {
                        if (proposal_catalog_id == 2) {
                            itemTempHtml += `
                                <div class="col-lg-3 col-md-3">
                                    <div class="job-list-button-sm text-right">                     
                                        <div class="mt-3">
                                            <label class="text-primary">Applied</label>
                                        </div>
                                    </div>
                                </div>`
                        } else {
                            itemTempHtml += `
                                <div class="col-lg-3 col-md-3">
                                    <div class="job-list-button-sm text-right">                     
                                        <div class="mt-3">
                                            <button class="btn btn-sm btn-primary" id="apply-proposal" onclick="saveProposal(${paymentAmountProposal},${proposals[j].id});">Recruit</button>
                                        </div>
                                    </div>
                                </div>`
                        }

                    }
                    itemTempHtml += `
                                </div> 
                             </div>
                          </div>   
                      </div>    
                  </div>
              </div>
</div>`
                }
            }
            itemTempHtml += `
                </div>
                <div class="col-lg-4 col-md-5 mt-4 mt-sm-0">
                    <div class="company-brand-logo text-center">
                    <img src="images/featured-job/img-2.png" alt="" class="img-fluid mx-auto d-block mb-3">
                    <h5 class="text-muted mb-0"><a href="#" class="text-muted"><i class="mdi mdi-bank mr-1"></i>${jobDetails.userBusiness.location}</a></h5>
                </div>

                <div class="job-detail rounded border job-overview mt-4 mb-4">
                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-security text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Expected Duration</h6>
                            <h6 class="text-black-50 pt-2 mb-0">${jobDetails.expectedDuration.durationText}</h6>
                        </div>
                    </div>
                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-currency-usd text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Salary</h6>
                            <h6 class="text-black-50 pt-2 mb-0">${jobDetails.paymentAmount}</h6>
                        </div>
                    </div>

                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-apps text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Category</h6>
                            <h6 class="text-black-50 pt-2 mb-0">Developer</h6>
                        </div>
                    </div>

                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-human-male-female text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Gender</h6>
                            <h6 class="text-black-50 pt-2 mb-0">Male & Female</h6>
                        </div>
                    </div>

                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-calendar-today text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Date Posted</h6>
                            <h6 class="text-black-50 pt-2 mb-0">${d}</h6>
                        </div>
                    </div>
                </div>
                <div class="job-detail border rounded mt-4 p-4">
                        <h5 class="text-muted text-center pb-2"><i class="mdi mdi-clock-outline mr-2"></i>Opening Hours</h5>

                        <div class="job-detail-time border-top pt-4">
                            <ul class="list-inline mb-0">
                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Monday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9AM - 5PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Tuesday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9AM - 5PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Wednesday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9AM - 5PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Thursday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9AM - 5PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Friday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9AM - 5PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted border-bottom pb-3">
                                    <div class="float-left">Saturday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">9:30AM - 1PM</h5>
                                    </div>
                                </li>

                                <li class="clearfix text-muted pb-0">
                                    <div class="float-left">Sunday</div>
                                    <div class="float-right">
                                        <h5 class="f-13 mb-0">Closed</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                <h5 class="text-dark">Job Location</h5>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.5129686623197!2d105.78123742468962!3d21.028534344292176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd0c66f05%3A0xea31563511af2e54!2zOCBUw7RuIFRo4bqldCBUaHV54bq_dCwgTeG7uSDEkMOsbmgsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1634395902856!5m2!1svi!2s" class="rounded" style="border: 0" allowfullscreen=""></iframe>
                </div>
                <ul class="social-icon list-inline mb-0 mt-4">
                    <li class="list-inline-item">Share :</li>
                    <li class="list-inline-item"><a href="#" class=" rounded"><i class="mdi mdi-facebook"></i></a></li>
                    <li class="list-inline-item"><a href="#" class=" rounded"><i class="mdi mdi-twitter"></i></a></li>
                    <li class="list-inline-item"><a href="#" class=" rounded"><i class="mdi mdi-google-plus"></i></a></li>
                    <li class="list-inline-item"><a href="#" class=" rounded"><i class="mdi mdi-whatsapp"></i></a></li>
                    <li class="list-inline-item"><a href="#" class=" rounded"><i class="mdi mdi-linkedin"></i></a></li>
                </ul>
                <div class="row">
                    <div class="col-6">
                        <div class="job-single-social-icon text-center mt-4">
                            <a href="" class="text-white"><i class="mdi mdi-facebook facebook"></i></a>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="job-single-social-icon text-center mt-4">
                            <a href="" class="text-white"><i class="mdi mdi-google-plus google"></i></a>
                        </div>
                    </div>
                </div>   
               </div>
            </div>`
            itemHtml += itemTempHtml;
            $('#job-description').html(itemHtml);
            let arrSkill = jobDetails.otherSkills
            let skillTemp = '';
            let temp =
                '';
            for (i = 0; i < arrSkill.length; i++) {

                temp = `  <div class="">
  
                                                   <div class="">
                                                   <p class="text-muted mb-2"><i class="mdi mdi-send text-primary">${arrSkill[i].skill?.skillName}</i></p> 
                                                   </div>
                                            
                          </div>`
                skillTemp += temp
            }
            $('.job-details-desc-item').html(skillTemp)

        }
    })

    $('#apply-job').on('click', function () {
        if (localStorage.getItem('user-info') == null) {
            location.href = "/login"
        }
    })

    $('#apply-proposal').on('click',function (){
        if ($('#description-apply').val().length < 20) {
            swal("Error!", "Your description must be at least 20 characters long!", "warning");
            return;
        }
        var url_string = window.location.href
        var url123 = new URL(url_string);
        var c = url123.searchParams.get("id");
        var job_id = c;
        var amount = $('#amount').val();
        var description = $("#description-apply").val();
        const proposalForm = {
            job_id: job_id,
            paymentAmount: amount,
            description: description,
        };
        $.ajax({
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    String(localStorage.getItem("access-token"))
                );
            },
            url: baseUrl + "/api/v1/proposals",
            contentType: "application/json",
            data: JSON.stringify(proposalForm),
            dataType: "JSON",
            async: false,
            success: function () {
                window.location.reload()
            },
            error() {
                console.log("sai");
            },
        });
    })

}








