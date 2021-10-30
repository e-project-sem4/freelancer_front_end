var start ='';
var end ='';
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadCountAccout();
  loadLineCharts();
  loadMultipleLineChart();

});

$('#datepicker').on('changeDate', function() {
  start = document.getElementById("startDay").value;
  end = document.getElementById("endDay").value;
  loadLineCharts();
});

function loadCountAccout() {
  const url =
  baseUrl +
  '/api/v1/admin/dashboard';
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token-admin"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
    let item = 
      `<a href="#" class="card">
      <div class="card-body text-center">
          <i class="simple-icon-people"></i>
          <p class="card-text mb-0">User Account</p>
          <p class="lead text-center">${res[1]}</p>
      </div>
  </a>
  <a href="#" class="card">
      <div class="card-body text-center">
          <i class="simple-icon-user"></i>
          <p class="card-text mb-0">User Freelancer</p>
          <p class="lead text-center">${res[2]}</p>
      </div>
  </a>

  <a href="#" class="card">
      <div class="card-body text-center">
          <i class="simple-icon-user"></i>
          <p class="card-text mb-0">User Business</p>
          <p class="lead text-center">${res[3]}</p>
      </div>
  </a>
  <a href="#" class="card">
      <div class="card-body text-center">
          <i class="simple-icon-list"></i>
          <p class="card-text mb-0">Job</p>
          <p class="lead text-center">${res[4]}</p>
      </div>
  </a>`
  $("#count-account").html(item);
    },
  });
}
function loadLineCharts(){
  const url =
  baseUrl +
  `/api/v1/admin/dashboard/day?start=${start}&end=${end}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token-admin"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      var days = [];
      var price = [];
        for(var i = 0; i < res.length; i++){
          days.push("Day " + res[i].day);
          price.push(res[i].price);
      }
    drawLineChart(days,price);
    },
  });
}
function loadMultipleLineChart(){

  const url =
  baseUrl +
  '/api/v1/admin/dashboard/multiplelinechartdata';
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token-admin"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      
      var Day = [];
      for(var keys in res){
        var single = {
            data: []
          }
        for(var i = 0; i < res[keys].length; i++){
          single.data.push(new Date(res[keys][i].createAt).toLocaleDateString());
        }
        Day.push(single);
      }
      console.log(Day)
    /* line chart multiple series starts here */
		var formatteddata = [];
		for(var key in res){
			var singleObject = {
					name: '',
					data: []
				}
			singleObject.name = key.toUpperCase();
			for(var i = 0; i < res[key].length; i++){
				singleObject.data.push(res[key][i].price);
			}
			formatteddata.push(singleObject);
		}
		console.log(formatteddata);
		drawMultipleLineChart(formatteddata,Day);
    },
  });
}
  /* for line chart */
function drawLineChart(category, series){
	Highcharts.chart('container', {
	    chart: {
	        type: 'line',
	    },
	    
	    title: {
	        text: 'Revenue'
	    },
	
	    xAxis: {
	        categories: category
	    },
	    yAxis: {
        title: {
            text: 'Amount of money'
        }
    },
	    tooltip: {
	        formatter: function() {
	          return '<strong>'+this.x+': </strong>'+ this.y;
	        }
	    },
	
	    series: [{
	        data: series
	    }]
	});
}
/* for multiple line chart */
function drawMultipleLineChart(formatteddata,category){
	Highcharts.chart('multipleLineChart', {

	    title: {
	        text: 'Transaction'
	    },

	    yAxis: {
	        title: {
	            text: 'Amount of money'
	        }
	    },
      xAxis: {
        categories: [
    "14/9/2021",
    "15/9/2021",
    "16/9/2021",
    "17/9/2021",
    "18/9/2021",
    "19/9/2021",
    "20/9/2021",
    "21/9/2021",
    "22/9/2021",
    "23/9/2021",
    "24/9/2021",
    "25/9/2021",
    "26/9/2021",
    "27/9/2021",
    "28/9/2021",
    "29/9/2021",
    "30/9/2021",
    "1/10/2021",
    "2/10/2021",
    "3/10/2021",
    "4/10/2021",
    "5/10/2021",
    "6/10/2021",
    "7/10/2021",
    "8/10/2021",
    "9/10/2021",
    "10/10/2021",
    "11/10/2021",
    "12/10/2021",
    "13/10/2021",
    "14/10/2021",
    "15/10/2021",
    "16/10/2021",
    "17/10/2021",
    "18/10/2021",
    "19/10/2021",
    "20/10/2021",
    "21/10/2021",
    "22/10/2021",
    "23/10/2021",
    "24/10/2021",
    "14/9/2021",
    "15/9/2021",
    "16/9/2021",
    "17/9/2021",
    "18/9/2021",
    "19/9/2021",
    "20/9/2021",
    "21/9/2021",
    "22/9/2021",
    "23/9/2021",
    "24/9/2021",
    "25/9/2021",
    "26/9/2021",
    "27/9/2021",
    "28/9/2021",
    "29/9/2021",
    "30/9/2021",
    "1/10/2021",
    "2/10/2021",
    "3/10/2021",
    "4/10/2021",
    "5/10/2021",
    "6/10/2021",
    "7/10/2021",
    "8/10/2021",
    "9/10/2021",
    "10/10/2021",
    "11/10/2021",
    "12/10/2021",
    "13/10/2021",
    "14/10/2021",
    "15/10/2021",
    "16/10/2021",
    "17/10/2021",
    "18/10/2021",
    "19/10/2021",
    "20/10/2021",
    "21/10/2021",
    "22/10/2021",
    "23/10/2021",
    "24/10/2021",
    "14/9/2021",
    "15/9/2021",
    "16/9/2021",
    "17/9/2021",
    "18/9/2021",
    "19/9/2021",
    "20/9/2021",
    "21/9/2021",
    "22/9/2021",
    "23/9/2021",
    "24/9/2021",
    "25/9/2021",
    "26/9/2021"
]
    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    // plotOptions: {
	    //     series: {
	    //         label: {
	    //             connectorAllowed: false
	    //         },
	    //         pointStart: 2010
	    //     }
	    // },

	    series: formatteddata,

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	});
}
