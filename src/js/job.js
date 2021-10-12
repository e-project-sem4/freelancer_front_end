$(document).ready(function () {
    $('#searchKey').on("click", function (event) {
        const search = $("#exampleInputName1").val();
        const url = baseUrl + `/api/v1/job/search/1/10?keysearch=${search}`;
        const token = localStorage.getItem('access-token')
        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            async: false,
            success: function (res) {
                const jobList = res.result;
                let itemHtml = ""
                let itemTempHtml = ""
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
                                                                      <h4 class="mb-2"><a href="#" class="text-dark">${jobList[i].name}</a></h4>
                                                                             <ul class="list-inline mb-0">
                                                                                  <li class="list-inline-item mr-3">
                                                                                              <p id="limit"  class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                                        </li>

                                                                                   <li class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                     </li>`;
                    itemTempHtml += `<li class="list-inline-item mr-3">
                                                         <p class="text-break mb-0">
                                                         <i class="mdi mdi-alpha-v mr-2"></i>Skill main:`;

                    let listSkill = '';
                    for (let j = 0; j < jobList[i].otherSkills.length; j++) {
                        listSkill += jobList[i].otherSkills[j].skill.skillName + ', ';
                    }
                    listSkill = listSkill.substring(0, listSkill.length - 2);
                    itemTempHtml += listSkill;
                    itemTempHtml += `</p>
                                                    </li>
                                                </ul>
                                                
                                            </div>
                                            </div>
                                        
                                       
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    itemHtml += itemTempHtml
                }
                $('#job-list').html(itemHtml)
            },

        });
        event.preventDefault()
    })
    $('#SearchSkillAndComplexity').on("click", function (event) {
        const search = $("#customCheckbox[]").val();
        const url = baseUrl + `/api/v1/job/search/1/10?keysearch=${search}`;
        const token = localStorage.getItem('access-token')
        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            async: false,
            success: function (res) {
                const jobList = res.result;
                let itemHtml = ""
                let itemTempHtml = ""
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
                                                                      <h4 class="mb-2"><a href="#" class="text-dark">${jobList[i].name}</a></h4>
                                                                             <ul class="list-inline mb-0">
                                                                                  <li class="list-inline-item mr-3">
                                                                                              <p id="limit"  class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                                        </li>

                                                                                   <li class="list-inline-item mr-3">
                                                                                                 <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                                                     </li>`;
                    itemTempHtml += `<li class="list-inline-item mr-3">
                                                         <p class="text-break mb-0">
                                                         <i class="mdi mdi-alpha-v mr-2"></i>Skill main:`;

                    let listSkill = '';
                    for (let j = 0; j < jobList[i].otherSkills.length; j++) {
                        listSkill += jobList[i].otherSkills[j].skill.skillName + ', ';
                    }
                    listSkill = listSkill.substring(0, listSkill.length - 2);
                    itemTempHtml += listSkill;
                    itemTempHtml += `</p>
                                                    </li>
                                                </ul>
                                                
                                            </div>
                                            </div>
                                        
                                       
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    itemHtml += itemTempHtml
                }
                $('#job-list').html(itemHtml)
            },

        });
        event.preventDefault()
    });
})

$(function loadAllJob() {
    const url = baseUrl + `/api/v1/job/search/1/10?keysearch=`;
    // const token = localStorage.getItem('access-token')
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const jobList = res.result;
            let itemHtml = ""
            let itemTempHtml = ""
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
                                                                      <h4 class="mb-2"><a href="#" class="text-dark">${jobList[i].name}</a></h4>
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
                let listSkill = '';
                for (let j = 0; j < jobList[i].otherSkills.length; j++) {
                    listSkill += jobList[i].otherSkills[j].skill.skillName + ', ';
                }
                listSkill = listSkill.substring(0, listSkill.length - 2);
                itemTempHtml += listSkill;
                itemTempHtml += `</p>
                                                    </li>
                                                </ul>
                                                
                                            </div>
                                            </div>
                                        
                                       
                                    </div>
                                </div>
                            </div>
                        </div>`;

                itemHtml += itemTempHtml
            }
            $('#job-list').html(itemHtml)
        },
    })
});
$(function loadAllSkill() {
    const url = baseUrl + `/api/v1/skills`;
    // const token = localStorage.getItem('access-token')
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const SkillList = res.result;
            let itemHtml = ""
            let itemTempHtml = ""
            for (let i = 0; i < SkillList.length; i++) {

                itemTempHtml=`<div class="custom-control custom-checkbox">
                                            <input type="checkbox" value="${SkillList[i].id}"  id="customCheckbox${i}"  name="customCheckbox" class="custom-control-input">
                                            <label id="CheckboxSkills" class="custom-control-label ml-1 text-muted f-15" for="customCheckbox${i}">${SkillList[i].skillName}</label>
                                        </div>`;
              // console.log(SkillList[i].skillName)
                itemHtml += itemTempHtml
            }
            $('#skillsList').html(itemHtml)
            // $('.custom-control-input').is(":checked")(function (){
            //        console.log("checked")
            // })
        }
    })
});
$(function loadAllComplexity() {
    const url = baseUrl + `/api/v1/complexities`;
    // const token = localStorage.getItem('access-token')
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const ComplexityList= res.result;
            let itemHtml = ""
            let itemTempHtml = ""
            for (let i = 0; i < ComplexityList.length; i++) {
                itemTempHtml=`<div class="custom-control custom-radio">
                                            <input type="radio" id="customRadio${i}" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label ml-1 text-muted f-15" for="customRadio${i}">${ComplexityList[i].complexityText}</label>
                                        </div>`;
                // console.log(SkillList[i].skillName)
                itemHtml += itemTempHtml
            }
            $('#LevelsList').html(itemHtml)
        }
    })
});
