
var welcomeArray = ['welcome.html','step-one.html', "step-two.html", "step-three.html", "step-four.html", "step-five.html", "step-six.html", "step-seven.html", "step-eight.html", "step-nine.html"];

$(document).ready(function() {
	$(".next").on("click", loadNext);
	 $('select').material_select();
});

//The function loads the next html from the array.
function loadNext(){
	index += 1;
	progress += 11.2
	var eleml = document.getElementById("myBar"); 
	eleml.style.width = progress+'%';
	$(".welcome-box").load(welcomeArray[index]);

}

// var eleml = document.getElementById("myBar"); 
// eleml.style.width = '12%';