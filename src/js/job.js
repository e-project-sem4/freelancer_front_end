$(document).ready(function () {
   $('#searchKey').on("click",function (event){
       const  search = $("#exampleInputName1").val();
       const url = baseUrl + `/api/v1/job/search/1/10?keysearch=${search}`;
       const token = localStorage.getItem('access-token')
       $.ajax({
           type: 'GET',
           url: url,
           contentType: "application/json; charset=utf-8",
           beforeSend: function (xhr) {
               xhr.setRequestHeader(
                   "Authorization", token
               );
           },
           // data: JSON.stringify(search),
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
                                    <div class="row align-items-e">
                                        
                                        <div class="col-lg-9 col-md-10">
                                            <div class="job-list-desc">
                                                <h4 class="mb-2"><a href="#" class="text-dark">Name job</a></h4>
                                             
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item mr-3">
                                                        <p class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                    </li>

                                                    <li class="list-inline-item mr-3">
                                                        <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Level: ${jobList[i].complexity.complexityText}</p>
                                                    </li>`;
                   itemTempHtml += `<li class="list-inline-item mr-3">
                                                        <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Skill main:`;

                   let listSkill = '';
                   for (let j = 0; j < jobList[i].otherSkills.length; j++) {
                       listSkill +=  jobList[i].otherSkills[j].skill.skillName+', ';
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
                        </div>`

                   itemHtml+=itemTempHtml

               }
               $('#job-list').html(itemHtml)
           },

       });
       event.preventDefault()
   })
})


