<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );
$id = $obj['id'];
$query = "SELECT * FROM `users` WHERE id = '".mysqli_real_escape_string( $link, $id )."'";
$result = mysqli_query( $link, $query );
if ( mysqli_num_rows( $result ) > 0 ) {
    echo json_encode( [true, mysqli_fetch_array( $result )] );
} else {
    echo json_encode( [false] );
}

?>