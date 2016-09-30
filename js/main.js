  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCczjG2pBT8Ag--uiGnrkCpHDsGbpI1TM8",
    authDomain: "reservation-site-cb918.firebaseapp.com",
    databaseURL: "https://reservation-site-cb918.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "20026498517"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

//collect reservation data and post to database
var reservationData = {}
$(".reservation-day li").on("click",function(){
	reservationData.day = $(this).text();
});
$(".reservations").on("submit",function(e){
	e.preventDefault();
	reservationData.name = $(".reservation-name").val();
	var reservationsReference = database.ref('reservations');
	 reservationsReference.push({
    	day: reservationData.day,
    	name: reservationData.name
  });
	 $(".reservation-name").val("");
});

//display reservation data
function getReservations(){
	database.ref('reservations').on('value',function(results){
		var allReservationData = results.val();
		var reservations = [];
		for (var item in allReservationData) {
			var context = {
				day: allReservationData[item].day,
				name: allReservationData[item].name,
				reservationId: item
			};
			var source = $("#reservation-template").html();
			var template = Handlebars.compile(source);
			var reservationListElement = template(context);
			reservations.push(reservationListElement)
		}
		$('.reservation-list').empty()
		for(var i in reservations){
			$('.reservation-list').append(reservations[i]);
		}
	});
};
getReservations();


 // Google Map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false,
    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#2339ba'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#546cf2'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#e212b2'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#dbbad3'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            }
          ]
  });
  var marker = new google.maps.Marker({
	position: {lat: 40.8054491, lng: -73.9654415}, 
	map: map,
	title: 'Monks Café'
});
}

