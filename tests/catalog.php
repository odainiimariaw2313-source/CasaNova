<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli' || $argc !== 2) {
    exit("Utilizare: php tests/catalog.php http://127.0.0.1:8000\n");
}

$base = rtrim($argv[1], '/');

function request(string $query): array
{
    global $base;
    $context = stream_context_create(['http' => ['ignore_errors' => true, 'timeout' => 10]]);
    $body = file_get_contents("$base/api/products.php?$query", false, $context);
    if ($body === false || !isset($http_response_header[0])
        || !preg_match('/^HTTP\/\S+ (\d{3})/', $http_response_header[0], $matches)) {
        throw new RuntimeException('Nu se poate accesa API-ul.');
    }
    return [(int) $matches[1], json_decode($body, true, 512, JSON_THROW_ON_ERROR)];
}

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

[$status, $first] = request('limit=1');
check($status === 200 && count($first['products']) === 1 && $first['total'] > 1, 'Lista sau paginarea este invalidă.');
[$status, $second] = request('limit=1&page=2');
check($status === 200 && $second['products'][0]['id'] !== $first['products'][0]['id'], 'A doua pagină nu este distinctă.');
$product = $first['products'][0];
[$status, $detail] = request('id=' . $product['id']);
check($status === 200 && $detail['product'] === $product, 'Detaliile produsului nu corespund listei.');
$filters = http_build_query(['category' => [$product['category']], 'q' => $product['name'], 'min' => $product['price'], 'max' => $product['price']]);
[$status, $filtered] = request($filters);
check($status === 200 && $filtered['total'] >= 1 && $filtered['products'][0]['id'] === $product['id'], 'Filtrarea nu a găsit produsul.');
[$status, $invalid] = request('id=1%20OR%201%3D1');
check($status === 400 && isset($invalid['error']), 'Identificatorul invalid nu a fost respins.');
[$status, $missing] = request('id=2147483647');
check($status === 404 && isset($missing['error']), 'Produsul inexistent nu a returnat 404.');
[$status, $invalid] = request('min=-1');
check($status === 400 && isset($invalid['error']), 'Prețul invalid nu a fost respins.');
echo "Testele catalogului au trecut.\n";
