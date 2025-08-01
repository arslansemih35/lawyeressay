<?php
// CORS headers for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Ad soyad alanı zorunludur.';
}

if (empty($email)) {
    $errors[] = 'E-posta alanı zorunludur.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Geçerli bir e-posta adresi giriniz.';
}

if (empty($message)) {
    $errors[] = 'Mesaj alanı zorunludur.';
}

if (empty($service)) {
    $errors[] = 'Hizmet alanı seçimi zorunludur.';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'errors' => $errors
    ]);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Service mapping
$serviceNames = [
    'ceza' => 'Ceza Hukuku',
    'aile' => 'Aile Hukuku',
    'ticaret' => 'Ticaret Hukuku',
    'is' => 'İş Hukuku',
    'gayrimenkul' => 'Gayrimenkul Hukuku',
    'icra' => 'İcra ve İflas',
    'diger' => 'Diğer'
];

$serviceName = isset($serviceNames[$service]) ? $serviceNames[$service] : $service;

// Prepare email content
$to = 'info@arslanhukuk.com'; // Ana e-posta adresi
$subject = 'Arslan Hukuk Bürosu - Yeni İletişim Formu Mesajı';

$emailBody = "
Yeni bir iletişim formu mesajı alındı:

Ad Soyad: {$name}
E-posta: {$email}
Telefon: {$phone}
Hizmet Alanı: {$serviceName}

Mesaj:
{$message}

---
Bu mesaj Arslan Hukuk Bürosu web sitesinden gönderilmiştir.
Gönderim Tarihi: " . date('d.m.Y H:i:s') . "
IP Adresi: " . $_SERVER['REMOTE_ADDR'] . "
";

$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

// Also send to individual lawyers based on service
$additionalEmails = [];
if (in_array($service, ['ceza', 'is'])) {
    $additionalEmails[] = 'ahmet@arslanhukuk.com';
}
if (in_array($service, ['aile', 'ticaret', 'gayrimenkul'])) {
    $additionalEmails[] = 'mehmet@arslanhukuk.com';
}

foreach ($additionalEmails as $additionalEmail) {
    mail($additionalEmail, $subject, $emailBody, implode("\r\n", $headers));
}

// Send confirmation email to the user
$userSubject = 'Arslan Hukuk Bürosu - Mesajınız Alındı';
$userBody = "
Sayın {$name},

Mesajınız başarıyla alınmıştır. En kısa sürede size dönüş yapacağız.

Mesajınızın detayları:
Hizmet Alanı: {$serviceName}
Mesaj: {$message}

Teşekkürler,
Arslan Hukuk Bürosu
Ahmet & Mehmet Arslan

---
İletişim Bilgileri:
Telefon: (5xx) xxx xx xx
E-posta: info@arslanhukuk.com
Adres: İstanbul, Türkiye
";

$userHeaders = [
    'From: Arslan Hukuk Bürosu <info@arslanhukuk.com>',
    'Reply-To: info@arslanhukuk.com',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

mail($email, $userSubject, $userBody, implode("\r\n", $userHeaders));

// Log the contact form submission
$logEntry = date('Y-m-d H:i:s') . " | " . $_SERVER['REMOTE_ADDR'] . " | " . $name . " | " . $email . " | " . $serviceName . "\n";
file_put_contents('contact_log.txt', $logEntry, FILE_APPEND | LOCK_EX);

// Return success response
if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    ]);
}
?>
