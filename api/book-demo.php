<?php
/**
 * Book Demo form handler — sends lead email from info@timeerp.in
 * POST JSON or form-urlencoded fields.
 */
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(array('ok' => false, 'error' => 'Method not allowed.'));
  exit;
}

function bd_respond($ok, $error = '', $code = 200) {
  http_response_code($code);
  $out = array('ok' => (bool) $ok);
  if ($error !== '') $out['error'] = $error;
  echo json_encode($out);
  exit;
}

function bd_str($v, $max = 500) {
  $s = trim((string) $v);
  $s = preg_replace('/[\r\n]+/', ' ', $s);
  if (function_exists('mb_substr')) return mb_substr($s, 0, $max);
  return substr($s, 0, $max);
}

$raw = file_get_contents('php://input');
$data = array();
if ($raw) {
  $json = json_decode($raw, true);
  if (is_array($json)) $data = $json;
}
if (!$data) $data = $_POST;

/* Honeypot — bots fill hidden fields */
if (!empty($data['website']) || !empty($data['_hp'])) {
  bd_respond(true);
}

$fullName = bd_str(isset($data['fullName']) ? $data['fullName'] : '', 120);
$companyName = bd_str(isset($data['companyName']) ? $data['companyName'] : '', 160);
$email = bd_str(isset($data['email']) ? $data['email'] : '', 160);
$phone = preg_replace('/\D+/', '', isset($data['phone']) ? (string) $data['phone'] : '');
$industry = bd_str(isset($data['industry']) ? $data['industry'] : '', 80);
$companySize = bd_str(isset($data['companySize']) ? $data['companySize'] : '', 40);
$demoDate = bd_str(isset($data['demoDate']) ? $data['demoDate'] : '', 32);
$demoTime = bd_str(isset($data['demoTime']) ? $data['demoTime'] : '', 32);
$remarks = bd_str(isset($data['remarks']) ? $data['remarks'] : '', 1000);
$pageUrl = bd_str(isset($data['pageUrl']) ? $data['pageUrl'] : '', 300);

if (strlen($phone) >= 12 && strpos($phone, '91') === 0) $phone = substr($phone, 2, 10);
if (strlen($phone) === 11 && $phone[0] === '0') $phone = substr($phone, 1);
if (strlen($phone) > 10) $phone = substr($phone, 0, 10);

if (strlen($fullName) < 2) bd_respond(false, 'Full name is required.', 422);
if (!preg_match('/^[6-9]\d{9}$/', $phone)) bd_respond(false, 'Enter a valid 10-digit mobile number.', 422);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) bd_respond(false, 'Enter a valid email address.', 422);
if ($demoDate === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $demoDate)) bd_respond(false, 'Please select a demo date.', 422);
if ($demoTime === '') bd_respond(false, 'Please select a demo time.', 422);

$today = date('Y-m-d');
if ($demoDate < $today) bd_respond(false, 'Demo date cannot be in the past.', 422);

