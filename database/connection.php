<?php
declare(strict_types=1);

function connectDatabase(): mysqli
{
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $database = getenv('DB_NAME') ?: 'casanova';
    $user = getenv('DB_USER');
    $password = getenv('DB_PASSWORD');

    if ($user === false || $user === '' || $password === false) {
        throw new RuntimeException('DB_USER și DB_PASSWORD trebuie configurate.');
    }
    if (!ctype_digit($port) || (int) $port < 1 || (int) $port > 65535) {
        throw new RuntimeException('DB_PORT este invalid.');
    }

    $connection = new mysqli($host, $user, $password, $database, (int) $port);
    $connection->set_charset('utf8mb4');
    return $connection;
}
