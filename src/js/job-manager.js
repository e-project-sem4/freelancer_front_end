// var pageSize = 10;
// var page = 1;
// var totalPage = 0;
// var complexity = "";
// var search = "";
// var sort = 0;
// var skill = "";
// var start = page * pageSize - pageSize + 1;
// var end = pageSize * page;
// $('.JobModal').on('hidden.bs.modal', function () {
      
//   $('.js-example-basic-multiple').val(null);
// });

$(document).ready(function () {
  loadAllJobJobmn();
  CKEDITOR.editorConfig = function( config ) {
    config.language = 'en';  // Chọn ngôn ngữ
    config.uiColor = '#F7B42C'; // màu giao diện
    config.height = 300; 
    config.width = 500; 
    config.toolbarCanCollapse = true;
  };
  
  CKEDITOR.replace( 'descriptionJobmn' );

  $(document).ready(function () {
    
    $(".skillsJobmn").select2({
      placeholder: "Choose event type",
    });
    
    $(".update_job").on("click", function (event) {
      const job_id = $(this).val();
       jobName = $("#job_nameJobmn").val();
      const expectedDuration = $(".durationJobmn").val();
      const complexity = $(".complexityJobmn").val();
      const paymentAmount = $("#payment_amountJobmn").val();
      const otherSkill = $("js-example-basic-multiple")
        .select2("val")
        .map((item) => {
          return {
            skill_id: item,
          };
        });
      const description =$("#descriptionJobmn").val();
      const param = {
        job_id : job_id,
        name: jobName,
        expected_duration_id: expectedDuration,
        complexity_id: complexity,
        paymentAmount: paymentAmount,
        otherSkills: otherSkill,
        description: description,
      };
        console.log(otherSkill)    
    });
  }), jQuery(function () { });

  function getExpectedComplexityJobmn(e, idx) {
    $.ajax({
      type: "GET",
      url: baseUrl + "/api/v1/complexities/search?status=1",
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
        let dropdownListComplexity = res.result;
        let tempHtml = "";
        let tempHtmlDropdown = "";
        if (res) {
          for (let i = 0; i < dropdownListComplexity.length; i++) {
            tempHtml = `<option value=${dropdownListComplexity[i].id}>${dropdownListComplexity[i].complexityText}</option>`;
            tempHtmlDropdown += tempHtml;
          }
          $(".complexityJobmn").html(tempHtmlDropdown);
        }
      },
      error() {
        console.log("sai");
      },
    });
  }

  function complexitySelectJobmn() {
    return (value = $(".complexityJobmn").val());
  }

  function getExpectedDurationJobmn() {
    $.ajax({
      type: "GET",
      url: baseUrl + "/api/v1/durations/search?status=1",
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
        let dropdownListDuration = res.result;
        let tempHtml = "";
        let tempHtmlDropdown = "";
        if (res) {
          for (let i = 0; i < dropdownListDuration.length; i++) {
            tempHtml = `<option value=${dropdownListDuration[i].id}>${dropdownListDuration[i].durationText}</option>`;
            tempHtmlDropdown += tempHtml;
          }
          $(".durationJobmn").html(tempHtmlDropdown);
        }
      },
      error() {
        console.log("sai");
      },
    });
  }

  function durationSelectJobmn() {
    return (value = $(".expected_durationJobmn").val());
  }

  function getJobSkillJobmn() {
    $.ajax({
      type: "GET",
      url: baseUrl + "/api/v1/skills/search?status=1",
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
        let dropdownListSkill = res.result;
        let tempHtml = "";
        let tempHtmlDropdown = "";
        if (res) {
          for (let i = 0; i < dropdownListSkill.length; i++) {
            tempHtml = `<option value=${dropdownListSkill[i].id}>${dropdownListSkill[i].skillName}</option>`;
            tempHtmlDropdown += tempHtml;
          }
          $(".skillsJobmn").html(tempHtmlDropdown);
        }
      },
      error() {
        console.log("sai");
      },
    });
  }
  getExpectedComplexityJobmn();
  getExpectedDurationJobmn();
  getJobSkillJobmn();
});

