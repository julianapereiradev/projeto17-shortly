--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" date DEFAULT CURRENT_DATE
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT CURRENT_DATE
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT CURRENT_DATE
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, '24eb0e3d-56c2-4b9d-9f34-a78d93fffc27', '2023-08-01');
INSERT INTO public.sessions VALUES (2, 6, 'bcaa5fc2-9961-40f4-8047-cab6b414e2ae', '2023-08-01');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 1, 'https://g1.globo.com/', 'MBtiC0bo6M6Vvkl58gGAj', 0, '2023-08-01');
INSERT INTO public.urls VALUES (3, 3, 'https://g1.globo.com/', 'Wcyvg6XLFZwGnf7THQ9Mq', 0, '2023-08-01');
INSERT INTO public.urls VALUES (4, 3, 'https://g1.globo.com/', 'https://localhost:5000/Tjh28_eVzdSBNiOvcw-OR', 0, '2023-08-01');
INSERT INTO public.urls VALUES (5, 3, 'https://www.google.com.br/', 'kIV_HN358CMWU7SwqRmLh', 0, '2023-08-01');
INSERT INTO public.urls VALUES (6, 3, 'https://google.com.br/', 'VxAE5zO6Gv5FD-ThgAZvo', 0, '2023-08-01');
INSERT INTO public.urls VALUES (7, 3, 'https://google.com/', 'RtZoP0LyvgR1gu9pSWW7e', 0, '2023-08-01');
INSERT INTO public.urls VALUES (8, 3, 'https://www.r7.com/', 'HZ0yGm9ad95cjkocvkCxo', 0, '2023-08-01');
INSERT INTO public.urls VALUES (9, 3, 'https://www.linkedin.com/', 'tYiNoSySjRLvwbB_8kYkd', 0, '2023-08-01');
INSERT INTO public.urls VALUES (10, 3, 'https://www.driven.com.br/', 'hiT-3DfHrfJOFx_8plWY2', 0, '2023-08-01');
INSERT INTO public.urls VALUES (11, 3, 'https://www.driven.com.br/', 'wZasd-Rz3vvSmgnzNGXnV', 0, '2023-08-01');
INSERT INTO public.urls VALUES (12, 3, 'https://www.youtube.com/', 'OrWU1vIjI0ms0pdknixkZ', 0, '2023-08-01');
INSERT INTO public.urls VALUES (13, 3, 'https://www.youtube.com/', 'oMOeJCIk7sVMqlfAaJcjZ', 0, '2023-08-01');
INSERT INTO public.urls VALUES (16, 3, 'https://twitter.com/', 'xFA6g6Rx-41g8rGS_WrIc', 0, '2023-08-01');
INSERT INTO public.urls VALUES (17, 6, 'https://twitter.com/', 'WHNX9IxIWm5y_KKnryJgt', 0, '2023-08-01');
INSERT INTO public.urls VALUES (18, 6, 'https://tumblr.com/', 'KYHSNaEBMAjamsC-3114l', 0, '2023-08-01');
INSERT INTO public.urls VALUES (21, 6, 'https://mercadolivre.com.br/', 'Q8ZfWnZhU_0yo_xC39V6x', 0, '2023-08-01');
INSERT INTO public.urls VALUES (14, 3, 'https://www.instagram.com/', 'Enw86vDmmxpCI06JOgJ6C', 5, '2023-08-01');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Juliana', 'ju@gmail.com', '123', '2023-08-01');
INSERT INTO public.users VALUES (2, 'Lucas', 'lu@gmail.com', '123', '2023-08-01');
INSERT INTO public.users VALUES (3, 'Lilian', 'lili@gmail.com', '$2b$10$OAbvk4mM08yHHLwHudKSxOKj9jiLJTRYR5AcQPVZsI2rHBIXXT7Xe', '2023-08-01');
INSERT INTO public.users VALUES (5, 'João', 'joão@gmail.com', '$2b$10$JlmJwrP5jYN5onJ5NSOvt.e7gEdt3cyP1JMnfvuUQ.ZIAiRTb/KWG', '2023-08-01');
INSERT INTO public.users VALUES (6, 'Juliana', 'juliana@gmail.com', '$2b$10$BsGipso1NvSHvLv2ufuxBOO2OZ.DtzShJm8jD49qlQLKasgTcfTem', '2023-08-01');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

