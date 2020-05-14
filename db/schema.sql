CREATE DATABASE development;

USE development;

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user;

DROP VIEW IF EXISTS RANDOM_DATE;

CREATE VIEW RANDOM_DATE as SELECT FROM_UNIXTIME (
	UNIX_TIMESTAMP('2010-04-30 14:53:27') + FLOOR(0 + (RAND() * 63072000))
);

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT now(),
  authorId INTEGER NOT NULL,
  FOREIGN KEY (authorId) 
	REFERENCES user(id)
    ON DELETE CASCADE
);

INSERT INTO user ( username, email ) VALUES
( "test_user1", "test@mail.com" ),
( "test_user2", "test1@mail.com" ),
( "test_user3", "test2@mail.com" ),
( "test_user4", "test3@mail.com" ),
( "test_user5", "test4@mail.com" );

INSERT INTO post (title, content, authorId, createdAt) VALUES
("How many blue cats do I see a week?", "Not many, really", 1, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("Is Christmas coming early this year?", "No, but coronavirus is", 1, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("I'm drowning in a sea of bagels", "Please help me", 1, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("A misfortunate green apple ran away", "Did you bite it?", 2, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("History is telling the future", "I hope it's all wrong", 2, (SELECT * FROM RANDOM_DATE)),
("I miss pandan buns", "I really do", 3, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("MySQL is fun", "Database nerd incoming", 4, (SELECT Name_exp_1 FROM RANDOM_DATE)),
("Docker is cool", "Correct", 5, (SELECT Name_exp_1 FROM RANDOM_DATE));