/*

SOURCE D:/apprentissage/developpeur web/documents openclassrooms/livrables/P7/backend/SQL/data.sql
----------------------------------------------------------------------------------------------------------------
-- Re-création de la base de données ----------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
DROP TABLE IF EXISTS `sn_likes`;
DROP TABLE IF EXISTS `sn_follow`;
DROP TABLE IF EXISTS `sn_comments`;
DROP TABLE IF EXISTS `sn_posts`;
DROP TABLE IF EXISTS `sn_users`;
DROP DATABASE IF EXISTS `social_network`;
CREATE DATABASE IF NOT EXISTS `social_network`;
USE `social_network`;



/*
----------------------------------------------------------------------------------------------------------------
-- Création des tables -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
CREATE TABLE IF NOT EXISTS `sn_users`
(
	`id_user` SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT, 
	`user_firstname` VARCHAR(65) NOT NULL, 
	`user_lastname` VARCHAR(65) NOT NULL, 
	`user_fullname` VARCHAR(130) NOT NULL UNIQUE,
	`user_job` VARCHAR(130) NOT NULL,
	`user_email`VARCHAR(65) NOT NULL UNIQUE, 
    `user_password` VARCHAR(255) NOT NULL, 
	`user_registration` DATETIME DEFAULT NOW(),
	`user_picture`VARCHAR(255) DEFAULT './uploads/profil/random-user.png',
	`user_admin` TINYINT(1) DEFAULT 0,


	PRIMARY KEY(`id_user`)
	
)
ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_posts`
(
    `id_post` MEDIUMINT(9) UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_content`TEXT NOT NULL,
	`post_image`VARCHAR(255),
    `post_author` SMALLINT(6) UNSIGNED NOT NULL, 
	`post_registration` DATETIME DEFAULT NOW(),
	`post_update` DATETIME DEFAULT NOW(), 

    PRIMARY KEY (`id_post`),
    FOREIGN KEY (`post_author`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE
)

ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_comments`
(
    `id_comment` MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
    `comment_content`TEXT NOT NULL,
    `comment_author` SMALLINT(6) UNSIGNED NOT NULL, 
	`comment_fullname` VARCHAR(130) NOT NULL,
	`comment_parent` MEDIUMINT(9) UNSIGNED NOT NULL, 
	`comment_registration` DATETIME DEFAULT NOW(),
	`comment_update` DATETIME DEFAULT NOW(), 

    PRIMARY KEY (`id_comment`),
    FOREIGN KEY (`comment_author`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE,
	FOREIGN KEY (`comment_parent`) REFERENCES `sn_posts`(`id_post`) ON DELETE CASCADE,
	FOREIGN KEY (`comment_fullname`) REFERENCES `sn_users`(`user_fullname`) ON UPDATE CASCADE
	
)

ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_likes`(
	`id_like` MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
	`like_user` SMALLINT(6) UNSIGNED NOT NULL, 
	`like_post` MEDIUMINT(9) UNSIGNED NOT NULL,
	`like_key` VARCHAR(20),

	PRIMARY KEY (`id_like`),
	FOREIGN KEY (`like_user`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE,
	FOREIGN KEY (`like_post`) REFERENCES `sn_posts`(`id_post`) ON DELETE CASCADE

)
ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_follow`(
	`id_follow` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`id_follower` SMALLINT(6) UNSIGNED NOT NULL, 
	`id_following` SMALLINT(6) UNSIGNED NOT NULL,
	`follow_key` VARCHAR(20),

	PRIMARY KEY (`id_follow`),
	FOREIGN KEY (`id_follower`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE,
	FOREIGN KEY (`id_following`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE

)
ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

/*
----------------------------------------------------------------------------------------------------------------
-- ajout user -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
INSERT INTO `sn_users`(`user_firstname`,`user_lastname`,`user_job`, `user_email`, `user_password`,`user_picture`, `user_fullname`, `user_admin`)
VALUES
('User', 'Admin','Modérateur', 'admin@groupomania.com', '$2b$10$rNqUBdTwQIkExDzyPZ61auJicwXOwe601zJNQKZ/rKHvkOeFIJSpO', './uploads/profil/random-user.png', CONCAT(user_firstname,' ',user_lastname), 1),
('Pierre', 'Paulet','Directeur Général', 'pierre.paulet@groupomania.com', '$2b$10$/BPYtZhqfJM0Laa1/3abGeZHdvc3KNf1GFMX0i9gU7ZL376bF0eh6', './uploads/profil/2.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Fabien', 'Fouquet','Chef Comptable', 'fabien.fouquet@groupomania.com', '$2b$10$km6td7Pp/FZYmMa2pizcte7UkhbsVC4XFBXyxVHw.kv9rNy67QxR.', './uploads/profil/3.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Edouard', 'Foucault','Marketing', 'edouard.foucault@groupomania.com', '$2b$10$p/3D1uYUl7J//s7wq9J23ekcxtBAbxL12VpzExeQlh93H0mX59fDi', './uploads/profil/4.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Joseph', 'Bolduc','Chef des ventes', 'joseph.bolduc@groupomania.com', '$2b$10$G7Uql6QwacEkaeETtxy/uOH9NfssAdLf22WgP/0PMLfvis8XOC.0K', './uploads/profil/5.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Daniel', 'Gougeon','Commercial', 'daniel.gougeon@groupomania.com', '$2b$10$Hp1qobS2TGSMVLctohj.FO/fvLuGnMWDkVdVHzmKRAWE4xe4MADdK', './uploads/profil/6.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Clémence', 'Trottier','Directrice RH', 'clemence.trottier@groupomania.com', '$2b$10$r./r8Lkqt0bXFrcG3Fl31eTfDqlxPxOdXuP/hHG7gRnYBO8hS0dEe', './uploads/profil/7.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Alice', 'Durand','Marketing', 'alice.durand@groupomania.com', '$2b$10$XAwabJKOKH56nZwEAEVjAukuZ7YLTflO3FXtQOa4TLKqWkSopiLSK', './uploads/profil/8.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Julie', 'Bonnet','Commercial', 'julie.bonnet@groupomania.com', '$2b$10$pqXl1Yo7a8aNfpwk/rQSM.vWvOeuvgXiMkI3xRuow6Frb2mQZ1842', './uploads/profil/9.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Marine', 'Collin','Comptable', 'marine.collin@groupomania.com', '$2b$10$DBKzcdBUuPmsrw8jYJXGHuuAX/RPUno/GeUeYY9oKd4B9xWVD7ctO', './uploads/profil/10.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Stéphanie', 'Boivin','Chargée RH', 'stephanie.boivin@groupomania.com', '$2b$10$drwjrv3n51fRCmPnqbksxejc6QacYEZkgaNQ7dDI8CGcW8NROhIHG', './uploads/profil/11.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Alain', 'Brochu','Directeur Commercial', 'alain.brochu@groupomania.com', '$2b$10$teelIkoHpDgxFuIOIdiXpesHqCmrUnp.CRtJ/VrJnXPQK9iepR1Ou', './uploads/profil/12.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Margot', 'Pariseau','Assistante de direction', 'margot.pariseau@groupomania.com', '$2b$10$VzMYf9wAWJUdG8fC397zGeqCxM6uJGLhQ/iZiyj6z6KfGoA82PrvK', './uploads/profil/13.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Hugues', 'Maiseau','Contrôleur de gestion', 'hugues.maiseau@groupomania.com', '$2b$10$X8muWox.hEHP3oXWOqw/WOoKmeCYJj/kG34cBe0.Ktn55sbj0Kzz.', './uploads/profil/14.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Elodie', 'Lazure','Directrice Financière', 'elodie.lazure@groupomania.com', '$2b$10$LVwpaLu0CmKd.E1nda5BkO79IZ4aXakPtMvV8WA/Zx6PzX77FTDY2', './uploads/profil/15.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Enzo', 'Dupuis','Informaticien', 'enzo.dupuis@groupomania.com', '$2b$10$tErSHntxO9aKmdQ9wpRiHO1aVyY/mOV8H04y3yOpAkOhbRod357By', './uploads/profil/16.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Anne', 'Masson','Comptable', 'anne.masson@groupomania.com', '$2b$10$ZleyO4WiF5nVPZcs1uIkreU7HyOkJ5WgkFd.eE3sm68jiLmwjduz2', './uploads/profil/17.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Marcel', 'Blais','Chargé clientèle', 'marcel.blais@groupomania.com', '$2b$10$8DI2dkUyl/nbLSnsSTMD5.IXSHBdhTI9rymYvJJFLfMDFHNqilKiW', './uploads/profil/18.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Jeanne', 'Laforge','Trésorière', 'jeanne.laforge@groupomania.com', '$2b$10$AbYU2GZBnKZPhR7vQz4DheFY4/B3T4YDfsWLqkUU0o1nVR/vSxFqm', './uploads/profil/19.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Tristan', 'Marseau','Marketing', 'tristan.marseau@groupomania.com', '$2b$10$/mTjCBPPbMcAco/Uf3OWG.08MmeXZNINPhEcJJ84WhHkq.83Z6Uv6', './uploads/profil/20.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Charlotte', 'Laux','Responsable Région', 'charlotte.laux@groupomania.com', '$2b$10$WzwZ56H2MzTsCkk6JepIse2vbMZq.a2pSVGoMo0vCVMsXB4BB64kW', './uploads/profil/21.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Gabriel', 'Dodien','Chef de district', 'gabriel.dodien@groupomania.com', '$2b$10$eIRqlp4V1UfEQPKz0zqFLOmDSA6hmgFj8vPcbNcyYJRlJl0Z7nPUy', './uploads/profil/22.jpg ', CONCAT(user_firstname,' ',user_lastname), 0),
('Justine', 'Clément','Assistante commerciale', 'justine.clement@groupomania.com', '$2b$10$62ZohfFAYOuVlTS5TQe6HOktvYUXJcEJdk0fi6QoIfnBOFlJzlymG', './uploads/profil/23.jpg ', CONCAT(user_firstname,' ',user_lastname), 0);

/*
----------------------------------------------------------------------------------------------------------------
-- ajout post -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/

INSERT INTO `sn_posts`(`post_content`, `post_image`, `post_author`)
VALUES('Allez au travail!!!!', '', 2);

/*
----------------------------------------------------------------------------------------------------------------
-- modifie post -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
/*UPDATE `sn_posts`SET `post_author` = 1 WHERE id_post = 1;*/

/*
----------------------------------------------------------------------------------------------------------------
-- ajout comment -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/

INSERT INTO `sn_comments`(`comment_content`,`comment_author`, `comment_parent`, `comment_fullname`)
VALUES('1er commentaire',2,1,'Pierre Paulet');

