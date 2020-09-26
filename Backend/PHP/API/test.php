<?php
include './connection.php';
if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    if ( isset( $_FILES['files'] ) ) {
        // // $errors = [];
        $path = 'Images/';
        // $extensions = ['jpg', 'jpeg', 'png', 'gif'];

        $all_files = count( $_FILES['files']['tmp_name'] );

        for ( $i = 0; $i < $all_files; $i++ ) {
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            // $file_ext = strtolower( end( explode( '.', $_FILES['files']['name'][$i] ) ) );

            $file = $path . $file_name;

            if ( move_uploaded_file( $file_tmp, $file ) ) {
                echo json_encode( $_POST['tst'] );
            } else {
                echo json_encode( 'error' );
            }
        }

        // if ( $errors ) print_r( json_encode( $errors ) );

        // print_r( json_encode( $_FILES['files'] ) );
        // echo json_encode( $_POST['tst'] );
    } else {
        echo json_encode( 'failed' );
    }
}