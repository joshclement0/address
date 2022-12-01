Create Table Users (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
Create Table Address (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255),
    zipcode character varying(10),
    city character varying(30),
    state character varying(20),
    country character varying(30)
);

INSERT INTO Address (
    userid, 
    name, 
    address, 
    zipcode, 
    city, 
    state, 
    country) 
VALUES( 
    0, 
    "Barney Fife",
    "3500 Deer Creek Road",
    "94304",
    "Palo Alto",
    "CA",
    "United States");