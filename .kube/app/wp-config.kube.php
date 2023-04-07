<?php

define('DB_NAME', getenv('DB_DATABASE'));
define('DB_USER', getenv('DB_USERNAME'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_HOST', getenv('DB_HOST') . ':' . (!empty(getenv('DB_PORT')) ? getenv('DB_PORT') : '3306'));
define('DB_CHARSET', (!empty(getenv('DB_CHARSET')) ? getenv('DB_CHARSET') : 'utf8'));
define('DB_COLLATE', (!empty(getenv('DB_COLLATE')) ? getenv('DB_COLLATE') : ''));

$table_prefix = (!empty(getenv('DB_TABLE_PREFIX')) ? getenv('DB_TABLE_PREFIX') : 'wp_');
define('WPLANG', '');
define('DISABLE_WP_CRON', true);

if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
  $_SERVER['HTTPS'] = 'on';
}

$scheme = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
define('WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST']);
define('WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST']);

define('DISALLOW_FILE_EDIT', true);
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', 0775);
define('FS_CHMOD_FILE', 0664);
define('WP_TEMP_DIR', dirname(__FILE__) . '/wp-content/uploads');

define('AUTH_KEY',         getenv('AUTH_KEY'));
define('SECURE_AUTH_KEY',  getenv('SECURE_AUTH_KEY'));
define('LOGGED_IN_KEY',    getenv('LOGGED_IN_KEY'));
define('NONCE_KEY',        getenv('NONCE_KEY'));
define('AUTH_SALT',        getenv('AUTH_SALT'));
define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));
define('LOGGED_IN_SALT',   getenv('LOGGED_IN_SALT'));
define('NONCE_SALT',       getenv('NONCE_SALT'));

if (!defined('ABSPATH')) {
  define('ABSPATH', dirname(__FILE__) . '/');
}

require_once(ABSPATH . 'wp-settings.php');

?>
