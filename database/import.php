<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Disponibil doar din linia de comandă.');
}

require __DIR__ . '/connection.php';

try {
    if (!class_exists('ZipArchive')) {
        throw new RuntimeException('Extensia PHP zip este necesară pentru import.');
    }
    $archive = new ZipArchive();
    if ($archive->open(__DIR__ . '/../furniture.v2-release.openai.zip') !== true) {
        throw new RuntimeException('Arhiva de produse nu poate fi deschisă.');
    }
    $db = connectDatabase();
    $db->begin_transaction();
    $insert = $db->prepare(
        'INSERT INTO products (source_key, name, description, image_url, category, product_group, price)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE source_key = source_key'
    );
    $insert->bind_param('ssssssd', $key, $name, $description, $image, $category, $group, $price);

    $types = [
        'Chair' => ['Scaun', 'demonstrativ', 'Bucătărie', 'Scaune', 450.00],
        'Sofa' => ['Canapea', 'demonstrativă', 'Living', 'Canapele', 3500.00],
        'Table' => ['Masă', 'demonstrativă', 'Bucătărie', 'Mese', 1200.00],
    ];
    $added = 0;
    $existing = 0;
    $number = 0;
    foreach (['_annotations.train.jsonl', '_annotations.valid.jsonl', '_annotations.test.jsonl'] as $file) {
        $stream = $archive->getStream($file);
        if ($stream === false) {
            throw new RuntimeException("Fișierul $file lipsește din arhivă.");
        }
        while (($line = fgets($stream)) !== false) {
            $number++;
            $entry = json_decode($line, true, 512, JSON_THROW_ON_ERROR);
            $messages = $entry['messages'] ?? [];
            $image = $messages[2]['content'][0]['image_url']['url'] ?? '';
            $annotation = $messages[3]['content'] ?? '';
            if (!is_string($image) || !preg_match('~^https://transform\.roboflow\.com/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/transformed\.jpg$~D', $image)
                || !is_string($annotation) || !preg_match('/^<loc\d+><loc\d+><loc\d+><loc\d+> (Chair|Sofa|Table)$/D', $annotation, $matches)) {
                throw new RuntimeException("Înregistrare invalidă în $file, linia $number.");
            }
            [$label, $adjective, $category, $group, $price] = $types[$matches[1]];
            $key = hash('sha256', $image);
            $name = "$label $adjective $number";
            $description = "$label $adjective din setul de date Roboflow. Denumirea, descrierea și prețul sunt exemple, nu informații comerciale reale.";
            $insert->execute();
            if ($insert->affected_rows === 1) {
                $added++;
            } else {
                $existing++;
            }
        }
        if (!feof($stream)) {
            throw new RuntimeException("Nu s-a putut citi complet $file.");
        }
        fclose($stream);
    }
    $db->commit();
    $archive->close();
    echo "Import finalizat: $added produse adăugate, $existing deja existente.\n";
} catch (Throwable $error) {
    if (isset($db)) {
        $db->rollback();
    }
    fwrite(STDERR, "Import eșuat: " . $error->getMessage() . "\n");
    exit(1);
}
