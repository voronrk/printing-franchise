<?php
require_once('settings.php');

$data = json_decode(file_get_contents('php://input'),true);
// $comment = wordwrap($data['comment'], 65, "<br />\n");
$comment = $data['comment'];

if (isset($data['address'])) {
    $subject = 'Отзыв на франшизу с сайта' . "\r\n";
    $message = "Имя: {$data['name']}\r\n
Город: {$data['city']}\r\n
E-mail: {$data['email']}\r\n
Телефон: {$data['phone']}\r\n
Адрес торговой точки: {$data['address']}\r\n
Комментарий: {$comment}";
} else {
    $subject = 'Заявка на франшизу с сайта' . "\r\n";
    $message = "Имя: {$data['name']}" . "\r\n" .
        "Город: {$data['city']}" . "\r\n" .
        "E-mail: {$data['email']}" . "\r\n" .
        "Телефон: {$data['phone']}" . "\r\n" .
        "Комментарий: {$comment}";
};

$headers = 'From: ' . EMAIL . "\r\n" .
    'Reply-To: ' . EMAIL . "\r\n" .
    'Content-Type: text/html; charset=UTF-8' . "\r\n" . 
    'X-Mailer: PHP/' . phpversion();

$result = mail(EMAIL, $subject, $message, $headers);

echo json_encode($result);
