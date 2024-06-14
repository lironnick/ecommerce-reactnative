-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: abc-crawler.devabc.com.br    Database: ecom_tiago
-- ------------------------------------------------------
-- Server version	8.0.32

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(100) NOT NULL,
  `total` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'lironnick@gmail.com',0),(2,'lironnick@gmail.com',0),(3,'lironnick@gmail.com',0),(4,'lironnick@gmail.com',0),(5,'lironnick@gmail.com',0),(6,'lironnick@gmail.com',0),(7,'lironnick@gmail.com',0),(8,'lironnick@gmail.com',0),(9,'lironnick@gmail.com',0),(10,'lironnick@gmail.com',0),(11,'lironnick@gmail.com',0),(12,'lironnick@gmail.com',0),(13,'lironnick@gmail.com',0),(14,'lironnick@gmail.com',0),(15,'lironnick@gmail.com',0),(16,'lironnick@gmail.com',0),(17,'lironnick@gmail.com',74.95),(18,'lironnick@gmail.com',189.5),(19,'lironnick@gmail.com',189.5),(20,'lironnick@gmail.com',189.5),(21,'lironnick@gmail.com',189.5),(22,'Lironnnick@gmail.com',0),(23,'Lironnick@gmail.com',0),(24,'Lironnick@gmail.com',0),(25,'Lironnick@gmail.com',0),(26,'Lironnick@gmail.com',0),(27,'joao@gmail.com',0),(28,'Lironnick@gmail.com',0),(29,'Lironnick@gmail.com',0),(30,'Lironnick@gmail.com',0),(31,'Lironnick@gmail.com',44.97);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 13:14:32
