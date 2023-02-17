
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: ``
--
CREATE DATABASE IF NOT EXISTS `ap_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ap_project`;

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
(3, 'adrianomancini@univpm.com', 'alessandrobedetta941@gmail.com', 'terminated', '{\"whites\":[{\"name\":\"w1\",\"role\":\"dead\",\"x\":4,\"y\":4},{\"name\":\"w2\",\"role\":\"dead\",\"x\":4,\"y\":2},{\"name\":\"w3\",\"role\":\"dead\",\"x\":2,\"y\":2},{\"name\":\"w4\",\"role\":\"dead\",\"x\":3,\"y\":3},{\"name\":\"w5\",\"role\":\"dead\",\"x\":3,\"y\":3}],\"blacks\":[{\"name\":\"b1\",\"role\":\"pawn\",\"x\":1,\"y\":5},{\"name\":\"b2\",\"role\":\"dead\",\"x\":4,\"y\":2},{\"name\":\"b3\",\"role\":\"dead\",\"x\":2,\"y\":2},{\"name\":\"b4\",\"role\":\"dame\",\"x\":3,\"y\":1},{\"name\":\"b5\",\"role\":\"dame\",\"x\":2,\"y\":2}]}', 'alessandrobedetta941@gmail.com', '', '{\"white_moves\":[{\"pawn\":\"w4\",\"xfrom\":4,\"yfrom\":2,\"xto\":3,\"yto\":3},{\"pawn\":\"w5\",\"xfrom\":5,\"yfrom\":1,\"xto\":3,\"yto\":3},{\"pawn\":\"w2\",\"xfrom\":2,\"yfrom\":2,\"xto\":1,\"yto\":3},{\"pawn\":\"w2\",\"xfrom\":1,\"yfrom\":3,\"xto\":2,\"yto\":4},{\"pawn\":\"w2\",\"xfrom\":2,\"yfrom\":4,\"xto\":3,\"yto\":5},{\"pawn\":\"w1\",\"xfrom\":1,\"yfrom\":1,\"xto\":3,\"yto\":3},{\"pawn\":\"w3\",\"xfrom\":3,\"yfrom\":1,\"xto\":2,\"yto\":2},{\"pawn\":\"w2\",\"xfrom\":3,\"yfrom\":5,\"xto\":2,\"yto\":4},{\"pawn\":\"w1\",\"xfrom\":3,\"yfrom\":3,\"xto\":4,\"yto\":4},{\"pawn\":\"w2\",\"xfrom\":2,\"yfrom\":4,\"xto\":3,\"yto\":3},{\"pawn\":\"w2\",\"xfrom\":3,\"yfrom\":3,\"xto\":4,\"yto\":2}],\"black_moves\":[{\"pawn\":\"b2\",\"xfrom\":2,\"yfrom\":4,\"xto\":4,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":4,\"xto\":5,\"yto\":3},{\"pawn\":\"b3\",\"xfrom\":3,\"yfrom\":5,\"xto\":4,\"yto\":4},{\"pawn\":\"b3\",\"xfrom\":4,\"yfrom\":4,\"xto\":2,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":5,\"yfrom\":3,\"xto\":4,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":2,\"xto\":5,\"yto\":1},{\"pawn\":\"b4\",\"xfrom\":5,\"yfrom\":1,\"xto\":4,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":4,\"yfrom\":2,\"xto\":5,\"yto\":3},{\"pawn\":\"b5\",\"xfrom\":5,\"yfrom\":5,\"xto\":1,\"yto\":1},{\"pawn\":\"b5\",\"xfrom\":1,\"yfrom\":1,\"xto\":2,\"yto\":2},{\"pawn\":\"b4\",\"xfrom\":5,\"yfrom\":3,\"xto\":3,\"yto\":1}]}'),
(4, 'adrianomancini@univpm.com', 'alessandrobedetta941@gmail.com', 'started', '{\"whites\":[{\"name\":\"w1\",\"role\":\"pawn\",\"x\":1,\"y\":1},{\"name\":\"w2\",\"role\":\"pawn\",\"x\":3,\"y\":3},{\"name\":\"w3\",\"role\":\"pawn\",\"x\":3,\"y\":1},{\"name\":\"w4\",\"role\":\"pawn\",\"x\":4,\"y\":2},{\"name\":\"w5\",\"role\":\"pawn\",\"x\":5,\"y\":1}],\"blacks\":[{\"name\":\"b1\",\"role\":\"pawn\",\"x\":1,\"y\":5},{\"name\":\"b2\",\"role\":\"pawn\",\"x\":2,\"y\":4},{\"name\":\"b3\",\"role\":\"pawn\",\"x\":3,\"y\":5},{\"name\":\"b4\",\"role\":\"pawn\",\"x\":4,\"y\":4},{\"name\":\"b5\",\"role\":\"pawn\",\"x\":5,\"y\":5}]}', '', 'alessandrobedetta941@gmail.com', '{\"white_moves\":[{\"pawn\":\"w2\",\"xfrom\":2,\"yfrom\":2,\"xto\":3,\"yto\":3}],\"black_moves\":[]}');

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
('adolfo@gmail.it', 1, 49.65),
('adrianomancini@gmail.com', 1, 50),
('adrianomancini@univpm.com', 1, -0.015),
('alessandrobedetta941@gmail.com', 1, 39.82);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
