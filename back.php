<?php
require_once('settings.php');

$data = json_decode(file_get_contents('php://input'),true);

$subject = 'Заявка на франшизу с сайта' . "\r\n";
$message = "Имя: {$data['name']}\r\nГород: {$data['city']}\r\nE-mail: {$data['email']}\r\nТелефон: {$data['phone']}\r\nКомментарий: {$data['comment']}";

$headers = 'From: ' . EMAIL . "\r\n" .
    'Reply-To: ' . EMAIL . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// $result = mail(EMAIL, $subject, $message, $headers);
$result = mail(EMAIL, $subject, $message);

echo json_encode($result);
