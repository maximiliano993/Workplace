//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(json){
        for (i=0; i<json.data.length; i++){
            let product_info='<div class="product">';
            product_info+='<ul class="list-no-style">';
            product_info+='<li ><h4 class="center"><strong>' + json.data[i]['name'] + " " + json.data[i]['cost'] + json.data[i]['currency'] + '</strong></h4></li>';
            product_info+='<li><img src=' + json.data[i]['imgSrc'] + ' alt="imagen" class="product-size"></li>';
            product_info+='<li class="product-size">' + json.data[i]['description'] + '</li>'
            product_info+='</ul>';
            product_info+='</div>';
            document.getElementsByClassName('container-product')[0].innerHTML+=product_info;
        }
    })
})