function loadAllJobJobmn() {  
  const url = baseUrl + `/api/v1/users/viewprofile`;
  const token = localStorage.getItem('access-token')
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization", token
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      const ProfileList = res.result;
      const jobList = ProfileList.business?.listJob;
      //   totalPage = res.total;
      let itemHtml = "";
      let itemTempHtml = "";

      for (let i = 0; i < jobList.length; i++) {
        var d = new Date(jobList[i].createAt).toLocaleDateString();
          itemTempHtml = `<div class="col-lg-12 mt-4 pt-2">
                                    <div class="job-box bg-white overflow-hidden border rounded position-relative overflow-hidden">
                                        <div class="p-3">                           
                                            <div class="row align-items-center">                                 
                                                <div class="col-lg-2">
                                                  <div class="company-logo-img">
                                                    <img src="images/featured-job/img-1.png" alt="" class="img-fluid mx-auto d-block">
                                                  </div>
                                                </div>                               
                                                    <div class="col-lg-7 col-md-9">
                                                            <div class="job-list-desc">
                                                                        <h4 class="mb-2"><a href="/job-details?id=${jobList[i].id}" class="text-dark">${jobList[i].name}</a></h4>
                                                                              <ul class="list-inline mb-0">
                                                                                    <div class="list-inline-item mr-3">
                                                                                                <p id="limit" class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                                          </div>

                                                                                    <div class="list-inline-item mr-3">
                                                                                                  <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                      </div>
                                                                                      <div class="list-inline-item mr-3">
                                                                                                  <p class="text-break mb-0"><i class="mdi mdi-currency-usd mr-2"></i>Payment : ${jobList[i].paymentAmount}</p>
                                                                                      </div>
                                                                                      <div class="list-inline-item mr-3">
                                                                                      <p class="text-break mb-0"><i class="mdi mdi-calendar-text mr-2"></i>Date : ${d}</p>
                                                                          </div>`;
          itemTempHtml += `<li class="list-inline-item mr-3">
                                                          <p class="text-break mb-0">
                                                          <i class="mdi mdi-arrow-decision mr-2"></i>Skill main:`;
          let listSkill = "";
          for (let j = 0; j < jobList[i].otherSkills.length; j++) {
            listSkill += jobList[i].otherSkills[j].skill?.skillName + ", ";
          }
          listSkill = listSkill.substring(0, listSkill.length - 2);
          itemTempHtml += listSkill;
          itemTempHtml += `</p>
                                                      </li>
                                                  </ul>
                                                  
                                              </div>
                                              </div>
                                              <div class="col-lg-3 col-md-3">
                                              <div class="job-list-button-sm ">                     
                                                  <div class="mt-3">
                                                      <a href="/job-details?id=${jobList[i].id}" type="button" class="btn btn-sm btn-primary-outline"style="
                                                      width: 100px;" id="detail-job">Detail</a>
                                                  </div>
                                                  <div class="mt-3">
                                                  <button type="button"class="btn btn-sm btn-primary-outline" style="width: 100px;"  data-toggle="modal" data-target="#exampleModal${[i]}">
                                                  Edit 
                                                  </button>
                                      
                                                  <div class="modal fade JobModal" id="exampleModal${[i]}"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                  <div class="modal-dialog" role="document">
                                                    <div class="modal-content" style="margin-left: -270px; width: 200%">
                                                      <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Edit Job</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">&times;</span>
                                                        </button>
                                                      </div>
                                                      <div class="modal-body">
                                                          <div class="row justify-content-center">
                                                              <div class="col-lg-10">
                                                                  
                                                                      <div class="custom-form">
                                                                          <div id="message3"></div>
                                                                        
                                                                              
                                                                              <div class="row">
                                                                                  <div class="col-md-12">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Job name</label>
                                                                                          <input id="job_nameJobmn" type="text" class="form-control resume" value="${jobList[i].name}" >
                                                                                          
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                  
                                                                              <div class="row">
                                                                                  <div class="col-md-6">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Job Expected Duration</label>
                                                                                          <div class="form-button">
                                                                                              <select class="durationJobmn" onchange="durationSelectJobmn()" val= id="expected_durationJobmn"></select>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                                  <div class="col-md-6">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Job Complexity</label>
                                                                                          <div class="form-button">
                                                                                              <select class="complexityJobmn" onchange="complexitySelectJobmn()" id="complexityJobmn">
                                                  
                                                                                              </select>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              <div class="row">
                                                                                  <div class="col-md-6">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Payment Amount</label>
                                                                                          <input id="payment_amountJobmn" type="text" value= "${jobList[i].paymentAmount}"  class="form-control resume" >
                                                                                          
                                                                                      </div>
                                                                                  </div>
                                                                                  <div class="col-md-6">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Job Skill</label>
                                                                                          <div class="form-button">
                                                                                              <select  class="js-example-basic-multiple skillsJobmn" name="states[]" multiple="multiple">
                                                  
                                                                                              </select>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                  
                                                                              <div class="row">
                                                                                  <div class="col-md-12">
                                                                                      <div class="form-group app-label mt-2">
                                                                                          <label class="text-muted">Job Description</label>
                                                                                          <textarea id="descriptionJobmn" rows="6" class="form-control resume" placeholder="">${jobList[i].description}</textarea>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              
                                                                        
                                                                          
                                                                      </div>
                                                                  
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary update_job" value="${jobList[i].id}" >Save changes</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                  
                                                                    
                                              </div>
                                              <div class="mt-3">
                                              <a href="/job-details?id=${jobList[i].id}" type="button" id="btndelete" class="btn btn-sm btn-danger-outline"style="
                                              width: 100px;" id="detail-job">Delete</a>
                                          </div>
                                              </div>
                                              </div>
                      </div>
                  </div>                                     
                                      </div>
                                  </div>
                              </div>
                          </div>`;

        itemHtml += itemTempHtml;
      }
      $("#job-list").html(itemHtml);
    },
  });
}


