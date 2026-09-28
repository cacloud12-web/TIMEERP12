<?php
/**
 * SMTP config for Book Demo emails (GoDaddy Professional Email / Titan).
 * Copy to mail-config.php and set the mailbox password.
 */
return array(
  'host' => 'smtpout.secureserver.net',
  'port' => 465,
  'secure' => 'ssl', // ssl (465) or tls (587)
  'username' => 'info@timeerp.in',
  'password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
  'from_email' => 'info@timeerp.in',
  'from_name' => 'TimeERP',
  'to_email' => 'info@timeerp.in',
  'timeout' => 25,
);
