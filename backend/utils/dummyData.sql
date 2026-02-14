-- Insert Agents
INSERT INTO agent ("agentId", "agentName", "agentEmail", "agentPass", "agentPic") VALUES
(1, 'Vikram Singh', 'vikram.singh@farmnet.com', 'pass123@Vikram', 'https://picsum.photos/200/200?random=201'),
(2, 'Anjali Menon', 'anjali.menon@farmnet.com', 'pass123@Anjali', 'https://picsum.photos/200/200?random=202'),
(3, 'Rohan Patel', 'rohan.patel@farmnet.com', 'pass123@Rohan', 'https://picsum.photos/200/200?random=203'),
(4, 'Deepa Iyer', 'deepa.iyer@farmnet.com', 'pass123@Deepa', 'https://picsum.photos/200/200?random=204'),
(5, 'Suresh Kumar', 'suresh.kumar@farmnet.com', 'pass123@Suresh', 'https://picsum.photos/200/200?random=205'),
(6, 'Priya Nair', 'priya.nair@farmnet.com', 'pass123@Priya', 'https://picsum.photos/200/200?random=206'),
(7, 'Arjun Verma', 'arjun.verma@farmnet.com', 'pass123@Arjun', 'https://picsum.photos/200/200?random=207'),
(8, 'Meera Pillai', 'meera.pillai@farmnet.com', 'pass123@Meera', 'https://picsum.photos/200/200?random=208');

-- Insert Farmers
INSERT INTO farmer ("farmerId", "farmerName", "farmerFather", "farmerPic", "address", "phone", "agentId") VALUES
(1, 'Rajesh Kumar', '', 'https://picsum.photos/150/150?random=101', '', '+91-9876543201', 1),
(2, 'Priya Sharma', '', 'https://picsum.photos/150/150?random=102', '', '+91-9876543202', 1),
(3, 'Arun Nair', '', 'https://picsum.photos/150/150?random=103', '', '+91-9876543203', 2),
(4, 'Meera Pillai', '', 'https://picsum.photos/150/150?random=104', '', '+91-9876543204', 3),
(5, 'Vijay Kumar', '', 'https://picsum.photos/150/150?random=105', '', '+91-9876543205', 4),
(6, 'Sneha Patel', '', 'https://picsum.photos/150/150?random=106', '', '+91-9876543206', 5),
(7, 'Harish Menon', '', 'https://picsum.photos/150/150?random=107', '', '+91-9876543207', 6),
(8, 'Lakshmi Iyer', '', 'https://picsum.photos/150/150?random=108', '', '+91-9876543208', 7),
(9, 'Sanjay Verma', '', 'https://picsum.photos/150/150?random=109', '', '+91-9876543209', 8);

