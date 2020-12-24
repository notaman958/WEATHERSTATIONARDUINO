create table weather (
  id serial primary key,
  device_id varchar(100),
  date_time timestamp default current_timestamp,
  data jsonb
);

create index date_time_indx on weather (date_time);