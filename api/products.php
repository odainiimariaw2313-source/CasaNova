<?php
declare(strict_types=1);

require __DIR__ . '/../database/connection.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function positiveInteger(mixed $value, int $max): ?int
{
    if (!is_string($value) || !preg_match('/^[1-9][0-9]*$/D', $value)) {
        return null;
    }
    $number = filter_var($value, FILTER_VALIDATE_INT);
    return $number !== false && $number <= $max ? $number : null;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respond(405, ['error' => 'Metodă neacceptată.']);
}

try {
    $db = connectDatabase();
    $fields = 'id, name, description, image_url, category, product_group, price';
    if (isset($_GET['id'])) {
        $id = positiveInteger($_GET['id'], 4294967295);
        if ($id === null) {
            respond(400, ['error' => 'Identificator de produs invalid.']);
        }
        $statement = $db->prepare("SELECT $fields FROM products WHERE id = ?");
        $statement->bind_param('i', $id);
        $statement->execute();
        $product = $statement->get_result()->fetch_assoc();
        if ($product === null) {
            respond(404, ['error' => 'Produsul nu a fost găsit.']);
        }
        respond(200, ['product' => $product]);
    }

    $page = isset($_GET['page']) ? positiveInteger($_GET['page'], 100000) : 1;
    $limit = isset($_GET['limit']) ? positiveInteger($_GET['limit'], 50) : 18;
    $query = $_GET['q'] ?? '';
    $categories = $_GET['category'] ?? [];
    if ($page === null || $limit === null || !is_string($query) || strlen($query) > 400
        || !is_array($categories) || count($categories) > 10) {
        respond(400, ['error' => 'Parametri de căutare invalizi.']);
    }

    $conditions = [];
    $params = [];
    $types = '';
    if (trim($query) !== '') {
        $conditions[] = '(INSTR(name, ?) > 0 OR INSTR(category, ?) > 0 OR INSTR(product_group, ?) > 0)';
        $term = trim($query);
        array_push($params, $term, $term, $term);
        $types .= 'sss';
    }
    foreach ($categories as $category) {
        if (!is_string($category) || $category === '' || strlen($category) > 400) {
            respond(400, ['error' => 'Categorie invalidă.']);
        }
    }
    if ($categories !== []) {
        $conditions[] = 'category IN (' . implode(',', array_fill(0, count($categories), '?')) . ')';
        foreach ($categories as $category) {
            $params[] = $category;
            $types .= 's';
        }
    }
    foreach (['min' => '>=', 'max' => '<='] as $name => $operator) {
        if (isset($_GET[$name]) && $_GET[$name] !== '') {
            $value = $_GET[$name];
            if (!is_string($value) || !preg_match('/^\d{1,8}(?:\.\d{1,2})?$/D', $value)) {
                respond(400, ['error' => 'Preț invalid.']);
            }
            $conditions[] = "price $operator ?";
            $params[] = $value;
            $types .= 's';
        }
    }
    $where = $conditions ? ' WHERE ' . implode(' AND ', $conditions) : '';
    $countStatement = $db->prepare("SELECT COUNT(*) AS total FROM products$where");
    if ($types !== '') {
        $countStatement->bind_param($types, ...$params);
    }
    $countStatement->execute();
    $total = (int) $countStatement->get_result()->fetch_assoc()['total'];

    $offset = ($page - 1) * $limit;
    $statement = $db->prepare("SELECT $fields FROM products$where ORDER BY id LIMIT ? OFFSET ?");
    $params[] = $limit;
    $params[] = $offset;
    $types .= 'ii';
    $statement->bind_param($types, ...$params);
    $statement->execute();
    respond(200, [
        'products' => $statement->get_result()->fetch_all(MYSQLI_ASSOC),
        'total' => $total,
        'page' => $page,
        'limit' => $limit,
    ]);
} catch (Throwable $error) {
    error_log('CasaNova catalog: ' . $error->getMessage());
    respond(500, ['error' => 'Catalogul nu este disponibil momentan.']);
}
