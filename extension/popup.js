function getMetas() {
	var message = document.querySelector('#metaTable');
	chrome.tabs.executeScript(null, {
		file: "getPageMetas.js"
	}, function() {
		// If you try it into an extensions page or the webstore/NTP you'll get an error
		if (chrome.runtime.lastError) {
			message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
		}
	});
}
var patt = /videos/i;
chrome.runtime.onMessage.addListener(function(request, sender) {
	var metaTable = document.getElementById('metaTable');
	if (request.method == "getMetas") {
		for (var i=0; i<request.metas.length; i++) { 
		if(request.metas[i][0]=="description" && request.metas[i][3].match(patt)){
			metaTable.innerHTML += "<tr><td>"+request.metas[i][0]+"</td><td>"+request.metas[i][1]+"</td><td>"+request.metas[i][2]+"</td><td>"+request.metas[i][3]+"</td><td>"+request.metas[i][4]+"</td></tr>"; 
		var gettingTitle = chrome.browserAction.getTitle({});
		document.write(gettingTitle);
		}
		
		
		} 
	}
});

window.onload = getMetas;
