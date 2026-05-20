#Comandos principales para las dependencias y configuracion inicial.
composer install


#Comandos laravel para la configuracion inicial.
php artisan key:generate
php artisan migrate
php artisan migrate --seed
#Con fresh
php artisan migrate:fresh --seed

