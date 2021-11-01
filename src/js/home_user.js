var pageSize = 7;
var page = 1;
var PaymentStatus = 1;
var sort = 3;

$(document).ready(function () {
    loadHomePage();
    loadHotJob(page,pageSize,sort,PaymentStatus)
});

function loadHomePage() {
    const url = baseUrl + "/api/v1/admin/dashboard";
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {         
            itemTempHtml1 = `
            
                <div class="col-lg-4 col-md-6 mt-4 pt-2">
                    <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-account d-inline-block rounded-pill h3 text-primary"></i>
                            
                            
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Freelancer</h5>
                                <p class="text-success mb-0 rounded">${res[2]}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-4 col-md-6 mt-4 pt-2">
                    <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                        
                            <i  class="mdi mdi-account-card-details d-inline-block rounded-pill h3 text-primary"></i>
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Business</h5>
                                <p class="text-success mb-0 rounded">${res[3]}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-4 col-md-6 mt-4 pt-2">
                <a >
                        <div class="popu-category-box bg-light rounded text-center p-4">
                            <div class="popu-category-icon mb-3">
                            <i class="mdi mdi-bank d-inline-block rounded-pill h3 text-primary"></i>
                            </div>
                            <div class="popu-category-content">
                                <h5 class="mb-2 text-dark title">Job</h5>
                                <p class="text-success mb-0 rounded">${res[4]}</p>
                            </div>
                        </div>
                        </a>
                </div>
            `
            $("#list_Home").html(itemTempHtml1);
            
        }
    })
}

function loadHotJob(page,pageSize,sort,PaymentStatus) {
    const url =
        baseUrl +
        `/api/v1/job/search?page=${page}&size=${pageSize}&sort=${sort}&isPaymentStatus=${PaymentStatus}`;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            async: false,
            success: function (res) {
              const jobList = res.result;
              totalPage = res.total;
              let itemHtml2 = "";
              let itemTempHtml2 = "";
              for (let i = 0; i < jobList.length; i++) {
                if( jobList[i].status == 1 || jobList[i].status == 2 ) {
                  var d = new Date(jobList[i].createAt).toLocaleDateString();
                  itemTempHtml2 = `
                  <div class="col-lg-12">
                  <div
                       class="job-box bg-white overflow-hidden border rounded mt-4 position-relative overflow-hidden">
                       <div class="lable text-center pt-2 pb-2">
                           <ul class="list-unstyled best text-white mb-0 text-uppercase">
                               <li class="list-inline-item"><i class="mdi mdi-star"></i></li>
                           </ul>
                       </div>
                       <div class="p-4">
                           <div class="row align-items-center">
                               <div class="col-md-2">
                                   <div class="mo-mb-2">
                                       <img src="images/featured-job/img-1.png" alt=""
                                           class="img-fluid mx-auto d-block">
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div>
                                   <h5 class="mb-2"><a href="/job-details?id=${jobList[i].id}" class=" text-dark">${jobList[i].name}</a></h5>
                                       </h5>
                                       <p class="text-muted mb-0 limit" >${jobList[i].description}</p>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div>
                                       <p class="text-muted mb-0"><i
                                               class="mdi mdi-map-marker text-primary mr-2"></i>${jobList[i].userBusiness.location}</p>
                                   </div>
                               </div>
                               <div class="col-md-2">
                                   <div>
                                       <p class="text-muted mb-0 mo-mb-2"><span
                                               class="text-primary">$${jobList[i].paymentAmount}</span> </p>
                                   </div>
                               </div>
                               
                           </div>
                       </div>
                       <div class="p-3 bg-light">
                           <div class="row">
                               <div class="col-md-10">
                                   <div>
                                      `;                                 
                                               itemTempHtml2 += `<li class="list-inline-item mr-3">
                                                                                                <p class="text-break mb-0">
                                                                                                <i class="mdi mdi-arrow-decision mr-2"></i>Skill main: `;
                                               let listSkill = "";
                                               for (let j = 0; j < jobList[i].otherSkills.length; j++) {
                                                 listSkill += jobList[i].otherSkills[j].skill?.skillName + ", ";
                                               }
                                               listSkill = listSkill.substring(0, listSkill.length - 2);
                                               itemTempHtml2 += listSkill;                                             
                               itemTempHtml2 +=`</p>
                                   </div>
                               </div>
                               <div class="col-md-2 ">
                                   <div>                                 
                                       <a href="/job-details?id=${jobList[i].id}" class="text-primary text-left">Apply Now <i
                                               class="mdi mdi-chevron-double-right"></i></a>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>`
               itemHtml2 += itemTempHtml2;
                }
                
            }
            $("#hotJob").html(itemHtml2);
            
        }
        })
}