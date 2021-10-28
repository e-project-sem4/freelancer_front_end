var pageSize = 10;
var page = 1;
var totalPage = 0;
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
                                                                             <ul class="list-inline mb-0">
                                                                                  <li class="list-inline-item mr-3">
                                                                                              <p id="limit" class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                                        </li>

                                                                                   <li class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                     </li>`;
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
                    <div class="job-list-button-sm text-right">                     
                        <div class="mt-3">
                            <a href="/job-details?id=${jobList[i].id}" type="button" class="btn btn-sm btn-primary" id="detail-job">Detail</a>
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
                                            <label id="CheckboxSkills" class="custom-control-label ml-1 text-muted f-15" for="customCheckbox${i}">${SkillList[i].skillName}</label>
                                        </div>`;
                itemHtml += itemTempHtml;
            }
            $("#skillsList").html(itemHtml);
        },
    });
}
function loadAllComplexity() {
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

