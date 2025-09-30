-- Crear la tabla con el campo imagen
CREATE TABLE preguntas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer_1 TEXT NOT NULL,
  answer_2 TEXT NOT NULL,
  answer_3 TEXT NOT NULL,
  answer_4 TEXT NOT NULL,
  correct_answer TINYINT NOT NULL DEFAULT 1,
  imagen VARCHAR(255) -- Nuevo campo para la URL de la imagen
);

-- Insertar todas las preguntas con sus respuestas y la URL de la imagen
INSERT INTO preguntas (question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen) VALUES
('What is the scientific name of a butterfly?', 'Apis', 'Coleoptera', 'Formicidae', 'Rhopalocera', 4, 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Monarch_butterfly.jpg'),
('How hot is the surface of the sun?', '1,233 K', '5,778 K', '12,130 K', '101,300 K', 2, 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Sun_1.jpg'),
('Who are the actors in The Internship?', 'Ben Stiller, Jonah Hill', 'Courteney Cox, Matt LeBlanc', 'Kaley Cuoco, Jim Parsons', 'Vince Vaughn, Owen Wilson', 4, 'https://upload.wikimedia.org/wikipedia/commons/1/1f/The_internship_ver2.jpg'),
('What is the capital of Spain?', 'Berlin', 'Buenos Aires', 'Madrid', 'San Juan', 3, 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Plaza_Mayor_in_Madrid.jpg'),
('What are the school colors of the University of Texas at Austin?', 'Black, Red', 'Blue, Orange', 'White, Burnt Orange', 'White, Old gold, Gold', 3, 'https://upload.wikimedia.org/wikipedia/commons/1/16/University_of_Texas_logo.svg'),
('What is 70 degrees Fahrenheit in Celsius?', '18.8889', '20', '21.1111', '158', 3, 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Temperature_conversion_chart.png'),
('When was Mahatma Gandhi born?', 'October 2, 1869', 'December 15, 1872', 'July 18, 1918', 'January 15, 1929', 1, 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Gandhi_1920.jpg'),
('How far is the moon from Earth?', '7,918 miles (12,742 km)', '86,881 miles (139,822 km)', '238,400 miles (384,400 km)', '35,980,000 miles (57,910,000 km)', 3, 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Moon_and_Earth.jpg'),
('What is 65 times 52?', '117', '3120', '3380', '3520', 3, 'https://upload.wikimedia.org/wikipedia/commons/2/26/Multiplication_table_english.png'),
('How tall is Mount Everest?', '6,683 ft (2,037 m)', '7,918 ft (2,413 m)', '19,341 ft (5,895 m)', '29,029 ft (8,847 m)', 4, 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Mount_Everest.jpg'),
('When did The Avengers come out?', 'May 2, 2008', 'May 4, 2012', 'May 3, 2013', 'April 4, 2014', 2, 'https://upload.wikimedia.org/wikipedia/commons/a/a5/The_Avengers_logo.jpg'),
('What is 48,879 in hexadecimal?', '0x18C1', '0xBEEF', '0xDEAD', '0x12D591', 2, 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Hexadecimal_numbers.png'),
('What is the chemical symbol for gold?', 'Au', 'Ag', 'Gd', 'Go', 1, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Gold_Atomic_Structure.jpg'),
('Who wrote "Pride and Prejudice"?', 'Charlotte Brontë', 'Jane Austen', 'Charles Dickens', 'Mary Shelley', 2, 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Jane_Austen_by_Smith.jpg'),
('Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Jupiter', 'Saturn', 1, 'https://upload.wikimedia.org/wikipedia/commons/0/05/Mars_hemispheres.jpg'),
('What is the largest mammal on Earth?', 'Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus', 2, 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Blue_Whale_2009.jpg'),
('Which element has the atomic number 1?', 'Helium', 'Hydrogen', 'Oxygen', 'Lithium', 2, 'https://upload.wikimedia.org/wikipedia/commons/1/12/Hydrogen-atom.jpg'),
('In which year did World War II end?', '1945', '1939', '1918', '1950', 1, 'https://upload.wikimedia.org/wikipedia/commons/e/e6/V-E_Day_in_Europe_1945.jpg'),
('What is the hardest natural substance on Earth?', 'Diamond', 'Graphite', 'Quartz', 'Gold', 1, 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Diamond_012.jpg');
