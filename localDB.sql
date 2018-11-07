/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `portal_reporting` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `portal_reporting`;

CREATE TABLE IF NOT EXISTS `dumper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fonte` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `maquina` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagem` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tabela` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colunas_output` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `filtros_datas` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `available` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='		Tabela	colunas_input	colunas_output	Filtros_datas\r\n';

CREATE TABLE IF NOT EXISTS `dumper_aux_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `input_label` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `combinations` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `input_value` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `input_type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `search_condition` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `allow_list` tinyint(4) DEFAULT NULL,
  `dumperFK` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dumper_aux_tables_dumper` (`dumperFK`),
  CONSTRAINT `FK_dumper_aux_tables_dumper` FOREIGN KEY (`dumperFK`) REFERENCES `dumper` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `linked_reports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_report` int(11) DEFAULT NULL,
  `localizacao` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dh_carregamento` timestamp NOT NULL DEFAULT current_timestamp(),
  `fk_reports` int(11) NOT NULL,
  `imagem_report` blob DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_linked_reports_reports_categorizacoes` (`fk_reports`),
  CONSTRAINT `FK_linked_reports_reports_categorizacoes` FOREIGN KEY (`fk_reports`) REFERENCES `reports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `navbar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT '0',
  `link` varchar(50) COLLATE utf8_unicode_ci DEFAULT '0',
  `permission` varchar(200) COLLATE utf8_unicode_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descricao` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantidade_historico` int(11) DEFAULT NULL,
  `fk_categorizacao` int(11) NOT NULL,
  `data_lancamento` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reports_reports_categorizacoes` (`fk_categorizacao`),
  CONSTRAINT `FK_reports_reports_categorizacoes` FOREIGN KEY (`fk_categorizacao`) REFERENCES `reports_categorizacoes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='id_report, nome_report, descricao_report, quantidade_historico, fk_categorizacao, data_lancamento';

CREATE TABLE IF NOT EXISTS `reports_categorizacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria1` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoria2` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoria3` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


/* {
  "host": "localhost",
  "user": "test",
  "password": "123test",
  "multipleStatements": true,
  "dateStrings": "date"
} */


/* {
  "host": "WSTPVFIA001",
  "user": "dumper",
  "password": "dumper",
  "multipleStatements": true,
  "dateStrings": "date"
} */