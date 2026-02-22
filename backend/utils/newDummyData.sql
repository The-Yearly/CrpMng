--
-- PostgreSQL database dump
--

\restrict OaZEghW7Mp3PbOCHDjgqQjSrNjOfzTH08ccuEcKBalR8acdBcT94Ck5lKGRz49S

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'Male',
    'Female'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- Name: LandHoldingType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LandHoldingType" AS ENUM (
    'Own',
    'Lease'
);


ALTER TYPE public."LandHoldingType" OWNER TO postgres;

--
-- Name: MigrantStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MigrantStatus" AS ENUM (
    'Migrant',
    'Local'
);


ALTER TYPE public."MigrantStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: agent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agent (
    "agentId" integer NOT NULL,
    "agentName" text NOT NULL,
    "agentEmail" text NOT NULL,
    "agentPass" text NOT NULL,
    "agentPic" text NOT NULL
);


ALTER TABLE public.agent OWNER TO postgres;

--
-- Name: agent_agentId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."agent_agentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."agent_agentId_seq" OWNER TO postgres;

--
-- Name: agent_agentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."agent_agentId_seq" OWNED BY public.agent."agentId";


--
-- Name: crop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crop (
    "cropId" integer NOT NULL,
    "cropName" text NOT NULL,
    "cropImage" text NOT NULL,
    "cropDesc" text NOT NULL,
    "cropColor" text DEFAULT '#C92F0A'::text NOT NULL
);


ALTER TABLE public.crop OWNER TO postgres;

--
-- Name: crop_cropId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."crop_cropId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."crop_cropId_seq" OWNER TO postgres;

--
-- Name: crop_cropId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."crop_cropId_seq" OWNED BY public.crop."cropId";


--
-- Name: cropplottable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cropplottable (
    "cropId" integer NOT NULL,
    "plotId" integer NOT NULL
);


ALTER TABLE public.cropplottable OWNER TO postgres;

