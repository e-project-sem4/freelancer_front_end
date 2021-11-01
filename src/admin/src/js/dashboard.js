var start ='';
var end ='';
var startAt ="" ;
var endAt ="";
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadCountAccout();
  loadLineCharts();
  loadMultipleLineChart(startAt,endAt);

});

$('#datepickerRevenue').on('changeDate', function() {
  start = document.getElementById("startDay").value;
  end = document.getElementById("endDay").value;
  loadLineCharts();
});

$('#datepickerTransaction').on('changeDate', function() {
  startTransaction = new Date(document.getElementById("startTransaction").value);
  endTransaction = new Date(document.getElementById("endTransaction").value + " 23:59:59")
  startAt = startTransaction.getTime();
  endAt = endTransaction.getTime();
  loadMultipleLineChart(startAt,endAt);
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
function loadMultipleLineChart(startAt,endAt){

  const url =
  baseUrl +
  `/api/v1/admin/dashboard/multiplelinechartdata?start=${startAt}&end=${endAt}`;
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
      var dayMultiple = [];
      var sorted_nums = [];

		for(var key in res){
			var sgg = {
					data: []
				}
			for(var i = 0; i < res[key].length; i++){
				sgg.data.push("Day " + res[key][i].day);
			}
			dayMultiple.push(sgg);
		}
    sorted_nums = dayMultiple[0].data.concat(dayMultiple[1].data,dayMultiple[2].data);

    /* line chart multiple series starts here */
		var formatteddata = [];
		for(var key in res){
			var singleObject = {
					name: '',
					data: []
				}
			singleObject.name = key.toUpperCase();
			for(var i = 0; i < res[key].length; i++){
        if(res[key][i].type == 0){
          singleObject.name="RECHARGE";
        }
        if(res[key][i].type == 1){
          singleObject.name="WITHDRAW";
        }
        if(res[key][i].type == 2){
          singleObject.name="PAYMENT";
        }
        if(res[key][i].type == 3){
          singleObject.name="WAGE";
        }
				singleObject.data.push(res[key][i].price);
			}
			formatteddata.push(singleObject);
		}

		drawMultipleLineChart(formatteddata,sorted_nums);
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
function drawMultipleLineChart(formatteddata,dayMultiple){

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
        categories: dayMultiple
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

$('#change-load-day').on('click', function(){
  loadLineCharts();
})
$('#change-load-month').on('click', function(){
  loadLineChartsMonth();
})

function loadLineChartsMonth(){
  const url =
  baseUrl +
  `/api/v1/admin/dashboard/month`;
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
      var months = [];
      var price = [];
        for(var i = 0; i < res.length; i++){
          months.push("Month " + res[i].month);
          price.push(res[i].price);
      }
    drawLineChart(months,price);
    },
  });
}