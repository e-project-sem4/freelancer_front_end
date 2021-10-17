var status = ``;
var id_freelancer = 0;
$(function load() {
    const url = baseUrl + `/api/v1/users/viewprofile`;
    const token = localStorage.getItem('access-token')
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr){
            xhr.setRequestHeader(
                "Authorization", token
            );
        },
        dataType: "JSON",
        async: false,    
        success: function (res) {         
                
            const ProfileList = res.result; 
            id_freelancer = ProfileList.freelancer.id;
            console.log("id_freelancer 1 : ",id_freelancer)
            let itemHtmlInfo = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" height="150" alt="" class="d-block mx-auto shadow rounded-pill mb-4">
            <h2 class="text-white mb-2">${ProfileList.user.fullName}</h5>              
            <p class="text-white-50 h5 mb-2">${ProfileList.freelancer.overview}</p>
            <p class="text-white-50 h5 mb-2">${ProfileList.freelancer.location}</p>
            <ul class="candidates-profile-icons list-inline mb-3">
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
            </ul>`;
        $('#InfoProfileList').html(itemHtmlInfo) 
            let itemHtmlProfile = `<div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        ${ProfileList.user.fullName}
                                    </h5>
                                    <h6>
                                    ${ProfileList.freelancer.overview}
                                    </h6>
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                    <button type="button" class="profile-edit-btn" data-toggle="modal" data-target="#exampleModal">
                    Edit Profile
                  </button>
                  
                  
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form class="needs-validation" novalidate>
                            <div class="form-group">
                              
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="${ProfileList.user.email}" >
                              <div class="invalid-feedback">

                              </div>
                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">FullName</label>
                              <input type="text" class="form-control" id="fullName" placeholder="${ProfileList.user.fullName}" >
                              <div class="invalid-feedback">
                                
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Phone</label>
                              <input type="tel" class="form-control" id="phone" placeholder="${ProfileList.user.phone}" >
                              <div class="invalid-feedback">
                                
                              </div>
                            </div>
                           
                            <button id="updateProfile" type="button" class="btn btn-primary">Update</button>
                          </form>
                        </div>
                        
                      </div>
                    </div>
                </div>
                </div>
            
                
                </div>
                <div class="row">
                    <div class="col-md-4">
                       
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row border-bottom mt-3">
                                            <div class="col-md-6">
                                                <label>Username :</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>${ProfileList.user.username}</p>
                                            </div>
                                        </div>
                                        <div class="row border-bottom mt-3">
                                            <div class="col-md-6">
                                                <label>Email :</label>
                                            </div>
                                            <div class="col-md-6 ">
                                                <p>${ProfileList.user?.email}</p>
                                            </div>
                                        </div>
                                        <div class="row border-bottom mt-3">
                                            <div class="col-md-6">
                                                <label>Phone :</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>${ProfileList.user?.phone}</p>
                                            </div>
                                        </div>
                                        <div class="row border-bottom mt-3" >
                                            <div class="col-md-6">
                                                <label>Address :</label>
                                            </div>
                                            <div class="col-md-6 ">
                                                <p>${ProfileList.freelancer.location}</p>
                                            </div>
                                        </div>
                                        <div class="row border-bottom mt-3" >
                                            <div class="col-md-6">
                                                <label>Company :</label>
                                            </div>
                                            <div class="col-md-6 ">
                                                <p>${ProfileList.business.location}</p>
                                            </div>
                                        </div>
                                        <div class="row border-bottom mt-5">
                                            <div class="col-md-6">
                                                <label>Balance :</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>${ProfileList.user.balance}$</p>
                                            </div>
                                        </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>           
        </div>  `;
        $('#profile').html(itemHtmlProfile) 
           let itemHtmlFreelancer ="";
           let itemHtmltempFreelancer ="";
            itemHtmltempFreelancer =`
            <div class="col-lg-12 mt-4 pt-2 pb-4 ">
            <div id="modal-freelancer" class="row" >
            <div class="col-md-2 offset-md-9">
            <button type="button" class="frelancer-edit-btn" data-toggle="modal"
                data-target="#EditFreelancerModal">
                Edit freelancer
            </button>
       
       
            <div class="modal fade" id="EditFreelancerModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Freelancer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="needs-validation" novalidate>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Location</label>
                                    <input type="text" class="form-control" id="location"
                                        aria-describedby="emailHelp"
                                        placeholder="${ProfileList.freelancer.location}">
                                    <div class="invalid-feedback">
       
                                    </div>
                                    <small id="emailHelp" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Overview</label>
                                    <input type="text" class="form-control" id="overview"
                                        placeholder="${ProfileList.freelancer.overview}">
                                    <div class="invalid-feedback">
       
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Certifications</label>
                                    <input type="text" class="form-control" id="certifications"
                                        placeholder="${ProfileList.freelancer.certifications}">
                                    <div class="invalid-feedback">
       
                                    </div>
                                </div>
       
                                <button id="updateFreelancer" type="button"
                                    class="btn btn-primary">Update</button>
                            </form>
                        </div>
       
                    </div>
                </div>
            </div>
        </div>
                            </div>
                                <h4 class="text-dark">Education :</h4>
                                <div id="CertificationsProfileList" class="row">
                                <div class="col-lg-4 col-md-6 mt-4 pt-5">
                                <div class="border rounded candidates-profile-education text-center text-muted">
                                    <div class="profile-education-icon border rounded-pill bg-white text-primary">
                                        <i class="mdi mdi-36px mdi-school"></i>
                                    </div>
                                    <h6 class="text-uppercase f-17"><a href="#" class="text-muted">${ProfileList.freelancer?.certifications}</a></h6>
                                    <p class="f-14 mb-1">May 2016 - April 2017</p>
                                    <p class="pb-3 mb-0">Diploma In Management Studies</p>
                                    
                                    <p class="pt-3 border-top mb-0">Suspendisse faucibus et pellentesque egestas lacus ante convallis.</p>
                                </div>
                            </div>
                                </div>

                            </div>
                            <div class="col-lg-12 mt-4 pt-2">
                                <h4 class="text-dark">Skills :</h4>
                                <div  class=" p-4">`;
                                let Listskill =""
                                Skills = ProfileList.freelancer?.hasSkills
                                for (let i = 0; i < Skills?.length; i++) {
                                   Listskill  += `
                                   <Button class="btn btn-light"># ${Skills[i].skill.skillName}</Button>
                                    `;                                                        
                                }  
                                itemHtmltempFreelancer += Listskill;
                                itemHtmltempFreelancer +=` 
                          </div>
                            </div>
                            <div class="col-lg-12 mt-4 pt-2">
                                <h4 class="text-dark">Rate Freelancer :</h4>
                                <div class="row">`
                                let ListProposals =""
                                proposals = ProfileList.freelancer.proposals
                                
                                for (let i = 0; i < proposals?.length; i++) {                                   
                                    ListProposals+=`<div class="col-md-6 mt-3 mt-md-0 pt-3">
                                                            
                                    <div class="border rounded job-list-box p-4">
                                        <div class="row">
                                        <div class="col-lg-3">
                                                <div class="company-brand-logo text-center mb-4">
                                                    <img src="images/featured-job/img-2.png" alt="" class="img-fluid mx-auto d-block">
                                                </div>
                                            </div>
                                            
                                           
                                            <div class="col-lg-9 ">
                                                <div class="job-list-desc candidates-profile-exp-desc">
                                                    <h5   class="f-19 mb-2"><a href="#"  class="text-dark"> ${proposals[i].jobName}</a></h5>           
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-tooltip"></i> Des: ${proposals[i].description}</h6>
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-message-processing"></i> Comment: ${proposals[i].clientComment}</h6>
                                                    <h6 class="text-dark mb-0 f-16"><i class="mdi mdi-star-circle"></i> Rate: ${proposals[i].clientGrade}</h6>
                                                    
                                                    ${proposals[i].proposal_status_catalog_id == 2 ? '<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status: InProgress' : proposals[i].proposal_status_catalog_id == 3 ? '<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status:Done':'<h6 class="text-dark mb-0 f-16"><i class="mdi mdi-alert"></i> Status:null'}

                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>                                 
                                </div>`;
                                
                                }      
                            itemHtmltempFreelancer += ListProposals;
                             itemHtmltempFreelancer+=`
                                </div>
                </div>`;         
           
                            itemHtmlFreelancer +=itemHtmltempFreelancer
                $('#Freelancer').html(itemHtmlFreelancer)




       //Business  
        let itemHtmlJob =""   
        let itemTempHtmlJob = ""      
        jobList = ProfileList.business?.listJob
        for (let i = 0; i < jobList?.length; i++) {
            itemTempHtmlJob = `<div class="col-lg-12 mt-4 pt-2">
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
                                                              itemTempHtmlJob += `<li class="list-inline-item mr-3">
                                  <p class="text-break mb-0">
                                  <i class="mdi mdi-arrow-decision mr-2"></i>Skill main:`;
let listSkill = "";
for (let j = 0; j < jobList[i].otherSkills.length; j++) {
listSkill += jobList[i].otherSkills[j].skill?.skillName + ", ";
}
listSkill = listSkill.substring(0, listSkill.length - 2);
itemTempHtmlJob += listSkill;
itemTempHtmlJob += `</p>

                             </li>
                         </ul>
                         
                     </div>
                     
                     </div>
                          
             </div>
         </div>
     </div>
 </div>`;

 itemHtmlJob += itemTempHtmlJob;           
        }
        $('#JoblistBusinness').html(itemHtmlJob)
        }

    })
});
$(document).ready(function () {
    $('#updateProfile').on("click", function(event) {
        
        const fullName = $("#fullName").val();       
        const email = $("#email").val();
        const phone = $("#phone").val();
        const url = baseUrl + `/api/v1/users/editprofile`;
        const param = {
            fullName: fullName,
            email: email,
            phone: phone,
        };
        $.ajax({
            type: 'PUT',
            url: url,      
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    String(localStorage.getItem("access-token"))
                );
              },
            data:JSON.stringify(param),
            dataType:"JSON",
            async: false,
            success: function(res) {
                window.location.href='/profile'
                
            },
        });
        
    })
    $('#updateFreelancer').on("click", function(event) {  
        console.log("id_freelancer 2 : ",id_freelancer)
        const location = $("#location").val();       
        const overview = $("#overview").val();
        const certifications = $("#certifications").val();
        const url = baseUrl + `/api/v1/users/editprofilefreelancer`;
     
        const param = {
            id : id_freelancer,
            location: location,
            overview: overview,
            certifications: certifications,
        };
      
        $.ajax({
            type: 'POST',
            url: url,      
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    String(localStorage.getItem("access-token"))
                );
              },
            data:JSON.stringify(param),
            dataType:"JSON",
            async: false,
            success: function(res) {
                // window.location.href='/profile'
                
            },
            error() {
                console.log("sai");
              },
        });
        
    })

  });