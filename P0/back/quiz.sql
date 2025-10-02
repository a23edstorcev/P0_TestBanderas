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

INSERT INTO preguntas (question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen)
VALUES
('De quin país és aquesta bandera?', 'Itàlia', 'Espanya', 'França', 'Portugal', 4, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg'),
('De quin país és aquesta bandera?', 'Dinamarca', 'Àustria', 'Suïssa', 'Noruega', 3, 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg'),
('De quin país és aquesta bandera?', 'Algèria', 'Tunísia', 'Marroc', 'Egipte', 3, 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg'),
('De quin país és aquesta bandera?', 'Japó', 'Corea del Sud', 'Xina', 'Corea del Nord', 3, 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg'),
('De quin país és aquesta bandera?', 'Sèrbia', 'Txèquia', 'Rússia', 'Eslovàquia', 3, 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg'),
('De quin país és aquesta bandera?', 'Ghana', 'Kenya', 'Sud-àfrica', 'Nigèria', 3, 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg'),
('De quin país és aquesta bandera?', 'Uruguai', 'Paraguai', 'Argentina', 'Xile', 3, 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'),
('De quin país és aquesta bandera?', 'Veneçuela', 'Equador', 'Colòmbia', 'Perú', 3, 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg'),
('De quin país és aquesta bandera?', 'Luxemburg', 'França', 'Països Baixos', 'Itàlia', 2, 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg'),
('De quin país és aquesta bandera?', 'Xipre', 'Malta', 'Grècia', 'Turquia', 3, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg'),
('De quin país és aquesta bandera?', 'Itàlia', 'Costa d’Ivori', 'Mèxic', 'Irlanda', 4, 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg'),
('De quin país és aquesta bandera?', 'Mònaco', 'Singapur', 'Indonèsia', 'Polònia', 4, 'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg'),
('De quin país és aquesta bandera?', 'Bulgària', 'Iran', 'Itàlia', 'Hongria', 4, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg'),
('De quin país és aquesta bandera?', 'Marroc', 'Egipte', 'Tunísia', 'Turquia', 4, 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg'),
('De quin país és aquesta bandera?', 'Japó', 'Corea del Nord', 'Xina', 'Corea del Sud', 4, 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg'),
('De quin país és aquesta bandera?', 'Kazakhstan', 'Suècia', 'Romania', 'Ucraïna', 4, 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg'),
('De quin país és aquesta bandera?', 'Islàndia', 'Noruega', 'Suècia', 'Finlàndia', 2, 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg'),
('De quin país és aquesta bandera?', 'Suècia', 'Islàndia', 'Dinamarca', 'Noruega', 3, 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg'),
('De quin país és aquesta bandera?', 'Finlàndia', 'Noruega', 'Suècia', 'Islàndia', 1, 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg'),
('De quin país és aquesta bandera?', 'Regne Unit', 'Austràlia', 'Nova Zelanda', 'Canadà', 2, 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg'),
('De quin país és aquesta bandera?', 'Sud-àfrica', 'Nigèria', 'Kenya', 'Ghana', 2, 'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg'),
('De quin país és aquesta bandera?', 'Tunísia', 'Algèria', 'Egipte', 'Marroc', 3, 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg'),
('De quin país és aquesta bandera?', 'Bolívia', 'Perú', 'Paraguai', 'Xile', 2, 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg'),
('De quin país és aquesta bandera?', 'Argentina', 'Uruguai', 'Xile', 'Paraguai', 3, 'https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg'),
('De quin país és aquesta bandera?', 'Itàlia', 'Portugal', 'França', 'Espanya', 1, 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg'),
('De quin país és aquesta bandera?', 'Bèlgica', 'Alemanya', 'Itàlia', 'Espanya', 1, 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg'),
('De quin país és aquesta bandera?', 'Croàcia', 'Sèrbia', 'Montenegro', 'Eslovènia', 1, 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg'),
('De quin país és aquesta bandera?', 'Àustria', 'Polònia', 'Suïssa', 'Hongria', 1, 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg'),
('De quin país és aquesta bandera?', 'Noruega', 'Islàndia', 'Suècia', 'Finlàndia', 3, 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg'),
('De quin país és aquesta bandera?', 'Xipre', 'Malta', 'Grècia', 'Turquia', 3, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg');
