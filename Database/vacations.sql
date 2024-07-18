CREATE DATABASE  IF NOT EXISTS `vacationsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacationsdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacationsdb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `UserId_idx` (`userId`),
  KEY `VacationId_idx` (`vacationId`),
  CONSTRAINT `UserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `VacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (5,95),(5,96),(5,98),(5,100),(21,97),(21,99),(22,96);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(150) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserRoleId_idx` (`roleId`),
  CONSTRAINT `UserRoleId` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Shlomi','Cohen','Shlomi10000@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',1),(5,'Yosi','Cohen','Yosi1000@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2),(6,'Alon','Soso','Alon10@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2),(19,'Soso','Cohen','Soso182.03424279532166@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2),(20,'Soso','Cohen','Soso372.2034823422065@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2),(21,'Assaf','Fink','assaf@gmail.com','5aa9bdda4669eed90cc4af436925fe0a1a8b8cac8893a7f065ee3e9b51a26d74f3bd3f1439c7ca4d22d1ce159ae8ced5b87904b664af1f8bc9f54bfbc6fb17fc',2),(22,'sdf\'sdfs','sdfsdf','sdfom@sldkjf.com','d6892c84a827afc9b33350dca25bb1a73fcc3a37dab4d4e2391c7fbc6ab51e6a18faabee6fd9e7faa296cea83d94142275bf5fc7353deccbb05dac357734f440',2),(23,'Moishe','Ufnik','assaf2@gmail.com','b354bebf529c31cb676a922691e119524cbd6ba03b638033b5ab6e12fe3f3c7118a2ea3be67154bb85235174245d9ad7c91362a4e74421dbf3710aea20efccba',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (95,'Maui, Hawaii','Maui is a diverse island in the Hawaiian archipelago, offering a wealth of natural wonders and outdoor adventures. From the lush rainforests of Hana to the lunar landscapes of Haleakalā National Park, there\'s something for every traveler. Experience world-class snorkeling at Molokini Crater, go whale watching in season, or simply bask in the island\'s aloha spirit on its golden beaches.','2024-05-26','2024-05-30',4500.00,'04d00ab7-ff85-4abf-a59f-b4afc6a02cb1.jpg'),(96,'Kyoto, Japan','Kyoto is Japan\'s cultural heart, boasting thousands of temples, shrines, and traditional gardens. Immerse yourself in the city\'s rich history as you stroll through the historic Gion district, explore the iconic Fushimi Inari Shrine, or participate in a traditional tea ceremony. With its timeless beauty and serene atmosphere, Kyoto offers a glimpse into Japan\'s ancient past.','2024-06-01','2024-06-05',5000.00,'a8b07798-a868-4f1b-aba8-23654dc82c8e.jpg'),(97,'Amalfi Coast, Italy','The Amalfi Coast is a breathtaking stretch of coastline in southern Italy, dotted with pastel-colored villages clinging to steep cliffs overlooking the Tyrrhenian Sea. Explore charming towns like Positano and Ravello, meander along scenic coastal trails, or sample fresh seafood at waterfront trattorias. With its Mediterranean charm and stunning vistas, the Amalfi Coast is a true Italian gem.','2024-07-01','2024-07-05',6000.00,'43c91d34-0987-473c-a87f-517d013df5cc.webp'),(98,'Banff National Park, Canada','Banff National Park is a natural playground in the heart of the Canadian Rockies, renowned for its pristine wilderness, towering mountains, and turquoise lakes. Outdoor enthusiasts can enjoy hiking, skiing, or wildlife viewing amidst stunning alpine scenery. Don\'t miss iconic landmarks like Lake Louise, Moraine Lake, and the Icefields Parkway, making Banff a paradise for nature lovers.','2024-08-01','2024-08-06',6500.00,'42bf5f23-023f-45e1-85fb-578e4f4fb6af.jpg'),(99,'Machu Picchu, Peru','Machu Picchu is an ancient Incan citadel nestled high in the Andes Mountains, shrouded in mist and mystery. This UNESCO World Heritage Site is a testament to the ingenuity of the Inca civilization, with its intricate stone temples, terraced fields, and panoramic vistas. Whether you hike the Inca Trail or take the train, a visit to Machu Picchu is a once-in-a-lifetime journey back in time.','2024-04-21','2024-04-25',1500.00,'21d9bffe-32e1-47cb-87c2-685afcc616f6.jpg'),(100,'The Maldives','The Maldives is a tropical paradise comprised of 26 atolls in the Indian Ocean, each with its own collection of idyllic islands and luxury resorts. Whether you\'re seeking romance, relaxation, or adventure, the Maldives has it all—from world-class diving and snorkeling to private beach picnics and spa treatments. With its crystal-clear waters, vibrant coral reefs, and overwater villas, it\'s the ultimate destination for a dreamy getaway.','2024-09-01','2024-09-05',8000.00,'9aa0603f-c430-4fdb-9ce1-d85a53309cee.webp'),(101,'Barcelona, Spain','Barcelona is a vibrant cosmopolitan city on the northeastern coast of Spain, blending centuries of history with cutting-edge architecture and design. Marvel at Antoni Gaudí\'s masterpieces like the Sagrada Familia and Park Güell, wander through the narrow streets of the Gothic Quarter, or soak up the sun on Barceloneta Beach. With its rich culture, culinary delights, and dynamic atmosphere, Barcelona captivates visitors with its endless charm.','2024-08-15','2024-08-20',9500.00,'6b775023-9815-4569-be8e-aab00b878dea.avif'),(102,'Dubai, United Arab Emirates','Dubai is a futuristic metropolis in the heart of the Arabian Desert, known for its record-breaking skyscrapers, luxury shopping malls, and extravagant attractions. From the world\'s tallest building, the Burj Khalifa, to the man-made Palm Jumeirah island, Dubai redefines opulence and innovation. Experience the thrill of desert safaris, indulge in tax-free shopping, or admire the city\'s stunning skyline from a luxury yacht—Dubai offers a taste of the extraordinary.','2024-10-01','2024-10-05',9999.00,'3ea87597-f9be-4543-b0aa-65f7a2b9e1ff.avif'),(103,'The Great Barrier Reef, Australia','The Great Barrier Reef is a natural wonder stretching over 2,300 kilometers along the coast of Queensland, Australia, and is the world\'s largest coral reef system. Dive or snorkel amongst vibrant coral gardens teeming with marine life, including colorful fish, turtles, and rays. With its unparalleled biodiversity and sheer beauty, the Great Barrier Reef is a UNESCO World Heritage Site and a bucket-list destination for adventurers and nature enthusiasts alike.','2024-09-20','2024-09-25',1200.00,'d7e3f9cb-3c63-44be-af77-0190eea5ef04.jpg'),(104,'Serengeti National Park, Tanzania','Serengeti National Park is a wildlife haven in northern Tanzania, renowned for its vast savannahs, abundant wildlife, and the annual Great Migration. Witness millions of wildebeest, zebras, and gazelles journey across the plains in search of fresh grazing grounds, followed closely by predators like lions, cheetahs, and hyenas. Whether you\'re on a thrilling safari or a hot air balloon ride over the Serengeti, this iconic park promises an unforgettable African adventure.','2024-11-01','2024-11-05',7999.00,'50eadec4-9b85-4848-b8e5-3436487d91b5.jpg'),(119,'Bora Bora, French Polynesia',' Bora Bora is a picture-perfect island in the South Pacific, surrounded by a stunning turquoise lagoon protected by a coral reef. Its iconic overwater bungalows offer unparalleled luxury and views of Mount Otemanu. Visitors can indulge in snorkeling, scuba diving, or simply relax on the pristine white-sand beaches, experiencing the epitome of tropical paradise.','2024-05-20','2024-05-30',4500.00,'ea932140-cf6c-445c-b589-9667dfbb15aa.jpg'),(120,'Santorini, Greece','Santorini is a captivating Greek island renowned for its dramatic cliffs, whitewashed buildings, and breathtaking sunsets over the Aegean Sea. Explore the charming villages perched on the caldera rim, visit ancient ruins, or unwind on the volcanic black sand beaches. Don\'t miss sampling the local cuisine and wines while savoring the laid-back Mediterranean lifestyle.','2024-05-12','2024-05-15',3500.00,'eda8ac9d-157a-4c5f-8626-59bf1118d82d.webp');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-21 15:17:25
