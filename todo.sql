CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(150) NOT NULL, 
	status BOOLEAN DEFAULT false
);

INSERT INTO tasks
	(task, status)
VALUES
	('Wash dishes', false), 
	('Pick up groceries from Target', false),
	('Clean bathroom', true);