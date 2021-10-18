$(document).ready(function () {
    loadDetaiJob();

});

function loadDetaiJob(){
    
    var current_user_id;
    if (localStorage.getItem('id_job') != null)
        current_user_id = JSON.parse(localStorage.getItem('id_job'));

    const url = baseUrl + `/api/v1/job/` + current_user_id;
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
            itemTempHtml =
                `<div class="row" id="job-description">
                <div class="col-lg-12 col-md-12">
                    <div class="job-detail text-center job-single border rounded p-4">
                    <div class="job-single-img mb-2">
                        <img src="images/featured-job/img-1.png" alt="" class="img-fluid mx-auto d-block">
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
                            <p class="text-muted mb-2"><i class="mdi mdi-currency-usd mr-1"></i>${jobDetails.paymentAmount}</p>
                        </li>
                    </ul>
                    <p class="text-muted mb-0">Suspendisse pulvinar augue ac venenatis condimentum at sem libero volutpat nibh that nec pellentesque velit pede quis nunc Fusce a quam etiam ut purus mattis mauris sodales aliquam curabitur site Quisque placerat namipsum risus rutrum vitaeeumolestie vel lacus sed augue</p>
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
                        <h5 class="text-dark mt-4">Payment :</h5>
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
                                    <p class="text-muted mb-2">${jobDetails.paymentAmount}</p>
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
        

    });
}