$safe = function ($v) {
  return htmlspecialchars((string) $v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$whenLabel = $demoDate . ' at ' . $demoTime;
$subject = 'New Demo Booking — ' . $fullName;
$bodyText = "New TimeERP demo request\n"
  . "========================\n\n"
  . "Full Name     : {$fullName}\n"
  . "Company       : " . ($companyName !== '' ? $companyName : '—') . "\n"
  . "Email         : " . ($email !== '' ? $email : '—') . "\n"
  . "Mobile        : {$phone}\n"
  . "Industry      : " . ($industry !== '' ? $industry : '—') . "\n"
  . "Company Size  : " . ($companySize !== '' ? $companySize : '—') . "\n"
  . "Preferred Date: {$demoDate}\n"
  . "Preferred Time: {$demoTime}\n"
  . "Remarks       : " . ($remarks !== '' ? $remarks : '—') . "\n"
  . "Page URL      : " . ($pageUrl !== '' ? $pageUrl : '—') . "\n"
  . "Submitted At  : " . date('Y-m-d H:i:s T') . "\n";

$bodyHtml = '<!DOCTYPE html><html><body style="font-family:Segoe UI,Arial,sans-serif;color:#1a2e2c;line-height:1.5">'
  . '<h2 style="color:#0d7a6e;margin:0 0 12px">New Demo Booking</h2>'
  . '<p style="margin:0 0 16px;color:#5a7370">A visitor requested a personalized demo on TimeERP.</p>'
  . '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px;border:1px solid #d0eeec">'
  . '<tr style="background:#f4fbfa"><td><strong>Full Name</strong></td><td>' . $safe($fullName) . '</td></tr>'
  . '<tr><td><strong>Company</strong></td><td>' . $safe($companyName !== '' ? $companyName : '—') . '</td></tr>'
  . '<tr style="background:#f4fbfa"><td><strong>Email</strong></td><td>' . $safe($email !== '' ? $email : '—') . '</td></tr>'
  . '<tr><td><strong>Mobile</strong></td><td>' . $safe($phone) . '</td></tr>'
  . '<tr style="background:#f4fbfa"><td><strong>Industry</strong></td><td>' . $safe($industry !== '' ? $industry : '—') . '</td></tr>'
  . '<tr><td><strong>Company Size</strong></td><td>' . $safe($companySize !== '' ? $companySize : '—') . '</td></tr>'
  . '<tr style="background:#f4fbfa"><td><strong>Preferred Date</strong></td><td>' . $safe($demoDate) . '</td></tr>'
  . '<tr><td><strong>Preferred Time</strong></td><td>' . $safe($demoTime) . '</td></tr>'
  . '<tr style="background:#f4fbfa"><td><strong>Remarks</strong></td><td>' . nl2br($safe($remarks !== '' ? $remarks : '—')) . '</td></tr>'
  . '<tr><td><strong>Page</strong></td><td>' . $safe($pageUrl !== '' ? $pageUrl : '—') . '</td></tr>'
  . '</table>'
  . '<p style="margin:16px 0 0;font-size:12px;color:#7a9593">Sent from timeerp.com Book Demo form · ' . $safe($whenLabel) . '</p>'
  . '</body></html>';

$logDir = __DIR__;
$logFile = $logDir . '/demo-leads.log';
$logLine = date('c') . "\t" . str_replace(array("\r", "\n", "\t"), ' ', $fullName . ' | ' . $phone . ' | ' . $email . ' | ' . $demoDate . ' ' . $demoTime) . "\n";
@file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

$configFile = __DIR__ . '/mail-config.php';
if (!is_file($configFile)) $configFile = __DIR__ . '/mail-config.example.php';
$mailCfg = is_file($configFile) ? include $configFile : array();
if (!is_array($mailCfg)) $mailCfg = array();

$FROM_EMAIL = !empty($mailCfg['from_email']) ? $mailCfg['from_email'] : 'info@timeerp.in';
$FROM_NAME = !empty($mailCfg['from_name']) ? $mailCfg['from_name'] : 'TimeERP';
$TO_EMAIL = !empty($mailCfg['to_email']) ? $mailCfg['to_email'] : 'info@timeerp.in';

require_once __DIR__ . '/smtp-mailer.php';

$replyTo = ($email !== '' ? $email : $FROM_EMAIL);
$result = bd_smtp_send($mailCfg, $TO_EMAIL, $subject, $bodyText, $bodyHtml, $replyTo);

if (empty($result['ok'])) {
  bd_respond(false, isset($result['error']) ? $result['error'] : 'Unable to send email right now.', 500);
}

/* Optional confirmation to visitor */
if ($email !== '') {
  $userSubject = 'We received your TimeERP demo request';
  $userBody = "Hi {$fullName},\n\n"
    . "Thanks for booking a demo with TimeERP.\n"
    . "Preferred slot: {$demoDate} at {$demoTime}\n\n"
    . "Our team will contact you shortly on {$phone} / {$email}.\n\n"
    . "— Team TimeERP\n"
    . "info@timeerp.in\n";
  bd_smtp_send($mailCfg, $email, $userSubject, $userBody, '', $FROM_EMAIL);
}

bd_respond(true);
