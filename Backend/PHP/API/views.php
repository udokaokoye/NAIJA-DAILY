<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    if ( isset( $_POST['ip'] ) ) {
        $new_views = array();
        $ip = $_POST['ip'];
        $slug = $_POST['slug'];
        $query = "SELECT * FROM posts WHERE `slug` = '$slug'";
        $result = mysqli_query( $link, $query );
        $row = mysqli_fetch_array( $result );
        $views_db = unserialize( $row['views'] );

        array_push( $views_db, $_POST['ip'] );
        $arr_upload = serialize( $views_db );

        // echo json_encode( $views_db );

        $query = "UPDATE `posts` SET `views`='".$arr_upload."' WHERE `slug`='$slug'";
        mysqli_query( $link, $query );
    } else {
        echo json_encode( 'NO IP' );
    }
} else {
    echo 'NO ACESS';
}

?>