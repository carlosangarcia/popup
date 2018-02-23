var avisoSuscriptores =  (function () {

    return {
        myRenderFunction: function(idioma, data) {
            var items = data;            
            var numRelacionadas = items.length;


            // Por si no viene
            if (!numRelacionadas) numRelacionadas = 0;
            for (var i = 0; i < numRelacionadas; i++) {

                try {
                var item = items[i];            
                urlImagen = item['status'];
                }
                catch(err_campos) {};
            }    
        },

        doMostrarAviso: function(idioma) {
                console.log("MOSTRAR AVISO");
        },
        doAjaxJsonP: function(data) {
            var that = this;
            var p_arr = [];
            console.log(data.callback);
            window[data.callback] = function(resp) {
                data.onsuccess.call(that, resp);
                delete window[data.callback];
            };
            data.params.callback = data.callback;

            for (p in data.params)
                p_arr.push(encodeURIComponent(p) + '=' + encodeURIComponent(data.params[p]));
            var p_str =  p_arr.join('&');

            if (p_str)
                data.url +=  '?' + p_str;

            var script = document.createElement('script');
            script.type = 'text/javascript'; script.async = 'async';
            if (data.onerror) script.onerror = data.onerror;
            script.src = data.url;
            var target = document.getElementsByTagName('script')[0];
            target.parentNode.insertBefore(script, target);
        },

        doCheckSegmento: function(idioma) {            
            this.doAjaxJsonP({
               url: "https://cdn.krxd.net/userdata/get?pub=17f21bbc-112b-4431-9dcc-40651d6e3c5b",
                callback: 'Krux.ns.prisabrand.kxjsonp_userdata',
                params: {
               },
                onsuccess: function(r) {
                    try {                                           
                        arrRespuesta=[];                     
                        var Objeto = r[nombreObjeto];

                        for(i=1;i<=2;i++){
                            var nombreObjeto = "Descuento"+i;
                            arrRespuesta[i-1]=r[nombreObjeto];
                        }                        
                    }                    
                    catch(e) {};
                    console.log(arrRespuesta);
                    avisoSuscriptores.myRenderFunction(idioma, arrRespuesta);
                },
                onerror: function() {
                    console.log ("error");
                }
            });
        }

    }
})();

function pintaAvisoSuscriptores(idioma) {   
    if(idioma == null) idioma = 'es';      
    avisoSuscriptores.doCheckSegmento(idioma);
}

pintaAvisoSuscriptores('es');
