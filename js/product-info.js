let info = {};

//Recibe un array con imágenes, las añade al html
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("infoImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Recibe un numero, retorna código html correspondiente a ese número de estrellas
function showStars(number_of_stars){
    let stars="";
    for(let i=0;i<number_of_stars;i++){
        stars+=`<span class="fa fa-star checked"></span>`;
    }
    for(let i=0;i<5-number_of_stars;i++){
        stars+=`<span class="fa fa-star"></span>`
    }
    return(stars)
}

//Recibe un JSON con productos relacionados, los añade al html
function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let productList = resultObj.data;

            let htmlRelatedProducts = "";

            //Recorre el array y añade código para cada producto a la variable
            for (let i = 0; i < relatedProductsArray.length; i++) {
                //Guarda la posicion del i producto relacionado
                let relatedProductPosition = relatedProductsArray[i];
                //Guarda al i producto relacionado
                let relatedProduct = productList[relatedProductPosition];

                htmlRelatedProducts += `
                <div class= "col-lg-3 col-md-4 col-6 border" "related-products">
                    <div  class= "row">
                        <img class="img-fluid p-2" src="`+relatedProduct.imgSrc+`">                                              
                    </div>                   
                    <div class= "row p-2">
                    <p>`+ relatedProduct.name + `</p> 
                    <p>`+ relatedProduct.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("related_products-box").innerHTML = htmlRelatedProducts;
        }
    })
}

//Recorre el array de comentarios y retorna el promedio de la puntuación
function calculateScore(array){
    let score=0;
    for (let i=0;i<array.length;i++){
        score=score+array[i].score;
    }
    score=Math.floor(score/array.length)
    return (score)
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            info = resultObj.data;

            let infoNameHTML  = document.getElementById("infoName");
            let infoDescriptionHTML = document.getElementById("infoDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
        
            infoNameHTML.innerHTML = info.name + ' ' + info.cost + ' ' + info.currency + ' ' ;
            infoDescriptionHTML.innerHTML = info.description;
            soldCountHTML.innerHTML = info.soldCount;
            categoryHTML.innerHTML = info.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(info.images);
            //Muestro los productos relacionados
            showRelatedProducts(info.relatedProducts)
        }

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === 'ok'){

            let comments=resultObj.data;
            let infoNameHTML  = document.getElementById("infoName");
            //Añado la puntuación del artículo a la información
            infoNameHTML.innerHTML+=' '+showStars(calculateScore(comments));
            
            //añado cada comentario
            let commentsHTML=document.getElementById('comments-box');
            for (let i=0;i<comments.length;i++){
                
                commentsHTML.innerHTML+=`<p>por <strong>` + comments[i].user + '</strong> el ' + comments[i].dateTime +  `</p>
                                        <p>`+showStars(comments[i].score)+`</p>
                                        <p>` + comments[i].description + `</p>
                                        <hr class="my-3">`
            } 
            

        }


    })
});