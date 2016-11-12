<?php
header('Content-Type: text/xml');
$szusuario = $_POST['nombre'];
//$szusuario = "jose";
$elmensaje = '0';
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
//24
$ruta= $DOCUMENT_ROOT."/htgpst/server-side/".$szusuario."_position_track.txt";
$fp = fopen($ruta, 'rb');
flock($fp, LOCK_EX);
if(!$fp)
{
    $elmensaje = '2';
}
else
{
	$distancia = filesize("$DOCUMENT_ROOT/htgpst/server-side/jose_position_track.txt") - 24;
	fseek( $fp, ($distancia), SEEK_SET);
	$mibuffer = fread( $fp, 24);
	//echo $mibuffer;
	flock($fp, LOCK_UN);
	fclose($fp);
	$elmensaje = '1';
}
//$elmensaje = '1';
//$mibuffer = "-34.64796641-58.38017060";
echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
echo "<Respuesta>";
echo "<Dato>";
echo "XML";
echo "</Dato><Dato>";
if ($elmensaje == '1')
{
	echo $elmensaje.";".$mibuffer;
}
else
{
	echo $elmensaje.";-00.00000000-00.00000000";
}
echo "</Dato></Respuesta>";
?>