Module.register("YouTubeM", {
    

start: function() {
	this.key = this.config.key;	
    },
    
getDom: function(){
        var wrapper = document.createElement('div');
        wrapper.setAttribute("id", "YouTubeDiv");
      
        var videoframe = document.createElement("iframe");
        wrapper.appendChild(videoframe);
        videoframe.setAttribute("id", "ytplayer");
        videoframe.setAttribute("src", "");
        
        videoframe.setAttribute("class", ".yt_player_iframe");
        videoframe.setAttribute("width", "100%");
        videoframe.setAttribute("height", "100%");
        videoframe.setAttribute("allowfullscreen", "ture");
        videoframe.setAttribute("allowscriptaccess", "always");
        videoframe.setAttribute("frameborder", "0");
        return wrapper;
    }
     
});
