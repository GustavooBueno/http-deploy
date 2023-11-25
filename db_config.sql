create table "user"(
	id SERIAL PRIMARY KEY,
	first_name varchar(45),
	last_name varchar(45),
	email varchar(45),
	phone varchar(45),
	comments TEXT,
	status varchar DEFAULT 'active'
)