var pageSize = 10;
var page = 1;
var totalPage = 0;
<<<<<<< HEAD
$(".btn-prev").on("click", function () {
    if (page > 0) {
        page--;
        loadAllJob($("#exampleInputName1").val(), page, (pageSize = 10));
    }
});
$(".btn-next").on("click", function () {
    if (page * pageSize < totalPage) {
        page++;
        loadAllJob($("#exampleInputName1").val(), page, (pageSize = 10));
    }
});

$("#search-key").on("click", function (event) {
    let search = $("#exampleInputName1").val();
    loadAllJob(search, page, pageSize);
    event.preventDefault();
});

$(document).ready(function () {
    loadAllJob("", page, pageSize);
    loadAllSkill();
    loadAllComplexity();
});

function loadAllJob(searchKey, page, pageSize) {
    const url =
        baseUrl +
        `/api/v1/job/search?page=${page}&size=${pageSize}&sort=0&keySearch=${searchKey}&skill`;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const jobList = res.result;
            totalPage = res.total;
            let itemHtml = "";
            let itemTempHtml = "";
            for (let i = 0; i < jobList.length; i++) {
                itemTempHtml = `<div class="col-lg-12 mt-4 pt-2">
=======
var complexity = "";
var suitableJob = "";
var PaymentStatus = 1;
var search = "";
var sort = 0;
var skill = "";
var start = page * pageSize - pageSize + 1;
var end = pageSize * page;

$(document).ready(function () {
  loadAllJob(search, page, pageSize, sort, complexity, skill,PaymentStatus);
  loadAllSkill();
  loadAllComplexity();
  $('#totalResult').html(`${start}-${end}`)
  if (localStorage.getItem('user-info')){
    loadSuitableJob();
  }
  
});

function loadAllJob(searchKey, page, pageSize, sort, complexity,skill,PaymentStatus) {
  const url =

      baseUrl +
      `/api/v1/job/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${searchKey}&complexity_id=${complexity}&skill_id=${skill}&isPaymentStatus=${PaymentStatus}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const jobList = res.result;
      totalPage = res.total;
      let itemHtml = "";
      let itemTempHtml = "";
      for (let i = 0; i < jobList.length; i++) {
        
        if( jobList[i].status == 1 || jobList[i].status == 2 ) {
          var d = new Date(jobList[i].createAt).toLocaleDateString();
        
        itemTempHtml = `<div class="col-lg-12 mt-4 pt-2">
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
                                   <div class="job-list-box border rounded">
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
<<<<<<< HEAD
                                                                             <ul class="list-inline mb-0">
                                                                                  <li class="list-inline-item mr-3">
                                                                                              <p id="limit" class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                                        </li>

                                                                                   <li class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                     </li>`;
                itemTempHtml += `<li class="list-inline-item mr-3">
=======
                                                                             <ul class="list-inline mb-0">  
                                                                             <div class="list-inline-item mr-3">
                                                                             <p  class="text-break limit"><i class="mdi mdi-animation mr-2" ></i>Description:</p>
                                                                             <span style="max-width: 100px;
                                                                             word-break: break-all;">${jobList[i].description}</span>
                                                                       </div>                                                                                
                                                                                   <div class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                     </div>
                                                                                     <div class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-currency-usd mr-2"></i>Payment : ${jobList[i].paymentAmount} $</p>
                                                                                     </div>
                                                                                     <div class="list-inline-item mr-3">
                                                                                     <p class="text-break mb-0"><i class="mdi mdi-calendar-text mr-2"></i>Date : ${d}</p>
                                                                         </div>`;
        itemTempHtml += `<li class="list-inline-item mr-3">
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
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
<<<<<<< HEAD
                                <div class="col-lg-3 col-md-3">
                    <div class="job-list-button-sm text-right">                     
                        <div class="mt-3">
                            <a href="/job-details?id=${jobList[i].id}" type="button" class="btn btn-sm btn-primary" id="detail-job">Detail</a>
=======
            
                <div class="col-lg-3 col-md-3">
                    <div class="job-list-button-sm text-right">
                        <div class="candidates-listing-btn mt-4">
                           <a href="/job-details?id=${jobList[i].id}" class="btn btn-primary-outline btn-sm">Detail</a>
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
                        </div>
                    </div>
                </div>
                               
                                       
                                    </div>
                                </div>
                            </div>
                        </div>`;

<<<<<<< HEAD
                itemHtml += itemTempHtml;
            }
            $("#job-list").html(itemHtml);
        },
    });
}

