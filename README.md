# CasaNova Design

Prototip de magazin cu catalog MySQL și PHP. Paginile folosesc un singur fișier CSS (`style.css`) și unul JavaScript (`script.js`). Catalogul, căutarea, filtrele, paginarea și pagina produsului citesc datele prin `api/products.php`, folosind MySQLi orientat pe obiecte și interogări parametrizate.

## Instalare locală

Sunt necesare PHP 8.1 sau mai nou cu extensiile **mysqli** și **zip**, MySQL sau MariaDB, precum și clientul `mysql` sau `mariadb`. Extensia zip este necesară doar la import. Creați o bază de date numită `casanova` și un utilizator dedicat cu permisiuni pentru aceasta. De exemplu, dintr-un cont administrativ MySQL, înlocuind parola înainte de rulare:

```sql
CREATE DATABASE casanova CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'casanova_app'@'127.0.0.1' IDENTIFIED BY 'ALEGE_O_PAROLA';
GRANT SELECT, INSERT, UPDATE, CREATE ON casanova.* TO 'casanova_app'@'127.0.0.1';
```

Configurați variabilele de mediu în mediul serverului PHP. `DB_USER` și `DB_PASSWORD` sunt obligatorii (parola poate fi goală doar pentru un utilizator configurat astfel); `DB_HOST`, `DB_PORT` și `DB_NAME` sunt opționale și au valorile implicite `127.0.0.1`, `3306`, respectiv `casanova`. Nu salvați parolele în repository. Asigurați-vă că gazda din `CREATE USER` permite conexiuni de la serverul PHP.

Exemplu în Bash, de la rădăcina proiectului:

```sh
export DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=casanova DB_USER=casanova_app
read -rs -p "Parola bazei de date: " DB_PASSWORD; echo
export DB_PASSWORD
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p "$DB_NAME" < database/schema.sql
php database/import.php
php -S 127.0.0.1:8000
```

Deschideți `http://127.0.0.1:8000`. Nu folosiți `file://` sau un server exclusiv static: catalogul necesită PHP. `database/schema.sql` creează tabelul `products`; importul este doar pentru linia de comandă, se execută tranzacțional și nu suprascrie înregistrările deja importate. Pentru import sunt necesare drepturile `SELECT`, `INSERT` și `UPDATE`; după instalare, pentru afișare este suficient un cont cu `SELECT`. Configurați variabilele de mediu și pentru Apache/PHP-FPM la publicare. Pentru diagnosticare, erorile bazei de date se înregistrează în jurnalul PHP, fără a fi afișate vizitatorilor.

Pentru verificarea API-ului, cu serverul pornit și catalogul demonstrativ importat, rulați `php tests/catalog.php http://127.0.0.1:8000`.

## Date demonstrative și imagini

Arhiva furnizată `furniture.v2-release.openai.zip` conține 689 de adnotări pentru imagini, nu fișiere imagine sau date despre produse. Importul creează câte un produs demonstrativ pentru fiecare URL, cu nume, descriere și preț inventate; maparea categoriilor în site este orientativă. **Nu sunt produse, prețuri, disponibilitate sau condiții comerciale reale.** Reimportarea nu înlocuiește datele editate; actualizați produsele în MySQL când sunt disponibile informațiile reale.

Imaginile sunt încărcate direct de la Roboflow, nu din serverul site-ului; disponibilitatea lor depinde de serviciul extern și conexiunea vizitatorului. Setul „furniture” este atribuit lui Minoj Selvaraj, disponibil prin [Roboflow Universe](https://universe.roboflow.com/roboflow-100/furniture-ngpea), cu licența [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), conform `README.dataset.txt` din arhivă. Înlocuiți imaginile și informațiile demonstrative înainte de lansarea magazinului.

Formularul de contact, coșul și recenziile rămân demonstrative; nu se trimit mesaje și nu se plasează comenzi. Conturile și plățile nu sunt implementate. Restul imaginilor provin din machetele furnizate. Fonturile utilizează Google Fonts cu alternative locale. Iconițele Bootstrap Icons v1.11.3 sunt incluse local sub licența MIT din `assets/bootstrap-icons-LICENSE.txt`.
