
$(document).ready(function() {
	$(".next").on("click", loadNext);
	$(".to-login").on("click", loadLogin)

	//Without this line, Drop Down menu (or select tag) won't show in html
	$('select').material_select();
});

//The function loads the next html from the array.
function loadNext(){
	index += 1;
	progress += 11.2
	var eleml = document.getElementById("myBar"); 
	eleml.style.width = progress+'%';
	$(".box").load(welcomeArray[index]);
}

function loadLogin(){
	window.location.href = "login.html";
}
