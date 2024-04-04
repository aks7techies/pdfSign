-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2024 at 04:54 PM
-- Server version: 8.0.36
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devglap7techies_nabl_glab`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_review`
--

CREATE TABLE `tbl_review` (
  `id` int NOT NULL,
  `AppID` int NOT NULL,
  `OrgId` int NOT NULL,
  `choose_option` varchar(50) DEFAULT NULL,
  `choose_remark` text NOT NULL,
  `IsActive` int NOT NULL,
  `insertDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Insertedby` int NOT NULL,
  `Insert_IP` varchar(100) DEFAULT NULL,
  `updateDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UpdatedBy` int NOT NULL,
  `Update_IP` varchar(100) DEFAULT NULL,
  `parent_id` int NOT NULL,
  `is_archive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_review`
--

INSERT INTO `tbl_review` (`id`, `AppID`, `OrgId`, `choose_option`, `choose_remark`, `IsActive`, `insertDate`, `Insertedby`, `Insert_IP`, `updateDate`, `UpdatedBy`, `Update_IP`, `parent_id`, `is_archive`) VALUES
(4087, 1216, 1217, 'Recommended', 'Recommended grant of recognition in the discipline of Chemical testing in accordance with NABL 139 for the applied scope. ', 0, '2024-02-02 04:38:50', 33, '106.221.55.117', '2024-02-02 04:38:50', 0, NULL, 0, 0),
(4242, 1216, 1217, 'Forwarded for approval', 'Recommended grant of recognition in the discipline of Chemical testing in accordance with NABL 139 for the applied scope.', 0, '2024-03-21 05:01:50', 16, '14.97.235.106', '2024-03-21 05:01:50', 0, NULL, 0, 0),
(4323, 1216, 1217, 'Reject', '', 0, '2024-03-22 10:52:39', 37, '14.97.235.106', '2024-03-22 10:52:39', 0, NULL, 0, 0);

--
-- Triggers `tbl_review`
--
DELIMITER $$
CREATE TRIGGER `tbl_review_delete` BEFORE DELETE ON `tbl_review` FOR EACH ROW INSERT INTO tbl_review_data_logs (`AppID`,`OrgId`,`choose_option`,`choose_remark`,`IsActive`,`insertDate`,`Insertedby`,`Insert_IP`,`updateDate`,`UpdatedBy`,`Update_IP`,`parent_id`,`is_archive`,SourceId,Action) VALUES (OLD.`AppID`,OLD.`OrgId`,OLD.`choose_option`,OLD.`choose_remark`,OLD.`IsActive`,OLD.`insertDate`,OLD.`Insertedby`,OLD.`Insert_IP`,OLD.`updateDate`,OLD.`UpdatedBy`,OLD.`Update_IP`,OLD.`parent_id`,OLD.`is_archive`,OLD.`id`, 'delete')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tbl_review_insert` AFTER INSERT ON `tbl_review` FOR EACH ROW INSERT INTO tbl_review_data_logs (`AppID`,`OrgId`,`choose_option`,`choose_remark`,`IsActive`,`insertDate`,`Insertedby`,`Insert_IP`,`updateDate`,`UpdatedBy`,`Update_IP`,`parent_id`,`is_archive`,SourceId,Action) VALUES (NEW.`AppID`,NEW.`OrgId`,NEW.`choose_option`,NEW.`choose_remark`,NEW.`IsActive`,NEW.`insertDate`,NEW.`Insertedby`,NEW.`Insert_IP`,NEW.`updateDate`,NEW.`UpdatedBy`,NEW.`Update_IP`,NEW.`parent_id`,NEW.`is_archive`,NEW.`id`, 'insert')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tbl_review_update` BEFORE UPDATE ON `tbl_review` FOR EACH ROW INSERT INTO tbl_review_data_logs (`AppID`,`OrgId`,`choose_option`,`choose_remark`,`IsActive`,`insertDate`,`Insertedby`,`Insert_IP`,`updateDate`,`UpdatedBy`,`Update_IP`,`parent_id`,`is_archive`,SourceId,Action) VALUES (OLD.`AppID`,OLD.`OrgId`,OLD.`choose_option`,OLD.`choose_remark`,OLD.`IsActive`,OLD.`insertDate`,OLD.`Insertedby`,OLD.`Insert_IP`,OLD.`updateDate`,OLD.`UpdatedBy`,OLD.`Update_IP`,OLD.`parent_id`,OLD.`is_archive`,OLD.`id`, 'update')
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_review`
--
ALTER TABLE `tbl_review`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_review`
--
ALTER TABLE `tbl_review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4449;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
