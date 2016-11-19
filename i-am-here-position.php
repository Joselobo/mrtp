<?php
@$cual = $_GET['cual'];
$elmensaje = '0';
$outputstring="";
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$ruta= $DOCUMENT_ROOT."/htgpst/server-side/gps-position.txt";
@$fp = fopen($ruta, 'w');
flock($fp, LOCK_EX);
if(!$fp)
{
    $elmensaje = '2';
}
else
{
	if ($cual == 1)
    {
	    $outputstring = "2016-11-11 12:44:34_-25.3630000_ 131.0440000_";
    }
    else
    {
	    $outputstring = "2016-11-11 12:45:04_-34.6479663_-58.38017058_";
    }
	fwrite($fp, $outputstring, strlen($outputstring));
    flock($fp, LOCK_UN);
    fclose($fp);
	$elmensaje = '1';
}
//readfile("/tmp/gps-position.txt");
//readfile("server-side/jose_position_track.txt");
readfile("server-side/gps-position.txt");
?>