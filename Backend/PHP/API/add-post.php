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
        $views_arr = array();
        $serialized_views_array = serialize( $views_arr );
        $title = $_POST['title'];
        $summary = $_POST['summary'];
        $body = $_POST['body'];
        $slug = strtolower( str_replace( ' ', '-', $title ) );
        $category = $_POST['category'];
        $schedule = $_POST['schedule'];
        $video = $_POST['video'];
        $author_name = $_POST['author_name'];
        $author_id = $_POST['author_id'];
        $post_id = uniqid();
        $query = "INSERT INTO `posts` (`author_name`, `author_id`, `post_id`, `category`, `title`, `slug`, `summary`, `published`, `content`, `picture_1`, `picture_2`, `picture_3`, `picture_4`, `video`, `video_path`, `views`) VALUES (
            '".mysqli_real_escape_string( $link, $author_name )."', 
            '".mysqli_real_escape_string( $link, $author_id )."', 
            '".mysqli_real_escape_string( $link, $post_id )."', 
            '".mysqli_real_escape_string( $link, $category )."', 
            '".mysqli_real_escape_string( $link, $title )."', 
            '".mysqli_real_escape_string( $link, $slug )."', 
            '".mysqli_real_escape_string( $link, $summary )."', 
            '".mysqli_real_escape_string( $link, $schedule )."', 
            '".mysqli_real_escape_string( $link, $body )."', 
            '".mysqli_real_escape_string( $link, $image_1 )."', 
            '".mysqli_real_escape_string( $link, $image_2 )."', 
            '".mysqli_real_escape_string( $link, $image_3 )."', 
            '".mysqli_real_escape_string( $link, $image_4 )."', 
            '".mysqli_real_escape_string( $link, $video )."', 
            '".mysqli_real_escape_string( $link, $video_full_path )."', 
            '".$serialized_views_array."'
        )";

        if ( mysqli_query( $link, $query ) ) {
            $data = ['Success', 'Post Added Successfully'];
            echo json_encode( $data );

        } else {
            $data = ['Falied', 'An Error Occured, Please Try Again Later'];
            echo json_encode( $data );
        }
    }

    if ( $error ) {
        $data = ['Falied', 'An Error Occured While Uploading, Please Try Again Later'];
        echo json_encode( $data );

    }
} else {
    echo json_encode( 'BAD REQUEST' );
}
?>