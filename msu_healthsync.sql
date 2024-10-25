-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 24, 2024 at 03:41 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `msu_healthsync`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
CREATE TABLE IF NOT EXISTS `medicines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `recordLevel` int DEFAULT NULL,
  `expiryDate` date NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `quantity`, `recordLevel`, `expiryDate`, `category`, `createdAt`, `updatedAt`) VALUES
(1, 'Paracetamol', 100, 10, '2025-12-31', 'Pain Reliever', '2024-10-20 14:59:56', '2024-10-20 14:59:56'),
(2, 'Amoxicillin', 50, 5, '2024-08-31', 'Antibiotic', '2024-10-20 14:59:56', '2024-10-20 14:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `parentName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `bloodType` varchar(3) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `medicalHistory` text COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `firstName`, `lastName`, `parentName`, `contact`, `address`, `height`, `weight`, `bloodType`, `medicalHistory`, `createdAt`) VALUES
(1, 'John', 'Doe', 'Jane Doe', '09123456789', '123 Main St', 170.00, 65.00, 'O+', 'Asthma, Allergies', '2024-10-20 14:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `serviceType` enum('Checkup','Dental','Admission','Certificate') COLLATE utf8mb4_general_ci NOT NULL,
  `patientName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `doctorInCharge` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `medicalNotes` text COLLATE utf8mb4_general_ci,
  `bloodPressure` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `respiratoryRate` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pulseRate` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `temperature` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `medication` text COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `date`, `serviceType`, `patientName`, `doctorInCharge`, `medicalNotes`, `bloodPressure`, `respiratoryRate`, `pulseRate`, `temperature`, `medication`, `createdAt`, `updatedAt`) VALUES
(1, '2024-10-15', 'Checkup', 'John Doe', 'Dr. Smith', 'Routine checkup', '120/80', '16', '72', '36.5', 'Vitamin C', '2024-10-20 14:59:56', '2024-10-20 14:59:56'),
(2, '2024-10-15', 'Dental', 'Chynna Alemania', 'Dr. Cupo', 'May bungal', '120/80', '15', '72', '35', 'Mefenamic', '2024-10-21 07:10:41', '2024-10-21 07:10:41');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
