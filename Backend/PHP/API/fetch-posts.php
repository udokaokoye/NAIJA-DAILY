<?php
include './connection.php';
$json = file_get_contents( 'php://input' );
$obj = json_decode( $json, true );

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    if ( isset( $_GET['category'] ) ) {
        $category = $_GET['category'];

        if ( $category == 'all' || $category == 'News' ) {
            $query = 'SELECT * FROM posts ORDER BY `created_at` DESC';
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'metro plus' || $category == 'Metro Plus' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'METRO PLUS' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'videos' || $category == 'Videos' ) {
            $query = "SELECT * FROM posts WHERE `video` = 'true' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'sports'  || $category == 'Sports' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'SPORT' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'entertainment'  || $category == 'Entertainment' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'ENTERTAINMENT' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'politics'  || $category == 'Politics' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'POLITICS' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'business'  || $category == 'Business' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'BUSINESS' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'video'  || $category == 'Video' ) {
            $query = "SELECT * FROM posts WHERE `video` = 'true' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'health'  || $category == 'Health' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'HEALTH' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }

        if ( $category == 'foreign'  || $category == 'Foreign' ) {
            $query = "SELECT * FROM posts WHERE `category` = 'FOREIGN' ORDER BY `created_at` DESC";
            $result = mysqli_query( $link, $query );
            $data = [];
            if ( mysqli_num_rows( $result ) > 0 ) {
                while ( $row = mysqli_fetch_array( $result ) ) {
                    array_push( $data, $row );
                }
                echo json_encode( $data );
            } else {
                echo json_encode( $data );
            }
        }
    }

    if ( isset( $_GET['slug'] ) ) {
        $slug = $_GET['slug'];

        $query = "SELECT * FROM posts WHERE `slug` = '$slug'";
        $result = mysqli_query( $link, $query );
        $data = [];
        if ( mysqli_num_rows( $result ) > 0 ) {
            while ( $row = mysqli_fetch_array( $result ) ) {
                array_push( $data, $row );
            }
            echo json_encode( $data );
        } else {
            echo json_encode( $data );
        }
    }

}

?>