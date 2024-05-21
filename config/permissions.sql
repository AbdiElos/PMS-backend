-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 11:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmsdb2`
--

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `group_code` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `name`, `createdAt`, `updatedAt`, `group_code`) VALUES
('042b3d2d-f0bd-11ee-a446-c01803d475fd', 'get teams;', '2024-04-02 08:48:22', '2024-04-02 08:48:22', 7),
('0f94a3e8-0da4-11ef-84b6-b48c9dac3d22', 'update user', '2024-05-09 03:30:20', '2024-05-09 03:30:20', 2),
('0f94acc0-0da4-11ef-84b6-b48c9dac3d22', 'delete user', '2024-05-09 03:30:20', '2024-05-09 03:30:20', 2),
('2f0a102e-0df5-11ef-9350-b48c9dac3d22', 'create task', '2024-05-09 13:13:03', '2024-05-09 13:13:03', 5),
('2f0a18df-0df5-11ef-9350-b48c9dac3d22', 'update task', '2024-05-09 13:13:03', '2024-05-09 13:13:03', 5),
('2f33c5e4-f009-11ee-bd81-c01803d475fd', 'register new user', '2024-04-01 11:20:40', '2024-04-01 11:20:40', 2),
('2f33cdc1-f009-11ee-bd81-c01803d475fd', 'change password', '2024-04-01 11:20:40', '2024-04-01 11:20:40', 2),
('355eef05-f0b9-11ee-a446-c01803d475fd', 'create organization', '2024-04-02 08:20:48', '2024-04-02 08:20:48', 1),
('355ef6c3-f0b9-11ee-a446-c01803d475fd', 'update organization', '2024-04-02 08:20:48', '2024-04-02 08:20:48', 1),
('414c220c-f009-11ee-bd81-c01803d475fd', 'delete organization unit', '2024-04-01 11:21:19', '2024-04-01 11:21:19', 1),
('414c2ab4-f009-11ee-bd81-c01803d475fd', 'delete organization', '2024-04-01 11:21:19', '2024-04-01 11:21:19', 1),
('55094e25-0df5-11ef-9350-b48c9dac3d22', 'create task', '2024-05-09 13:14:03', '2024-05-09 13:14:03', 5),
('550954bf-0df5-11ef-9350-b48c9dac3d22', 'update task', '2024-05-09 13:14:03', '2024-05-09 13:14:03', 5),
('555b9d74-f0b9-11ee-a446-c01803d475fd', 'create organization unit', '2024-04-02 08:21:29', '2024-04-02 08:21:29', 1),
('555ba555-f0b9-11ee-a446-c01803d475fd', 'update organization unit', '2024-04-02 08:21:29', '2024-04-02 08:21:29', 1),
('62a21d4f-0df5-11ef-9350-b48c9dac3d22', 'get task', '2024-05-09 13:14:44', '2024-05-09 13:14:44', 5),
('62a22447-0df5-11ef-9350-b48c9dac3d22', 'get all task', '2024-05-09 13:14:44', '2024-05-09 13:14:44', 5),
('799466dd-0df4-11ef-9350-b48c9dac3d22', 'create activity', '2024-05-09 13:08:00', '2024-05-09 13:08:00', 4),
('79946ef6-0df4-11ef-9350-b48c9dac3d22', 'update activity', '2024-05-09 13:08:00', '2024-05-09 13:08:00', 4),
('7cacae67-f0b9-11ee-a446-c01803d475fd', 'change user status', '2024-04-02 08:22:49', '2024-04-02 08:22:49', 2),
('7cacb6b1-f0b9-11ee-a446-c01803d475fd', 'create team', '2024-04-02 08:22:49', '2024-04-02 08:22:49', 7),
('85e8ca24-0df3-11ef-9350-b48c9dac3d22', 'get all  project', '2024-05-09 13:01:02', '2024-05-09 13:01:02', 3),
('85e8d424-0df3-11ef-9350-b48c9dac3d22', 'get specific project', '2024-05-09 13:01:02', '2024-05-09 13:01:02', 3),
('86ae5a26-f0b9-11ee-a446-c01803d475fd', 'update team', '2024-04-02 08:23:17', '2024-04-02 08:23:17', 7),
('86ae647e-f0b9-11ee-a446-c01803d475fd', 'delete team', '2024-04-02 08:23:17', '2024-04-02 08:23:17', 7),
('8bc30fe2-fdab-11ee-889c-c01803d475fd', 'Delete project', '2024-04-18 19:45:28', '2024-04-18 19:45:28', 3),
('8bc31df5-fdab-11ee-889c-c01803d475fd', 'Delete Activity', '2024-04-18 19:45:28', '2024-04-18 19:45:28', 4),
('9907dce2-0da5-11ef-84b6-b48c9dac3d22', 'get all user', '2024-05-09 03:42:51', '2024-05-09 03:42:51', 2),
('9907e4ed-0da5-11ef-84b6-b48c9dac3d22', 'get specific user', '2024-05-09 03:42:51', '2024-05-09 03:42:51', 2),
('b5d82643-0df4-11ef-9350-b48c9dac3d22', 'get all activity', '2024-05-09 13:09:37', '2024-05-09 13:09:37', 4),
('b5d82d4a-0df4-11ef-9350-b48c9dac3d22', 'get activity', '2024-05-09 13:09:37', '2024-05-09 13:09:37', 4),
('c2064335-0df7-11ef-9350-b48c9dac3d22', 'get all teams', '2024-05-09 13:31:49', '2024-05-09 13:31:49', 7),
('c3751b5f-0df6-11ef-9350-b48c9dac3d22', 'update sub task', '2024-05-09 13:24:36', '2024-05-09 13:24:36', 6),
('c5c6eeb6-fdab-11ee-889c-c01803d475fd', 'Delete Major task', '2024-04-18 19:47:03', '2024-04-18 19:47:03', 4),
('c5c6f7ad-fdab-11ee-889c-c01803d475fe', 'Delete Task', '2024-04-18 19:47:03', '2024-04-18 19:47:03', 5),
('dce2f829-0df5-11ef-9350-b48c9dac3d22', 'get sub task', '2024-05-09 13:18:02', '2024-05-09 13:18:02', 6),
('dce2fde1-0df5-11ef-9350-b48c9dac3d22', 'get all sub task', '2024-05-09 13:18:02', '2024-05-09 13:18:02', 6),
('dd00ad1b-fdab-11ee-889c-c01803d475fd', 'Delete Sub task', '2024-04-18 19:47:55', '2024-04-18 19:47:55', 6),
('dd00b44f-fdab-11ee-889c-c01803d475fg', 'Create Sub Task', '2024-04-18 19:47:55', '2024-04-18 19:47:55', 6),
('ee4921a4-0df2-11ef-9350-b48c9dac3d22', 'create project', '2024-05-09 12:56:48', '2024-05-09 12:56:48', 3),
('ee4928bc-0df2-11ef-9350-b48c9dac3d22', 'update project', '2024-05-09 12:56:48', '2024-05-09 12:56:48', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
