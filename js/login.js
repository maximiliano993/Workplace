//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function register(){
    let direction=document.getElementById('email');
    localStorage.setItem('email',direction.value);
    
}

function login(){
    register()
    window.location.href="home.html"

    
}