-- Insert Plots
INSERT INTO plot ("plotId", "farmerId", "plotCords", "plotImage", "location", "address") VALUES
(1, 1, '[[9.931, 76.267], [9.9315, 76.267], [9.9315, 76.2675], [9.931, 76.2675]]'::jsonb, 'https://picsum.photos/500/400?random=1', 'Kochi', ''),
(2, 1, '[[9.9316, 76.267], [9.9322, 76.267], [9.9322, 76.2676], [9.932, 76.2678], [9.9316, 76.2676]]'::jsonb,  'https://picsum.photos/500/400?random=2', 'Kochi', ''),
(3, 1, '[[9.931, 76.2676], [9.9315, 76.2676], [9.9317, 76.268], [9.9312, 76.2681]]'::jsonb, 'https://picsum.photos/500/400?random=3', 'Kochi', ''),
(4, 2, '[[9.9316, 76.2676], [9.9322, 76.2676], [9.9324, 76.2682], [9.9318, 76.2683]]'::jsonb,  'https://picsum.photos/500/400?random=4', 'Kochi', ''),
(5, 2, '[[9.931, 76.2662], [9.9316, 76.2662], [9.9318, 76.2668], [9.9312, 76.2669]]'::jsonb,  'https://picsum.photos/500/400?random=5', 'Kochi', ''),
(6, 3, '[[8.524, 76.9365], [8.5246, 76.9365], [8.5246, 76.9371], [8.524, 76.9371]]'::jsonb,  'https://picsum.photos/500/400?random=6', 'Thiruvananthapuram', ''),
(7, 3, '[[8.524, 76.9372], [8.5246, 76.9372], [8.5248, 76.9378], [8.5242, 76.9378]]'::jsonb, 'https://picsum.photos/500/400?random=7', 'Thiruvananthapuram', ''),
(8, 3, '[[8.5247, 76.9365], [8.5253, 76.9365], [8.5253, 76.9371], [8.5247, 76.9371]]'::jsonb,  'https://picsum.photos/500/400?random=8', 'Thiruvananthapuram', ''),
(9, 4, '[[11.2585, 76.78], [11.2591, 76.78], [11.2591, 76.7806], [11.2585, 76.7806]]'::jsonb,  'https://picsum.photos/500/400?random=9', 'Kozhikode', ''),
(10, 4, '[[11.2585, 76.7807], [11.2591, 76.7807], [11.2593, 76.7813], [11.2587, 76.7813]]'::jsonb,  'https://picsum.photos/500/400?random=10', 'Kozhikode', ''),
(11, 5, '[[10.5275, 76.2143], [10.5281, 76.2143], [10.5281, 76.2149], [10.5275, 76.2149]]'::jsonb,'https://picsum.photos/500/400?random=11', 'Thrissur', ''),
(12, 5, '[[10.5275, 76.215], [10.5281, 76.215], [10.5283, 76.2156], [10.5277, 76.2156]]'::jsonb,  'https://picsum.photos/500/400?random=12', 'Thrissur', ''),
(13, 6, '[[9.498, 76.3387], [9.4986, 76.3387], [9.4986, 76.3393], [9.498, 76.3393]]'::jsonb, 'https://picsum.photos/500/400?random=13', 'Alappuzha', ''),
(14, 6, '[[9.498, 76.3394], [9.4986, 76.3394], [9.4988, 76.34], [9.4982, 76.34]]'::jsonb,  'https://picsum.photos/500/400?random=14', 'Alappuzha', ''),
(15, 7, '[[9.5915, 76.522], [9.5921, 76.522], [9.5921, 76.5226], [9.5915, 76.5226]]'::jsonb,  'https://picsum.photos/500/400?random=15', 'Kottayam', ''),
(16, 7, '[[9.5915, 76.5227], [9.5921, 76.5227], [9.5923, 76.5233], [9.5917, 76.5233]]'::jsonb,  'https://picsum.photos/500/400?random=16', 'Kottayam', ''),
(17, 8, '[[10.7866, 76.6547], [10.7872, 76.6547], [10.7872, 76.6553], [10.7866, 76.6553]]'::jsonb, 'https://picsum.photos/500/400?random=17', 'Palakkad', ''),
(18, 8, '[[10.7866, 76.6554], [10.7872, 76.6554], [10.7874, 76.656], [10.7868, 76.656]]'::jsonb,  'https://picsum.photos/500/400?random=18', 'Palakkad', ''),
(19, 9, '[[11.8744, 75.3703], [11.875, 75.3703], [11.875, 75.3709], [11.8744, 75.3709]]'::jsonb, 'https://picsum.photos/500/400?random=19', 'Kannur', ''),
(20, 9, '[[11.8744, 75.371], [11.875, 75.371], [11.8752, 75.3716], [11.8746, 75.3716]]'::jsonb, 'https://picsum.photos/500/400?random=20', 'Kannur', '');

-- Insert Crops

INSERT INTO crop ("cropName", "cropDesc", "cropImage") VALUES
('CHILLI',
 'Chilli is a major commercial spice crop grown for its pungent fruits used in culinary and industrial applications.',
 'https://img.freepik.com/premium-photo/bunch-red-hot-chili-pepper-closeup-dark-background-selective-focus-no-people-concept-food-background-toned-image_322022-820.jpg'),

('TURMERIC',
 'Turmeric is a rhizomatous herbaceous perennial plant widely used for culinary, medicinal, and cosmetic purposes.',
 'https://www.pepperhub.in/wp-content/uploads/2023/09/1bf06c5cea51367e2212422781978436-1024x768_11zon.jpg'),

('GINGER',
 'Ginger is a flowering plant whose rhizome is widely used as a spice and traditional medicine.',
 '/crops/ginger.jpg'),

('MARIGOLD',
 'Marigold is a popular ornamental flower crop cultivated for garlands, decorations, and essential oils.',
 '/crops/marigold.jpg');


-- cropFarmer
INSERT INTO farmercropstable ("cropId", "farmerId") VALUES

-- Farmer 1
(1,1),(2,1),(3,1),

-- Farmer 2
(4,2),(1,2),

-- Farmer 3
(2,3),(3,3),(4,3),

-- Farmer 4
(1,4),(2,4),

-- Farmer 5
(3,5),(4,5),

-- Farmer 6
(1,6),(2,6),

-- Farmer 7
(3,7),(4,7),

-- Farmer 8
(1,8),(2,8),

-- Farmer 9
(3,9),(4,9);


--crop Plot 
INSERT INTO cropplottable ("cropId", "plotId") VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(1,5),
(2,6),
(3,7),
(4,8),
(1,9),
(2,10),
(3,11),
(4,12),
(1,13),
(2,14),
(3,15),
(4,16),
(1,17),
(2,18),
(3,19),
(4,20);
