-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 15, 2023 alle 12:03
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ap_project`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `creator` varchar(50) NOT NULL,
  `opponent` varchar(50) NOT NULL,
  `state` varchar(20) NOT NULL,
  `positions` varchar(1000) NOT NULL,
  `winner` varchar(50) DEFAULT NULL,
  `turn` varchar(50) NOT NULL,
  `moves` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `games`
--

INSERT INTO `games` (`id`, `creator`, `opponent`, `state`, `positions`, `winner`, `turn`, `moves`) VALUES
(9, 'alessandrobedetta941@gmail.com', 'adrianomancini@gmail.com', 'terminated', '{\"whites\":[{\"name\":\"w1\",\"role\":\"pawn\",\"x\":1,\"y\":1},{\"name\":\"w2\",\"role\":\"pawn\",\"x\":2,\"y\":2},{\"name\":\"w3\",\"role\":\"pawn\",\"x\":3,\"y\":1},{\"name\":\"w4\",\"role\":\"pawn\",\"x\":4,\"y\":2},{\"name\":\"w5\",\"role\":\"pawn\",\"x\":5,\"y\":1},{\"name\":\"w6\",\"role\":\"pawn\",\"x\":6,\"y\":2}],\"blacks\":[{\"name\":\"b1\",\"role\":\"pawn\",\"x\":1,\"y\":5},{\"name\":\"b2\",\"role\":\"pawn\",\"x\":2,\"y\":6},{\"name\":\"b3\",\"role\":\"pawn\",\"x\":3,\"y\":5},{\"name\":\"b4\",\"role\":\"pawn\",\"x\":4,\"y\":6},{\"name\":\"b5\",\"role\":\"pawn\",\"x\":5,\"y\":5},{\"name\":\"b6\",\"role\":\"pawn\",\"x\":6,\"y\":6}]}', 'adrianomancini@gmail.com', 'alessandrobedetta941@gmail.com', '{\n   \"white_moves\":[\n      {\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      },\n	{\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      },{\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      }\n   ],\n   \"black_moves\":[\n      {\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      },\n{\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      }\n   ]\n}\n\n\n\n\n\n'),
(16, 'alessandrobedetta941@gmail.com', 'adrianomancini@gmail.com', 'abandoned', '{\"whites\":[{\"name\":\"w1\",\"role\":\"pawn\",\"x\":1,\"y\":1},{\"name\":\"w2\",\"role\":\"pawn\",\"x\":2,\"y\":2},{\"name\":\"w3\",\"role\":\"pawn\",\"x\":3,\"y\":1},{\"name\":\"w4\",\"role\":\"pawn\",\"x\":4,\"y\":2},{\"name\":\"w5\",\"role\":\"pawn\",\"x\":5,\"y\":1},{\"name\":\"w6\",\"role\":\"pawn\",\"x\":6,\"y\":2}],\"blacks\":[{\"name\":\"b1\",\"role\":\"pawn\",\"x\":1,\"y\":5},{\"name\":\"b2\",\"role\":\"pawn\",\"x\":2,\"y\":6},{\"name\":\"b3\",\"role\":\"pawn\",\"x\":3,\"y\":5},{\"name\":\"b4\",\"role\":\"pawn\",\"x\":4,\"y\":6},{\"name\":\"b5\",\"role\":\"pawn\",\"x\":5,\"y\":5},{\"name\":\"b6\",\"role\":\"pawn\",\"x\":6,\"y\":6}]}', 'alessandrobedetta941@gmail.com', '', '{\n   \"white_moves\":[\n      {\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      },\n	{\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      },{\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      }\n   ],\n   \"black_moves\":[\n      {\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      },\n{\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      }\n   ]\n}\n\n\n\n\n\n'),
(17, 'adrianomancini@gmail.com', 'alessandrobedetta941@gmail.com', 'terminated', '{\"whites\":[{\"name\":\"w1\",\"role\":\"dame\",\"x\":5,\"y\":5},{\"name\":\"w2\",\"role\":\"dead\",\"x\":5,\"y\":3},{\"name\":\"w3\",\"role\":\"dead\",\"x\":3,\"y\":1},{\"name\":\"w4\",\"role\":\"dead\",\"x\":4,\"y\":2},{\"name\":\"w5\",\"role\":\"dead\",\"x\":5,\"y\":1},{\"name\":\"w6\",\"role\":\"dead\",\"x\":6,\"y\":2}],\"blacks\":[{\"name\":\"b1\",\"role\":\"dame\",\"x\":4,\"y\":4},{\"name\":\"b2\",\"role\":\"pawn\",\"x\":4,\"y\":2},{\"name\":\"b3\",\"role\":\"dead\",\"x\":6,\"y\":6},{\"name\":\"b4\",\"role\":\"dead\",\"x\":4,\"y\":6},{\"name\":\"b5\",\"role\":\"dead\",\"x\":5,\"y\":5},{\"name\":\"b6\",\"role\":\"dead\",\"x\":6,\"y\":6}]}', 'adrianomancini@gmail.com', 'adrianomancini@gmail.com', '{\n   \"white_moves\":[\n      {\n         \"pawn\":\"w1\",\n         \"xfrom\":1,\n         \"yfrom\":1,\n         \"xto\":2,\n         \"yto\":2\n      }\n   ],\n   \"black_moves\":[\n      {\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      },\n{\n         \"pawn\":\"b1\",\n         \"xfrom\":5,\n         \"yfrom\":1,\n         \"xto\":4,\n         \"yto\":2\n      }\n   ]\n}'),
(20, 'alessandrobedetta941@gmail.com', 'adrianomancini@gmail.com', 'terminated', '{\"whites\":[{\"name\":\"w1\",\"role\":\"dead\",\"x\":3,\"y\":3},{\"name\":\"w2\",\"role\":\"dead\",\"x\":1,\"y\":3},{\"name\":\"w3\",\"role\":\"dead\",\"x\":3,\"y\":3},{\"name\":\"w4\",\"role\":\"dead\",\"x\":2,\"y\":4},{\"name\":\"w5\",\"role\":\"dead\",\"x\":3,\"y\":3}],\"blacks\":[{\"name\":\"b1\",\"role\":\"dead\",\"x\":2,\"y\":2},{\"name\":\"b2\",\"role\":\"dead\",\"x\":3,\"y\":3},{\"name\":\"b3\",\"role\":\"dead\",\"x\":3,\"y\":5},{\"name\":\"b4\",\"role\":\"dame\",\"x\":4,\"y\":2},{\"name\":\"b5\",\"role\":\"dame\",\"x\":1,\"y\":1}]}', 'adrianomancini@gmail.com', '', '{\"white_moves\":[{\"pawn\":\"w2\",\"xfrom\":2,\"yfrom\":2,\"xto\":1,\"yto\":3},{\"pawn\":\"w4\",\"xfrom\":4,\"yfrom\":2,\"xto\":2,\"yto\":4},{\"pawn\":\"w3\",\"xfrom\":3,\"yfrom\":1,\"xto\":4,\"yto\":2},{\"pawn\":\"w1\",\"xfrom\":1,\"yfrom\":1,\"xto\":3,\"yto\":3},{\"pawn\":\"w3\",\"xfrom\":4,\"yfrom\":2,\"xto\":3,\"yto\":3},{\"pawn\":\"w3\",\"xfrom\":3,\"yfrom\":3,\"xto\":2,\"yto\":4},{\"pawn\":\"w3\",\"xfrom\":2,\"yfrom\":4,\"xto\":1,\"yto\":5},{\"pawn\":\"w3\",\"xfrom\":1,\"yfrom\":5,\"xto\":2,\"yto\":4},{\"pawn\":\"w3\",\"xfrom\":2,\"yfrom\":4,\"xto\":1,\"yto\":5},{\"pawn\":\"w3\",\"xfrom\":1,\"yfrom\":5,\"xto\":2,\"yto\":4},{\"pawn\":\"w3\",\"xfrom\":2,\"yfrom\":4,\"xto\":3,\"yto\":3}],\"black_moves\":[{\"pawn\":\"b2\",\"xfrom\":2,\"yfrom\":4,\"xto\":3,\"yto\":3},{\"pawn\":\"b1\",\"xfrom\":1,\"yfrom\":5,\"xto\":3,\"yto\":3},{\"pawn\":\"b1\",\"xfrom\":3,\"yfrom\":3,\"xto\":2,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":4,\"xto\":2,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":2,\"yfrom\":2,\"xto\":3,\"yto\":1},{\"pawn\":\"b4\",\"xfrom\":3,\"yfrom\":1,\"xto\":4,\"yto\":2},{\"pawn\":\"b5\",\"xfrom\":5,\"yfrom\":5,\"xto\":4,\"yto\":4},{\"pawn\":\"b5\",\"xfrom\":4,\"yfrom\":4,\"xto\":3,\"yto\":3},{\"pawn\":\"b5\",\"xfrom\":3,\"yfrom\":3,\"xto\":2,\"yto\":2},{\"pawn\":\"b5\",\"xfrom\":2,\"yfrom\":2,\"xto\":1,\"yto\":1},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":2,\"xto\":2,\"yto\":4},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":2,\"xto\":2,\"yto\":4},{\"pawn\":\"b4\",\"xfrom\":2,\"yfrom\":4,\"xto\":4,\"yto\":2}]}');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `token_balance` float NOT NULL DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`email`, `role`, `token_balance`) VALUES
('admin123@gmail.com', 2, 48.25),
('adrianomancini@gmail.com', 1, 47.31),
('alessandrobedetta941@gmail.com', 1, 0.1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
