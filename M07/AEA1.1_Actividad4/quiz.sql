-- Tabla de preguntas
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL
);

-- Tabla de respuestas
CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  answer TEXT NOT NULL,
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);





-- Pregunta 1
INSERT INTO questions (question) VALUES ('What is the scientific name of a butterfly?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(1, 'Apis', 0),
(1, 'Coleoptera', 0),
(1, 'Formicidae', 0),
(1, 'Rhopalocera', 1);

-- Pregunta 2
INSERT INTO questions (question) VALUES ('How hot is the surface of the sun?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(2, '1,233 K', 0),
(2, '5,778 K', 1),
(2, '12,130 K', 0),
(2, '101,300 K', 0);

-- Pregunta 3
INSERT INTO questions (question) VALUES ('Who are the actors in The Internship?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(3, 'Ben Stiller, Jonah Hill', 0),
(3, 'Courteney Cox, Matt LeBlanc', 0),
(3, 'Kaley Cuoco, Jim Parsons', 0),
(3, 'Vince Vaughn, Owen Wilson', 1);

-- Pregunta 4
INSERT INTO questions (question) VALUES ('What is the capital of Spain?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(4, 'Berlin', 0),
(4, 'Buenos Aires', 0),
(4, 'Madrid', 1),
(4, 'San Juan', 0);

-- Pregunta 5
INSERT INTO questions (question) VALUES ('What are the school colors of the University of Texas at Austin?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(5, 'Black, Red', 0),
(5, 'Blue, Orange', 0),
(5, 'White, Burnt Orange', 1),
(5, 'White, Old gold, Gold', 0);

-- Pregunta 6
INSERT INTO questions (question) VALUES ('What is 70 degrees Fahrenheit in Celsius?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(6, '18.8889', 0),
(6, '20', 0),
(6, '21.1111', 1),
(6, '158', 0);

-- Pregunta 7
INSERT INTO questions (question) VALUES ('When was Mahatma Gandhi born?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(7, 'October 2, 1869', 1),
(7, 'December 15, 1872', 0),
(7, 'July 18, 1918', 0),
(7, 'January 15, 1929', 0);

-- Pregunta 8
INSERT INTO questions (question) VALUES ('How far is the moon from Earth?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(8, '7,918 miles (12,742 km)', 0),
(8, '86,881 miles (139,822 km)', 0),
(8, '238,400 miles (384,400 km)', 1),
(8, '35,980,000 miles (57,910,000 km)', 0);

-- Pregunta 9
INSERT INTO questions (question) VALUES ('What is 65 times 52?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(9, '117', 0),
(9, '3120', 0),
(9, '3380', 1),
(9, '3520', 0);

-- Pregunta 10
INSERT INTO questions (question) VALUES ('How tall is Mount Everest?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(10, '6,683 ft (2,037 m)', 0),
(10, '7,918 ft (2,413 m)', 0),
(10, '19,341 ft (5,895 m)', 0),
(10, '29,029 ft (8,847 m)', 1);

-- Pregunta 11
INSERT INTO questions (question) VALUES ('When did The Avengers come out?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(11, 'May 2, 2008', 0),
(11, 'May 4, 2012', 1),
(11, 'May 3, 2013', 0),
(11, 'April 4, 2014', 0);

-- Pregunta 12
INSERT INTO questions (question) VALUES ('What is 48,879 in hexidecimal?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(12, '0x18C1', 0),
(12, '0xBEEF', 1),
(12, '0xDEAD', 0),
(12, '0x12D591', 0);

-- Pregunta 13
INSERT INTO questions (question) VALUES ('What is the chemical symbol for gold?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(13, 'Au', 1),
(13, 'Ag', 0),
(13, 'Gd', 0),
(13, 'Go', 0);

-- Pregunta 14
INSERT INTO questions (question) VALUES ('Who wrote ''Pride and Prejudice''?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(14, 'Charlotte Brontë', 0),
(14, 'Jane Austen', 1),
(14, 'Charles Dickens', 0),
(14, 'Mary Shelley', 0);

-- Pregunta 15
INSERT INTO questions (question) VALUES ('Which planet is known as the Red Planet?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(15, 'Mars', 1),
(15, 'Venus', 0),
(15, 'Jupiter', 0),
(15, 'Saturn', 0);

-- Pregunta 16
INSERT INTO questions (question) VALUES ('What is the largest mammal on Earth?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(16, 'Elephant', 0),
(16, 'Blue Whale', 1),
(16, 'Giraffe', 0),
(16, 'Hippopotamus', 0);

-- Pregunta 17
INSERT INTO questions (question) VALUES ('Which element has the atomic number 1?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(17, 'Helium', 0),
(17, 'Hydrogen', 1),
(17, 'Oxygen', 0),
(17, 'Lithium', 0);

-- Pregunta 18
INSERT INTO questions (question) VALUES ('In which year did World War II end?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(18, '1945', 1),
(18, '1939', 0),
(18, '1918', 0),
(18, '1950', 0);

-- Pregunta 19
INSERT INTO questions (question) VALUES ('What is the hardest natural substance on Earth?');
INSERT INTO answers (question_id, answer, is_correct) VALUES
(19, 'Diamond', 1),
(19, 'Graphite', 0),
(19, 'Quartz', 0),
(19, 'Gold', 0);
