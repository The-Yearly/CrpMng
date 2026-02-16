--
-- PostgreSQL database dump
--

\restrict OOy816NIQpuGEgru2YsFMS19BtMQuWkZJRTK1Se3iXDI3bTUivTAW0GfFktbXmZ

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

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
    "cropDesc" text NOT NULL
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
    "farmerName" text NOT NULL,
    "farmerFather" text NOT NULL,
    "farmerPic" text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    "agentId" integer NOT NULL
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

COPY public.crop ("cropId", "cropName", "cropImage", "cropDesc") FROM stdin;
1	CHILLI	https://img.freepik.com/premium-photo/bunch-red-hot-chili-pepper-closeup-dark-background-selective-focus-no-people-concept-food-background-toned-image_322022-820.jpg	Chilli is a major commercial spice crop grown for its pungent fruits used in culinary and industrial applications.
3	GINGER	/crops/ginger.jpg	Ginger is a flowering plant whose rhizome is widely used as a spice and traditional medicine.
4	MARIGOLD	/crops/marigold.jpg	Marigold is a popular ornamental flower crop cultivated for garlands, decorations, and essential oils.
2	TURMERIC	https://www.pepperhub.in/wp-content/uploads/2023/09/1bf06c5cea51367e2212422781978436-1024x768_11zon.jpg	Turmeric is a rhizomatous herbaceous perennial plant widely used for culinary, medicinal, and cosmetic purposes.
6	Crop1	data:image/jpeg;base64,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	
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
1	17
2	18
3	19
4	20
\.


--
-- Data for Name: cropstages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cropstages (sid, stagename, "cropId", stagenumber, duration, "startedAt", "endDate") FROM stdin;
2	Nursery stage	1	2	45	2024-01-16 00:00:00	2024-03-01 00:00:00
3	Transplanting/Sowing stage	1	3	15	2024-03-02 00:00:00	2024-03-16 00:00:00
4	Thinning/Gap filling	1	4	15	2024-03-02 00:00:00	2024-03-16 00:00:00
5	Vegetative stage	1	5	50	2024-03-17 00:00:00	2024-05-05 00:00:00
6	Flowering stage	1	6	30	2024-05-06 00:00:00	2024-06-04 00:00:00
7	Green fruit stage	1	7	20	2024-06-05 00:00:00	2024-06-24 00:00:00
8	Ripening fruit stage	1	8	20	2024-06-25 00:00:00	2024-07-14 00:00:00
9	Harvesting stage	1	9	30	2024-07-15 00:00:00	2024-08-13 00:00:00
10	Post harvesting stage	1	10	20	2024-08-14 00:00:00	2024-09-02 00:00:00
1	Main field preparations	1	1	15	2024-01-01 00:00:00	2024-01-15 00:00:00
39	Stage 1	2	0	5	2026-02-16 16:15:30.782	2026-02-16 16:15:30.782
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
\.


--
-- Data for Name: farmer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farmer ("farmerId", "farmerName", "farmerFather", "farmerPic", address, phone, "agentId") FROM stdin;
1	Rajesh Kumar		https://picsum.photos/150/150?random=101		+91-9876543201	1
2	Priya Sharma		https://picsum.photos/150/150?random=102		+91-9876543202	1
3	Arun Nair		https://picsum.photos/150/150?random=103		+91-9876543203	2
4	Meera Pillai		https://picsum.photos/150/150?random=104		+91-9876543204	3
5	Vijay Kumar		https://picsum.photos/150/150?random=105		+91-9876543205	4
6	Sneha Patel		https://picsum.photos/150/150?random=106		+91-9876543206	5
7	Harish Menon		https://picsum.photos/150/150?random=107		+91-9876543207	6
8	Lakshmi Iyer		https://picsum.photos/150/150?random=108		+91-9876543208	7
9	Sanjay Verma		https://picsum.photos/150/150?random=109		+91-9876543209	8
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
1	8
2	8
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
17	8	[[10.7866, 76.6547], [10.7872, 76.6547], [10.7872, 76.6553], [10.7866, 76.6553]]		Palakkad	https://picsum.photos/500/400?random=17
18	8	[[10.7866, 76.6554], [10.7872, 76.6554], [10.7874, 76.656], [10.7868, 76.656]]		Palakkad	https://picsum.photos/500/400?random=18
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

SELECT pg_catalog.setval('public."crop_cropId_seq"', 6, true);


--
-- Name: cropstages_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropstages_sid_seq', 39, true);


--
-- Name: cropsubstages_substageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropsubstages_substageid_seq', 62, true);


--
-- Name: cropsubstagesvalue_substagedataid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cropsubstagesvalue_substagedataid_seq', 193, true);


--
-- Name: farmer_farmerId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."farmer_farmerId_seq"', 1, false);


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

\unrestrict OOy816NIQpuGEgru2YsFMS19BtMQuWkZJRTK1Se3iXDI3bTUivTAW0GfFktbXmZ

