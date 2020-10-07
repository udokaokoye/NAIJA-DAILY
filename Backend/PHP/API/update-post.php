<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );
// $middlename = $obj['data'];

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    $error = false;
    $video_full_path = '';
    $image_1 = '';
    $image_2 = '';
    $image_3 = '';
    $image_4 = '';
    if ( isset( $_FILES['image1'] ) ) {
        $path = 'Images/';
        $file_name = $_FILES['image1']['name'];
        $file_tmp = $_FILES['image1']['tmp_name'];
        $file_type = $_FILES['image1']['type'];
        $file = $path . $file_name;
        if ( move_uploaded_file( $file_tmp, $file ) ) {
            $error = false;
            $image_1 = URLROOT . $file;
        } else {
            $error = true;
        }
    }

    if ( isset( $_FILES['image2'] ) ) {
        $path = 'Images/';
        $file_name = $_FILES['image2']['name'];
        $file_tmp = $_FILES['image2']['tmp_name'];
        $file_type = $_FILES['image2']['type'];
        $file = $path . $file_name;
        if ( move_uploaded_file( $file_tmp, $file ) ) {
            $error = false;
            $image_2 = URLROOT . $file;
        } else {
            $error = true;
        }
    }

    if ( isset( $_FILES['image3'] ) ) {
        $path = 'Images/';
        $file_name = $_FILES['image3']['name'];
        $file_tmp = $_FILES['image3']['tmp_name'];
        $file_type = $_FILES['image3']['type'];
        $file = $path . $file_name;
        if ( move_uploaded_file( $file_tmp, $file ) ) {
            $error = false;
            $image_3 = URLROOT . $file;
        } else {
            $error = true;
        }
    }

    if ( isset( $_FILES['image4'] ) ) {
        $path = 'Images/';
        $file_name = $_FILES['image4']['name'];
        $file_tmp = $_FILES['image4']['tmp_name'];
        $file_type = $_FILES['image4']['type'];
        $file = $path . $file_name;
        if ( move_uploaded_file( $file_tmp, $file ) ) {
            $error = false;
            $image_4 = URLROOT . $file;
        } else {
            $error = true;
        }
    }

    if ( isset( $_FILES['videos'] ) ) {

        $vid_path = 'Videos/';
        $all_vid_files = count( $_FILES['videos']['tmp_name'] );
        for ( $v = 0; $v < $all_vid_files; $v++ ) {
            $vid_name = $_FILES['videos']['name'][$v];
            $vid_tmp = $_FILES['videos']['tmp_name'][$v];
            // $file_type = $_FILES['videos']['type'][$v];
            // $vid_size = $_FILES['videos']['size'][$v];
            // $file_ext = strtolower( end( explode( '.', $_FILES['files']['name'][$v] ) ) );
            $vid_file = $vid_path . $vid_name;
            if ( move_uploaded_file( $vid_tmp, $vid_file ) ) {
                $error = false;
                $video_full_path = URLROOT . $vid_file;
            } else {
                $error = true;
            }
            // echo json_encode( $file_type );
            // return;
        }
        // echo json_encode( $all_vid_files );
        // return;

    }

    if ( !$error ) {
        $title = $_POST['title'];
        $summary = $_POST['summary'];
        $body = $_POST['body'];
        $category = $_POST['category'];
        $video = $_POST['video'];
        $postId = $_POST['id'];

        if ( $image_1 !== '' ) {
            $upload_img1 = $image_1;
        } else {
            $upload_img1 = $_POST['old_img1'];
        }

        if ( $image_2 !== '' ) {
            $upload_img2 = $image_2;
        } else {
            $upload_img2 = $_POST['old_img2'];
        }

        if ( $image_3 !== '' ) {
            $upload_img3 = $image_3;
        } else {
            $upload_img3 = $_POST['old_img3'];
        }

        if ( $image_4 !== '' ) {
            $upload_img4 = $image_4;
        } else {
            $upload_img4 = $_POST['old_img4'];
        }

        if ( $video_full_path !== '' ) {
            $upload_video = $video_full_path;
        } else {
            $upload_video = $_POST['video_path'];
        }

        $query = "UPDATE `posts` SET 
        `category` = '$category',
        `title` = '$title', 
        `summary` = '$summary', 
        `content` = '$body', 
        `picture_1` = '$upload_img1', 
        `picture_2` = '$upload_img2', 
        `picture_3` = '$upload_img3', 
        `picture_4` = '$upload_img4', 
        `video` = '$video', 
        `video_path` = '$upload_video'
         WHERE `post_id` = '$postId'";

        if ( mysqli_query( $link, $query ) ) {
            echo json_encode( 'Updated Post Successfully' );
        } else {
            echo json_encode( 'failed' );
        }

        // echo json_encode( 'No error' );
    } else {
        echo json_encode( 'An error occured' );
    }
}
?>