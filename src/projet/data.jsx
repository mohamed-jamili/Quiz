export const questionsData = {};

const MAX_LEVELS = 50;
const QUESTIONS_PER_LEVEL = 10;

// ==========================================
// STATIC DATABASE (Imported & Cleaned)
// ==========================================

const level1Questions = [
  { q: 'How many players in a football team?', opts: ['9', '10', '11', '12'], correct: 2, category: 'Sport' },
  { q: 'What is 5 + 5?', opts: ['8', '9', '10', '11'], correct: 2, category: 'General' },
  { q: 'What does CPU stand for?', opts: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0, category: 'Hardware' },
  { q: 'What is HTML?', opts: ['Programming Language', 'Markup Language', 'Database', 'Operating System'], correct: 1, category: 'Software' },
  { q: 'Who is the main character in Naruto?', opts: ['Sasuke', 'Kakashi', 'Naruto Uzumaki', 'Sakura'], correct: 2, category: 'Anime' },
  { q: 'What year was Minecraft released?', opts: ['2009', '2010', '2011', '2012'], correct: 2, category: 'Gaming' },
  { q: 'How many continents are there?', opts: ['5', '6', '7', '8'], correct: 2, category: 'General' },
  { q: 'What is RAM?', opts: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Real Access Memory'], correct: 0, category: 'Hardware' },
  { q: 'What is Python?', opts: ['Snake', 'Programming Language', 'Game', 'Database'], correct: 1, category: 'Software' },
  { q: 'How many rings in Olympic logo?', opts: ['4', '5', '6', '7'], correct: 1, category: 'Sport' }
];

// Large pool of questions from user input (Medium -> Hard -> Very Hard -> Impossible etc)
// I have flattened them to distribute evenly.
const pooledQuestions = [
  // Medium / General
  { q: 'Capital of Italy?', opts: ['Milan', 'Rome', 'Naples', 'Venice'], correct: 1, category: 'General' },
  { q: '20 + 30 = ?', opts: ['40', '50', '60', '70'], correct: 1, category: 'Math' },
  { q: 'HTTP stands for?', opts: ['HyperText Transfer Protocol', 'High Transfer Text', 'Hyper Tool', 'None'], correct: 0, category: 'Software' },
  { q: 'CPU speed measured in?', opts: ['GB', 'GHz', 'MB', 'Volt'], correct: 1, category: 'Hardware' },
  { q: 'Creator of One Piece?', opts: ['Oda', 'Kubo', 'Toriyama', 'Kishimoto'], correct: 0, category: 'Anime' },
  { q: 'Gas needed for breathing?', opts: ['CO2', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct: 1, category: 'Science' },
  { q: '9 × 7 = ?', opts: ['56', '63', '72', '54'], correct: 1, category: 'Math' },
  { q: 'JS file extension?', opts: ['.java', '.js', '.jsx', '.script'], correct: 1, category: 'Software' },
  { q: 'HDD used for?', opts: ['Processing', 'Storage', 'Cooling', 'Display'], correct: 1, category: 'Hardware' },
  { q: 'Goku race?', opts: ['Human', 'Saiyan', 'God', 'Alien'], correct: 1, category: 'Anime' },
  { q: 'Sun is a?', opts: ['Planet', 'Star', 'Moon', 'Comet'], correct: 1, category: 'Science' },
  { q: '100 ÷ 10 = ?', opts: ['5', '10', '20', '50'], correct: 1, category: 'Math' },
  { q: 'React is?', opts: ['Language', 'Library', 'OS', 'DB'], correct: 1, category: 'Software' },
  { q: 'Motherboard connects?', opts: ['Components', 'Internet', 'Power', 'Cooling'], correct: 0, category: 'Hardware' },
  { q: 'Zoro uses?', opts: ['1 sword', '2 swords', '3 swords', '4 swords'], correct: 2, category: 'Anime' },
  { q: 'Boiling point of water?', opts: ['90°C', '100°C', '80°C', '120°C'], correct: 1, category: 'Science' },
  { q: '6 × 8 = ?', opts: ['42', '46', '48', '52'], correct: 2, category: 'Math' },
  { q: 'Node.js runs on?', opts: ['Browser', 'Server', 'GPU', 'DB'], correct: 1, category: 'Software' },
  { q: 'PSU provides?', opts: ['Data', 'Cooling', 'Power', 'Graphics'], correct: 2, category: 'Hardware' },
  { q: 'Sharingan anime?', opts: ['Bleach', 'Naruto', 'DBZ', 'OP'], correct: 1, category: 'Anime' },
  
  // More Medium
  { q: 'Capital of Spain?', opts: ['Madrid', 'Barcelona', 'Lisbon', 'Rome'], correct: 0, category: 'General' },
  { q: '10 + 15 = ?', opts: ['20', '25', '30', '15'], correct: 1, category: 'Math' },
  { q: 'HTML used for?', opts: ['Styling', 'Logic', 'Structure', 'Database'], correct: 2, category: 'Software' },
  { q: 'RAM stands for?', opts: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Module', 'None'], correct: 0, category: 'Hardware' },
  { q: 'Creator of Dragon Ball?', opts: ['Oda', 'Toriyama', 'Kubo', 'Kishimoto'], correct: 1, category: 'Anime' },
  { q: 'Smallest planet?', opts: ['Earth', 'Mars', 'Mercury', 'Venus'], correct: 2, category: 'Science' },
  { q: '5 × 6 = ?', opts: ['30', '25', '35', '40'], correct: 0, category: 'Math' },
  { q: 'CSS used for?', opts: ['Logic', 'Database', 'Styling', 'Server'], correct: 2, category: 'Software' },
  { q: 'GPU main role?', opts: ['Storage', 'Graphics', 'Memory', 'Network'], correct: 1, category: 'Hardware' },
  { q: 'Luffy power?', opts: ['Fire', 'Rubber', 'Ice', 'Lightning'], correct: 1, category: 'Anime' },
  { q: 'Water chemical formula?', opts: ['H2O', 'CO2', 'O2', 'HO'], correct: 0, category: 'Science' },
  { q: '12 ÷ 3 = ?', opts: ['2', '3', '4', '6'], correct: 2, category: 'Math' },
  { q: 'JS mainly runs on?', opts: ['Browser', 'CPU', 'RAM', 'SSD'], correct: 0, category: 'Software' },
  { q: 'SSD faster than?', opts: ['RAM', 'CPU', 'HDD', 'GPU'], correct: 2, category: 'Hardware' },
  { q: 'Naruto village?', opts: ['Sand', 'Mist', 'Leaf', 'Cloud'], correct: 2, category: 'Anime' },
  { q: 'Earth satellite?', opts: ['Mars', 'Sun', 'Moon', 'Venus'], correct: 2, category: 'Science' },
  { q: '7 + 8 = ?', opts: ['13', '14', '15', '16'], correct: 2, category: 'Math' },
  { q: 'Bootstrap is?', opts: ['Language', 'Framework', 'DB', 'OS'], correct: 1, category: 'Software' },
  { q: 'CPU brain of?', opts: ['Monitor', 'Computer', 'Keyboard', 'Mouse'], correct: 1, category: 'Hardware' },
  { q: 'Death Note owner?', opts: ['L', 'Light', 'Ryuk', 'Near'], correct: 2, category: 'Anime' },

  // Hard
  { q: 'Capital of Germany?', opts: ['Munich', 'Berlin', 'Hamburg', 'Bonn'], correct: 1, category: 'General' },
  { q: '15 × 4 = ?', opts: ['40', '50', '60', '70'], correct: 2, category: 'Math' },
  { q: 'SQL used for?', opts: ['Design', 'Databases', 'Styling', 'Gaming'], correct: 1, category: 'Software' },
  { q: 'GPU used mainly for?', opts: ['Logic', 'Graphics', 'Storage', 'Sound'], correct: 1, category: 'Hardware' },
  { q: 'Ichigo anime?', opts: ['Naruto', 'Bleach', 'OP', 'DB'], correct: 1, category: 'Anime' },
  { q: 'Earth shape?', opts: ['Flat', 'Round', 'Cube', 'Triangle'], correct: 1, category: 'Science' },
  { q: '81 ÷ 9 = ?', opts: ['7', '8', '9', '10'], correct: 2, category: 'Math' },
  { q: 'CSS framework?', opts: ['React', 'Bootstrap', 'Node', 'Mongo'], correct: 1, category: 'Software' },
  { q: 'RAM volatile?', opts: ['Yes', 'No', 'Sometimes', 'Depends'], correct: 0, category: 'Hardware' },
  { q: 'Titan anime?', opts: ['One Piece', 'AOT', 'Naruto', 'Bleach'], correct: 1, category: 'Anime' },
  { q: 'Human blood color?', opts: ['Blue', 'Green', 'Red', 'Black'], correct: 2, category: 'Science' },
  { q: '7² = ?', opts: ['42', '48', '49', '56'], correct: 2, category: 'Math' },
  { q: 'API meaning?', opts: ['App Program Interface', 'Advanced Protocol', 'None', 'Access Panel'], correct: 0, category: 'Software' },
  { q: 'SSD advantage?', opts: ['Noise', 'Speed', 'Heat', 'Size'], correct: 1, category: 'Hardware' },
  { q: 'Light Yagami uses?', opts: ['Book', 'Sword', 'Ring', 'Gun'], correct: 0, category: 'Anime' },
  { q: 'Gravity discovered by?', opts: ['Einstein', 'Newton', 'Galileo', 'Tesla'], correct: 1, category: 'Science' },
  { q: '9 + 11 = ?', opts: ['18', '19', '20', '21'], correct: 2, category: 'Math' },
  { q: 'Framework for JS?', opts: ['Laravel', 'Django', 'Angular', 'Flask'], correct: 2, category: 'Software' },
  { q: 'PC cooling uses?', opts: ['Fans', 'Speakers', 'RAM', 'SSD'], correct: 0, category: 'Hardware' },
  { q: 'Vegeta pride?', opts: ['Human', 'Saiyan', 'God', 'Alien'], correct: 1, category: 'Anime' },

  // Hard+
  { q: 'Which country uses Yen?', opts: ['China', 'Japan', 'Korea', 'Thailand'], correct: 1, category: 'General' },
  { q: 'Square root of 169?', opts: ['11', '12', '13', '14'], correct: 2, category: 'Math' },
  { q: 'FTP stands for?', opts: ['File Transfer Protocol', 'Fast Transfer Process', 'File Text Protocol', 'Free Transfer Port'], correct: 0, category: 'Software' },
  { q: 'What does BIOS initialize?', opts: ['Memory only', 'Hardware at boot', 'Internet', 'Filesystem'], correct: 1, category: 'Hardware' },
  { q: 'Author of Naruto?', opts: ['Masashi Kishimoto', 'Eiichiro Oda', 'Tite Kubo', 'Akira Toriyama'], correct: 0, category: 'Anime' },
  { q: 'Light year measures?', opts: ['Time', 'Distance', 'Mass', 'Energy'], correct: 1, category: 'Science' },
  { q: '13 × 7 = ?', opts: ['91', '92', '90', '89'], correct: 0, category: 'Math' },
  { q: 'Promise in JS used for?', opts: ['Styling', 'Async handling', 'Database', 'Routing'], correct: 1, category: 'Software' },
  { q: 'PCIe lane used for?', opts: ['Audio', 'Network', 'High-speed peripheral', 'Power'], correct: 2, category: 'Hardware' },
  { q: 'Which anime has Titans?', opts: ['Naruto', 'Bleach', 'Attack on Titan', 'One Piece'], correct: 2, category: 'Anime' },
  { q: 'pH < 7 indicates?', opts: ['Base', 'Acid', 'Neutral', 'Salt'], correct: 1, category: 'Science' },
  { q: 'Factorial of 5 (5!) = ?', opts: ['60', '120', '24', '720'], correct: 1, category: 'Math' },
  { q: 'REST stands for?', opts: ['Representational State Transfer', 'Remote State Transfer', 'Random Server Tech', 'None'], correct: 0, category: 'Software' },
  { q: 'Heatsink used for?', opts: ['Sound', 'Cooling', 'Storage', 'Encryption'], correct: 1, category: 'Hardware' },
  { q: 'Sword Art Online genre?', opts: ['Sports', 'VR Anime', 'Cooking', 'Historical'], correct: 1, category: 'Anime' },
  { q: 'What causes seasons?', opts: ['Earth rotation', 'Sunspots', 'Tilt of Earth axis', 'Moon orbit'], correct: 2, category: 'Science' },
  { q: 'Derivative of sin(x)?', opts: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0, category: 'Math' },
  { q: 'Which is a NoSQL DB?', opts: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'], correct: 1, category: 'Software' },
  { q: 'Thermal paste placed between?', opts: ['GPU and RAM', 'CPU and Cooler', 'SSD and Motherboard', 'PSU and Fan'], correct: 1, category: 'Hardware' },
  { q: 'One Piece main protagonist?', opts: ['Naruto', 'Luffy', 'Goku', 'Ichigo'], correct: 1, category: 'Anime' },

  // Very Hard
  { q: 'Which element has atomic number 6?', opts: ['Nitrogen', 'Oxygen', 'Carbon', 'Helium'], correct: 2, category: 'Science' },
  { q: 'Log2(256) = ?', opts: ['6', '7', '8', '9'], correct: 2, category: 'Math' },
  { q: 'Which is a frontend framework?', opts: ['Django', 'React', 'Flask', 'Laravel'], correct: 1, category: 'Software' },
  { q: 'What is NVMe interface used for?', opts: ['Network', 'Storage', 'Graphics', 'Audio'], correct: 1, category: 'Hardware' },
  { q: 'Anime "Fullmetal Alchemist" country?', opts: ['Amestris (fictional)', 'Japan', 'USA', 'China'], correct: 0, category: 'Anime' },
  { q: 'What particle is negatively charged?', opts: ['Proton', 'Neutron', 'Electron', 'Photon'], correct: 2, category: 'Science' },
  { q: 'Integral of 1/x dx = ?', opts: ['ln|x| + C', '1/x + C', 'x + C', 'e^x + C'], correct: 0, category: 'Math' },
  { q: 'Which tool manages containers?', opts: ['Docker', 'MySQL', 'Redis', 'Nginx'], correct: 0, category: 'Software' },
  { q: 'What does S.M.A.R.T. monitor?', opts: ['CPU temp', 'Disk health', 'RAM speed', 'Network latency'], correct: 1, category: 'Hardware' },
  { q: 'Which anime features alchemy?', opts: ['FMA', 'One Piece', 'Bleach', 'Naruto'], correct: 0, category: 'Anime' },
  { q: 'Which law relates force, mass, acceleration?', opts: ['Ohm', 'Newton', 'Hooke', 'Kepler'], correct: 1, category: 'Science' },
  { q: 'Solve: 2x + 3 = 11 → x = ?', opts: ['3', '4', '5', '6'], correct: 1, category: 'Math' },
  { q: 'Which is a version control?', opts: ['Git', 'Docker', 'Nginx', 'Redis'], correct: 0, category: 'Software' },
  { q: 'ECC memory provides?', opts: ['Faster speed', 'Error correction', 'More storage', 'Lower power'], correct: 1, category: 'Hardware' },
  { q: 'Anime with "Titan" theme?', opts: ['AOT', 'OP', 'DB', 'Naruto'], correct: 0, category: 'Anime' },
  { q: 'What is Doppler effect about?', opts: ['Light intensity', 'Frequency shift', 'Mass change', 'Temperature'], correct: 1, category: 'Science' },
  { q: 'Prime numbers under 10 count?', opts: ['2', '3', '4', '5'], correct: 2, category: 'Math' },
  { q: 'Which is a package manager for JS?', opts: ['pip', 'npm', 'gem', 'apt'], correct: 1, category: 'Software' },
  { q: 'M.2 is form factor for?', opts: ['CPU', 'GPU', 'Storage', 'RAM'], correct: 2, category: 'Hardware' },
  { q: 'Studio behind "Spirited Away"?', opts: ['Madhouse', 'Bones', 'Ghibli', 'Sunrise'], correct: 2, category: 'Anime' },

  // Extreme
  { q: 'Which wavelength is visible light?', opts: ['10 nm', '500 nm', '1 mm', '1 m'], correct: 1, category: 'Science' },
  { q: 'What is 11th Fibonacci number?', opts: ['89', '144', '55', '233'], correct: 0, category: 'Math' },
  { q: 'CORS is related to?', opts: ['Security', 'Styling', 'Databases', 'Compression'], correct: 0, category: 'Software' },
  { q: 'What is RAID 1?', opts: ['Striping', 'Mirroring', 'Parity', 'Cache'], correct: 1, category: 'Hardware' },
  { q: 'Which anime features "All Might"?', opts: ['Mob Psycho', 'One Punch Man', 'My Hero Academia', 'Naruto'], correct: 2, category: 'Anime' },
  { q: 'Avogadro number approx?', opts: ['6.02×10^23', '3.14×10^2', '9.81', '1.6×10^-19'], correct: 0, category: 'Science' },
  { q: 'Limit of (1 + 1/n)^n as n→∞ ?', opts: ['e', 'π', '0', '1'], correct: 0, category: 'Math' },
  { q: 'Which is a reverse proxy?', opts: ['Nginx', 'MySQL', 'Redis', 'Webpack'], correct: 0, category: 'Software' },
  { q: 'What does CMOS store?', opts: ['User files', 'Boot settings', 'GPU drivers', 'Network configs'], correct: 1, category: 'Hardware' },
  { q: 'Which anime has "Bankai"?', opts: ['Bleach', 'Naruto', 'One Piece', 'Hunter x Hunter'], correct: 0, category: 'Anime' },
  { q: 'Which gas is greenhouse?', opts: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'], correct: 2, category: 'Science' },
  { q: 'Solve: integral of 2x dx = ?', opts: ['x^2 + C', '2x + C', 'x + C', 'x^3 + C'], correct: 0, category: 'Math' },
  { q: 'What is OAuth used for?', opts: ['Authentication', 'Authorization', 'Styling', 'Logging'], correct: 1, category: 'Software' },
  { q: 'SATA primarily used for?', opts: ['CPU', 'Storage', 'GPU', 'RAM'], correct: 1, category: 'Hardware' },
  { q: 'Anime with "Nen" power?', opts: ['One Piece', 'Hunter x Hunter', 'Naruto', 'Bleach'], correct: 1, category: 'Anime' },

  // Impossible
  { q: 'Which constant ≈ 2.71828?', opts: ['π', 'e', 'φ', 'γ'], correct: 1, category: 'Math' },
  { q: 'Which equation is E=mc^2 by?', opts: ['Newton', 'Einstein', 'Maxwell', 'Galileo'], correct: 1, category: 'Science' },
  { q: 'Which algorithm is O(n log n)?', opts: ['Bubble sort', 'Merge sort', 'Insertion sort', 'Selection sort'], correct: 1, category: 'CS' },
  { q: 'What is TLS for?', opts: ['Encryption in transit', 'Database', 'Storage', 'Caching'], correct: 0, category: 'Networking' },
  { q: 'Which anime has "Alucard"?', opts: ['Hellsing', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },
  { q: 'Planck constant relates to?', opts: ['Mass', 'Quantum energy', 'Temperature', 'Pressure'], correct: 1, category: 'Science' },
  { q: 'Solve: 3x - 7 = 11 → x = ?', opts: ['4', '6', '5', '3'], correct: 1, category: 'Math' },
  { q: 'Which is a functional programming language?', opts: ['Haskell', 'HTML', 'CSS', 'SQL'], correct: 0, category: 'Software' },
  { q: 'What is TDP in CPUs?', opts: ['Thermal Design Power', 'Total Data Path', 'Thread Dispatch', 'Time Delay Process'], correct: 0, category: 'Hardware' },
  { q: 'Which anime has "Sharingan"?', opts: ['Bleach', 'Naruto', 'One Piece', 'Dragon Ball'], correct: 1, category: 'Anime' },
  { q: 'Which particle has no mass?', opts: ['Photon', 'Electron', 'Proton', 'Neutron'], correct: 0, category: 'Science' },
  { q: 'What is prime factorization of 84?', opts: ['2^2 * 3 * 7', '2 * 3 * 7', '2^3 * 7', '3^2 * 7'], correct: 0, category: 'Math' },
  { q: 'Which DB is column-based?', opts: ['Cassandra', 'MySQL', 'SQLite', 'MongoDB'], correct: 0, category: 'Software' },
  { q: 'What is form factor ATX related to?', opts: ['Case/motherboard size', 'CPU speed', 'GPU memory', 'Storage type'], correct: 0, category: 'Hardware' },
  { q: 'Anime with "Sword Art"?', opts: ['SAO', 'OP', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },

  // Insane
  { q: 'Which math constant is golden ratio?', opts: ['e', 'π', 'φ', 'γ'], correct: 2, category: 'Math' },
  { q: 'Schrodinger equation is in which field?', opts: ['Thermodynamics', 'Quantum mechanics', 'Classical mechanics', 'Relativity'], correct: 1, category: 'Science' },
  { q: 'CAP theorem includes?', opts: ['Consistency, Availability, Partition tolerance', 'Cache, API, Proxy', 'CPU, RAM, PSU', 'Create, Access, Persist'], correct: 0, category: 'CS' },
  { q: 'What does M.2 NVMe replace commonly?', opts: ['HDD', 'USB', 'RAM', 'PSU'], correct: 0, category: 'Hardware' },
  { q: 'Which anime features "Alluka"?', opts: ['One Piece', 'Hunter x Hunter', 'Naruto', 'Bleach'], correct: 1, category: 'Anime' },
  { q: 'Which law is for black body radiation?', opts: ['Planck law', 'Ohm law', 'Hooke law', 'Newton law'], correct: 0, category: 'Science' },
  { q: 'What is 17 × 13 = ?', opts: ['221', '231', '211', '241'], correct: 0, category: 'Math' },
  { q: 'Which is used to container orchestration?', opts: ['Kubernetes', 'Redis', 'Postgres', 'Webpack'], correct: 0, category: 'Software' },
  { q: 'What is LGA in CPUs?', opts: ['Pin grid array', 'Land grid array', 'Liquid cooling', 'Low GHz architecture'], correct: 1, category: 'Hardware' },
  { q: 'Anime with "Excalibur" gag?', opts: ['One Piece', 'Soul Eater', 'Bleach', 'Naruto'], correct: 0, category: 'Anime' },
  { q: 'Which telescope famous for deep field?', opts: ['Hubble', 'Spitzer', 'Chandra', 'Kepler'], correct: 0, category: 'Science' },
  { q: 'Solve: x^2 - 4x + 4 = 0 → x = ?', opts: ['0', '2', '4', '-2'], correct: 1, category: 'Math' },
  { q: 'What is ACID in DB?', opts: ['Atomicity, Consistency, Isolation, Durability', 'Access, Cache, Index, Data', 'Authenticate, Check, Integrate, Deploy', 'None'], correct: 0, category: 'Software' },
  { q: 'What is VRM on motherboard?', opts: ['Voltage regulator module', 'Video RAM Module', 'Virtual RAM', 'Very Rapid Memory'], correct: 0, category: 'Hardware' },
  { q: 'Which anime protagonist is "Guts"?', opts: ['Berserk', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },

  // Nightmare
  { q: 'Which is non-Euclidean geometry pioneer?', opts: ['Gauss', 'Euclid', 'Newton', 'Descartes'], correct: 0, category: 'Math' },
  { q: 'Which process creates new species over time?', opts: ['Mutation', 'Evolution by natural selection', 'Photosynthesis', 'Fission'], correct: 1, category: 'Science' },
  { q: 'Which is an eventually consistent DB?', opts: ['Cassandra', 'Postgres', 'MySQL', 'SQLite'], correct: 0, category: 'Software' },
  { q: 'What is form factor "Mini-ITX"?', opts: ['Huge server board', 'Small motherboard size', 'SSD type', 'GPU slot'], correct: 1, category: 'Hardware' },
  { q: 'Anime "Serial Experiments Lain" genre?', opts: ['Cyberpunk', 'Romance', 'Sports', 'Cooking'], correct: 0, category: 'Anime' },
  { q: 'Which principle is Pauli exclusion?', opts: ['Quantum mechanics principle about fermions', 'Relativity principle', 'Thermodynamics law', 'Classical inertia'], correct: 0, category: 'Science' },
  { q: 'What is gcd(48,18)?', opts: ['6', '12', '3', '9'], correct: 0, category: 'Math' },
  { q: 'Which is event loop in JS?', opts: ['Concurrency model', 'Database engine', 'CSS parser', 'Image decoder'], correct: 0, category: 'Software' },
  { q: 'What does POST do in HTTP?', opts: ['Retrieve data', 'Send data to server', 'Delete resource', 'Redirect'], correct: 1, category: 'Software' },
  { q: 'Anime with "Stand" powers?', opts: ['JoJo\'s Bizarre Adventure', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },
  { q: 'Which particle determines chemical identity?', opts: ['Electron', 'Proton', 'Neutron', 'Photon'], correct: 1, category: 'Science' },
  { q: 'Solve: 0! = ?', opts: ['0', '1', 'Undefined', 'Infinity'], correct: 1, category: 'Math' },
  { q: 'Which protocol uses 443 by default?', opts: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], correct: 1, category: 'Networking' },
  { q: 'What is ECC in storage?', opts: ['Error correcting code', 'Extended caching capacity', 'Extra connection channel', 'External compressed cache'], correct: 0, category: 'Hardware' },
  { q: 'Which anime is by CLAMP studio?', opts: ['Cardcaptor Sakura', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },

  // Mythic
  { q: 'Which set is uncountable?', opts: ['Integers', 'Rationals', 'Reals', 'Finite sets'], correct: 2, category: 'Math' },
  { q: 'Heisenberg uncertainty principle relates?', opts: ['Position and velocity', 'Mass and energy', 'Charge and spin', 'Temperature and pressure'], correct: 0, category: 'Science' },
  { q: 'Which is a message queue?', opts: ['RabbitMQ', 'MongoDB', 'Postgres', 'Nginx'], correct: 0, category: 'Software' },
  { q: 'What is solder used for?', opts: ['Cooling', 'Electrical connections', 'Storage', 'Mounting fans'], correct: 1, category: 'Hardware' },
  { q: 'Anime where protagonist is "Light"?', opts: ['Death Note', 'Bleach', 'One Piece', 'Naruto'], correct: 0, category: 'Anime' },
  { q: 'What is Lorentz factor used in?', opts: ['Quantum tunneling', 'Special relativity', 'Thermodynamics', 'Classical optics'], correct: 1, category: 'Science' },
  { q: 'Which is a prime number?', opts: ['21', '29', '33', '39'], correct: 1, category: 'Math' },
  { q: 'Which is an ASGI server for Python?', opts: ['Uvicorn', 'Gunicorn', 'IIS', 'Apache'], correct: 0, category: 'Software' },
  { q: 'What is dual-channel in RAM?', opts: ['Two sticks for higher bandwidth', 'Two SSDs in RAID', 'Two CPUs', 'Two GPUs'], correct: 0, category: 'Hardware' },
  { q: 'Anime with "Alchemist" brothers?', opts: ['FMA', 'Bleach', 'Naruto', 'OP'], correct: 0, category: 'Anime' },
  { q: 'Which phenomenon is quantum entanglement?', opts: ['Classical', 'Quantum correlation across distance', 'Thermal fluctuation', 'Electrostatic'], correct: 1, category: 'Science' },
  { q: 'What is Euler\'s identity? e^{iπ} + 1 = ?', opts: ['0', '1', '-1', 'i'], correct: 0, category: 'Math' },
  { q: 'Which cache level is fastest?', opts: ['L1', 'L2', 'L3', 'RAM'], correct: 0, category: 'Hardware' },
  { q: 'Which is a time complexity class for NP problems?', opts: ['P', 'NP', 'LOG', 'O(1)'], correct: 1, category: 'CS' },
  { q: 'Which anime features "Homunculi"?', opts: ['FMA', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },

  // Legendary
  { q: 'Which group is symmetry of a square?', opts: ['C3', 'D4', 'S3', 'A4'], correct: 1, category: 'Math' },
  { q: 'Which force is weakest?', opts: ['Strong nuclear', 'Weak nuclear', 'Electromagnetic', 'Gravity'], correct: 3, category: 'Science' },
  { q: 'Which DB uses document model?', opts: ['MongoDB', 'MySQL', 'Postgres', 'SQLite'], correct: 0, category: 'Software' },
  { q: 'What is thermal throttling?', opts: ['Increase in speed', 'Decrease in performance due to heat', 'Better cooling', 'Overclocking'], correct: 1, category: 'Hardware' },
  { q: 'Which anime has "Devil Fruit"?', opts: ['One Piece', 'Naruto', 'Bleach', 'FMA'], correct: 0, category: 'Anime' },
  { q: 'What is Hubble\'s law about?', opts: ['Universe expansion', 'Gravity', 'Electromagnetism', 'Quantum fields'], correct: 0, category: 'Science' },
  { q: 'What is 2^10?', opts: ['512', '1024', '2048', '256'], correct: 1, category: 'Math' },
  { q: 'Which protocol is stateful SMTP/POP/IMAP?', opts: ['POP', 'DNS', 'ICMP', 'ARP'], correct: 0, category: 'Networking' },
  { q: 'What is GPU VRAM used for?', opts: ['CPU tasks', 'Graphic frame buffers', 'Network routing', 'Disk caching'], correct: 1, category: 'Hardware' },
  { q: 'Which anime has "Zanpakuto"?', opts: ['Bleach', 'Naruto', 'One Piece', 'DB'], correct: 0, category: 'Anime' },
  { q: 'Which is cosmic microwave background remnant of?', opts: ['Big Bang', 'Supernova', 'Black hole', 'Dark matter'], correct: 0, category: 'Science' },
  { q: 'What is permutation of 3 items?', opts: ['3', '6', '9', '12'], correct: 1, category: 'Math' },
  { q: 'Which language compiles to bytecode for JVM?', opts: ['Kotlin', 'C', 'Go', 'Rust'], correct: 0, category: 'Software' },
  { q: 'What is SLI (NVIDIA) for?', opts: ['Overclocking', 'Multi-GPU linking', 'Cooling', 'Audio'], correct: 1, category: 'Hardware' },
  { q: 'Which anime features "Gomu Gomu"?', opts: ['One Piece', 'Bleach', 'Naruto', 'Dragon Ball'], correct: 0, category: 'Anime' },

  // Godlike
  { q: 'Which is Riemann hypothesis about?', opts: ['Zeros of zeta function', 'Prime gaps', 'P vs NP', 'Fermat'], correct: 0, category: 'Math' },
  { q: 'Which effect shows light bending near mass?', opts: ['Doppler', 'Gravitational lensing', 'Photoelectric', 'Compton'], correct: 1, category: 'Science' },
  { q: 'Which is a distributed SQL DB?', opts: ['CockroachDB', 'MongoDB', 'SQLite', 'Redis'], correct: 0, category: 'Software' },
  { q: 'What does ECC RAM protect against?', opts: ['Bit flips', 'Slow CPU', 'Disk failure', 'Network loss'], correct: 0, category: 'Hardware' },
  { q: 'Which anime has "Gear Second"?', opts: ['One Piece', 'Naruto', 'Bleach', 'DB'], correct: 0, category: 'Anime' },
  { q: 'Which constant is ~1.618?', opts: ['e', 'π', 'φ', 'γ'], correct: 2, category: 'Math' },
  { q: 'Which principle describes wave-particle duality?', opts: ['Bohr complementarity', 'Hooke', 'Ohm', 'Newton'], correct: 0, category: 'Science' },
  { q: 'Which is idempotent HTTP method?', opts: ['POST', 'GET', 'PATCH', 'CONNECT'], correct: 1, category: 'Networking' },
  { q: 'What is UEFI replacing?', opts: ['BIOS', 'CPU', 'GPU', 'RAM'], correct: 0, category: 'Hardware' },
  { q: 'Which anime protagonist is "Edward Elric"?', opts: ['FMA', 'Naruto', 'Bleach', 'One Piece'], correct: 0, category: 'Anime' },
  { q: 'Which is an example of chaos theory system?', opts: ['Double pendulum', 'Simple harmonic oscillator', 'Ideal gas', 'Uniform motion'], correct: 0, category: 'Science' },
  { q: 'What is modular inverse of 3 mod 11?', opts: ['4', '7', '8', '3'], correct: 1, category: 'Math' },
  { q: 'Which is a graph DB?', opts: ['Neo4j', 'MySQL', 'Postgres', 'MongoDB'], correct: 0, category: 'Software' },
  { q: 'What is thermal paste composed of mostly?', opts: ['Metal oxides or silicon compounds', 'Plastic', 'Wood', 'Paper'], correct: 0, category: 'Hardware' },
  { q: 'Which anime features "Bankai"?', opts: ['Bleach', 'Naruto', 'One Piece', 'FMA'], correct: 0, category: 'Anime' },

  // Transcendent
  { q: 'Which transform is used in signal processing?', opts: ['Laplace', 'Fourier', 'Taylor', 'Legendre'], correct: 1, category: 'Math' },
  { q: 'Which particle mediates electromagnetic force?', opts: ['Gluon', 'Photon', 'W boson', 'Graviton'], correct: 1, category: 'Science' },
  { q: 'Which is eventual consistency example?', opts: ['DNS', 'MySQL', 'SQLite', 'FTP'], correct: 0, category: 'Networking' },
  { q: 'What does MUX do in hardware?', opts: ['Selects between signals', 'Generates power', 'Cools CPU', 'Stores data'], correct: 0, category: 'Hardware' },
  { q: 'Which anime created by CLAMP?', opts: ['X/1999', 'Naruto', 'One Piece', 'Dragon Ball'], correct: 0, category: 'Anime' },
  { q: 'Which is a non-linear differential eq example?', opts: ['Logistic equation', 'Simple harmonic oscillator', 'Linear growth', 'None'], correct: 0, category: 'Math' },
  { q: 'Which is standard model particle?', opts: ['Photon', 'Ether', 'Aether', 'Phlogiston'], correct: 0, category: 'Science' },
  { q: 'Which tool for infra as code?', opts: ['Terraform', 'Excel', 'Photoshop', 'Word'], correct: 0, category: 'Software' },
  { q: 'What is solder mask on PCB?', opts: ['Protective layer', 'Power supply', 'Heat sink', 'CPU socket'], correct: 0, category: 'Hardware' },
  { q: 'Which anime is psychological and surreal?', opts: ['Paranoia Agent', 'Serial Experiments Lain', 'OP', 'DB'], correct: 1, category: 'Anime' },
  { q: 'What is redshift in astronomy?', opts: ['Objects moving away increasing wavelength', 'Objects getting closer', 'Temperature drop', 'Mass increase'], correct: 0, category: 'Science' },
  { q: 'Which is true about NP-complete?', opts: ['If one poly-time solves all NP', 'Always easy', 'Subset of P', 'Not related to complexity'], correct: 0, category: 'CS' },
  { q: 'Which is 64-bit integer max approx?', opts: ['9e18', '3e9', '6e4', '1e12'], correct: 0, category: 'Math' },
  { q: 'What is TIM in PC building?', opts: ['Thermal interface material', 'Transmission interface module', 'Time index measure', 'Turbo idle mode'], correct: 0, category: 'Hardware' },
  { q: 'Which anime studio made "Steins;Gate"?', opts: ['White Fox', 'Madhouse', 'Bones', 'Ghibli'], correct: 0, category: 'Anime' },

  // Apex
  { q: 'Which manifold concept is in topology?', opts: ['Open set', 'Manifold', 'Basis', 'Ring'], correct: 1, category: 'Math' },
  { q: 'Which telescope orbits Earth observing infrared?', opts: ['Spitzer', 'Hubble', 'Chandra', 'Kepler'], correct: 0, category: 'Science' },
  { q: 'Which is feature of functional languages?', opts: ['Immutability', 'Pointers', 'Manual memory management', 'Gotos'], correct: 0, category: 'Software' },
  { q: 'What is BLAS used for?', opts: ['Linear algebra routines', 'Networking', 'Audio', 'File system'], correct: 0, category: 'CS' },
  { q: 'Which anime has "Gendo Ikari"?', opts: ['Neon Genesis Evangelion', 'Naruto', 'Bleach', 'OP'], correct: 0, category: 'Anime' },
  { q: 'Which is cosmic inflation theory about?', opts: ['Early rapid expansion of universe', 'Black hole formation', 'Star birth', 'Planetary orbits'], correct: 0, category: 'Science' },
  { q: 'What is eigenvalue problem for?', opts: ['Linear transformations', 'Sorting', 'Parsing', 'Encryption'], correct: 0, category: 'Math' },
  { q: 'Which is consensus algorithm?', opts: ['Paxos', 'HTTP', 'FTP', 'SMTP'], correct: 0, category: 'CS' },
  { q: 'What is die in CPU manufacturing?', opts: ['Individual chip on wafer', 'Cooling system', 'Memory type', 'GPU brand'], correct: 0, category: 'Hardware' },
  { q: 'Which anime features "Rei Ayanami"?', opts: ['Evangelion', 'Naruto', 'One Piece', 'Bleach'], correct: 0, category: 'Anime' },
  { q: 'Which is observable in particle accelerators?', opts: ['Quarks directly', 'Collision products like jets', 'Thoughts', 'Dark matter directly'], correct: 1, category: 'Science' },
  { q: 'Which is NP-hard example?', opts: ['Travelling Salesman', 'Binary search', 'Insertion sort', 'Matrix addition'], correct: 0, category: 'CS' },
  { q: 'What is LRU in caching?', opts: ['Least Recently Used', 'Largest RAM Used', 'Local Resource Unit', 'Low Response Unit'], correct: 0, category: 'CS' },
  { q: 'What is base clock (BCLK) related to?', opts: ['CPU core voltage', 'Reference clock for CPU/memory', 'GPU memory', 'Disk speed'], correct: 1, category: 'Hardware' },
  { q: 'Which anime directed by Satoshi Kon?', opts: ['Perfect Blue', 'Steins;Gate', 'One Piece', 'Naruto'], correct: 0, category: 'Anime' },

  // Cosmic
  { q: 'Which theorem links flux and circulation in vector calculus?', opts: ['Green', 'Stokes', 'Pythagoras', 'Fermat'], correct: 1, category: 'Math' },
  { q: 'Which is cosmic background temperature approx?', opts: ['2.7 K', '300 K', '0 K', '273 K'], correct: 0, category: 'Science' },
  { q: 'Which is an immutable data structure example?', opts: ['String in many languages', 'Mutable array', 'File handle', 'Socket'], correct: 0, category: 'CS' },
  { q: 'What is BGA in PCB?', opts: ['Ball Grid Array', 'Basic Graphics Adapter', 'Binary Gate Array', 'Bus Ground Array'], correct: 0, category: 'Hardware' },
  { q: 'Which anime original movie by Miyazaki?', opts: ['Princess Mononoke', 'Evangelion', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },
  { q: 'Which is Cherenkov radiation emitted by?', opts: ['Particles faster than light in medium', 'Black holes', 'Neutrinos only', 'Cold atoms'], correct: 0, category: 'Science' },
  { q: 'What is continued fraction for golden ratio?', opts: ['[1;1,1,1,...]', '[2;2,2]', '[3;3]', '[0;1,2]'], correct: 0, category: 'Math' },
  { q: 'Which is reactive programming lib for JS?', opts: ['RxJS', 'Lodash', 'Express', 'Bootstrap'], correct: 0, category: 'Software' },
  { q: 'What is GPU shader stage?', opts: ['Vertex/Fragment/Tessellation', 'BIOS', 'Bootloader', 'Filesystem'], correct: 0, category: 'Hardware' },
  { q: 'Which anime Studio made "Mononoke"?', opts: ['Ghibli', 'Toei', 'Madhouse', 'Bones'], correct: 2, category: 'Anime' },
  { q: 'Which effect demonstrates quantum tunneling?', opts: ['Alpha decay', 'Doppler', 'Photoelectric', 'Brownian motion'], correct: 0, category: 'Science' },
  { q: 'Which is Lanczos algorithm for?', opts: ['Eigenvalues of large matrices', 'Compression', 'Sorting', 'Parsing'], correct: 0, category: 'Math' },
  { q: 'What is eventual consistency vs strong?', opts: ['Eventual allows temporary divergence', 'Eventual always identical instantly', 'Strong is slower', 'Not related'], correct: 0, category: 'CS' },
  { q: 'What is MUX vs DEMUX?', opts: ['Selects vs distributes signals', 'Both cooling', 'Both storage', 'Both power'], correct: 0, category: 'Hardware' },
  { q: 'Which anime is psychological about time travel?', opts: ['Steins;Gate', 'One Piece', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },

  // Beyond
  { q: 'Which is Riemann zeta critical line real part?', opts: ['1/2', '1/3', '1', '0'], correct: 0, category: 'Math' },
  { q: 'What is cosmic inflation energy scale roughly?', opts: ['GUT scale ~10^16 GeV', '1 eV', '1 keV', '100 MeV'], correct: 0, category: 'Science' },
  { q: 'Which is Byzantine fault tolerant algorithm?', opts: ['PBFT', 'HTTP', 'FTP', 'SMTP'], correct: 0, category: 'CS' },
  { q: 'What is silicon wafer doping for?', opts: ['Change conductivity', 'Color', 'Size', 'Shape'], correct: 0, category: 'Hardware' },
  { q: 'Which anime has complex metaphysical themes: "Mushishi" or "OP"?', opts: ['Mushishi', 'One Piece', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },
  { q: 'What is Gödel incompleteness about?', opts: ['Limits of formal systems', 'Prime numbers', 'Convergence', 'Thermodynamics'], correct: 0, category: 'Math' },
  { q: 'Which particle is Majorana fermion hypothetical?', opts: ['Particle equal to its antiparticle', 'Photon', 'Electron', 'Proton'], correct: 0, category: 'Science' },
  { q: 'Which is CRDT used for?', opts: ['Conflict-free replicated data types', 'Compression', 'Rendering', 'Encryption'], correct: 0, category: 'CS' },
  { q: 'What is TSV in PCB context?', opts: ['Through-silicon via', 'Top-side voltage', 'Test socket variant', 'Thermal sink valve'], correct: 0, category: 'Hardware' },
  { q: 'Which anime is by Satoshi Kon and surreal?', opts: ['Perfect Blue', 'Naruto', 'One Piece', 'Bleach'], correct: 0, category: 'Anime' },
  { q: 'Which math object is a field?', opts: ['Integers (not a field)', 'Rationals', 'Matrices (not field)', 'Rings (not field)'], correct: 1, category: 'Math' },
  { q: 'Which cosmological parameter is Ω (Omega)?', opts: ['Density parameter', 'Temperature', 'Mass of Sun', 'Planck constant'], correct: 0, category: 'Science' },
  { q: 'Which is an anti-entropy sync algorithm?', opts: ['Gossip protocol', 'FTP', 'SMTP', 'DNS'], correct: 0, category: 'Networking' },
  { q: 'What is BCLK overclocking risk?', opts: ['Destabilize system bus', 'Make it quieter', 'Increase storage', 'Improve cooling'], correct: 0, category: 'Hardware' },
  { q: 'Which anime explores identity and networked selves?', opts: ['Serial Experiments Lain', 'One Piece', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },

  // Ultimate
  { q: 'Which unsolved problem is Clay Millennium?', opts: ['Riemann hypothesis', 'P vs NP', 'Goldbach', 'Fermat'], correct: 0, category: 'Math' },
  { q: 'Which theory unifies gravity and quantum mechanics (unsolved)?', opts: ['Quantum gravity / String theory candidates', 'Relativity', 'Classical mechanics', 'Thermodynamics'], correct: 0, category: 'Science' },
  { q: 'Which consensus is used by Bitcoin?', opts: ['Proof of Work', 'Proof of Stake', 'PBFT', 'Raft'], correct: 0, category: 'CS' },
  { q: 'What is EUV lithography used for?', opts: ['Advanced semiconductor patterning', 'Power supply', 'Cooling', 'Packaging'], correct: 0, category: 'Hardware' },
  { q: 'Which anime deeply explores trauma and philosophy: "Berserk" or "OP"?', opts: ['Berserk', 'One Piece', 'Naruto', 'Bleach'], correct: 0, category: 'Anime' },
  { q: 'Which constant appears in black hole entropy formula?', opts: ['Boltzmann constant', 'Planck constant', 'e', 'π'], correct: 0, category: 'Science' },
  { q: 'Which is Hilbert space used in?', opts: ['Quantum mechanics and functional analysis', 'Classical mechanics only', 'Thermodynamics only', 'Number theory only'], correct: 0, category: 'Math' },
  { q: 'What is zk-SNARKs used for?', opts: ['Zero-knowledge proofs', 'Compression', 'Rendering', 'Caching'], correct: 0, category: 'CS' },
  { q: 'What is extreme ultraviolet wavelength approx?', opts: ['10–124 nm', '1 m', '1 mm', '1000 nm'], correct: 0, category: 'Science' },
  { q: 'Which anime is known for dark fantasy and complex characters: "Berserk"?', opts: ['Yes', 'No', 'Maybe', 'None'], correct: 0, category: 'Anime' },
  { q: 'Which hypothesis links primes distribution to zeros of zeta?', opts: ['Riemann hypothesis', 'Goldbach', 'Twin prime', 'Collatz'], correct: 0, category: 'Math' },
  { q: 'Which approach aims to quantize gravity?', opts: ['String theory / Loop quantum gravity', 'Classical thermodynamics', 'Newtonian gravity', 'Hydrodynamics'], correct: 0, category: 'Science' },
  { q: 'Which is BFT property in distributed systems?', opts: ['Tolerance to malicious nodes', 'Faster CPU', 'More storage', 'Better cooling'], correct: 0, category: 'CS' },
  { q: 'What is Moore\'s law originally about?', opts: ['Transistor density doubling roughly every ~2 years', 'CPU speed doubling daily', 'Memory size constant', 'Disk speed doubling monthly'], correct: 0, category: 'Hardware' },
  { q: 'Which anime explores human monstrosity and sacrifice: "Berserk"?', opts: ['Yes', 'No', 'Maybe', 'None'], correct: 0, category: 'Anime' }
];

questionsData[1] = {
  difficulty: 'Easy',
  questions: level1Questions
};

// Distribute pooled questions to Levels 2 to 35 (approx)
// We have about ~230 pooled questions. 230 / 10 = 23 levels. 
// Level 2 to 24. 
// Remaining levels 25-50 will be generated.

let poolIndex = 0;

for (let level = 2; level <= MAX_LEVELS; level++) {
  const difficulty = level <= 15 ? 'Easy' : level <= 30 ? 'Medium' : level <= 45 ? 'Hard' : 'Expert';
  
  // If we have static questions left, use them
  if (poolIndex + QUESTIONS_PER_LEVEL <= pooledQuestions.length) {
    questionsData[level] = {
      difficulty,
      questions: pooledQuestions.slice(poolIndex, poolIndex + QUESTIONS_PER_LEVEL)
    };
    poolIndex += QUESTIONS_PER_LEVEL;
  } else {
    // Generate questions for remaining levels (Infinite Variety)
        questionsData[level] = {
            difficulty,
            questions: Array.from({ length: QUESTIONS_PER_LEVEL }).map((_, i) => {
                const a = Math.floor(Math.random() * 50) + level; // harder math
                const b = Math.floor(Math.random() * 50) + 1;
                const correctVal = a + b;
                const opts = [correctVal, correctVal + 1 + Math.floor(Math.random()*5), correctVal - 1 - Math.floor(Math.random()*5), correctVal + 10];
                return {
                    q: `Level ${level} Challenge: ${a} + ${b} = ?`,
                    opts: opts.sort(() => Math.random() - 0.5).map(String),
                    correct: opts.indexOf(correctVal),
                    category: 'Math'
                };
            })
        };
  }
}
