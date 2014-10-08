// var indx = 0;
// function IsInLimit(value, index, ar) {
// 	if (value < 30)
// 		return true;
// 	else {
// 		console.log("value "+ value + " on index: "+ index + " has crossed the limit");
// 		indx = index;
// 		return false;
// 	}
// }


// currentMinute = 1
// 0-3 - 54
// 3-9 - 00
// 9-15 - 06
// 15-21 - 12
// ..
// 56-0 - 54

// var rightNow = new Date();
// var currentMinutes = rightNow.getMinutes();
// var ftpTimeMinutes = Array(3, 9, 15, 21, 27, 33, 39, 45, 51, 56);
// var index = 0;
// for(var i = 0; i < ftpTimeMinutes.length; i++) {
// 	if(ftpTimeMinutes[i] > currentMinutes){
// 		index = i - 1;
// 		if(index === -1){
// 			index = ftpTimeMinutes.length - 1;
// 		}
// 		break;
// 	}
// }
// console.log("current minute: " + currentMinutes + " index: " + index + " value: " + ftpTimeMinutes[index]);

// // circular loop over array finding 6 file name extensions.
// var fileTimestampMinutes = Array('00', '06', '12', '18', '24', '30', '36', '42', '48', '54');
// var tempArr = []
// var index = 2;
// for(var i = 0; i < 6; i++) { 
// 	tempArr[i] = fileTimestampMinutes[index];
// 	index--;
// 	if(index < 0){
// 		index = fileTimestampMinutes.length-1;
// 	}
// }
// console.log(tempArr);



timeToFileConverter = (function () {
	var ftpTimeMinutes = Array(3, 9, 15, 21, 27, 33, 39, 45, 51, 56),
		fileTimestampMinutes = Array('00', '06', '12', '18', '24', '30', '36', '42', '48', '54'),
		tempArr = [],
		index = 0,
		rightNow;

	function findFtpTimeArrayIndex(){
		rightNow = new Date();
		var currentMinutes = rightNow.getMinutes();
		for(var i = 0; i < ftpTimeMinutes.length; i++) {
			if(ftpTimeMinutes[i] > currentMinutes){
				index = i - 1;
				if(index === -1){
					index = ftpTimeMinutes.length - 1;
				}
				break;
			}
		}
	}

	function fileTimeStampMinutes (argument) {
		// findFtpTimeArrayIndex();
		for(var i = 0; i < 6; i++) { 
			tempArr[i] = fileTimestampMinutes[index];
			index--;
			if(index < 0){
				index = fileTimestampMinutes.length-1;
			}
		}
	}


    function getIndex(){
      return index;
    }

    function getTempArr () {
    	return tempArr;
    }

    function appendFilePrefix () {
    	var timeWithoutMinutes = rightNow.toISOString().slice(0,13).replace(/T|:|-/g,"");
    	for(var i = 0, len = tempArr.length; i < len; i++) { 
    		tempArr[i] = "ftp://ftp2.bom.gov.au/anon/gen/radar/IDR713.T." + timeWithoutMinutes + tempArr[i] + ".png";
    	};
    }

    function getLatestImageFiles(){
    	findFtpTimeArrayIndex();
    	fileTimeStampMinutes();
    	appendFilePrefix();
    	return tempArr;
    }

	return {
		index: getIndex,
		minutes: fileTimeStampMinutes,
		timeIndex: findFtpTimeArrayIndex,
		temp: getTempArr,
		getLatestImageFiles: getLatestImageFiles
	};

})();




<div id="cloud-overlay">
    <img src="" />
    <img src="" />
    <img src="" />
    <img src="" />
    <img src="" />
    <img src="" />
</div>

function fillImageSource () {
	var elements = document.getElementsByClassName(cloud-overlay);
	for(var i = 0, len = elements.length; i < len; i++) {

		// document.getElementById("imageid").src="../template/save.png";
    };
}


var imageFiles = timeToFileConverter.getLatestImageFiles();
var index = 0;

function cycleImages () {
	imageFiles[index];
	index = (index + 1) % imageFiles.length;
}

cycleImages();

window.setInterval(cycleImages, 10000);



// // circular loop over array finding 6 file name extensions.
// var fileTimestampMinutes = Array('00', '06', '12', '18', '24', '30', '36', '42', '48', '54');
// for(var i = 0, len = fileTimestampMinutes.length - 1; i < 6; i++) { 
// 	console.log(fileTimestampMinutes[(i + index) % len])
// }




// rightNow.toISOString().slice(0,16).replace(/T|:|-/g,"")

//returns the correct index
// var currentMinute = 1;
// var arraytosearch = Array(3, 9, 15, 21, 27, 33, 39, 45, 51, 56);
// var indx = 0;
// for(var i = 0; i < arraytosearch.length; i++) {
// 	if(arraytosearch[i] > currentMinute){
// 		indx = i - 1;
// 		if(indx === -1){
// 			indx = arraytosearch.length - 1;
// 		}
// 		break;
// 	}
// }
// console.log("index: " + indx + " value: " + arraytosearch[indx])