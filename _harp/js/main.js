var flickrApi = (function(){
	var baseUrl = 'https://api.flickr.com/services/rest/';
	var params = {
		'api_key': '7c5c5d3d8fb4c11d0c9bb90b1f6affc3',
		'user_id': '36917578@N04',
		'method': 'flickr.people.getPublicPhotos',
		'per_page': 12,
		'page': 1,
		'format': 'json'
	}

	function _fetchPhotos() {
		return $.ajax({
			url: baseUrl,
			data: params,
			dataType: 'jsonp',
			jsonp: 'jsoncallback'
		});
	}

	function _makePhotosFromApi(resp) {
		var photos = [];
		$.each(resp.photos.photo, function(i,photo) {
			var photoUrl = 'https://farm' +
				photo.farm + '.staticflickr.com/' +
				photo.server + '/' +
				photo.id + '_' +
				photo.secret + '.jpg';

			photos.push(photoUrl);
		});

		return photos;
	}

	return {
		getPhotos: function() {

			return _fetchPhotos().then(function(resp){
				return _makePhotosFromApi(resp);
			});
		}
	}
})();


$(function(){

	// Lets fetch some photos and shim them into the page
	flickrApi.getPhotos().then(function(photos) {
		var photoHtml = '<div class="row">';
		$.each(photos, function(i, photoUrl) {
			photoHtml += '<div class="four columns"><img src="' +photoUrl+ '"></div>';

			// rows need divisions
			if ( (i+1) % 3 == 0) {
				photoHtml += '</div><div class="row">';
			}
		});
		photoHtml += '</div>';

		$('.js-photo-reel').append(photoHtml);
	})
	
});
