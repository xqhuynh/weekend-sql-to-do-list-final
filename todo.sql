CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task VARCHAR(300) NOT NULL, 
	status BOOLEAN DEFAULT false
);

INSERT INTO todo
	(task, status)
VALUES
	('Wash dishes', false), 
	('Pick up groceries from Target', false),
	('Clean bathroom', true);