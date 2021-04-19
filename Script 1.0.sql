-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.3
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: image_collection | type: DATABASE --
-- DROP DATABASE IF EXISTS image_collection;
CREATE DATABASE image_collection;
-- ddl-end --


-- object: public.image_sequence | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.image_sequence CASCADE;
CREATE SEQUENCE public.image_sequence
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.image_sequence OWNER TO postgres;
-- ddl-end --

-- object: public.image | type: TABLE --
-- DROP TABLE IF EXISTS public.image CASCADE;
CREATE TABLE public.image (
	id bigint NOT NULL DEFAULT nextval('public.image_sequence'::regclass),
	name text NOT NULL,
	creation_date timestamp NOT NULL,
	size integer NOT NULL,
	format text NOT NULL,
	resolution_x integer NOT NULL,
	resolution_y integer NOT NULL,
	description text,
	thumb bytea,
	image_proper bytea NOT NULL,
	id_user bigint NOT NULL,
	CONSTRAINT image_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.image OWNER TO postgres;
-- ddl-end --

-- object: public.user_sequence | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.user_sequence CASCADE;
CREATE SEQUENCE public.user_sequence
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.user_sequence OWNER TO postgres;
-- ddl-end --

-- object: public.user_id | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.user_id CASCADE;
CREATE SEQUENCE public.user_id
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.user_id OWNER TO postgres;
-- ddl-end --

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	id bigint NOT NULL DEFAULT nextval('public.user_sequence'::regclass),
	nickname text NOT NULL,
	email text NOT NULL,
	password_hash bytea NOT NULL,
	password_salt text NOT NULL,
	icon bytea NOT NULL,
	is_admin bool NOT NULL DEFAULT false,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_nick_email_constraint UNIQUE (nickname,email)

);
-- ddl-end --
ALTER TABLE public."user" OWNER TO postgres;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.image DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.image ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.category_sequence | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.category_sequence CASCADE;
CREATE SEQUENCE public.category_sequence
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.category_sequence OWNER TO postgres;
-- ddl-end --

-- object: public.category | type: TABLE --
-- DROP TABLE IF EXISTS public.category CASCADE;
CREATE TABLE public.category (
	id bigint NOT NULL DEFAULT nextval('public.category_sequence'::regclass),
	name text NOT NULL,
	icon bytea,
	CONSTRAINT category_pk PRIMARY KEY (id),
	CONSTRAINT unique_category UNIQUE (name)

);
-- ddl-end --
ALTER TABLE public.category OWNER TO postgres;
-- ddl-end --

-- object: public.tag_sequence | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.tag_sequence CASCADE;
CREATE SEQUENCE public.tag_sequence
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.tag_sequence OWNER TO postgres;
-- ddl-end --

-- object: public.tag | type: TABLE --
-- DROP TABLE IF EXISTS public.tag CASCADE;
CREATE TABLE public.tag (
	id bigint NOT NULL DEFAULT nextval('public.tag_sequence'::regclass),
	name text NOT NULL,
	CONSTRAINT tag_pk PRIMARY KEY (id),
	CONSTRAINT unique_tag UNIQUE (name)

);
-- ddl-end --
ALTER TABLE public.tag OWNER TO postgres;
-- ddl-end --

-- object: public.many_category_has_many_image | type: TABLE --
-- DROP TABLE IF EXISTS public.many_category_has_many_image CASCADE;
CREATE TABLE public.many_category_has_many_image (
	id_category bigint NOT NULL,
	id_image bigint NOT NULL,
	CONSTRAINT many_category_has_many_image_pk PRIMARY KEY (id_category,id_image)

);
-- ddl-end --

-- object: category_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_category_has_many_image DROP CONSTRAINT IF EXISTS category_fk CASCADE;
ALTER TABLE public.many_category_has_many_image ADD CONSTRAINT category_fk FOREIGN KEY (id_category)
REFERENCES public.category (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: image_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_category_has_many_image DROP CONSTRAINT IF EXISTS image_fk CASCADE;
ALTER TABLE public.many_category_has_many_image ADD CONSTRAINT image_fk FOREIGN KEY (id_image)
REFERENCES public.image (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.many_tag_has_many_image | type: TABLE --
-- DROP TABLE IF EXISTS public.many_tag_has_many_image CASCADE;
CREATE TABLE public.many_tag_has_many_image (
	id_tag bigint NOT NULL,
	id_image bigint NOT NULL,
	CONSTRAINT many_tag_has_many_image_pk PRIMARY KEY (id_tag,id_image)

);
-- ddl-end --

-- object: tag_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_tag_has_many_image DROP CONSTRAINT IF EXISTS tag_fk CASCADE;
ALTER TABLE public.many_tag_has_many_image ADD CONSTRAINT tag_fk FOREIGN KEY (id_tag)
REFERENCES public.tag (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: image_fk | type: CONSTRAINT --
-- ALTER TABLE public.many_tag_has_many_image DROP CONSTRAINT IF EXISTS image_fk CASCADE;
ALTER TABLE public.many_tag_has_many_image ADD CONSTRAINT image_fk FOREIGN KEY (id_image)
REFERENCES public.image (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


