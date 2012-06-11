
var stamford = null;
var copenhagen = null;
var hongkong = null;
var melbourne = null;
var stime = null;
var ctime = null;
var htime = null;
var mtime = null;

function showCoords(evt){
  var form = document.forms.form_coords;
  if(window.event) {
	  evt = window.event;
  }
  var parent_id = evt.target.parentNode.id;
  form.parentId.value = parent_id;
  form.pageXCoords.value = evt.pageX;
  form.pageYCoords.value = evt.pageY;
  form.layerXCoords.value = evt.layerX;
  form.layerYCoords.value = evt.layerY;
  if(evt.layerY > 240 && evt.layerY < 275 && evt.layerX > 745 && evt.layerX < 870) {
	 stamford.style.display = "block";
  } else {
	 stamford.style.display = "none"; 
  }
  if(evt.layerY > 190 && evt.layerY < 225 && evt.layerX > 870 && evt.layerX < 1000) {
	  copenhagen.style.display = "block";
  } else {
	  copenhagen.style.display = "none";
  }
  if(evt.layerY > 255 && evt.layerY < 295 && evt.layerX > 1080 && evt.layerX < 1210) {
	  hongkong.style.display = "block";
  } else {
	  hongkong.style.display = "none";
  }
  if(evt.layerY > 355 && evt.layerY < 390 && evt.layerX > 1135 && evt.layerX < 1270) {
	  melbourne.style.display = "block";
  } else {
	  melbourne.style.display = "none";
  }


}

function padTime(time) {
	return (time < 10 ? "0" : "" ) + time;
}

function positiveTime(time) {
	var tempTime = time;
	while(tempTime < 0) {
		tempTime+=24;
	}
	while(tempTime > 23) {
		tempTime-=24;
	}
	return tempTime;
}

function updateClocks() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = padTime(currentTime.getMinutes());
	var currentSeconds = padTime(currentTime.getSeconds());
	var stamfordOffset = 4;
	var copenhagenOffset = -2;
	var hongkongOffset = -8;
	var melbourneOffset = -10;
	var localOffset = currentTime.getTimezoneOffset()/60;
	var timeString =  ":" + currentMinutes + ":" + currentSeconds;
	var stamfordHour = positiveTime(currentHours-(stamfordOffset-localOffset));
	var copenhagenHour = positiveTime(currentHours-(copenhagenOffset-localOffset));
	var hongkongHour = positiveTime(currentHours-(hongkongOffset-localOffset));
	var melbourneHour = positiveTime(currentHours-(melbourneOffset-localOffset));
	stime.innerHTML = stamfordHour + timeString;
	ctime.innerHTML = copenhagenHour + timeString;
	htime.innerHTML = hongkongHour + timeString;
	mtime.innerHTML = melbourneHour + timeString;
i

}

var pos = null;
function init() {
	pos = document.getElementById("picture");
	stamford = document.getElementById("stamford");
	copenhagen = document.getElementById("copenhagen");
	hongkong = document.getElementById("hongkong");
	melbourne = document.getElementById("melbourne");
	stime = document.getElementById("stime");
	ctime = document.getElementById("ctime");
	htime = document.getElementById("htime");
	mtime = document.getElementById("mtime");
	pos.onmousemove = showCoords;
	setInterval('updateClocks()', 1000);
}
