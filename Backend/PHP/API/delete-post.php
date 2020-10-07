<?php
include './connection.php';
// $middlename = $obj['data'];
$error = false;
if ( isset( $_GET['id'] ) ) {

    $id = $_GET['id'];

    if ( !$error ) {
        $query = "DELETE FROM `posts` WHERE `post_id` = '$id'";

        if ( mysqli_query( $link, $query ) ) {
            echo json_encode( 'Delete Post Sucessful' );
        } else {
            echo json_encode( 'An error occured while deleting post' );
        }
    } else {
        echo json_encode( 'There was an error' );
    }

}

?>