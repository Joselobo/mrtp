var myReq;
// Variable que guarda información relacionada con el navegador y la pantalla.
var Nav = {};
function ConseguirXMLHTTPRequest() {
	try {
		req = new XMLHttpRequest();
	}
	catch( err1 ) {
		try {
			req = new ActiveXObject( "Msxml2.XMLHTTP" );
		}
		catch( err2 ) {
			try {
				req = new ActiveXObject( "Microsoft.XMLHTTP" );
			}
			catch( err3 ) {
				alert( "No se ha creado el XMLHttpRequest" );
				req = false;
			}
		}
	}
	return req;
};
function Traer2Datos( URL, Query, Tipo, Quien, Pos ) {
	if( Tipo == "POST" ) 
    {
		//alert("vengo T  " + URL + "  " + Query + "  " + Tipo + "  " + Quien + "  " + Pos);
		myReq.open( "POST", URL, true );
		myReq.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		myReq.send( Query );
        //alert("1qeue");
	} 
    else 
    {
		if( Query != "" ) URL += "?" + Query;
		//alert(URL)
		myReq.open( "GET", URL, true );
		myReq.send( null );
		//alert('Traer2Datos');
	}
	myReq.onreadystatechange = function() { ObtenerDatos( Quien, Pos ); };
};
function ObtenerDatos( Quien, Pos ) 
{
    var rState = myReq.readyState;
	if( rState == 4 ) 
    {
		//alert(myReq.status);
        if( myReq.status == 200 ) 
        {
			//alert(Quien);
			Ok = ( myReq.responseXML ).getElementsByTagName( "Respuesta" );
			MostrarDatos( Ok, Quien );
		}
        else
        {
			//alert(myReq.status + " 1" );
		}
	} 
    else if( rState == 1 || rState == 2 || rState == 3 ) 
    {
	}
};
// Obtiene el nombre del navegador
function QueNavegador() {
    Nav.Body = document.body;
    Nav.Nav = ( ( navigator.userAgent ).lastIndexOf( "Firefox" ) != -1 ) ? "FF": "";
    Nav.Nav = ( ( navigator.userAgent ).lastIndexOf( "Opera" ) != -1 ) ? "OP": Nav.Nav;
    Nav.Nav = ( ( navigator.userAgent ).lastIndexOf( "Chrome" ) != -1 ) ? "CH": Nav.Nav;
    if( ( navigator.userAgent ).lastIndexOf( "MSIE" ) != -1 ) {
        Nav.Nav = "IE";
        var Inicio = navigator.userAgent.indexOf( "MSIE" );
        var Fin = navigator.userAgent.indexOf( ";", Inicio );
        Nav.Ver = navigator.userAgent.substr( Inicio, Fin - Inicio );
        Nav.Ver = parseInt( Nav.Ver.split( " " )[1] );
    }
    Nav.ResX = ( Nav.Nav != "IE" ) ? parseInt( window.innerWidth ): parseInt( document.documentElement.clientWidth );
    Nav.ResY = ( Nav.Nav != "IE" ) ? parseInt( window.innerHeight ): parseInt( document.documentElement.clientHeight );
};
window.onload = function() 
{	
    //alert("vine a onload");
	myReq = ConseguirXMLHTTPRequest();
	var usuario = "jose";
	var Query = "nombre=" + usuario;
	Traer2Datos( "obtiene_las_cordenadas.php", Query, "POST", "trae_las_coordenadas", 0 );
};
function MostrarDatos( Ok, Quien )
{
    switch( Quien ) 
    {
        case "trae_las_coordenadas":
		    var Datosquetraigo = Ok[0].getElementsByTagName( "Dato" )[1].childNodes[0].data;
			Datosquetraigo = Datosquetraigo.split( ";" );
			if (Datosquetraigo[0] == 1)
			{
				alert(Datosquetraigo[1])
			}
		    break;
	}
};	
		