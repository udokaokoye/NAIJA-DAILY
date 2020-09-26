<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );
$firstname = $obj['firstName'];
$middlename = $obj['middleName'];
$lastname = $obj['lastName'];
$mobile = $obj['mobile'];
$email = $obj['email'];
$password = $obj['password'];
$intro = $obj['intro'];
if ( $firstname && $middlename && $lastname && $mobile && $email && $password && $intro ) {
    $user_id = uniqid();
    $password = password_hash( $password, PASSWORD_DEFAULT );
    $query = "SELECT * FROM `users` WHERE email = '".mysqli_real_escape_string( $link, $email )."'";
    $result = mysqli_query( $link, $query );
    if ( mysqli_num_rows( $result ) > 0 ) {
        $data = ['Publisher already exits', 'Publisher already exits'];
        echo json_encode( $data );
    } else {
        $query = "INSERT INTO `users` (`firstName`, `middleName`, `lastName`, `user_id`, `mobile`, `email`, `password`, `intro` ) VALUES (
            '".mysqli_real_escape_string( $link, $firstname )."', 
            '".mysqli_real_escape_string( $link, $middlename )."', 
            '".mysqli_real_escape_string( $link, $lastname )."', 
            '".mysqli_real_escape_string( $link, $user_id )."', 
            '".mysqli_real_escape_string( $link, $mobile )."', 
            '".mysqli_real_escape_string( $link, $email )."', 
            '".mysqli_real_escape_string( $link, $password )."', 
            '".mysqli_real_escape_string( $link, $intro )."'
        )";

        if ( mysqli_query( $link, $query ) ) {
            $id = mysqli_insert_id( $link );
            $data = ['Success', $id];
            echo json_encode( $data );

        } else {
            echo json_encode( 'An Error Occured, Please Try Again Later' );
        }
    }
} else {
    echo json_encode( 'Invalid Data' );
}
?>