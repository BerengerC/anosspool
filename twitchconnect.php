<?php

//Asking for token to Twitch if code is code is in URL
if($_GET['code']) {
    $data = array(
        'grant_type' => 'authorization_code',
        'client_id' => '6elDGyK8eaYhwqZM1rt57zKDmM7L47sMa5rhBIgK',
        'client_secret' => 'YtxlSPUdE7O6EVYrMn4BuSfyYFIkPFEGY4NexbdT',
        'redirect_uri' => 'http://anosspool.simplesilence.fr/twitchconnect.php',
        'code' => $_GET['code']
    ); //raw data for request
    $token_end_point = 'https://www.twitchalerts.com/api/v1.0/token'; // url for request without "?"
    $query_body .= http_build_query($data,'','&'); //return the formated string for request

    $ch = curl_init();

curl_setopt_array($ch, array(
    CURLOPT_URL => 'https://www.twitchalerts.com/api/v1.0/token',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_FOLLOWLOCATION => true
));

    $output = curl_exec($ch);
    $tokens = json_decode($output, true);

    setcookie('access_token',$tokens['access_token'],time()+900);
    setcookie('refresh_token',$tokens['refresh_token'],time()+900);
    header('location: http://anosspool.simplesilence.fr/');
}
?>