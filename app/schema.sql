drop table if exists notes;
create table notes (
  id integer primary key,
  type text not null,
  'text' text not null,
  top integer not null,
  left integer not null,
  desktop integer not null
);
