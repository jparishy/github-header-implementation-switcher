chrome.commands.onCommand.addListener(function(command) {


	console.log("help");
	var headerExtension = "h";
	var implementationExtensions = [ "m", "mm", "c", "cpp" ];

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		
		var current = tabs[0];
		var url = current.url;
		var ext = url.substring(url.lastIndexOf(".") + 1);

		if(ext === headerExtension)
		{
			existingSourceFileForHeaderURL(url, implementationExtensions, function (sourceURL) {

				if(sourceURL)
				{
					chrome.tabs.update(current.id, { url: sourceURL });
				}
			});
		}
		else if(implementationExtensions.indexOf(ext) >= 0)
		{
			var headerURL = replaceExtension(url, headerExtension);
			chrome.tabs.update(current.id, { url: headerURL });
		}
	});
});

function doesURLExist(url, resultCallback) {

    var http = new XMLHttpRequest();
    http.open('HEAD', url);

    http.onreadystatechange = function() {

        if (this.readyState == this.DONE) {
            resultCallback(this.status != 404);
        }
    };

    http.send();
}

function replaceExtension(url, newExt) {

	var withoutExt = url.substring(0, url.lastIndexOf(".") + 1);
	return withoutExt + newExt;
}

function existingSourceFileForHeaderURL(url, extensions, callback) {

	if(extensions.length > 0)
	{
		var nextExtensions = extensions;
		var currentExt = nextExtensions.shift();
		var currentExtURL = replaceExtension(url, currentExt);

		doesURLExist(currentExtURL, function (exists) {

			if(exists)
			{
				callback(currentExtURL);
			}
			else
			{
				existingSourceFileForHeaderURL(url, nextExtensions, callback);
			}
		});
	}
	else
	{
		callback(null);
	}
}