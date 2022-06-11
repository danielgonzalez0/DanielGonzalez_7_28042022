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
VALUES
('post test', '', 2),
('J"ai le grand plaisir de vous annoncer le lancement du nouveau réseau interne de Groupomania!!!! A vos posts , prêt, partagez 🏃🏃‍♂️🏃‍♀️', './uploads/posts/1654804298990.jpg', 7),
('Aujourd"hui c"est le grand jour!La rencontre entre la direction financière et la direction commeciale aura lieu à 12h. Venez nombreux les encourager! Il y a aura des snacks et des boissons à disposition 😉', './uploads/posts/1654804597412.jpg', 9),
('L"équipe Marketing en plein effort!!!
Dernière ligne droite avant le lancement de la nouvelle campagne de distribution!!', './uploads/posts/1654805078174.jpg', 20),
('Après l"effort le réconfort. Moment détente dans notre nouvel espace café près du service marketing.
Nous avons prévu un grand nombre de viennoiseries!!  N"hésitez pas à passer lors de votre pause ', './uploads/posts/1654805278936.jpg', 4),
('Ouverture demain de notre nouvel espace coworking au 1er étage.
Vous pouvez dès maintenant réserver votre créneau sur l"intranet du groupe!', './uploads/posts/1654805425967.jpg', 11),
('Les inscriptions pour l"initiation au golf commencent aujourd"hui 12h. 
Vous pouvez m"envoyer votre demande par mail. 
Pour rappel les conjoints et enfants sont les bienvenus!! Il y a aura aussi des animations et de la restauration alors n"hésitez plus et venez nombreux !!!', './uploads/posts/1654805629013.jpg', 13),
('J"ai le plaisir de vous annoncer l"ouverture de notre enseigne "le café gourmand" dans ce marché couvert à valence en Espagne. 

Si vous avez l"occasion de voyager là-bas, passez y faire un tour, vous ne le regretterez pas !!', './uploads/posts/1654806631574.jpg', 6),
('Fin de la clôture annuelle!  Merci à toutes les équipes de la finance pour leur investissement et leur travail! Merci à tous les contributeurs pour leurs soutiens!
J"organise un pot dans l"espace détente ce vendredi 16h pour vous remercier tous!', './uploads/posts/1654851259902.jpg', 3),
('Bravo aux filles du groupe qui ont participé et surtout fini le marathon de paris 💪💪 ', './uploads/posts/1654851649783.jpg', 23),
('La direction se joint à moi pour vous souhaitez à toutes et à tous de bonnes vacances pour cette période estivale! Profitez bien, vous l"avez bien mérité et surtout déconnectez vous du travail!!', './uploads/posts/1654851822112.jpg', 2);



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
VALUES
('1er commentaire',2,1,'Pierre Paulet'),
('1er post!!! Gagné!!!!',16,2,'Enzo Dupuis'),
('Enjoy et que le meilleur gagne!',2,3,'Pierre Paulet'),
('Bravo, bel esprit d"équipe. Ne lâchez rien',2,4,'Pierre Paulet'),
('Bon match à mon équipe. Attention aux blessures, la clôture annuelle arrive bientôt',3,3,'Fabien Fouquet'),
('Je serai en vacances dans le coin en aout. Je ne manquerai pas d"y faire un tour!',23,8,'Justine Clément'),
('Belle initiative!  Je vais y participer',23,7,'Justine Clément'),
('Allez le Commerce!!!!',23,3,'Justine Clément'),
('Ca ne m"étonne pas de toi Enzo 😂😂',23,2,'Justine Clément'),
('Bravo les filles!!',2,10,'Pierre Paulet'),
('Bravo à la finance! Excellent boulot',2,9,'Pierre Paulet'),
('Merci grand chef',14,11,'Hugues Maiseau'),
('Bravo!! Je n"y serai jamais arrivé perso',14,10,'Hugues Maiseau'),
('Bravo à tous',14,9,'Hugues Maiseau'),
('idem, je viens avec toute la famille',14,7,'Hugues Maiseau'),
('Hâte de le tester',14,6,'Hugues Maiseau'),
('bravo! c"est bientôt notre tour avec le budget...',14,4,'Hugues Maiseau'),
('Attention à vous au commerce. Nous sommes bien entraînés 😉',14,3,'Hugues Maiseau'),
('Bel outil en tout cas! Merci',14,2,'Hugues Maiseau'),
('Ouf! Vivement les vacances!!!',19,9,'Jeanne Laforge'),
('Merci pour vos encouragements!!',19,10,'Jeanne Laforge'),
('Bonnes vacances à tous!!',19,11,'Jeanne Laforge'),
('Dommage pour moi! Je ne pourrai pas venir....',19,7,'Jeanne Laforge'),
('Place réservée!!',19,6,'Jeanne Laforge'),
('Miam miam! merci pour l"invitation',19,5,'Jeanne Laforge'),
('Allez la finance!!!',19,3,'Jeanne Laforge'),
('La piscine donne envie!! Bonnes vacances',8,11,'Alice Durand'),
('Incroyable les filles!!',8,10,'Alice Durand'),
('Dépêchez vous avant que Tristan ne mange tout!!!',8,5,'Alice Durand'),
('Ah ah ah Merci pour la réputation 😂😂',20,5,'Tristan Marseau');




/*
----------------------------------------------------------------------------------------------------------------
-- ajout Likes -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
INSERT INTO `sn_likes`(`like_user`,`like_post`, `like_key`)
VALUES
(16, 3, CONCAT(like_user,'/',like_post)),
(16, 2, CONCAT(like_user,'/',like_post)),
(13, 2, CONCAT(like_user,'/',like_post)),
(13, 3, CONCAT(like_user,'/',like_post)),
(13, 4, CONCAT(like_user,'/',like_post)),
(13, 5, CONCAT(like_user,'/',like_post)),
(13, 6, CONCAT(like_user,'/',like_post)),
(6, 7, CONCAT(like_user,'/',like_post)),
(6, 6, CONCAT(like_user,'/',like_post)),
(6, 5, CONCAT(like_user,'/',like_post)),
(6, 4, CONCAT(like_user,'/',like_post)),
(6, 3, CONCAT(like_user,'/',like_post)),
(6, 2, CONCAT(like_user,'/',like_post)),
(2, 8, CONCAT(like_user,'/',like_post)),
(2, 7, CONCAT(like_user,'/',like_post)),
(2, 6, CONCAT(like_user,'/',like_post)),
(2, 5, CONCAT(like_user,'/',like_post)),
(2, 4, CONCAT(like_user,'/',like_post)),
(2, 3, CONCAT(like_user,'/',like_post)),
(2, 2, CONCAT(like_user,'/',like_post)),
(3, 8, CONCAT(like_user,'/',like_post)),
(3, 7, CONCAT(like_user,'/',like_post)),
(3, 6, CONCAT(like_user,'/',like_post)),
(3, 5, CONCAT(like_user,'/',like_post)),
(3, 4, CONCAT(like_user,'/',like_post)),
(3, 3, CONCAT(like_user,'/',like_post)),
(3, 2, CONCAT(like_user,'/',like_post)),
(23, 10, CONCAT(like_user,'/',like_post)),
(23, 8, CONCAT(like_user,'/',like_post)),
(23, 6, CONCAT(like_user,'/',like_post)),
(23, 5, CONCAT(like_user,'/',like_post)),
(23, 4, CONCAT(like_user,'/',like_post)),
(23, 2, CONCAT(like_user,'/',like_post)),
(23, 3, CONCAT(like_user,'/',like_post)),
(23, 7, CONCAT(like_user,'/',like_post)),
(2, 11, CONCAT(like_user,'/',like_post)),
(2, 10, CONCAT(like_user,'/',like_post)),
(14, 9, CONCAT(like_user,'/',like_post)),
(14, 11, CONCAT(like_user,'/',like_post)),
(14, 10, CONCAT(like_user,'/',like_post)),
(14, 8, CONCAT(like_user,'/',like_post)),
(14, 7, CONCAT(like_user,'/',like_post)),
(14, 6, CONCAT(like_user,'/',like_post)),
(14, 5, CONCAT(like_user,'/',like_post)),
(14, 4, CONCAT(like_user,'/',like_post)),
(14, 3, CONCAT(like_user,'/',like_post)),
(14, 2, CONCAT(like_user,'/',like_post)),
(19, 10, CONCAT(like_user,'/',like_post)),
(19, 11, CONCAT(like_user,'/',like_post)),
(19, 9, CONCAT(like_user,'/',like_post)),
(19, 8, CONCAT(like_user,'/',like_post)),
(19, 7, CONCAT(like_user,'/',like_post)),
(19, 6, CONCAT(like_user,'/',like_post)),
(19, 5, CONCAT(like_user,'/',like_post)),
(19, 4, CONCAT(like_user,'/',like_post)),
(19, 3, CONCAT(like_user,'/',like_post)),
(19, 2, CONCAT(like_user,'/',like_post)),
(8, 9, CONCAT(like_user,'/',like_post)),
(8, 11, CONCAT(like_user,'/',like_post)),
(8, 10, CONCAT(like_user,'/',like_post)),
(8, 8, CONCAT(like_user,'/',like_post)),
(8, 5, CONCAT(like_user,'/',like_post)),
(8, 4, CONCAT(like_user,'/',like_post)),
(8, 3, CONCAT(like_user,'/',like_post)),
(8, 2, CONCAT(like_user,'/',like_post)),
(20, 11, CONCAT(like_user,'/',like_post)),
(20, 9, CONCAT(like_user,'/',like_post)),
(20, 10, CONCAT(like_user,'/',like_post)),
(20, 8, CONCAT(like_user,'/',like_post)),
(20, 5, CONCAT(like_user,'/',like_post)),
(20, 2, CONCAT(like_user,'/',like_post)),
(20, 3, CONCAT(like_user,'/',like_post)),
(20, 4, CONCAT(like_user,'/',like_post)),
(20, 6, CONCAT(like_user,'/',like_post)),
(20, 7, CONCAT(like_user,'/',like_post));
