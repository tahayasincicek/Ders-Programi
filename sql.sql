CREATE DATABASE ders_programi;
USE ders_programi;
CREATE TABLE dersler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    gun VARCHAR(50) NOT NULL,
    saat VARCHAR(50) NOT NULL,
    derslik VARCHAR(50) NOT NULL,
    ogretmen VARCHAR(255) NOT NULL
);
SHOW TABLES;
SELECT * FROM dersler;


