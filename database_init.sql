CREATE DATABASE `ziplink`;

USE `ziplink`;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    url_original VARCHAR(255) NOT NULL,
    url_acortada VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE temp_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url_original VARCHAR(255) NOT NULL,
  url_acortada VARCHAR(50) NOT NULL UNIQUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_expiracion TIMESTAMP NOT NULL
);

CREATE EVENT clean_expired_links
ON SCHEDULE EVERY 1 DAY
DO
DELETE FROM temp_links WHERE fecha_expiracion <= NOW();



