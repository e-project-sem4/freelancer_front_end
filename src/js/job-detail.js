$(document).ready(function () {
    const url = baseUrl + `/api/v1/job/1`;
    debugger;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const jobDetails = res.result;
            var date = timeConverter(jobDetails.updateAt);
            let itemTempHtml =
                `<div class="row" id="job-description">
                <div class="col-lg-8 col-md-7">
                    <div class="job-detail border rounded p-4">
                        <div class="job-detail-content">
                            <img src="images/featured-job/img-4.png" alt="" class="img-fluid float-left mr-md-3 mr-2 mx-auto d-block">
                            <div class="job-detail-com-desc overflow-hidden d-block">
                                <h4 class="mb-2"><a class="job-name text-dark">${jobDetails.name}</a></h4>
                                <h4 class="mb-2"><a class="job-name text-dark">${jobDetails.name}</a></h4>
                                <p class="text-muted mb-0"><i class="mdi mdi-link-variant mr-2"></i>Freelancers</p>
                                <p class="text-muted mb-0"><i class="mdi mdi-clock-outline mr-2"></i>${date}</p>
                            </div>
                        </div>
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
                            <h5 class="text-dark mt-4">Skill Responsibilities :</h5>
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
                    <div class="job-detail border rounded p-4">
                        <h5 class="text-muted text-center pb-2"><i class="mdi mdi-account"></i>Hidden User</h5>

                        <div class="job-detail-location pt-4 border-top">
                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-bank text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: Web Themes.pvt.Ltd</p>
                            </div>

                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-email text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: Webthemescom@gmail.com</p>
                            </div>

                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-web text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: https://www.WebThemes.com</p>
                            </div>

                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-cellphone-iphone text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: 1987 6543 21</p>
                            </div>

                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-currency-usd text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: ${jobDetails.paymentAmount} </p>
                            </div>

                            <div class="">
                                <div class="float-left mr-2">
                                    <i class="mdi mdi-security text-muted"></i>
                                </div>
                                <p class="text-muted mb-2">: 1 To 3 Years.</p>
                            </div>


                            <h6 class="text-dark f-17 mt-3 mb-0">Share Job :</h6>
                            <ul class="social-icon list-inline mt-3 mb-0">
                                <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-facebook"></i></a></li>
                                <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-google-plus"></i></a></li>
                                <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-whatsapp"></i></a></li>
                                <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-linkedin"></i></a></li>
                            </ul>
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

                    <div class="job-detail border rounded mt-4">
                        <a href="#" class="btn btn-primary btn-block">Apply For Job</a>
                    </div>
                </div>
            </div>`;
            $('#job-description').html(itemTempHtml);
            let arrSkill = jobDetails.otherSkills
            let skillTemp = '';
            let temp = '';
            for (i = 0; i < arrSkill.length;i++){

                temp = `  <div class="">
  
                                                   <div class="">
                                                   <p class="text-muted mb-2"><i class="mdi mdi-send text-primary">${arrSkill[i].skill?.skillName}</i></p> 
                                                   </div>
                                            
                          </div>`
                skillTemp +=temp
            }
            $('.job-details-desc-item').html(skillTemp)
        }
    })

});
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
    }

