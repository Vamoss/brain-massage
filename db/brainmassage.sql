-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Servidor: 68.178.143.79
-- Tempo de Geração: Abr 22, 2015 as 08:00 PM
-- Versão do Servidor: 5.5.40
-- Versão do PHP: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `brainmassage`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game` int(11) NOT NULL,
  `match` int(11) NOT NULL,
  `user` bigint(20) NOT NULL,
  `code` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=470 ;


-- --------------------------------------------------------

--
-- Estrutura da tabela `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1020) NOT NULL,
  `parameters` varchar(255) NOT NULL,
  `parametersTest` varchar(510) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Extraindo dados da tabela `games`
--

INSERT INTO `games` VALUES(1, 'Sum 1', 'Just sum the result + 1', 'value', '[{"input":"1","output":2},{"input":"10","output":11},{"input":"1000","output":1001},{"input":"-1","output":0},{"input":"18","output":19}]', 0);
INSERT INTO `games` VALUES(2, 'Multiply by 10', 'What''s the fast way to multiply by 10?', 'value', '[{"input":"1","output":10},{"input":"-1","output":-10},{"input":"15","output":150},{"input":"1.1","output":11},{"input":"-10","output":-100}]', 1);
INSERT INTO `games` VALUES(3, 'Minus 1', 'Return the value minus 1', 'value', '[{"input":"1","output":0},{"input":"-1","output":-2},{"input":"15","output":14},{"input":"-11","output":-12},{"input":"-10","output":-11}]', 0);
INSERT INTO `games` VALUES(4, 'Divide by 10', 'It still simple, what is the result of a number divided by 10?', 'value', '[{"input":"10","output":1},{"input":"21","output":2.1},{"input":"30","output":3},{"input":"333333","output":33333.3},{"input":"-10","output":-1}]', 1);
INSERT INTO `games` VALUES(5, 'Guess!', 'Guess what operator I need :O', 'value', '[{"input":"1","output":-1},{"input":"-3","output":3},{"input":"8","output":-8},{"input":"-1.1","output":1.1},{"input":"-9000","output":9000}]', 2);
INSERT INTO `games` VALUES(6, 'Guess', 'Hummm, I dont remember what I need to do, help me!', 'value', '[{"input":"1","output":-1},{"input":"-1","output":-3},{"input":"15","output":13},{"input":"-11","output":-13},{"input":"-10","output":-12}]', 2);
INSERT INTO `games` VALUES(7, 'Reverse a string', 'If I give you \\"hi\\", I want \\"ih\\".', 'str', '[{"input":"\\"hi\\"","output":"ih"},{"input":"\\"hello world\\"","output":"dlrow olleh"},{"input":"\\"No sir -- away! A papaya war is on.\\"","output":".no si raw ayapap A !yawa -- ris oN"}]', 3);
INSERT INTO `games` VALUES(8, 'Reverse an Array', 'You can have this [0,1,2], but I wanna [2,1,0] ;)', 'arr', '[{"input":"[0,1,0]","output":[0,1,0]},{"input":"[86,97,109,111,115,115]","output":[115,115,111,109,97,86]},{"input":"[\\"a\\",\\"b\\",\\"c\\",\\"d\\",\\"e\\"]","output":["e","d","c","b","a"]}]', 3);
INSERT INTO `games` VALUES(9, 'Guess', 'Is it hard for you?', 'value', '[{"input":"10","output":99},{"input":"21","output":209},{"input":"1","output":9},{"input":"-10","output":-101},{"input":"-30","output":-301}]', 2);
INSERT INTO `games` VALUES(10, 'Find the biggest value', 'Search the array and give me the biggest value, ok?', 'arr', '[{"input":"[0,1,2]","output":2},{"input":"[86,97,109,111,115,115]","output":115},{"input":"[-44,-39,-8,-3,-1]","output":-1}]', 3);
INSERT INTO `games` VALUES(11, 'The first will be the last', 'Remove the the first item of the array and put it in the last position', 'arr', '[{"input":"[0,1,2]","output":[1,2,0]},{"input":"[86,97,109,111,115,115]","output":[97,109,111,115,115,86]},{"input":"[\\"a\\",\\"b\\",\\"c\\",\\"d\\",\\"e\\"]","output":["b","c","d","e","a"]}]', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `match`
--

CREATE TABLE `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` bigint(20) NOT NULL DEFAULT '0',
  `user2` bigint(20) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=97 ;


-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

