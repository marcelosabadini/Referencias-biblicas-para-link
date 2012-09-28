// Marcelo Sabadini - 2012
(function($) {

    $.fn.bible2link = function(options){
	
        var defaults = {
            url_base: 'http://bibliaonline.com.br',
            bible: 'nvi', // acf(almeida corrigida e revisada fiel), aa (almeida revisada impressa biblica), nvi (nova versao internacional), tb (sociedade bibia britanica)
            target: '',
            more_style: '',

            callback: null,
            debug : false
        };
        // merge of parametters
        var options = $.extend(defaults, options);
        
        // IF debug than print on console
        if(options.debug == true && !$.browser.msie && window.console && window.console.firebug)
            console.info(options);
		
        $(this).each(function(){
		
            // get the text from element
            var text = $(this).val();
            // if is blank, try to get html()
            if(text == '')
                text = $(this).html();
		
            if(text != ''){
                
                text = text.replace(/((\b[1-3]{0,1}\s{0,1}[a-zA-ZáéíóúâêîôûãẽĩõũÁÉÍÓÚÂÊÎÔÛÃẼŨÕŨ]{2,})\s(([0-9]{1,2})):{0,1}([0-9\-,]*))\b/gim, function($1, $2, $3, $4, $5, $6){
                    var new_text = '<a href="'+options.url_base+'/'+options.bible+'/'+$3+'/'+$4+'/'+$6+'" style="'+options.more_style+'" target="'+options.target+'">'+$1+'</a>'; // ['+$1+', '+$2+', '+$3+', '+$4+', '+$5+', '+$6+']
                    // before, needs to check if the biblical name is valid and return the abbreviation
                    return new_text;
                });
                
                // return the new text with the links
                $(this).val(text);
                
            }
			
        });
        	
        // There is callback? so execute...
        if(options.callback != null)
            options.callback.call(this);
		
    }
	
})(jQuery);
