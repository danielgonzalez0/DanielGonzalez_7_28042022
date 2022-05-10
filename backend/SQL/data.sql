/*
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
	`user_fullname` VARCHAR(130) UNIQUE,
	`user_job` VARCHAR(130) NOT NULL,
	`user_email`VARCHAR(65) NOT NULL UNIQUE, 
    `user_password` VARCHAR(255) NOT NULL, 
	`user_registration` DATETIME DEFAULT NOW(),
	`user_picture`VARCHAR(255) DEFAULT './uploads/profil/random-user.png',
	`user_admin` BOOLEAN DEFAULT 0,


	PRIMARY KEY(`id_user`)
)
ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_posts`
(
    `id_post` MEDIUMINT(9) UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_title`VARCHAR(80) NOT NULL,
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
	`comment_image`VARCHAR(80),
    `comment_author` SMALLINT(6) UNSIGNED NOT NULL, 
	`comment_parent` MEDIUMINT(9) UNSIGNED NOT NULL, 
	`comment_registration` DATETIME DEFAULT NOW(),
	`comment_update` DATETIME DEFAULT NOW(), 

    PRIMARY KEY (`id_comment`),
    FOREIGN KEY (`comment_author`) REFERENCES `sn_users`(`id_user`) ON DELETE CASCADE,
	FOREIGN KEY (`comment_parent`) REFERENCES `sn_posts`(`id_post`) ON DELETE CASCADE
	
)

ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sn_likes`(
	`id_like` MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
	`like_user` SMALLINT(6) UNSIGNED NOT NULL, 
	`like_post` MEDIUMINT(9) UNSIGNED NOT NULL,

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
INSERT INTO `sn_users`(`user_firstname`,`user_lastname`,`user_job`, `user_email`, `user_password`, `user_fullname`)
VALUES('Daniel', 'Gonzalez','CEO', 'daniel@xyz.com', 'Azerty1',CONCAT(user_firstname,' ',user_lastname));

/*
----------------------------------------------------------------------------------------------------------------
-- ajout post -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/

INSERT INTO `sn_posts`(`post_title`,`post_content`, `post_image`, `post_author`)
VALUES('1er post', 'bonjour le monde', '', 1);

/*
----------------------------------------------------------------------------------------------------------------
-- modifie post -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/
UPDATE `sn_posts`SET `post_author` = 1 WHERE id_post = 1;

/*
----------------------------------------------------------------------------------------------------------------
-- ajout comment -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
*/

INSERT INTO `sn_comments`(`comment_content`,`comment_author`, `comment_parent`)
VALUES('1er commentaire',1,1);

