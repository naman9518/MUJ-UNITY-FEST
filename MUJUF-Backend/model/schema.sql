CREATE DATABASE IF NOT EXISTS muj;
USE muj;


CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(50) ,
    password VARCHAR(100) NOT NULL,
    phone BIGINT UNSIGNED NOT NULL UNIQUE,
    role ENUM("user", "admin", "member") NOT NULL DEFAULT "user",
    phone2 BIGINT UNSIGNED,
    image VARCHAR(300),
    universityEmail  VARCHAR(100) NOT NULL,
    batch ENUM("1","2","3","4","5","6","7","8","9"),
    course ENUM("bca", "bba", "bcom", "mcom", "mba", "mca")
);

CREATE TABLE IF NOT EXISTS verification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  universityEmail VARCHAR(255) ,
  otp BIGINT ,
  otpExpiryAt DATETIME 
);

CREATE TABLE IF NOT EXISTS sponsors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  companyName VARCHAR(200) NOT NULL,
  companyEmail VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(15) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  message TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_queries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100),
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  enquiryType VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);








