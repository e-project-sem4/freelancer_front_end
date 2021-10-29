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

var name_job;
var complexityId_job;
var expectedDurationId_job;
var otherSkill;
var payAmount;
var description_job;
var $skillsControl;
var currentIdSelected = -1;

$(document).ready(function () {
  loadAllJobJobmn();
  toastr.options.timeOut=5000;
  toastr.options.fadeIn = 0;
  toastr.options.positionClass = "toast-top-left";
  $skillsControl = $(".skillsJobmn").select2();
  CKEDITOR.editorConfig = function (config) {
    config.language = 'en';  // Chọn ngôn ngữ
    config.uiColor = '#F7B42C'; // màu giao diện
    config.height = 300;
    config.width = 500;
    config.toolbarCanCollapse = true;
  };
  CKEDITOR.replace('descriptionJobmn');
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
function updateJob(index) {
  const job_id = this.currentIdSelected;
  const name_job = $(".job_nameJobmn").val();
  const expectedDurationId_job = $(".durationJobmn").val();
  const complexityId_job = $(".complexityJobmn").val();
  const payAmount = $(".payment_amountJobmn").val();
  const otherSkill = $skillsControl.val().map(item =>{
    return {
      skill_id: item,
    };
  });
  const description_job = CKEDITOR.instances.descriptionJobmn.getData();
  const param = {    
    name: name_job,
    expected_duration_id: expectedDurationId_job,
    complexity_id: complexityId_job,
    paymentAmount: payAmount,
    otherSkills: otherSkill,
    description: description_job,
  };
  
  const url = baseUrl + `/api/v1/job/${job_id}`;
  const token = localStorage.getItem('access-token')
  $.ajax({
    type: "PATCH",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization", token
      );
    },
    dataType: "JSON",
    data: JSON.stringify(param),
    async: false,
    success: function (res) {
      if(res && res.status == '0' ){
        toastr.success('Edit Job Completed!');
        setTimeout(loadAllJobJobmn(),1000)
      }
      if(res && res.status == '-1'){
        toastr.warning(res.message);
      }
    },
    error: function (xhr){
      if(xhr.status !== 200){
        toastr.error('Edit Job Failed!')
      }
    }
  })

}
var listSkills = [];
var listSkillChild = [];
var jobList = [];
 function  loadAllJobJobmn() {  
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
      jobList = ProfileList.business?.listJob;
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
                                                                                                <p class="text-muted mb-0 limit"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
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
                                                  <button type="button"class="btn btn-sm btn-primary-outline" style="width: 100px;" onClick="handleOpenModal(${jobList[i].id}, ${i})" data-toggle="modal" data-target="#exampleModal_x">
                                                  Edit 
                                                  </button>              
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
        listSkills=jobList[i].otherSkills
      }
      $("#job-list").html(itemHtml);
    },
  });
}



function handleOpenModal(id, i){
  currentIdSelected =id;
  $('.job_nameJobmn').val(jobList[i].name);
  $('.expected_durationJobmn').val(jobList[i].expected_duration_id);
  $('.complexityJobmn').val(jobList[i].complexity_id);
  $('.payment_amountJobmn').val(jobList[i].paymentAmount);
  let skills= jobList[i].otherSkills.map((e)=>{return e.skill_id + ''});
  $skillsControl.val(skills).trigger("change");
  $('.descriptionJobmn').val(jobList[i].description);
  CKEDITOR.instances.descriptionJobmn.setData( jobList[i].description );
}