--
-- Name: cropstages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cropstages (
    sid integer NOT NULL,
    stagename text NOT NULL,
    "cropId" integer NOT NULL,
    stagenumber integer DEFAULT 0 NOT NULL,
    duration integer DEFAULT 0 NOT NULL,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cropstages OWNER TO postgres;

--
-- Name: cropstages_sid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cropstages_sid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cropstages_sid_seq OWNER TO postgres;

--
-- Name: cropstages_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cropstages_sid_seq OWNED BY public.cropstages.sid;


--
-- Name: cropsubstages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cropsubstages (
    substageid integer NOT NULL,
    stageid integer NOT NULL,
    substagename text NOT NULL,
    substagenumber integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.cropsubstages OWNER TO postgres;

--
-- Name: cropsubstages_substageid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cropsubstages_substageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cropsubstages_substageid_seq OWNER TO postgres;

--
-- Name: cropsubstages_substageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cropsubstages_substageid_seq OWNED BY public.cropsubstages.substageid;


--
-- Name: cropsubstagesvalue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cropsubstagesvalue (
    substagedataid integer NOT NULL,
    substageid integer NOT NULL,
    substagecoloumn text NOT NULL,
    substagecoloumnvalue text NOT NULL
);


ALTER TABLE public.cropsubstagesvalue OWNER TO postgres;

--
-- Name: cropsubstagesvalue_substagedataid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cropsubstagesvalue_substagedataid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cropsubstagesvalue_substagedataid_seq OWNER TO postgres;

--
-- Name: cropsubstagesvalue_substagedataid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cropsubstagesvalue_substagedataid_seq OWNED BY public.cropsubstagesvalue.substagedataid;


--
-- Name: farmer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farmer (
    "farmerId" integer NOT NULL,
    "farmerName" text DEFAULT ''::text NOT NULL,
    "farmerFather" text DEFAULT ''::text NOT NULL,
    "farmerPic" text DEFAULT ''::text NOT NULL,
    address text DEFAULT ''::text NOT NULL,
    phone text DEFAULT ''::text NOT NULL,
    "agentId" integer NOT NULL,
    "aadharNumber" text DEFAULT ''::text NOT NULL,
    country text DEFAULT ''::text NOT NULL,
    district text DEFAULT ''::text NOT NULL,
    "farmCode" integer DEFAULT 0 NOT NULL,
    "farmerAge" integer DEFAULT 0 NOT NULL,
    "farmerAssociation" text DEFAULT ''::text NOT NULL,
    gender public."Gender" DEFAULT 'Male'::public."Gender" NOT NULL,
    "landHoldingType" public."LandHoldingType" DEFAULT 'Own'::public."LandHoldingType" NOT NULL,
    "migrantStatus" public."MigrantStatus" DEFAULT 'Local'::public."MigrantStatus" NOT NULL,
    season text DEFAULT ''::text NOT NULL,
    tehsil text DEFAULT ''::text NOT NULL,
    village text DEFAULT ''::text NOT NULL,
    state text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.farmer OWNER TO postgres;

--
-- Name: farmer_farmerId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."farmer_farmerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."farmer_farmerId_seq" OWNER TO postgres;

--
-- Name: farmer_farmerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."farmer_farmerId_seq" OWNED BY public.farmer."farmerId";


--
-- Name: farmercropstable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farmercropstable (
    "cropId" integer NOT NULL,
    "farmerId" integer NOT NULL
);


ALTER TABLE public.farmercropstable OWNER TO postgres;

--
-- Name: plot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plot (
    "plotId" integer NOT NULL,
    "farmerId" integer NOT NULL,
    "plotCords" jsonb NOT NULL,
    address text NOT NULL,
    location text NOT NULL,
    "plotImage" text NOT NULL
);


ALTER TABLE public.plot OWNER TO postgres;

--
-- Name: plot_plotId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."plot_plotId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."plot_plotId_seq" OWNER TO postgres;

--
-- Name: plot_plotId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."plot_plotId_seq" OWNED BY public.plot."plotId";


--
-- Name: plotsubstagevalue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plotsubstagevalue (
    "plotId" integer NOT NULL,
    substagdataeid integer NOT NULL,
    data text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.plotsubstagevalue OWNER TO postgres;

--
-- Name: agent agentId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agent ALTER COLUMN "agentId" SET DEFAULT nextval('public."agent_agentId_seq"'::regclass);


--
-- Name: crop cropId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop ALTER COLUMN "cropId" SET DEFAULT nextval('public."crop_cropId_seq"'::regclass);


--
-- Name: cropstages sid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropstages ALTER COLUMN sid SET DEFAULT nextval('public.cropstages_sid_seq'::regclass);


--
-- Name: cropsubstages substageid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstages ALTER COLUMN substageid SET DEFAULT nextval('public.cropsubstages_substageid_seq'::regclass);


--
-- Name: cropsubstagesvalue substagedataid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstagesvalue ALTER COLUMN substagedataid SET DEFAULT nextval('public.cropsubstagesvalue_substagedataid_seq'::regclass);


--
-- Name: farmer farmerId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer ALTER COLUMN "farmerId" SET DEFAULT nextval('public."farmer_farmerId_seq"'::regclass);


--
-- Name: plot plotId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plot ALTER COLUMN "plotId" SET DEFAULT nextval('public."plot_plotId_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0682d695-eb90-42ca-aaa5-4fb54e86d7d8	8282e2e21ef0638004c2d83d38767e59625e3872938dbf3fa9a8add02cdcdbb6	2026-02-15 18:11:00.844897+05:30	20260126082747	\N	\N	2026-02-15 18:11:00.827405+05:30	1
c218c9c0-9dd6-4fdb-90b5-eb11451ce850	fb5ac637d80deccc9a36c41f78de267c050548495577461c0c6add2e9f9e9dda	2026-02-15 18:11:00.928048+05:30	20260215120146	\N	\N	2026-02-15 18:11:00.900491+05:30	1
f9b358ac-a715-4f6a-b86d-0a75b2aa77b9	88cdf02e3e96df5d02e5ad8c16b323ca3693445762252b5cc77936e7e690e8e9	2026-02-15 18:11:00.84748+05:30	20260126083119	\N	\N	2026-02-15 18:11:00.845402+05:30	1
fa68bc15-6566-45ed-94f8-3db87909580e	f77f1dec98dbf893762220e687822f1640a5b6415fdf99a3819be8f6060c8f4d	2026-02-15 18:11:00.849635+05:30	20260126083746	\N	\N	2026-02-15 18:11:00.847856+05:30	1
72c779ff-2e75-4da2-a799-66b21e4cd2a7	daf4b1fb4d741bad6295c44aa7fd482de4a79ed9adb48591fc059791f2c67980	2026-02-15 18:11:00.853312+05:30	20260126084434	\N	\N	2026-02-15 18:11:00.849996+05:30	1
3e3bfa7c-572a-42b5-ba8b-528c4ab939d3	b05ab80f4baa99ad0eed411e4300c45219148f84c8f49a72a65f7edf0081da93	2026-02-15 18:11:00.934941+05:30	20260215123123	\N	\N	2026-02-15 18:11:00.928479+05:30	1
d869cc88-9bd9-44ab-b5cb-17cfcde90086	cfe84970136ef97c838ff938be05676d4d49ab9c5279d8599dfcd165c1720e90	2026-02-15 18:11:00.858278+05:30	20260126092634	\N	\N	2026-02-15 18:11:00.853678+05:30	1
be95650a-3c98-4c16-b3a1-5d692e0751ee	e18b72fced0745f312ca2387c8339ca71c4e6a7a5e39cae24e23791d711a1f41	2026-02-15 18:11:00.860399+05:30	20260126092823	\N	\N	2026-02-15 18:11:00.858675+05:30	1
78147981-d439-43a6-9734-4343493b7b76	26f9a8712e087d56f46482665a1aa9d918a8062a3da57bb07bf7bfa18d1b6203	2026-02-15 18:11:00.862315+05:30	20260126093913	\N	\N	2026-02-15 18:11:00.86077+05:30	1
7d308ee4-76a1-41d5-8274-cac678880aa5	6a3e9278fb2ed0679cd3373dcb855bac2907cea629137ead3403967b3b16e0ca	2026-02-16 00:29:33.758011+05:30	20260215185933	\N	\N	2026-02-16 00:29:33.639545+05:30	1
60adafac-91a0-469f-b4fe-a3b2a8478c02	ba7d17448fda69f89b9e1d5f4f72f09a91792e0cdbb911abfb2088ca7119fa18	2026-02-15 18:11:00.864256+05:30	20260126094221	\N	\N	2026-02-15 18:11:00.86267+05:30	1
c9b7e1c3-cde7-4493-a89f-7231434a5579	9f1351f1bcb77bae39209e027d62a511fcf9c37390651b7aa2711231e75874b8	2026-02-15 18:11:00.866153+05:30	20260126123913	\N	\N	2026-02-15 18:11:00.86462+05:30	1
fe3cd3b4-e7da-40ca-8127-3435fbf06f28	924c47846e78eb840a36c58e8fe4b0fceacce470b0f34b7b0b2cc4c6bc781968	2026-02-15 18:11:00.873704+05:30	20260211173300	\N	\N	2026-02-15 18:11:00.86651+05:30	1
ac7197d3-6ab9-4eeb-b31e-ef16d6fa4de8	7e7abe1283b873786f975f5639b6a7cfa2115f1f9151a3fed05ec6ea1c976211	2026-02-16 04:22:14.762473+05:30	20260215225214	\N	\N	2026-02-16 04:22:14.608765+05:30	1
059305fc-f2a8-4833-8bc7-844fcd591d8b	1f60c0a626487456fabe376e0f98964b2d8d21c3b4aa59818a116e5fe59c4b65	2026-02-15 18:11:00.876314+05:30	20260211173740	\N	\N	2026-02-15 18:11:00.874232+05:30	1
e6ef32b5-d746-412e-beb3-65a9f48dff4f	299b86be727aca7fdd5b1931b75a94172d64f9479e6451a5c830c59943541be3	2026-02-15 18:11:00.881928+05:30	20260211175830	\N	\N	2026-02-15 18:11:00.876745+05:30	1
e9aa8a56-f555-47de-9a87-11b973477afb	8aeaed07b8d97d749590234b52b1ea6a121a78cfb0899b303ab45c44ec9aa421	2026-02-15 18:11:00.883979+05:30	20260211180945	\N	\N	2026-02-15 18:11:00.882364+05:30	1
0767cfad-fa3f-4af2-ae0c-d84c2fa4e70d	95f23f2e0ec4c6e11cc6d748d4e669815c008ac818708761b6d8be33af32bba2	2026-02-15 18:11:00.892355+05:30	20260211181753	\N	\N	2026-02-15 18:11:00.884363+05:30	1
1a307e87-dc6b-4e4c-b2c6-7f7e020c6173	828f4a5bc4670b18cb35ee38b464b67b1c41ad29894d6c0a965de0bbcffe603c	2026-02-15 18:11:00.89986+05:30	20260215091044	\N	\N	2026-02-15 18:11:00.892943+05:30	1
288ca97b-1a72-4c1f-b794-ceca4d225bc6	937e4b38e01cec471c58457dcc5a02e860bdaf2049006aa1265eed00a0e06377	2026-02-21 20:37:56.206159+05:30	20260221150756	\N	\N	2026-02-21 20:37:56.137055+05:30	1
7f3f24e9-4677-41cc-8ed6-a344db00abb4	5e412f6ceb5a099ba75855031f1b99cdad5a4a1f8a3860d6f1f7795ad7e74a2a	2026-02-21 23:04:02.481983+05:30	20260221173402	\N	\N	2026-02-21 23:04:02.441419+05:30	1
586f8326-e690-455e-ae59-00798dd9b1b6	5db2a1f80b964f26ab841ca2efd03df9fcab11ad4597b2c66ff99259e9035a30	2026-02-22 02:51:15.491827+05:30	20260221212115	\N	\N	2026-02-22 02:51:15.489883+05:30	1
\.


--
-- Data for Name: agent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agent ("agentId", "agentName", "agentEmail", "agentPass", "agentPic") FROM stdin;
1	Vikram Singh	vikram.singh@farmnet.com	pass123@Vikram	https://picsum.photos/200/200?random=201
2	Anjali Menon	anjali.menon@farmnet.com	pass123@Anjali	https://picsum.photos/200/200?random=202
3	Rohan Patel	rohan.patel@farmnet.com	pass123@Rohan	https://picsum.photos/200/200?random=203
4	Deepa Iyer	deepa.iyer@farmnet.com	pass123@Deepa	https://picsum.photos/200/200?random=204
5	Suresh Kumar	suresh.kumar@farmnet.com	pass123@Suresh	https://picsum.photos/200/200?random=205
6	Priya Nair	priya.nair@farmnet.com	pass123@Priya	https://picsum.photos/200/200?random=206
7	Arjun Verma	arjun.verma@farmnet.com	pass123@Arjun	https://picsum.photos/200/200?random=207
8	Meera Pillai	meera.pillai@farmnet.com	pass123@Meera	https://picsum.photos/200/200?random=208
\.


--
-- Data for Name: crop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crop ("cropId", "cropName", "cropImage", "cropDesc", "cropColor") FROM stdin;
32	sasd	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJijxKlCsoM27UKuAv2USooiTDOxkCt2w0aQ&s		#c92c2c
35	newCrop	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizRC-EA3WUoM5-CBhYgJcBVjZk4roaYCATShZ-kBedXnuAmPn5v8zjN7roGN9cMnH0GR0oOa4i5O78NsmR2jX64AiCBKHWvSkrWM09gdp&s=10		#b13e3e
3	Ginger	https://www.vitaeinternational.com/wp-content/uploads/2015/12/benefits-of-ginger-770x512.jpg	Ginger is a flowering plant whose rhizome is widely used as a spice and traditional medicine.	#e6970f
2	TURMERIC	https://www.pepperhub.in/wp-content/uploads/2023/09/1bf06c5cea51367e2212422781978436-1024x768_11zon.jpg	Turmeric is a rhizomatous herbaceous perennial plant widely used for culinary, medicinal, and cosmetic purposes.	#e0bc0b
31	sasd	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJijxKlCsoM27UKuAv2USooiTDOxkCt2w0aQ&s		#C92F0A
33	sd	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJijxKlCsoM27UKuAv2USooiTDOxkCt2w0aQ&s		#C92F0A
1	CHILLI	https://img.freepik.com/premium-photo/bunch-red-hot-chili-pepper-closeup-dark-background-selective-focus-no-people-concept-food-background-toned-image_322022-820.jpg	Chilli is a major commercial spice crop grown for its pungent fruits used in culinary and industrial applications.	#fa3200
34	sd	https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/golden-wheat-grass.cdn.en-US.1.jpg?fit=crop&auto=format&crop=focalpoint&fp-x=0.35&fp-y=0.6&fp-z=1&w=645&h=403		#C92F0A
4	Marigolds	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJijxKlCsoM27UKuAv2USooiTDOxkCt2w0aQ&s	Marigold is a popular ornamental flower crop cultivated for garlands, decorations, and essential oils.	#f8473a
\.


--
-- Data for Name: cropplottable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cropplottable ("cropId", "plotId") FROM stdin;
1	1
2	2
3	3
4	4
1	5
2	6
3	7
4	8
1	9
2	10
3	11
4	12
1	13
2	14
3	15
4	16
3	19
4	20
\.


--
-- Data for Name: cropstages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cropstages (sid, stagename, "cropId", stagenumber, duration, "startedAt", "endDate") FROM stdin;
2	Nursery stage	1	2	45	2024-01-16 00:00:00	2024-03-01 00:00:00
4	Thinning/Gap filling	1	4	15	2024-03-02 00:00:00	2024-03-16 00:00:00
5	Vegetative stage	1	5	50	2024-03-17 00:00:00	2024-05-05 00:00:00
6	Flowering stage	1	6	30	2024-05-06 00:00:00	2024-06-04 00:00:00
7	Green fruit stage	1	7	20	2024-06-05 00:00:00	2024-06-24 00:00:00
8	Ripening fruit stage	1	8	20	2024-06-25 00:00:00	2024-07-14 00:00:00
9	Harvesting stage	1	9	30	2024-07-15 00:00:00	2024-08-13 00:00:00
10	Post harvesting stage	1	10	20	2024-08-14 00:00:00	2024-09-02 00:00:00
39	Stage 1	2	0	5	2026-02-16 16:15:30.782	2026-02-16 16:15:30.782
43	Stage 1	3	0	2	2026-02-20 19:42:50.286	2026-02-20 19:42:50.286
1	Sowing Activity	1	1	2	2024-01-01 00:00:00	2024-01-15 00:00:00
3	Sowing	1	3	2	2024-03-02 00:00:00	2024-03-16 00:00:00
44	Stage 1	4	0	3	2026-02-20 19:51:38.402	2026-02-20 19:51:38.402
45	Stage 2	4	0	1	2026-02-20 19:52:53.574	2026-02-20 19:52:53.574
46	Stage 2	3	0	5	2026-02-20 20:31:28.74	2026-02-20 20:31:28.74
\.


--
-- Data for Name: cropsubstages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cropsubstages (substageid, stageid, substagename, substagenumber) FROM stdin;
2	1	Manure details	2
3	1	Land Details	3
4	1	Soil Analysis	4
5	1	Water Analysis	5
6	1	Border Fields	6
7	2	Nursery details	1
8	3	Sowing activity	1
9	3	Seedling	2
10	3	Weeding & Intercultivation	3
11	3	Crop Observation	4
12	3	Chemical	5
13	3	Fertilizer	6
14	3	Irrigation	7
15	4	Weeding & Intercultivation	1
16	4	Crop Observation	2
17	4	Chemical	3
18	4	Fertilizer	4
19	4	Irrigation	5
20	4	Thinning/Gapfilling Activity	6
21	4	Seedling For Thinning/Gapfilling	7
22	5	Weeding & Intercultivation	1
23	5	Crop Observation	2
24	5	Chemical	3
25	5	Fertilizer	4
26	5	Irrigation	5
27	5	Border Crop Details	6
28	6	Weeding & Intercultivation	1
29	6	Crop Observation	2
30	6	Chemical	3
31	6	Fertilizer	4
32	6	Irrigation	5
33	6	Sticky/Pheromone/Solar Trap Details	6
34	7	Weeding & Intercultivation	1
35	7	Crop Observation	2
36	7	Chemical	3
37	7	Fertilizer	4
38	7	Irrigation	5
39	8	Crop Observation	1
40	8	Chemical	2
41	8	Irrigation	3
42	8	Fruit Detail	4
43	9	Harvesting Activity Details	1
44	10	Drying & Cleaning	1
45	10	Final Lot Appearence	2
46	10	Sampling & Loading Stage	3
47	10	Loading Data-If Sample Passes	4
1	1	Ploughings	1
60	39	sb1	0
62	39	f1	0
66	44	Sub-Stage 1	0
67	45	22	0
68	46	Sub Stage 1	0
71	39	sd	0
\.


--
-- Data for Name: cropsubstagesvalue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cropsubstagesvalue (substagedataid, substageid, substagecoloumn, substagecoloumnvalue) FROM stdin;
2	1	Ploughing cost	Number
3	1	Ploughing date	Date
4	1	MB plough cost	Number
5	1	Rotovator cost	Number
6	1	Making of transplanting rows cost	Number
7	1	Cultivator activities cost	Number
8	1	Total cost	Number
9	2	Fertilizer/Manure applied (Yes/No)	Boolean
10	2	Name of manure	String
11	2	Applied quantity (Kg/Acre)	Number
12	2	Total cost	Number
13	3	Type of land (Lease/Own)	String
14	3	Land lease cost per acre	Number
15	4	Soil type	String
16	4	Soil analysis done (Yes/No)	Boolean
17	4	Date	Date
18	4	Upload Soil analysis picture	Image
19	4	Analysis cost	Number
20	4	Lab name	String
21	5	Water analysis done (Yes/No)	Boolean
22	5	Date	Date
23	5	Upload water analysis picture	Image
24	5	Analysis cost	Number
25	5	Irrigation source	String
26	5	Irrigation type	String
27	6	North	String
28	6	South	String
29	6	East	String
30	6	West	String
31	7	Crop variety	String
32	7	Nursery details (open/shade net)	String
33	7	Nursery type (own/outsource)	String
34	7	Nursery cost	Number
35	8	Activity type (direct sowing/Transplanting)	String
36	8	Field photo	Image
37	8	Date	Date
38	9	Seed quantity used for direct sowing (Kg/Acre)	Number
39	9	Seed cost	Number
40	9	Seedlings used (No/Acre)	Number
41	9	Seedling cost	Number
42	9	Seed Spacing-Inches	Number
43	9	Seedling Spacing-Inches	Number
44	9	No of labours per acre	Number
45	9	Labour cost per acre	Number
46	9	Total cost per acre	Number
47	10	Weeding & Intercultivation done (Yes/No)	Boolean
48	10	Labour cost-Per person(weeding)	Number
49	10	Date of weeding	Date
50	10	Weeding cost	Number
51	10	Date of intercultivation	Date
52	10	Intercultivation cost	Number
53	10	Total cost	Number
54	11	Crop Observation (Good/Average/poor)	String
55	11	Recommendation (Yes/No)	Boolean
56	11	Date of observation	Date
57	11	Add photos	Image
58	12	Date	Date
59	12	Pesticide applied (Yes/No)	Boolean
60	12	Disease/Pest	String
61	12	Applied-Pesticide/Fungicide	String
62	12	Cost of chemicals per acre	Number
63	12	Labour cost per acre	Number
64	12	Total cost	Number
65	13	Date	Date
66	13	Fertilizer applied (Yes/No)	Boolean
67	13	Applied-Fertilizer	String
68	13	Total cost of Fertilizer	Number
69	13	Labour cost per acre	Number
70	13	Total cost	Number
71	14	Date	Date
72	14	Irrigation Done (Yes/No)	Boolean
73	14	Labour cost per acre	Number
74	15	Weeding & Intercultivation done (Yes/No)	Boolean
75	15	Labour cost-Per person(weeding)	Number
76	15	Date of weeding	Date
77	15	Weeding cost	Number
78	15	Date of intercultivation	Date
79	15	Intercultivation cost	Number
80	15	Total cost	Number
81	16	Crop Observation	String
82	16	Recommendation	Boolean
83	16	Date of observation	Date
84	16	Add photos	Image
85	17	Date	Date
86	17	Pesticide applied	Boolean
87	17	Disease/Pest	String
88	17	Applied-Pesticide/Fungicide	String
89	17	Cost of chemicals per acre	Number
90	17	Labour cost per acre	Number
91	17	Total cost	Number
92	18	Date	Date
93	18	Fertilizer applied	Boolean
94	18	Applied-Fertilizer	String
95	18	Total cost of Fertilizer	Number
96	18	Labour cost per acre	Number
97	18	Total cost	Number
98	19	Date	Date
99	19	Irrigation done	Boolean
100	19	Labour cost per acre	Number
101	20	Field photo of live task	Image
102	20	Date of activity	Date
103	20	No of labours	Number
104	20	Labour cost per person	Number
105	20	Labour cost per acre	Number
106	21	Seed quantity used gram/acre	Number
107	21	Seed cost	Number
108	21	Seedlings used per acre	Number
109	21	Seedling cost	Number
110	21	No of labours per acre	Number
111	21	Labour cost per person	Number
112	21	Labour cost per acre	Number
113	21	Date of activity	Date
114	21	Total cost	Number
115	21	Field photo of live task	Image
116	22	Weeding done (Yes/No)	Boolean
117	22	Total cost	Number
118	23	Crop Observation	String
119	23	Add photos	Image
120	24	Pesticide applied	Boolean
121	24	Cost of chemicals	Number
122	25	Fertilizer applied	Boolean
123	25	Total cost	Number
124	26	Irrigation done	Boolean
125	26	Date	Date
126	27	Border crop (Yes/No)	Boolean
127	27	Border crop name	String
128	27	Trap crop name	String
129	27	Border crop photo	Image
130	27	Trap crop photo	Image
131	28	Total cost	Number
132	29	Add photos	Image
133	30	Applied-Pesticide	String
134	31	Applied-Fertilizer	String
135	32	Irrigation done	Boolean
136	33	Sticky trap	String
137	33	Sticky trap cost	Number
138	33	Pheromone trap	String
139	33	Pheromone trap cost	Number
140	33	Solar trap	String
141	33	Solar trap cost	Number
142	33	Total cost	Number
143	34	Total cost	Number
144	35	Add photos	Image
145	36	Cost of chemicals	Number
146	37	Total cost of Fertilizer	Number
147	38	Irrigation done	Boolean
148	39	Crop Observation	String
149	40	Cost of chemicals per acre	Number
150	41	Irrigation done	Boolean
151	42	Fruit maturity (Good/Average/poor)	String
152	42	Fruit appearance	String
153	42	Field photo of live task	Image
154	42	Fruit ripened (Yes/No)	Boolean
155	42	Uniform colour (Yes/No)	Boolean
156	42	Check for spray status	String
157	43	Field photo of harvest	Image
158	43	Matured fruit percentage	Number
159	43	Harvest start date	Date
160	43	Harvest complete date	Date
161	43	No of labours per acre	Number
162	43	Labour cost per acre	Number
163	43	Expecting yeild-kg/acre	Number
164	44	Drying done	Boolean
165	44	Drying condition	String
166	44	Cleaning done	Boolean
167	44	Cleaning condition	String
168	44	No of labours per acre	Number
169	44	Labour cost per acre	Number
170	45	Final Lot Appearence	String
171	46	Lot sample collection done	Boolean
172	46	Sampling date	Date
173	46	Lot sample results (Pass/Fail)	String
174	46	Results date	Date
175	46	Number of days	Number
176	46	Reason for rejection	String
177	46	Sample analysis cost	Number
178	47	Lot quality	String
179	47	Stuffing date	Date
180	47	Loading date	Date
181	47	Invoice number	String
182	47	Vehicle number	String
183	47	No of bags	Number
184	47	Purchase price Rs/Kg	Number
185	47	Total weight in Kg	Number
186	47	Invoice copy	Image
187	47	Total avg yeild per acre in kg	Number
1	1	No of ploughing	Number
191	60	f1	Number
193	60	f2	Boolean
196	66	Sub Sib 1	Boolean
\.


--
-- Data for Name: farmer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farmer ("farmerId", "farmerName", "farmerFather", "farmerPic", address, phone, "agentId", "aadharNumber", country, district, "farmCode", "farmerAge", "farmerAssociation", gender, "landHoldingType", "migrantStatus", season, tehsil, village, state) FROM stdin;
1	Rajesh Kumar		https://picsum.photos/150/150?random=101		+91-9876543201	1				0	0		Male	Own	Local				
2	Priya Sharma		https://picsum.photos/150/150?random=102		+91-9876543202	1				0	0		Male	Own	Local				
3	Arun Nair		https://picsum.photos/150/150?random=103		+91-9876543203	2				0	0		Male	Own	Local				
5	Vijay Kumar		https://picsum.photos/150/150?random=105		+91-9876543205	4				0	0		Male	Own	Local				
6	Sneha Patel		https://picsum.photos/150/150?random=106		+91-9876543206	5				0	0		Male	Own	Local				
7	Harish Menon		https://picsum.photos/150/150?random=107		+91-9876543207	6				0	0		Male	Own	Local				
9	sSanjay Vermas	asd	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJijxKlCsoM27UKuAv2USooiTDOxkCt2w0aQ&s	asd	+91-9876543209	1	asd	asd	2sd	4	0	asd	Male	Own	Local	asd	Mandal	asd	Kerala
4	Meera Pillai	Pillai Ram	data:image/jpeg;base64,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	qasd	+91-9876543204	1	2443434	India	Papapad	2	30	sad	Male	Own	Local	Summer	Tehsil	adfad	Tamil Nadu
\.


--
-- Data for Name: farmercropstable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farmercropstable ("cropId", "farmerId") FROM stdin;
1	1
2	1
3	1
4	2
1	2
2	3
3	3
4	3
1	4
2	4
3	5
4	5
1	6
2	6
3	7
4	7
3	9
4	9
\.


--
-- Data for Name: plot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plot ("plotId", "farmerId", "plotCords", address, location, "plotImage") FROM stdin;
1	1	[[9.931, 76.267], [9.9315, 76.267], [9.9315, 76.2675], [9.931, 76.2675]]		Kochi	https://picsum.photos/500/400?random=1
2	1	[[9.9316, 76.267], [9.9322, 76.267], [9.9322, 76.2676], [9.932, 76.2678], [9.9316, 76.2676]]		Kochi	https://picsum.photos/500/400?random=2
3	1	[[9.931, 76.2676], [9.9315, 76.2676], [9.9317, 76.268], [9.9312, 76.2681]]		Kochi	https://picsum.photos/500/400?random=3
4	2	[[9.9316, 76.2676], [9.9322, 76.2676], [9.9324, 76.2682], [9.9318, 76.2683]]		Kochi	https://picsum.photos/500/400?random=4
5	2	[[9.931, 76.2662], [9.9316, 76.2662], [9.9318, 76.2668], [9.9312, 76.2669]]		Kochi	https://picsum.photos/500/400?random=5
6	3	[[8.524, 76.9365], [8.5246, 76.9365], [8.5246, 76.9371], [8.524, 76.9371]]		Thiruvananthapuram	https://picsum.photos/500/400?random=6
7	3	[[8.524, 76.9372], [8.5246, 76.9372], [8.5248, 76.9378], [8.5242, 76.9378]]		Thiruvananthapuram	https://picsum.photos/500/400?random=7
8	3	[[8.5247, 76.9365], [8.5253, 76.9365], [8.5253, 76.9371], [8.5247, 76.9371]]		Thiruvananthapuram	https://picsum.photos/500/400?random=8
9	4	[[11.2585, 76.78], [11.2591, 76.78], [11.2591, 76.7806], [11.2585, 76.7806]]		Kozhikode	https://picsum.photos/500/400?random=9
10	4	[[11.2585, 76.7807], [11.2591, 76.7807], [11.2593, 76.7813], [11.2587, 76.7813]]		Kozhikode	https://picsum.photos/500/400?random=10
11	5	[[10.5275, 76.2143], [10.5281, 76.2143], [10.5281, 76.2149], [10.5275, 76.2149]]		Thrissur	https://picsum.photos/500/400?random=11
12	5	[[10.5275, 76.215], [10.5281, 76.215], [10.5283, 76.2156], [10.5277, 76.2156]]		Thrissur	https://picsum.photos/500/400?random=12
13	6	[[9.498, 76.3387], [9.4986, 76.3387], [9.4986, 76.3393], [9.498, 76.3393]]		Alappuzha	https://picsum.photos/500/400?random=13
14	6	[[9.498, 76.3394], [9.4986, 76.3394], [9.4988, 76.34], [9.4982, 76.34]]		Alappuzha	https://picsum.photos/500/400?random=14
15	7	[[9.5915, 76.522], [9.5921, 76.522], [9.5921, 76.5226], [9.5915, 76.5226]]		Kottayam	https://picsum.photos/500/400?random=15
16	7	[[9.5915, 76.5227], [9.5921, 76.5227], [9.5923, 76.5233], [9.5917, 76.5233]]		Kottayam	https://picsum.photos/500/400?random=16
19	9	[[11.8744, 75.3703], [11.875, 75.3703], [11.875, 75.3709], [11.8744, 75.3709]]		Kannur	https://picsum.photos/500/400?random=19
20	9	[[11.8744, 75.371], [11.875, 75.371], [11.8752, 75.3716], [11.8746, 75.3716]]		Kannur	https://picsum.photos/500/400?random=20
\.


--
-- Data for Name: plotsubstagevalue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plotsubstagevalue ("plotId", substagdataeid, data, name) FROM stdin;
1	1	2	No of ploughings
1	2	2500	Ploughing cost
1	3	2024-01-02	Ploughing date
1	4	1200	MB plough cost
1	5	0	Rotovator cost
1	6	500	Making of transplanting rows cost
1	7	0	Cultivator activities cost
1	8	4200	Total cost
1	9	Yes	Fertilizer/Manure applied (Yes/No)
1	10	Farm Yard Manure	Name of manure
1	11	4000	Applied quantity (Kg/Acre)
1	12	8000	Total cost
1	13	Own	Type of land (Lease/Own)
1	14	0	Land lease cost per acre
1	15	Red Sandy Loam	Soil type
1	16	Yes	Soil analysis done (Yes/No)
1	17	2023-12-28	Date
1	18	https://picsum.photos/200/300?soil=1	Upload Soil analysis picture
1	19	500	Analysis cost
1	20	KVK Kochi	Lab name
1	21	No	Water analysis done (Yes/No)
1	22		Date
1	23		Upload water analysis picture
1	24	0	Analysis cost
1	25	Borewell	Irrigation source
1	26	Drip	Irrigation type
1	27	Road	North
1	28	Paddy Field	South
1	29	Mr. Ravi Plot	East
1	30	Canal	West
1	31	Byadgi Kaddi	Crop variety
1	32	Shade net	Nursery details (open/shade net)
1	33	Outsource	Nursery type (own/outsource)
1	34	4500	Nursery cost
1	35	Transplanting	Activity type (direct sowing/Transplanting)
1	36	https://picsum.photos/200/300?sow=1	Field photo
1	37	2024-03-02	Date
1	38	0	Seed quantity used for direct sowing (Kg/Acre)
1	39	0	Seed cost
1	40	12000	Seedlings used (No/Acre)
1	41	12000	Seedling cost
1	42	0	Seed Spacing-Inches
1	43	24	Seedling Spacing-Inches
1	44	10	No of labours per acre
1	45	5000	Labour cost per acre
1	46	17000	Total cost per acre
1	47	No	Weeding & Intercultivation done (Yes/No)
1	48	0	Labour cost-Per person(weeding)
1	49		Date of weeding
1	50	0	Weeding cost
1	51		Date of intercultivation
1	52	0	Intercultivation cost
1	53	0	Total cost
1	54	Good	Crop Observation (Good/Average/poor)
1	55	No	Recommendation (Yes/No)
1	56	2024-03-10	Date of observation
1	57	https://picsum.photos/200/300?obs=1	Add photos
1	58	2024-03-05	Date
1	59	Yes	Pesticide applied (Yes/No)
1	60	Termites	Disease/Pest
1	61	Chlorpyrifos	Applied-Pesticide/Fungicide
1	62	800	Cost of chemicals per acre
1	63	500	Labour cost per acre
1	64	1300	Total cost
1	65	2024-03-04	Date
1	66	Yes	Fertilizer applied (Yes/No)
1	67	DAP	Applied-Fertilizer
1	68	1200	Total cost of Fertilizer
1	69	300	Labour cost per acre
1	70	1500	Total cost
1	71	2024-03-03	Date
1	72	Yes	Irrigation Done (Yes/No)
1	73	200	Labour cost per acre
1	74	Yes	Weeding & Intercultivation done (Yes/No)
1	75	500	Labour cost-Per person(weeding)
1	76	2024-03-15	Date of weeding
1	77	2500	Weeding cost
1	78		Date of intercultivation
1	79	0	Intercultivation cost
1	80	2500	Total cost
1	81	Average	Crop Observation
1	82	Yes	Recommendation
1	83	2024-03-18	Date of observation
1	84	https://picsum.photos/200/300?gap=1	Add photos
1	85		Date
1	86	No	Pesticide applied
1	87		Disease/Pest
1	88		Applied-Pesticide/Fungicide
1	89	0	Cost of chemicals per acre
1	90	0	Labour cost per acre
1	91	0	Total cost
1	92		Date
1	93	No	Fertilizer applied
1	94		Applied-Fertilizer
1	95	0	Total cost of Fertilizer
1	96	0	Labour cost per acre
1	97	0	Total cost
1	98	2024-03-14	Date
1	99	Yes	Irrigation done
1	100	200	Labour cost per acre
1	101	https://picsum.photos/200/300?thin=1	Field photo of live task
1	102	2024-03-12	Date of activity
1	103	5	No of labours
1	104	500	Labour cost per person
1	105	2500	Labour cost per acre
1	106	0	Seed quantity used gram/acre
1	107	0	Seed cost
1	108	500	Seedlings used per acre
1	109	500	Seedling cost
1	110	2	No of labours per acre
1	111	500	Labour cost per person
1	112	1000	Labour cost per acre
1	113	2024-03-13	Date of activity
1	114	1500	Total cost
1	115	https://picsum.photos/200/300?gapfill=1	Field photo of live task
1	116	Yes	Weeding done (Yes/No)
1	117	2000	Total cost
1	118	Good	Crop Observation
1	119	https://picsum.photos/200/300?veg=1	Add photos
1	120	Yes	Pesticide applied
1	121	1500	Cost of chemicals
1	122	Yes	Fertilizer applied
1	123	3000	Total cost
1	124	Yes	Irrigation done
1	125	2024-04-01	Date
1	126	Yes	Border crop (Yes/No)
1	127	Maize	Border crop name
1	128	Marigold	Trap crop name
1	129	https://picsum.photos/200/300?border=1	Border crop photo
1	130	https://picsum.photos/200/300?trap=1	Trap crop photo
1	131	1500	Total cost
1	132	https://picsum.photos/200/300?flower=1	Add photos
1	133	Imidacloprid	Applied-Pesticide
1	134	19-19-19	Applied-Fertilizer
1	135	Yes	Irrigation done
1	136	Yellow	Sticky trap
1	137	500	Sticky trap cost
1	138	Fruit borer lure	Pheromone trap
1	139	800	Pheromone trap cost
1	140	None	Solar trap
1	141	0	Solar trap cost
1	142	1300	Total cost
1	143	2000	Total cost
1	144	https://picsum.photos/200/300?green=1	Add photos
1	145	1200	Cost of chemicals
1	146	1500	Total cost of Fertilizer
1	147	Yes	Irrigation done
1	148	Good	Crop Observation
1	149	1000	Cost of chemicals per acre
1	150	Yes	Irrigation done
1	151	Good	Fruit maturity (Good/Average/poor)
1	152	Shiny Red	Fruit appearance
1	153	https://picsum.photos/200/300?ripe=1	Field photo of live task
1	154	Yes	Fruit ripened (Yes/No)
1	155	Yes	Uniform colour (Yes/No)
1	156	Safe	Check for spray status
1	157	https://picsum.photos/200/300?harvest=1	Field photo of harvest
1	158	90	Matured fruit percentage
1	159	2024-07-15	Harvest start date
1	160	2024-07-20	Harvest complete date
1	161	15	No of labours per acre
1	162	7500	Labour cost per acre
1	163	2500	Expecting yeild-kg/acre
1	164	Yes	Drying done
1	165	Concrete Floor	Drying condition
1	166	Yes	Cleaning done
1	167	Good	Cleaning condition
1	168	5	No of labours per acre
1	169	2500	Labour cost per acre
1	170	Good	Final Lot Appearence
1	171	Yes	Lot sample collection done
1	172	2024-07-25	Sampling date
1	173	Pass	Lot sample results (Pass/Fail)
1	174	2024-07-28	Results date
1	175	3	Number of days
1	176		Reason for rejection
1	177	1000	Sample analysis cost
1	178	Delux	Lot quality
1	179	2024-08-01	Stuffing date
1	180	2024-08-02	Loading date
1	181	INV-2024-001	Invoice number
1	182	KL-07-AB-1234	Vehicle number
1	183	50	No of bags
1	184	220	Purchase price Rs/Kg
1	185	2000	Total weight in Kg
1	186	https://picsum.photos/200/300?inv=1	Invoice copy
1	187	2000	Total avg yeild per acre in kg
\.


--
-- Name: agent_agentId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."agent_agentId_seq"', 1, false);


--
-- Name: crop_cropId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."crop_cropId_seq"', 35, true);


--
-- Name: cropstages_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropstages_sid_seq', 48, true);


--
-- Name: cropsubstages_substageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropsubstages_substageid_seq', 71, true);


--
-- Name: cropsubstagesvalue_substagedataid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropsubstagesvalue_substagedataid_seq', 200, true);


--
-- Name: farmer_farmerId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."farmer_farmerId_seq"', 21, true);


--
-- Name: plot_plotId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."plot_plotId_seq"', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: agent agent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agent
    ADD CONSTRAINT agent_pkey PRIMARY KEY ("agentId");


--
-- Name: crop crop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop
    ADD CONSTRAINT crop_pkey PRIMARY KEY ("cropId");


--
-- Name: cropplottable cropplottable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropplottable
    ADD CONSTRAINT cropplottable_pkey PRIMARY KEY ("cropId", "plotId");


--
-- Name: cropstages cropstages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropstages
    ADD CONSTRAINT cropstages_pkey PRIMARY KEY (sid);


--
-- Name: cropsubstages cropsubstages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstages
    ADD CONSTRAINT cropsubstages_pkey PRIMARY KEY (substageid);


--
-- Name: cropsubstagesvalue cropsubstagesvalue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstagesvalue
    ADD CONSTRAINT cropsubstagesvalue_pkey PRIMARY KEY (substagedataid);


--
-- Name: farmer farmer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer
    ADD CONSTRAINT farmer_pkey PRIMARY KEY ("farmerId");


--
-- Name: farmercropstable farmercropstable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmercropstable
    ADD CONSTRAINT farmercropstable_pkey PRIMARY KEY ("cropId", "farmerId");


--
-- Name: plot plot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plot
    ADD CONSTRAINT plot_pkey PRIMARY KEY ("plotId");


--
-- Name: plotsubstagevalue plotsubstagevalue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plotsubstagevalue
    ADD CONSTRAINT plotsubstagevalue_pkey PRIMARY KEY ("plotId", substagdataeid);


--
-- Name: cropplottable cropplottable_cropId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropplottable
    ADD CONSTRAINT "cropplottable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES public.crop("cropId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cropplottable cropplottable_plotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropplottable
    ADD CONSTRAINT "cropplottable_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES public.plot("plotId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cropstages cropstages_cropId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropstages
    ADD CONSTRAINT "cropstages_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES public.crop("cropId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cropsubstages cropsubstages_stageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstages
    ADD CONSTRAINT cropsubstages_stageid_fkey FOREIGN KEY (stageid) REFERENCES public.cropstages(sid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cropsubstagesvalue cropsubstagesvalue_substageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cropsubstagesvalue
    ADD CONSTRAINT cropsubstagesvalue_substageid_fkey FOREIGN KEY (substageid) REFERENCES public.cropsubstages(substageid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: farmer farmer_agentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer
    ADD CONSTRAINT "farmer_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES public.agent("agentId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: farmercropstable farmercropstable_cropId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmercropstable
    ADD CONSTRAINT "farmercropstable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES public.crop("cropId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: farmercropstable farmercropstable_farmerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmercropstable
    ADD CONSTRAINT "farmercropstable_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES public.farmer("farmerId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: plot plot_farmerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plot
    ADD CONSTRAINT "plot_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES public.farmer("farmerId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: plotsubstagevalue plotsubstagevalue_plotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plotsubstagevalue
    ADD CONSTRAINT "plotsubstagevalue_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES public.plot("plotId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: plotsubstagevalue plotsubstagevalue_substagdataeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plotsubstagevalue
    ADD CONSTRAINT plotsubstagevalue_substagdataeid_fkey FOREIGN KEY (substagdataeid) REFERENCES public.cropsubstagesvalue(substagedataid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict OaZEghW7Mp3PbOCHDjgqQjSrNjOfzTH08ccuEcKBalR8acdBcT94Ck5lKGRz49S

