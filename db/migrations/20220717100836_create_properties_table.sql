-- migrate:up
create table properties
(
    id serial primary key,
    address text not null,
    comment text not null
);
-- migrate:down
