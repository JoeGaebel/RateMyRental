-- migrate:up
DROP TABLE properties;

create table addresses
(
    id serial primary key,
    address text not null
);

-- migrate:down
