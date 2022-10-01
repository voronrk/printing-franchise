<?php
require_once('settings.php');

$data = $_POST;
$fileData = $_FILES;

$comment = $data['comment'];

if (isset($data['address'])) {
    $filePath = 'files/' . time() . '.' . explode('.', $fileData['photo']['name'])[1];
    $fileUrl = 'https://' . $_SERVER['SERVER_NAME'] . preg_replace('{/[a-z]*\.php}', '/' . $filePath, $_SERVER['PHP_SELF']);
    copy($fileData['photo']['tmp_name'], $filePath);

    $subject = 'Отзыв на франшизу с сайта' . "\r\n";
    $message = "<p>Имя: {$data['name']}</p>
                <p>Город: {$data['city']}</p>
                <p>E-mail: {$data['email']}</p>
                <p>Телефон: {$data['phone']}</p>
                <p>Адрес торговой точки: {$data['address']}</p>
                <p>Комментарий: {$comment}</p>
                <img src=" . $fileUrl . ">";

} else {
    $subject = 'Заявка на франшизу с сайта' . "\r\n";
    $message = "<p>Имя: {$data['name']}</p>
                <p>Город: {$data['city']}</p>
                <p>E-mail: {$data['email']}</p>
                <p>Телефон: {$data['phone']}</p>
                <p>Комментарий: {$comment}</p>";
};

$headers = 'From: ' . EMAIL . "\r\n" .
    'Reply-To: ' . EMAIL . "\r\n" .
    'Content-Type: text/html; charset=UTF-8' . "\r\n" . 
    'X-Mailer: PHP/' . phpversion();

$result = mail(EMAIL, $subject, $message, $headers);

echo json_encode($result);
