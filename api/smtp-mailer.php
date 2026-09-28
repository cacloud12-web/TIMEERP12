<?php
/**
 * Minimal SMTP mailer (SSL 465 / STARTTLS 587) — no Composer required.
 * Used by api/book-demo.php for Hostinger mailboxes.
 */
function bd_smtp_send($cfg, $to, $subject, $bodyText, $bodyHtml = '', $replyTo = '') {
  $host = isset($cfg['host']) ? $cfg['host'] : 'smtp.hostinger.com';
  $port = isset($cfg['port']) ? (int) $cfg['port'] : 465;
  $secure = isset($cfg['secure']) ? strtolower($cfg['secure']) : 'ssl';
  $user = isset($cfg['username']) ? $cfg['username'] : '';
  $pass = isset($cfg['password']) ? $cfg['password'] : '';
  $fromEmail = isset($cfg['from_email']) ? $cfg['from_email'] : $user;
  $fromName = isset($cfg['from_name']) ? $cfg['from_name'] : 'TimeERP';
  $timeout = isset($cfg['timeout']) ? (int) $cfg['timeout'] : 25;

  if ($user === '' || $pass === '') {
    return array('ok' => false, 'error' => 'SMTP is not configured. Add the info@timeerp.in mailbox password in api/mail-config.php.');
  }

  $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
  $errno = 0;
  $errstr = '';
  $fp = @stream_socket_client($remote, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);
  if (!$fp) {
    return array('ok' => false, 'error' => 'Cannot connect to SMTP (' . $errstr . ').');
  }
  stream_set_timeout($fp, $timeout);

  $read = function () use ($fp) {
    $data = '';
    while (!feof($fp)) {
      $line = fgets($fp, 515);
      if ($line === false) break;
      $data .= $line;
      if (isset($line[3]) && $line[3] === ' ') break;
    }
    return $data;
  };
  $write = function ($cmd) use ($fp) {
    fwrite($fp, $cmd . "\r\n");
  };
  $expect = function ($code) use ($read) {
    $resp = $read();
    if (strpos($resp, (string) $code) !== 0) {
      return array(false, $resp);
    }
    return array(true, $resp);
  };

  list($ok, $resp) = $expect(220);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'SMTP greeting failed: ' . trim($resp)); }

  $ehloHost = 'timeerp.com';
  $write('EHLO ' . $ehloHost);
  list($ok, $resp) = $expect(250);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'EHLO failed: ' . trim($resp)); }

  if ($secure === 'tls') {
    $write('STARTTLS');
    list($ok, $resp) = $expect(220);
    if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'STARTTLS failed: ' . trim($resp)); }
    if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      fclose($fp);
      return array('ok' => false, 'error' => 'TLS handshake failed.');
    }
    $write('EHLO ' . $ehloHost);
    list($ok, $resp) = $expect(250);
    if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'EHLO after TLS failed: ' . trim($resp)); }
  }

  $write('AUTH LOGIN');
  list($ok, $resp) = $expect(334);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'AUTH not accepted: ' . trim($resp)); }
  $write(base64_encode($user));
  list($ok, $resp) = $expect(334);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'SMTP username rejected.'); }
  $write(base64_encode($pass));
  list($ok, $resp) = $expect(235);
  if (!$ok) {
    fclose($fp);
    return array('ok' => false, 'error' => 'SMTP login failed. Check info@timeerp.in password in api/mail-config.php.');
  }

  $write('MAIL FROM:<' . $fromEmail . '>');
  list($ok, $resp) = $expect(250);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'MAIL FROM failed: ' . trim($resp)); }

  $write('RCPT TO:<' . $to . '>');
  list($ok, $resp) = $expect(250);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'RCPT TO failed: ' . trim($resp)); }

  $write('DATA');
  list($ok, $resp) = $expect(354);
  if (!$ok) { fclose($fp); return array('ok' => false, 'error' => 'DATA failed: ' . trim($resp)); }

  $boundary = 'bd_' . md5(uniqid((string) mt_rand(), true));
  $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $headers = array();
  $headers[] = 'Date: ' . date('r');
  $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
  $headers[] = 'To: <' . $to . '>';
  if ($replyTo !== '') $headers[] = 'Reply-To: <' . $replyTo . '>';
  $headers[] = 'Subject: ' . $encodedSubject;
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'X-Mailer: TimeERP-BookDemo/2.0';

  if ($bodyHtml !== '') {
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
    $message = implode("\r\n", $headers) . "\r\n\r\n"
      . '--' . $boundary . "\r\n"
      . "Content-Type: text/plain; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: 8bit\r\n\r\n"
      . $bodyText . "\r\n"
      . '--' . $boundary . "\r\n"
      . "Content-Type: text/html; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: 8bit\r\n\r\n"
      . $bodyHtml . "\r\n"
      . '--' . $boundary . "--\r\n";
  } else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $message = implode("\r\n", $headers) . "\r\n\r\n" . $bodyText . "\r\n";
  }

  /* GoDaddy SMTP rejects bare LF (must be CRLF throughout) */
  $message = str_replace("\r\n", "\n", $message);
  $message = str_replace("\r", "\n", $message);
  $message = str_replace("\n", "\r\n", $message);
  $message = preg_replace('/^\./m', '..', $message);
  fwrite($fp, $message . ".\r\n");
  list($ok, $resp) = $expect(250);
  $write('QUIT');
  fclose($fp);

  if (!$ok) return array('ok' => false, 'error' => 'Message rejected: ' . trim($resp));
  return array('ok' => true, 'error' => '');
}
