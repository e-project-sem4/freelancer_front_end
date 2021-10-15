$(document).ready(function () {
    var current_user_id = JSON.parse(localStorage.getItem('user-info')).id;
    var url_string = window.location.href
    var url123 = new URL(url_string);
    var c = url123.searchParams.get("id");
    const url = baseUrl + `/api/v1/job/` + c;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const jobDetails = res.result;
            const job_user_id = jobDetails.userBusiness.user.id;
            var timestamp = (jobDetails.createAt)
            var date = new Date(timestamp);
            var dateView = (date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear());

            let itemTempHtml =
                `<div class="row" id="job-description">
                <div class="col-lg-8 col-md-7">
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
                            <p class="text-muted mb-2"><i class="mdi mdi-clock-outline mr-2"></i>${dateView}</p>
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
                    </div>     
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
                            <h6 class="text-muted mb-0">Experience</h6>
                            <h6 class="text-black-50 pt-2 mb-0">1 To 3 Years Exp.</h6>
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
                            <h6 class="text-black-50 pt-2 mb-0">${dateView}</h6>
                        </div>
                    </div>

                    <div class="single-post-item mb-4">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-email text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Email</h6>
                            <h6 class="text-black-50 pt-2 mb-0">${jobDetails.userBusiness.user.email}</h6>
                        </div>
                    </div>

                    <div class="single-post-item">
                        <div class="float-left mr-3">
                            <i class="mdi mdi-phone-classic text-muted mdi-24px"></i>
                        </div>
                        <div class="overview-details">
                            <h6 class="text-muted mb-0">Contact No</h6>
                            <h6 class="text-black-50 pt-2 mb-0">+${jobDetails.userBusiness.user.phone}</h6>
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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569" class="rounded" style="border: 0" allowfullscreen=""></iframe>
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
`;
            if (job_user_id != current_user_id) {
                itemTempHtml += `<div class="job-detail border rounded mt-4" >
                    <button class="btn btn-primary btn-block"data-toggle="modal" data-target="#exampleModal">Apply For Job</button>
                            </div>
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
                                <form>
                                    <div class="form-group">
                                        <label class="col-form-label">Amount:</label>
                                        <input type="text" class="form-control" id="amount">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label">Message:</label>
                                        <textarea class="form-control" id="description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="apply-proposal">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }


            itemTempHtml += `</div>
            </div>`
            ;
            $('#job-description').html(itemTempHtml);
            let arrSkill = jobDetails.otherSkills
            let skillTemp = '';
            let temp = '';
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

});




