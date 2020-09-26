<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );
$email = $obj['email'];
$password = $obj['password'];

if ( $email && $password ) {
    $query = "SELECT * FROM `users` WHERE email = '".mysqli_real_escape_string( $link, $email )."'";
    $result = mysqli_query( $link, $query );
    $row = mysqli_fetch_array( $result );
    if ( isset( $row ) ) {
        $hasedPassword = $row['password'];
        $user_id = $row['id'];
        if ( password_verify( $password, $hasedPassword ) ) {
            echo json_encode( ['Success', $user_id] );
        } else {
            echo json_encode( ['Invalid Username and password'] );
        }
    } else {
        echo json_encode( ['No user found'] );
    }
} else {
    echo json_encode( 'no data' );
}
?>