// $(document).ready(function () {
//     $('#post-job').on("click",function (event){
//         const url = baseUrl + `/api/v1/job?name=${name}&expected_duration_id=${expected_duration_id}
//         &complexity_id=${complexity_id}&paymentAmount=${paymentAmount}&description=${description}`;
//         const name = $("#job_name").val();
//         const expected_duration_id = $('#expected_duration_id').val();
//         const complexity_id = $('#complexity_id').val();
//         const paymentAmount = $('#payment_amount').val();
//
//         const job_skill_list = [$('#skill_id').val()];
//         const otherSkill = job_skill_list.values();
//
//
//         const description = $('#description').val();
//         const jobPostForm ={
//             complexity : complexity_id,
//             expected_duration_id: expected_duration_id,
//             description: description,
//             paymentAmount: paymentAmount,
//             name:name,
//             otherSkill : [
//                 otherSkill
//             ],
//         }
//         $.ajax({
//             type: 'POST',
//             url: url,
//             contentType: "application/json; charset=utf-8",
//             data:JSON.stringify(jobPostForm),
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader(
//                     "Authorization", token
//                 );
//             },
//             dataType: "JSON",
//             async: false,
//             success: function (res) {
//                 if(res ){
//                     location.href="/post-a-job"
//                 }
//             },
//             error(){
//                 console.log("sai");
//             },
//         });
//         event.preventDefault()
//     })
// });
// $(function getExpectedDuration(){
//     $.ajax({
//         type: 'GET',
//         url: baseUrl+"/api/v1/durations",
//         contentType: "application/json; charset=utf-8",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             if(res ){
//                 console.log(expectedDuration)
//             }
//         },
//         error(){
//             console.log("sai");
//         },
//     });
//
//
// });
//
// $(function getComplexity(){
//     $.ajax({
//         type: 'GET',
//         url: baseUrl+"/api/v1/expectedDuration",
//         contentType: "application/json; charset=utf-8",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             console.log(res)
//             // const complexity = res.result;
//             // let itemComplexity = "";
//             // let itemTempComplexity = "";
//             // for(let i = 0; i < complexity.length; i++){
//             //     itemTempComplexity = <option>${complexity[i].complexityText}</option>
//             // }
//             // itemComplexity += itemTempComplexity;
//             // $('#skill_id').html(itemComplexity)
//         },
//         error(){
//             console.log("sai");
//         },
//     });
// });
//
// $(function getJobSkill(){
//
//     const jobSKill = $('#jobSKill').val();
//     $.ajax({
//         type: 'GET',
//         url: url,
//         contentType: "application/json; charset=utf-8",
//         data:JSON.stringify(jobPostForm),
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             if(res ){
//                 location.href="/post-a-job"
//             }
//         },
//         error(){
//             console.log("sai");
//         },
//     });
//
//
// });