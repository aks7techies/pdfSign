-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2024 at 04:55 PM
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
-- Table structure for table `tbl_application_allotment`
--

CREATE TABLE `tbl_application_allotment` (
  `id` int NOT NULL,
  `AppID` int NOT NULL,
  `Orgid` int NOT NULL,
  `AllotedTo` int DEFAULT NULL,
  `AllotmentType` enum('','review','JD','assessment','assessment-review') NOT NULL,
  `Remarks` text NOT NULL,
  `InActive` int DEFAULT NULL,
  `InActiveDate` varchar(255) NOT NULL,
  `InsertDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Insertedby` varchar(50) NOT NULL,
  `Client_IP` varchar(100) NOT NULL,
  `Updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UpdateedBy` varchar(50) NOT NULL,
  `Update_IP` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_application_allotment`
--

INSERT INTO `tbl_application_allotment` (`id`, `AppID`, `Orgid`, `AllotedTo`, `AllotmentType`, `Remarks`, `InActive`, `InActiveDate`, `InsertDate`, `Insertedby`, `Client_IP`, `Updated_date`, `UpdateedBy`, `Update_IP`) VALUES
(3583, 1216, 1217, 33, 'review', '', 1, '2024-02-02 09:31:09', '2024-02-02 04:01:06', '43', '182.78.81.110', '2024-02-02 09:31:09', '43', '182.78.81.110'),
(3584, 1216, 1217, 33, 'review', '', 1, '2024-03-22 16:22:39', '2024-02-02 04:01:09', '43', '182.78.81.110', '2024-03-22 16:22:39', '37', '14.97.235.106'),
(3687, 1216, 1217, 16, 'JD', '', 1, '2024-03-22 16:22:39', '2024-03-14 06:47:28', '43', '182.78.81.110', '2024-03-22 16:22:39', '37', '14.97.235.106'),
(3779, 1216, 1217, 16, 'JD', '', NULL, '', '2024-04-02 06:21:25', '43', '182.78.81.110', '2024-04-02 11:51:25', '', '');

--
-- Triggers `tbl_application_allotment`
--
DELIMITER $$
CREATE TRIGGER `tbl_application_allotment_delete` BEFORE DELETE ON `tbl_application_allotment` FOR EACH ROW INSERT INTO tbl_application_allotment_data_logs (`AppID`,`Orgid`,`AllotedTo`,`AllotmentType`,`Remarks`,`InActive`,`InActiveDate`,`InsertDate`,`Insertedby`,`Client_IP`,`Updated_date`,`UpdateedBy`,`Update_IP`,SourceId,Action) VALUES (OLD.`AppID`,OLD.`Orgid`,OLD.`AllotedTo`,OLD.`AllotmentType`,OLD.`Remarks`,OLD.`InActive`,OLD.`InActiveDate`,OLD.`InsertDate`,OLD.`Insertedby`,OLD.`Client_IP`,OLD.`Updated_date`,OLD.`UpdateedBy`,OLD.`Update_IP`,OLD.`id`, 'delete')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tbl_application_allotment_insert` AFTER INSERT ON `tbl_application_allotment` FOR EACH ROW INSERT INTO tbl_application_allotment_data_logs (`AppID`,`Orgid`,`AllotedTo`,`AllotmentType`,`Remarks`,`InActive`,`InActiveDate`,`InsertDate`,`Insertedby`,`Client_IP`,`Updated_date`,`UpdateedBy`,`Update_IP`,SourceId,Action) VALUES (NEW.`AppID`,NEW.`Orgid`,NEW.`AllotedTo`,NEW.`AllotmentType`,NEW.`Remarks`,NEW.`InActive`,NEW.`InActiveDate`,NEW.`InsertDate`,NEW.`Insertedby`,NEW.`Client_IP`,NEW.`Updated_date`,NEW.`UpdateedBy`,NEW.`Update_IP`,NEW.`id`, 'insert')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tbl_application_allotment_update` BEFORE UPDATE ON `tbl_application_allotment` FOR EACH ROW INSERT INTO tbl_application_allotment_data_logs (`AppID`,`Orgid`,`AllotedTo`,`AllotmentType`,`Remarks`,`InActive`,`InActiveDate`,`InsertDate`,`Insertedby`,`Client_IP`,`Updated_date`,`UpdateedBy`,`Update_IP`,SourceId,Action) VALUES (OLD.`AppID`,OLD.`Orgid`,OLD.`AllotedTo`,OLD.`AllotmentType`,OLD.`Remarks`,OLD.`InActive`,OLD.`InActiveDate`,OLD.`InsertDate`,OLD.`Insertedby`,OLD.`Client_IP`,OLD.`Updated_date`,OLD.`UpdateedBy`,OLD.`Update_IP`,OLD.`id`, 'update')
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_application_allotment`
--
ALTER TABLE `tbl_application_allotment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_application_allotment`
--
ALTER TABLE `tbl_application_allotment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3785;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