function loadAllSkill() {
    const url = baseUrl + `/api/v1/skills/search?status=1`;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const SkillList = res.result;
            let itemHtml = "";
            let itemTempHtml = "";
            for (let i = 0; i < SkillList.length; i++) {
                itemTempHtml = `<div class="custom-control custom-checkbox">
                                            <input type="checkbox" value="${SkillList[i].id}"  id="customCheckbox${i}"  name="customCheckbox" class="custom-control-input">
=======
        itemHtml += itemTempHtml;

        }
            
        
      }
      $("#job-list").html(itemHtml);
    },
  });
}

function loadAllSkill() {
  const url = baseUrl + `/api/v1/skills/search?status=1`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const SkillList = res.result;
      let itemHtml = "";
      let itemTempHtml = "";
      for (let i = 0; i < SkillList.length; i++) {
        itemTempHtml = `<div id = "select-skill" class="custom-control custom-checkbox">
                                            <input type="checkbox" value="${SkillList[i].id}"  id="customCheckbox${i}" onclick="changeSkill()"  name="customCheckbox" class="custom-control-input checkbox-d">
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
                                            <label id="CheckboxSkills" class="custom-control-label ml-1 text-muted f-15" for="customCheckbox${i}">${SkillList[i].skillName}</label>
                                        </div>`;
                itemHtml += itemTempHtml;
            }
            $("#skillsList").html(itemHtml);
        },
    });
}
function loadAllComplexity() {
<<<<<<< HEAD
    const url = baseUrl + `/api/v1/complexities/search?status=1`;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const ComplexityList = res.result;
            let itemHtml = "";
            let itemTempHtml = "";
            for (let i = 0; i < ComplexityList.length; i++) {
                itemTempHtml = `<div class="custom-control custom-radio">
                                            <input type="radio" id="customRadio${i}" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label ml-1 text-muted f-15" for="customRadio${i}">${ComplexityList[i].complexityText}</label>
                                        </div>`;
                itemHtml += itemTempHtml;
            }
            $("#LevelsList").html(itemHtml);
        },
    });
}

=======
  const url = baseUrl + `/api/v1/complexities/search?status=1`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const ComplexityList = res.result;
      let itemHtml = "";
      let itemTempHtml = "";
      
      for (let i = 0; i < ComplexityList.length; i++) {
        itemTempHtml = `<div class="custom-control custom-radio">
                                            <input type="radio" id="customRadio${i}" onclick="changeComplexity(${ComplexityList[i].id})" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label ml-1 text-muted f-15" for="customRadio${i}">${ComplexityList[i].complexityText}</label>
                                        </div>`;
        itemHtml += itemTempHtml;
      }

      $("#LevelsList").html(itemHtml);
      $("#LevelsList").append(`<div class="custom-control custom-radio">
      <input type="radio" id="customRadio" onclick="changeComplexity(null)" name="customRadio" class="custom-control-input">
      <label class="custom-control-label ml-1 text-muted f-15" for="customRadio">All</label>
  </div>`);
    },
  });
}

function loadSuitableJob() {
  const url = baseUrl + `/api/v1/job/suitable`;
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
      
      const suitableList = res.result;
      
      let itemHtml = "";
      let itemTempHtml = "";
      for (let i = 0; i < suitableList.length; i++) {
        itemTempHtml = `<div id = "select-skill" class="custom-control custom-checkbox">
                                            <input type="checkbox" value="${suitableList[i].otherSkills.skill_id}"  id="customCheckbox${i}" onclick="changeSuitableJob()"  name="customCheckbox" class="custom-control-input checkbox-d">
                                            <label id="CheckboxSkills" class="custom-control-label ml-1 text-muted f-15" for="customCheckbox${i}">${suitableList[i].otherSkills.skill.skillName}</label>
                                        </div>`;
        itemHtml += itemTempHtml;
      }
      $("#suitableList").html(itemHtml);
    },
  });
}

$("#search-key").on("click", function (event) {
  search = $("#exampleInputName1").val();
  loadAllJob(search, page, pageSize, sort, complexity,skill,PaymentStatus);
  event.preventDefault();
});

function changePage() {
  page = 1;
  pageSize = $("#dropdown-page").val();
  start = page * pageSize - pageSize + 1;
  end = pageSize * page;
  $('#totalResult').html(`${start}-${end}`)
  loadAllJob(search, page, pageSize, sort, complexity,skill,PaymentStatus);
}

function changeComplexity(data) { 
  complexity = data;
  if (data === null) {
    complexity = "";
  }
  loadAllJob(search, page, pageSize, sort, complexity,skill,PaymentStatus);
}
function changeSuitableJob() {
  const arrSkill = [...document.querySelectorAll(".checkbox-d")].filter(x => x.checked === true).map(e => +e.value).join(",");
  loadAllJob(search, page, pageSize, sort, complexity,arrSkill,PaymentStatus)
}
function changeSort() {
  page = 1;
  sort = $('#dropdown-sort').val();
  loadAllJob(search, page, pageSize, sort, complexity,skill,PaymentStatus);

}

function changeSkill() {
  const arrSkill = [...document.querySelectorAll(".checkbox-d")].filter(x => x.checked === true).map(e => +e.value).join(",");
  loadAllJob(search, page, pageSize, sort, complexity,arrSkill,PaymentStatus)
}
$(".btn-prev").on("click", function () {
  if (page > 0) {
    page--;
    start = page * pageSize - pageSize + 1;
    end = pageSize * page;
    $('#totalResult').html(`${start}-${end}`)
    loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity,skill,PaymentStatus);
  }
});
$(".btn-next").on("click", function () {
  if (page * pageSize < totalPage) {
    page++;
    start = page * pageSize - pageSize + 1;
    end = pageSize * page;
    $('#totalResult').html(`${start}-${end}`)

    loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity,skill,PaymentStatus);
  }
});
>>>>>>> ed628eba37dcfac6079f0931c893c61fc21f924f
