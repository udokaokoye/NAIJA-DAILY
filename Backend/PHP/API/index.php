<?php

$pass = 'advantage';
$email = 'leviokoye@gmail.com';

$hash = password_hash( $pass, PASSWORD_DEFAULT );

echo $hash;

if ( isset( $_POST['sub'] ) ) {

    $txt = $_POST['txt'];

    if ( password_verify( $txt, $hash ) ) {
        echo '<h1>Success</h1>';
    } else {
        echo '<h1>error</h1>';
    }
}

?>

<form method='post'>
    <input type='text' name='txt' id=''>

    <input type='submit' name='sub' value='submit'>
</form>