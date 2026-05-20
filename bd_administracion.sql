-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2026 a las 15:26:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_administracion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidads`
--

CREATE TABLE `especialidads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidads`
--

INSERT INTO `especialidads` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Pediatría', 'Descripcion de Pediatria xd', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(2, 'Cardiología', 'Descripcion de Cardiologia xd', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(3, 'Odontología,', 'Descripcion de Odontologia xd', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(4, 'Ginecología,', 'Descripcion de Ginecologia xd', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(5, 'Medicina General', 'Descripcion de Medicina General xd', '2026-05-20 17:23:01', '2026-05-20 17:23:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `especialidad_id` bigint(20) UNSIGNED NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `nombre_completo`, `especialidad_id`, `telefono`, `email`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Adrián Ruvalcaba', 1, '+34 981-14-2213', 'nquesada@example.org', 'activo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(2, 'María Sola', 2, '+34 987370773', 'kalfonso@example.com', 'inactivo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(3, 'Iván Garrido', 3, '+34 938-485289', 'bdelao@example.org', 'inactivo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(4, 'Lic. Ian Echevarría', 4, '+34 938-96-5913', 'wgodinez@example.com', 'activo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(5, 'José Terrazas Hijo', 5, '925 611448', 'guillem.pedroza@example.net', 'inactivo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(6, 'Lucía Rojas', 1, '998 021390', 'ian.pina@example.org', 'activo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(7, 'D. Asier Pantoja Hijo', 1, '+34 926 482328', 'hvelez@example.com', 'inactivo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(8, 'Encarnación Alonso', 4, '+34 965-61-3627', 'abril.dominguez@example.net', 'activo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(9, 'Raquel Bañuelos', 3, '958-73-2745', 'valdivia.oriol@example.net', 'activo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(10, 'Lic. Carlota Garay', 5, '926-474927', 'ycorona@example.net', 'inactivo', '2026-05-20 17:23:01', '2026-05-20 17:23:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_19_162138_create_especialidads_table', 1),
(5, '2026_05_19_162143_create_medicos_table', 1),
(6, '2026_05_19_163002_create_pacientes_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `direccion` text DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_paciente` enum('nuevo','recurrente') NOT NULL DEFAULT 'nuevo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre_completo`, `email`, `telefono`, `direccion`, `fecha_nacimiento`, `tipo_paciente`, `created_at`, `updated_at`) VALUES
(1, 'Luis Benito', 'bruno69@example.com', '922576941', 'Rúa Ángel, 72, 2º 9º, 64611, Olivo de la Sierra', '1975-01-11', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(2, 'Inmaculada Cabello', 'ochoa.eduardo@example.com', '976848051', 'Calle Maldonado, 90, Ático 5º, 74971, Los Naranjo', '1979-12-17', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(3, 'Alma Simón', 'hugo07@example.com', '+34 935 051755', 'Paseo Almanza, 2, 2º B, 36207, San Ávila', '1999-05-30', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(4, 'Esther Quiñónez', 'aranda.valentina@example.org', '959 658801', 'Travesía Gonzalo, 426, 8º D, 62478, L\' Izquierdo Alta', '2020-12-03', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(5, 'Rafael Marroquín', 'rolivo@example.org', '+34 998-15-9175', 'Avinguda Oliva, 432, 5º D, 97824, Gallardo del Puerto', '2016-03-27', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(6, 'Sandra Nájera', 'nadia.palacios@example.org', '+34 991 214041', 'Avenida Nerea, 644, 4º D, 72823, Blasco del Bages', '2024-03-31', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(7, 'Miguel Ángel Segovia', 'raquel.torrez@example.net', '+34 904-436148', 'Avinguda Salazar, 3, Entre suelo 0º, 54543, La Osorio Medio', '2014-10-21', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(8, 'Rosa Camarillo', 'flongoria@example.net', '989-571796', 'Avenida Inmaculada, 670, 68º A, 46685, Vall Ojeda', '2020-09-18', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(9, 'Victoria Santiago', 'matos.miriam@example.org', '990 521860', 'Avinguda Munguía, 569, 1º, 78159, Plaza de Lemos', '1974-02-02', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(10, 'Sra. Vega Domínguez Hijo', 'teresa93@example.com', '+34 947 00 1775', 'Carrer Palacios, 7, 37º 3º, 92554, Araña de San Pedro', '1971-03-09', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(11, 'Lic. Lara Castillo Tercero', 'briseno.yago@example.org', '+34 981-96-2450', 'Avinguda Fuentes, 49, 4º 4º, 51959, El Portillo de Ulla', '2026-02-01', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(12, 'Beatriz Ulibarri Tercero', 'nalonzo@example.com', '+34 915-713373', 'Passeig Ávalos, 602, 71º 0º, 06624, O Rosas', '2011-11-16', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(13, 'Miguel Ángel Cerda', 'natalia.almonte@example.com', '980-554526', 'Camino Natalia, 32, 4º 2º, 82693, Vall Giménez', '1972-11-08', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(14, 'Óscar Amaya', 'paez.fatima@example.com', '+34 982 71 1889', 'Travessera Loera, 53, 9º D, 57626, Santiago de la Sierra', '2022-03-19', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(15, 'María Pilar Bustos Tercero', 'vera59@example.org', '+34 915 999702', 'Avenida Martín, 20, 0º C, 56059, Os Casanova del Pozo', '2021-04-16', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(16, 'Ainara Valdez Hijo', 'quinonez.maria@example.org', '+34 982-473060', 'Avenida Leal, 8, 3º E, 28628, San Maldonado', '1988-10-09', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(17, 'Lucía Viera', 'lucas48@example.com', '+34 997 590157', 'Travesía Valdés, 7, Entre suelo 2º, 39624, Valverde del Bages', '2006-01-22', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(18, 'Dr. Aitor Anaya Tercero', 'noelia.vergara@example.com', '945739310', 'Avenida Regalado, 64, 1º C, 96026, Villa Lomeli del Pozo', '2004-03-06', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(19, 'Ariadna Benítez', 'valeria.orellana@example.org', '+34 937-400682', 'Travesía Carrillo, 1, 5º 5º, 50068, Altamirano del Penedès', '2000-06-15', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(20, 'Emilia Muro', 'wmarquez@example.com', '930 596278', 'Carrer Lorena, 695, 5º C, 08299, A Zayas Medio', '2024-05-22', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(21, 'Óscar Bernal', 'diana17@example.org', '+34 981-971016', 'Passeig Carrillo, 37, 4º F, 65018, Gaona de Lemos', '1993-09-05', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(22, 'Marta Paz', 'rosado.rodrigo@example.net', '+34 982-83-4267', 'Ronda Urrutia, 26, 01º E, 30030, Ordoñez de Arriba', '2019-07-11', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(23, 'Adrián Candelaria', 'zayas.alba@example.com', '921-910181', 'Camiño Aina, 4, 6º, 91576, Villa Casanova', '2005-11-18', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(24, 'Rodrigo Ybarra', 'ainhoa.ponce@example.org', '+34 948 817297', 'Passeig Barrientos, 614, 60º F, 60760, El Barroso del Bages', '2004-11-27', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(25, 'Ing. Fátima Jurado Segundo', 'marco.puig@example.com', '+34 937 68 4601', 'Travessera Martín, 345, 0º C, 23049, La Carrero', '1979-07-28', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(26, 'Miguel Ángel Santos Segundo', 'alba97@example.net', '923-735926', 'Passeig Guzmán, 3, Ático 7º, 54038, Sáenz del Pozo', '1973-05-25', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(27, 'Dña Rosario Delgado Segundo', 'victor85@example.net', '978-94-0608', 'Travessera Nayara, 6, 66º A, 87318, San Valle', '2005-04-05', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(28, 'Aurora Verdugo', 'glira@example.com', '+34 962-46-2284', 'Ronda Carballo, 390, Ático 0º, 82195, A Amaya', '1975-05-13', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(29, 'Ing. Pol Lugo', 'jlucio@example.org', '+34 944 69 7600', 'Plaza Pereira, 3, 8º E, 65019, La Ruiz', '2004-11-24', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(30, 'Sr. Antonio Arredondo', 'jon31@example.net', '+34 902 667252', 'Avinguda Chávez, 6, 5º C, 06316, Segura del Pozo', '1993-09-27', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(31, 'Dña Blanca Granados Tercero', 'martina.torrez@example.net', '+34 988991929', 'Paseo Gerard, 45, 6º C, 81211, As Robledo', '1991-09-04', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(32, 'Ismael Cabán', 'lgodoy@example.net', '914 049881', 'Ronda Arellano, 63, 6º C, 34851, San Anaya', '1975-09-16', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(33, 'Naiara Orellana', 'ttellez@example.net', '+34 923 170945', 'Plaza Omar, 9, Ático 8º, 09592, As Piñeiro', '2003-03-28', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(34, 'Alma Valles', 'marc32@example.net', '+34 949-590431', 'Paseo Pol, 597, 35º 4º, 98472, L\' Ayala Baja', '1991-02-15', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(35, 'Sonia Ros', 'yaiza.olivares@example.org', '943 62 8342', 'Ruela Vidal, 2, 4º F, 60022, Las Apodaca', '1976-12-23', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(36, 'Dña Beatriz Avilés', 'ocovarrubias@example.net', '942 672700', 'Ronda Pichardo, 7, 59º E, 48199, San Anaya del Bages', '1990-10-17', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(37, 'Izan Aparicio', 'berta88@example.net', '945-735154', 'Plaça Cristina, 32, 45º B, 95595, Vall Juan de San Pedro', '2000-06-08', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(38, 'Lic. Eduardo Cantú Segundo', 'icastellanos@example.com', '940-05-0469', 'Travessera Piña, 6, 3º 5º, 32127, Gastélum del Barco', '2017-02-08', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(39, 'Ana Isabel Puente', 'celia.valverde@example.org', '+34 907 082719', 'Travesía Marc, 672, 2º B, 11569, La Armijo', '2011-08-30', 'nuevo', '2026-05-20 17:23:01', '2026-05-20 17:23:01'),
(40, 'Dña Ana María Venegas', 'holguin.david@example.org', '+34 967 280272', 'Travesía Biel, 381, 1º, 15280, O Manzano', '2012-04-06', 'recurrente', '2026-05-20 17:23:01', '2026-05-20 17:23:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2026-05-20 17:23:00', '$2y$12$H.BBUXRoAExnkKf2ejOHqO8qlrw/gvU9okicJ2owRykanWdeJVL26', 'T141oSpGeT', '2026-05-20 17:23:01', '2026-05-20 17:23:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `especialidads`
--
ALTER TABLE `especialidads`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medicos_email_unique` (`email`),
  ADD KEY `medicos_especialidad_id_foreign` (`especialidad_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pacientes_email_unique` (`email`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especialidads`
--
ALTER TABLE `especialidads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_especialidad_id_foreign` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidads` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
