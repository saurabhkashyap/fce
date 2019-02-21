import utils from "../../../Utils/utils";
import getData from "../../getData";
import axios from "../../../../lib/axios";

const getNAF = code => {
  const nomenclatures = {
    "0111Z":
      "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses",
    "0111Z": "Culture du riz",
    "0111Z": "Culture de légumes, de melons, de racines et de tubercules",
    "0111Z": "Culture de la canne à sucre",
    "0111Z": "Culture du tabac",
    "0111Z": "Culture de plantes à fibres",
    "0111Z": "Autres cultures non permanentes",
    "0111Z": "Culture de la vigne",
    "0111Z": "Culture de fruits tropicaux et subtropicaux",
    "0111Z": "Culture d'agrumes",
    "0111Z": "Culture de fruits à pépins et à noyau",
    "0111Z":
      "Culture d'autres fruits d'arbres ou d'arbustes et de fruits à coque",
    "0111Z": "Culture de fruits oléagineux",
    "0111Z": "Culture de plantes à boissons",
    "0111Z":
      "Culture de plantes à épices, aromatiques, médicinales et pharmaceutiques",
    "0111Z": "Autres cultures permanentes",
    "0111Z": "Reproduction de plantes",
    "0111Z": "Élevage de vaches laitières",
    "0111Z": "Élevage d'autres bovins et de buffles",
    "0111Z": "Élevage de chevaux et d'autres équidés",
    "0111Z": "Élevage de chameaux et d'autres camélidés",
    "0111Z": "Élevage d'ovins et de caprins",
    "0111Z": "Élevage de porcins",
    "0111Z": "Élevage de volailles",
    "0111Z": "Élevage d'autres animaux",
    "0111Z": "Culture et élevage associés",
    "0111Z": "Activités de soutien aux cultures",
    "0111Z": "Activités de soutien à la production animale",
    "0111Z": "Traitement primaire des récoltes",
    "0111Z": "Traitement des semences",
    "0111Z": "Chasse, piégeage et services annexes",
    "0111Z": "Sylviculture et autres activités forestières",
    "0111Z": "Exploitation forestière",
    "0111Z":
      "Récolte de produits forestiers non ligneux poussant à l'état sauvage",
    "0240Z": "Services de soutien à l'exploitation forestière",
    "0311Z": "Pêche en mer",
    "0312Z": "Pêche en eau douce",
    "0321Z": "Aquaculture en mer",
    "0322Z": "Aquaculture en eau douce",
    "0510Z": "Extraction de houille",
    "0520Z": "Extraction de lignite",
    "0610Z": "Extraction de pétrole brut",
    "0620Z": "Extraction de gaz naturel",
    "0710Z": "Extraction de minerais de fer",
    "0721Z": "Extraction de minerais d'uranium et de thorium",
    "0729Z": "Extraction d'autres minerais de métaux non ferreux",
    "0811Z":
      "Extraction de pierres ornementales et de construction, de calcaire industriel, de gypse, de craie et d'ardoise",
    "0812Z":
      "Exploitation de gravières et sablières, extraction d'argiles et de kaolin",
    "0891Z": "Extraction des minéraux chimiques et d'engrais minéraux",
    "0892Z": "Extraction de tourbe",
    "0893Z": "Production de sel",
    "0899Z": "Autres activités extractives n.c.a.",
    "0910Z": "Activités de soutien à l'extraction d'hydrocarbures",
    "0990Z": "Activités de soutien aux autres industries extractives",
    "1011Z": "Transformation et conservation de la viande de boucherie",
    "1012Z": "Transformation et conservation de la viande de volaille",
    "1013A": "Préparation industrielle de produits à base de viande",
    "1013B": "Charcuterie",
    "1020Z":
      "Transformation et conservation de poisson, de crustacés et de mollusques",
    "1031Z": "Transformation et conservation de pommes de terre",
    "1032Z": "Préparation de jus de fruits et légumes",
    "1039A": "Autre transformation et conservation de légumes",
    "1039B": "Transformation et conservation de fruits",
    "1041A": "Fabrication d'huiles et graisses brutes",
    "1041B": "Fabrication d'huiles et graisses raffinées",
    "1042Z": "Fabrication de margarine et graisses comestibles similaires",
    "1051A": "Fabrication de lait liquide et de produits frais",
    "1051B": "Fabrication de beurre",
    "1051C": "Fabrication de fromage",
    "1051D": "Fabrication d'autres produits laitiers",
    "1052Z": "Fabrication de glaces et sorbets",
    "1061A": "Meunerie",
    "1061B": "Autres activités du travail des grains",
    "1062Z": "Fabrication de produits amylacés",
    "1071A": "Fabrication industrielle de pain et de pâtisserie fraîche",
    "1071B": "Cuisson de produits de boulangerie",
    "1071C": "Boulangerie et boulangerie-pâtisserie",
    "1071D": "Pâtisserie",
    "1072Z":
      "Fabrication de biscuits, biscottes et pâtisseries de conservation",
    "1073Z": "Fabrication de pâtes alimentaires",
    "1081Z": "Fabrication de sucre",
    "1082Z": "Fabrication de cacao, chocolat et de produits de confiserie",
    "1083Z": "Transformation du thé et du café",
    "1084Z": "Fabrication de condiments et assaisonnements",
    "1085Z": "Fabrication de plats préparés",
    "1086Z": "Fabrication d'aliments homogénéisés et diététiques",
    "1089Z": "Fabrication d'autres produits alimentaires n.c.a.",
    "1091Z": "Fabrication d'aliments pour animaux de ferme",
    "1092Z": "Fabrication d'aliments pour animaux de compagnie",
    "1101Z": "Production de boissons alcooliques distillées",
    "1102A": "Fabrication de vins effervescents",
    "1102B": "Vinification",
    "1103Z": "Fabrication de cidre et de vins de fruits",
    "1104Z": "Production d'autres boissons fermentées non distillées",
    "1105Z": "Fabrication de bière",
    "1106Z": "Fabrication de malt",
    "1107A": "Industrie des eaux de table",
    "1107B": "Production de boissons rafraîchissantes",
    "1200Z": "Fabrication de produits à base de tabac",
    "1310Z": "Préparation de fibres textiles et filature",
    "1320Z": "Tissage",
    "1330Z": "Ennoblissement textile",
    "1391Z": "Fabrication d'étoffes à mailles",
    "1392Z": "Fabrication d'articles textiles, sauf habillement",
    "1393Z": "Fabrication de tapis et moquettes",
    "1394Z": "Fabrication de ficelles, cordes et filets",
    "1395Z": "Fabrication de non-tissés, sauf habillement",
    "1396Z": "Fabrication d'autres textiles techniques et industriels",
    "1399Z": "Fabrication d'autres textiles n.c.a.",
    "1411Z": "Fabrication de vêtements en cuir",
    "1412Z": "Fabrication de vêtements de travail",
    "1413Z": "Fabrication de vêtements de dessus",
    "1414Z": "Fabrication de vêtements de dessous",
    "1419Z": "Fabrication d'autres vêtements et accessoires",
    "1420Z": "Fabrication d'articles en fourrure",
    "1431Z": "Fabrication d'articles chaussants à mailles",
    "1439Z": "Fabrication d'autres articles à mailles",
    "1511Z":
      "Apprêt et tannage des cuirs ; préparation et teinture des fourrures",
    "1512Z": "Fabrication d'articles de voyage, de maroquinerie et de sellerie",
    "1520Z": "Fabrication de chaussures",
    "1610A": "Sciage et rabotage du bois, hors imprégnation",
    "1610B": "Imprégnation du bois",
    "1621Z": "Fabrication de placage et de panneaux de bois",
    "1622Z": "Fabrication de parquets assemblés",
    "1623Z": "Fabrication de charpentes et d'autres menuiseries",
    "1624Z": "Fabrication d'emballages en bois",
    "1629Z":
      "Fabrication d'objets divers en bois ; fabrication d'objets en liège, vannerie et sparterie",
    "1711Z": "Fabrication de pâte à papier",
    "1712Z": "Fabrication de papier et de carton",
    "1721A": "Fabrication de carton ondulé",
    "1721B": "Fabrication de cartonnages",
    "1721C": "Fabrication d'emballages en papier",
    "1722Z": "Fabrication d'articles en papier à usage sanitaire ou domestique",
    "1723Z": "Fabrication d'articles de papeterie",
    "1724Z": "Fabrication de papiers peints",
    "1729Z": "Fabrication d'autres articles en papier ou en carton",
    "1811Z": "Imprimerie de journaux",
    "1812Z": "Autre imprimerie (labeur)",
    "1813Z": "Activités de pré-presse",
    "1814Z": "Reliure et activités connexes",
    "1820Z": "Reproduction d'enregistrements",
    "1910Z": "Cokéfaction",
    "1920Z": "Raffinage du pétrole",
    "2011Z": "Fabrication de gaz industriels",
    "2012Z": "Fabrication de colorants et de pigments",
    "2013A": "Enrichissement et retraitement de matières nucléaires",
    "2013B":
      "Fabrication d'autres produits chimiques inorganiques de base n.c.a.",
    "2014Z": "Fabrication d'autres produits chimiques organiques de base",
    "2015Z": "Fabrication de produits azotés et d'engrais",
    "2016Z": "Fabrication de matières plastiques de base",
    "2017Z": "Fabrication de caoutchouc synthétique",
    "2020Z": "Fabrication de pesticides et d'autres produits agrochimiques",
    "2030Z": "Fabrication de peintures, vernis, encres et mastics",
    "2041Z": "Fabrication de savons, détergents et produits d'entretien",
    "2042Z": "Fabrication de parfums et de produits pour la toilette",
    "2051Z": "Fabrication de produits explosifs",
    "2052Z": "Fabrication de colles",
    "2053Z": "Fabrication d'huiles essentielles",
    "2059Z": "Fabrication d'autres produits chimiques n.c.a.",
    "2060Z": "Fabrication de fibres artificielles ou synthétiques",
    "2110Z": "Fabrication de produits pharmaceutiques de base",
    "2120Z": "Fabrication de préparations pharmaceutiques",
    "2211Z": "Fabrication et rechapage de pneumatiques",
    "2219Z": "Fabrication d'autres articles en caoutchouc",
    "2221Z":
      "Fabrication de plaques, feuilles, tubes et profilés en matières plastiques",
    "2222Z": "Fabrication d'emballages en matières plastiques",
    "2223Z":
      "Fabrication d'éléments en matières plastiques pour la construction",
    "2229A": "Fabrication de pièces techniques à base de matières plastiques",
    "2229B":
      "Fabrication de produits de consommation courante en matières plastiques",
    "2311Z": "Fabrication de verre plat",
    "2312Z": "Façonnage et transformation du verre plat",
    "2313Z": "Fabrication de verre creux",
    "2314Z": "Fabrication de fibres de verre",
    "2319Z":
      "Fabrication et façonnage d'autres articles en verre, y compris verre technique",
    "2320Z": "Fabrication de produits réfractaires",
    "2331Z": "Fabrication de carreaux en céramique",
    "2332Z":
      "Fabrication de briques, tuiles et produits de construction, en terre cuite",
    "2341Z":
      "Fabrication d'articles céramiques à usage domestique ou ornemental",
    "2342Z": "Fabrication d'appareils sanitaires en céramique",
    "2343Z": "Fabrication d'isolateurs et pièces isolantes en céramique",
    "2344Z": "Fabrication d'autres produits céramiques à usage technique",
    "2349Z": "Fabrication d'autres produits céramiques",
    "2351Z": "Fabrication de ciment",
    "2352Z": "Fabrication de chaux et plâtre",
    "2361Z": "Fabrication d'éléments en béton pour la construction",
    "2362Z": "Fabrication d'éléments en plâtre pour la construction",
    "2363Z": "Fabrication de béton prêt à l'emploi",
    "2364Z": "Fabrication de mortiers et bétons secs",
    "2365Z": "Fabrication d'ouvrages en fibre-ciment",
    "2369Z": "Fabrication d'autres ouvrages en béton, en ciment ou en plâtre",
    "2370Z": "Taille, façonnage et finissage de pierres",
    "2391Z": "Fabrication de produits abrasifs",
    "2399Z": "Fabrication d'autres produits minéraux non métalliques n.c.a.",
    "2410Z": "Sidérurgie",
    "2420Z":
      "Fabrication de tubes, tuyaux, profilés creux et accessoires correspondants en acier",
    "2431Z": "Étirage à froid de barres",
    "2432Z": "Laminage à froid de feuillards",
    "2433Z": "Profilage à froid par formage ou pliage",
    "2434Z": "Tréfilage à froid",
    "2441Z": "Production de métaux précieux",
    "2442Z": "Métallurgie de l'aluminium",
    "2443Z": "Métallurgie du plomb, du zinc ou de l'étain",
    "2444Z": "Métallurgie du cuivre",
    "2445Z": "Métallurgie des autres métaux non ferreux",
    "2446Z": "Élaboration et transformation de matières nucléaires",
    "2451Z": "Fonderie de fonte",
    "2452Z": "Fonderie d'acier",
    "2453Z": "Fonderie de métaux légers",
    "2454Z": "Fonderie d'autres métaux non ferreux",
    "2511Z":
      "Fabrication de structures métalliques et de parties de structures",
    "2512Z": "Fabrication de portes et fenêtres en métal",
    "2521Z":
      "Fabrication de radiateurs et de chaudières pour le chauffage central",
    "2529Z":
      "Fabrication d'autres réservoirs, citernes et conteneurs métalliques",
    "2530Z":
      "Fabrication de générateurs de vapeur, à l'exception des chaudières pour le chauffage central",
    "2540Z": "Fabrication d'armes et de munitions",
    "2550A": "Forge, estampage, matriçage ; métallurgie des poudres",
    "2550B": "Découpage, emboutissage",
    "2561Z": "Traitement et revêtement des métaux",
    "2562A": "Décolletage",
    "2562B": "Mécanique industrielle",
    "2571Z": "Fabrication de coutellerie",
    "2572Z": "Fabrication de serrures et de ferrures",
    "2573A": "Fabrication de moules et modèles",
    "2573B": "Fabrication d'autres outillages",
    "2591Z": "Fabrication de fûts et emballages métalliques similaires",
    "2592Z": "Fabrication d'emballages métalliques légers",
    "2593Z":
      "Fabrication d'articles en fils métalliques, de chaînes et de ressorts",
    "2594Z": "Fabrication de vis et de boulons",
    "2599A": "Fabrication d'articles métalliques ménagers",
    "2599B": "Fabrication d'autres articles métalliques",
    "2611Z": "Fabrication de composants électroniques",
    "2612Z": "Fabrication de cartes électroniques assemblées",
    "2620Z": "Fabrication d'ordinateurs et d'équipements périphériques",
    "2630Z": "Fabrication d'équipements de communication",
    "2640Z": "Fabrication de produits électroniques grand public",
    "2651A": "Fabrication d'équipements d'aide à la navigation",
    "2651B": "Fabrication d'instrumentation scientifique et technique",
    "2652Z": "Horlogerie",
    "2660Z":
      "Fabrication d'équipements d'irradiation médicale, d'équipements électromédicaux et électrothérapeutiques",
    "2670Z": "Fabrication de matériels optique et photographique",
    "2680Z": "Fabrication de supports magnétiques et optiques",
    "2711Z":
      "Fabrication de moteurs, génératrices et transformateurs électriques",
    "2712Z":
      "Fabrication de matériel de distribution et de commande électrique",
    "2720Z": "Fabrication de piles et d'accumulateurs électriques",
    "2731Z": "Fabrication de câbles de fibres optiques",
    "2732Z": "Fabrication d'autres fils et câbles électroniques ou électriques",
    "2733Z": "Fabrication de matériel d'installation électrique",
    "2740Z": "Fabrication d'appareils d'éclairage électrique",
    "2751Z": "Fabrication d'appareils électroménagers",
    "2752Z": "Fabrication d'appareils ménagers non électriques",
    "2790Z": "Fabrication d'autres matériels électriques",
    "2811Z":
      "Fabrication de moteurs et turbines, à l'exception des moteurs d'avions et de véhicules",
    "2812Z": "Fabrication d'équipements hydrauliques et pneumatiques",
    "2813Z": "Fabrication d'autres pompes et compresseurs",
    "2814Z": "Fabrication d'autres articles de robinetterie",
    "2815Z": "Fabrication d'engrenages et d'organes mécaniques de transmission",
    "2821Z": "Fabrication de fours et brûleurs",
    "2822Z": "Fabrication de matériel de levage et de manutention",
    "2823Z":
      "Fabrication de machines et d'équipements de bureau (à l'exception des ordinateurs et équipements périphériques)",
    "2824Z": "Fabrication d'outillage portatif à moteur incorporé",
    "2825Z":
      "Fabrication d'équipements aérauliques et frigorifiques industriels",
    "2829A":
      "Fabrication d'équipements d'emballage, de conditionnement et de pesage",
    "2829B": "Fabrication d'autres machines d'usage général",
    "2830Z": "Fabrication de machines agricoles et forestières",
    "2841Z": "Fabrication de machines-outils pour le travail des métaux",
    "2849Z": "Fabrication d'autres machines-outils",
    "2891Z": "Fabrication de machines pour la métallurgie",
    "2892Z": "Fabrication de machines pour l'extraction ou la construction",
    "2893Z": "Fabrication de machines pour l'industrie agro-alimentaire",
    "2894Z": "Fabrication de machines pour les industries textiles",
    "2895Z":
      "Fabrication de machines pour les industries du papier et du carton",
    "2896Z":
      "Fabrication de machines pour le travail du caoutchouc ou des plastiques",
    "2899A": "Fabrication de machines d'imprimerie",
    "2899B": "Fabrication d'autres machines spécialisées",
    "2910Z": "Construction de véhicules automobiles",
    "2920Z": "Fabrication de carrosseries et remorques",
    "2931Z":
      "Fabrication d'équipements électriques et électroniques automobiles",
    "2932Z": "Fabrication d'autres équipements automobiles",
    "3011Z": "Construction de navires et de structures flottantes",
    "3012Z": "Construction de bateaux de plaisance",
    "3020Z":
      "Construction de locomotives et d'autre matériel ferroviaire roulant",
    "3030Z": "Construction aéronautique et spatiale",
    "3040Z": "Construction de véhicules militaires de combat",
    "3091Z": "Fabrication de motocycles",
    "3092Z": "Fabrication de bicyclettes et de véhicules pour invalides",
    "3099Z": "Fabrication d'autres équipements de transport n.c.a.",
    "3101Z": "Fabrication de meubles de bureau et de magasin",
    "3102Z": "Fabrication de meubles de cuisine",
    "3103Z": "Fabrication de matelas",
    "3109A": "Fabrication de sièges d'ameublement d'intérieur",
    "3109B":
      "Fabrication d'autres meubles et industries connexes de l'ameublement",
    "3211Z": "Frappe de monnaie",
    "3212Z": "Fabrication d'articles de joaillerie et bijouterie",
    "3213Z":
      "Fabrication d'articles de bijouterie fantaisie et articles similaires",
    "3220Z": "Fabrication d'instruments de musique",
    "3230Z": "Fabrication d'articles de sport",
    "3240Z": "Fabrication de jeux et jouets",
    "3250A": "Fabrication de matériel médico-chirurgical et dentaire",
    "3250B": "Fabrication de lunettes",
    "3291Z": "Fabrication d'articles de brosserie",
    "3299Z": "Autres activités manufacturières n.c.a.",
    "3311Z": "Réparation d'ouvrages en métaux",
    "3312Z": "Réparation de machines et équipements mécaniques",
    "3313Z": "Réparation de matériels électroniques et optiques",
    "3314Z": "Réparation d'équipements électriques",
    "3315Z": "Réparation et maintenance navale",
    "3316Z": "Réparation et maintenance d'aéronefs et d'engins spatiaux",
    "3317Z": "Réparation et maintenance d'autres équipements de transport",
    "3319Z": "Réparation d'autres équipements",
    "3320A":
      "Installation de structures métalliques, chaudronnées et de tuyauterie",
    "3320B": "Installation de machines et équipements mécaniques",
    "3320C":
      "Conception d'ensemble et assemblage sur site industriel d'équipements de contrôle des processus industriels",
    "3320D":
      "Installation d'équipements électriques, de matériels électroniques et optiques ou d'autres matériels",
    "3511Z": "Production d'électricité",
    "3512Z": "Transport d'électricité",
    "3513Z": "Distribution d'électricité",
    "3514Z": "Commerce d'électricité",
    "3521Z": "Production de combustibles gazeux",
    "3522Z": "Distribution de combustibles gazeux par conduites",
    "3523Z": "Commerce de combustibles gazeux par conduites",
    "3530Z": "Production et distribution de vapeur et d'air conditionné",
    "3600Z": "Captage, traitement et distribution d'eau",
    "3700Z": "Collecte et traitement des eaux usées",
    "3811Z": "Collecte des déchets non dangereux",
    "3812Z": "Collecte des déchets dangereux",
    "3821Z": "Traitement et élimination des déchets non dangereux",
    "3822Z": "Traitement et élimination des déchets dangereux",
    "3831Z": "Démantèlement d'épaves",
    "3832Z": "Récupération de déchets triés",
    "3900Z": "Dépollution et autres services de gestion des déchets",
    "4110A": "Promotion immobilière de logements",
    "4110B": "Promotion immobilière de bureaux",
    "4110C": "Promotion immobilière d'autres bâtiments",
    "4110D": "Supports juridiques de programmes",
    "4120A": "Construction de maisons individuelles",
    "4120B": "Construction d'autres bâtiments",
    "4211Z": "Construction de routes et autoroutes",
    "4212Z": "Construction de voies ferrées de surface et souterraines",
    "4213A": "Construction d'ouvrages d'art",
    "4213B": "Construction et entretien de tunnels",
    "4221Z": "Construction de réseaux pour fluides",
    "4222Z": "Construction de réseaux électriques et de télécommunications",
    "4291Z": "Construction d'ouvrages maritimes et fluviaux",
    "4299Z": "Construction d'autres ouvrages de génie civil n.c.a.",
    "4311Z": "Travaux de démolition",
    "4312A": "Travaux de terrassement courants et travaux préparatoires",
    "4312B": "Travaux de terrassement spécialisés ou de grande masse",
    "4313Z": "Forages et sondages",
    "4321A": "Travaux d'installation électrique dans tous locaux",
    "4321B": "Travaux d'installation électrique sur la voie publique",
    "4322A": "Travaux d'installation d'eau et de gaz en tous locaux",
    "4322B":
      "Travaux d'installation d'équipements thermiques et de climatisation",
    "4329A": "Travaux d'isolation",
    "4329B": "Autres travaux d'installation n.c.a.",
    "4331Z": "Travaux de plâtrerie",
    "4332A": "Travaux de menuiserie bois et PVC",
    "4332B": "Travaux de menuiserie métallique et serrurerie",
    "4332C": "Agencement de lieux de vente",
    "4333Z": "Travaux de revêtement des sols et des murs",
    "4334Z": "Travaux de peinture et vitrerie",
    "4339Z": "Autres travaux de finition",
    "4391A": "Travaux de charpente",
    "4391B": "Travaux de couverture par éléments",
    "4399A": "Travaux d'étanchéification",
    "4399B": "Travaux de montage de structures métalliques",
    "4399C": "Travaux de maçonnerie générale et gros œuvre de bâtiment",
    "4399D": "Autres travaux spécialisés de construction",
    "4399E": "Location avec opérateur de matériel de construction",
    "4511Z": "Commerce de voitures et de véhicules automobiles légers",
    "4519Z": "Commerce d'autres véhicules automobiles",
    "4520A": "Entretien et réparation de véhicules automobiles légers",
    "4520B": "Entretien et réparation d'autres véhicules automobiles",
    "4531Z": "Commerce de gros d'équipements automobiles",
    "4532Z": "Commerce de détail d'équipements automobiles",
    "4540Z": "Commerce et réparation de motocycles",
    "4611Z":
      "Intermédiaires du commerce en matières premières agricoles, animaux vivants, matières premières textiles et produits semi-finis",
    "4612A": "Centrales d'achat de carburant",
    "4612B":
      "Autres intermédiaires du commerce en combustibles, métaux, minéraux et produits chimiques",
    "4613Z": "Intermédiaires du commerce en bois et matériaux de construction",
    "4614Z":
      "Intermédiaires du commerce en machines, équipements industriels, navires et avions",
    "4615Z":
      "Intermédiaires du commerce en meubles, articles de ménage et quincaillerie",
    "4616Z":
      "Intermédiaires du commerce en textiles, habillement, fourrures, chaussures et articles en cuir",
    "4617A": "Centrales d'achat alimentaires",
    "4617B": "Autres intermédiaires du commerce en denrées, boissons et tabac",
    "4618Z":
      "Intermédiaires spécialisés dans le commerce d'autres produits spécifiques",
    "4619A": "Centrales d'achat non alimentaires",
    "4619B": "Autres intermédiaires du commerce en produits divers",
    "4621Z":
      "Commerce de gros (commerce interentreprises) de céréales, de tabac non manufacturé, de semences et d'aliments pour le bétail",
    "4622Z":
      "Commerce de gros (commerce interentreprises) de fleurs et plantes",
    "4623Z": "Commerce de gros (commerce interentreprises) d'animaux vivants",
    "4624Z": "Commerce de gros (commerce interentreprises) de cuirs et peaux",
    "4631Z":
      "Commerce de gros (commerce interentreprises) de fruits et légumes",
    "4632A":
      "Commerce de gros (commerce interentreprises) de viandes de boucherie",
    "4632B":
      "Commerce de gros (commerce interentreprises) de produits à base de viande",
    "4632C":
      "Commerce de gros (commerce interentreprises) de volailles et gibier",
    "4633Z":
      "Commerce de gros (commerce interentreprises) de produits laitiers, œufs, huiles et matières grasses comestibles",
    "4634Z": "Commerce de gros (commerce interentreprises) de boissons",
    "4635Z":
      "Commerce de gros (commerce interentreprises) de produits à base de tabac",
    "4636Z":
      "Commerce de gros (commerce interentreprises) de sucre, chocolat et confiserie",
    "4637Z":
      "Commerce de gros (commerce interentreprises) de café, thé, cacao et épices",
    "4638A":
      "Commerce de gros (commerce interentreprises) de poissons, crustacés et mollusques",
    "4638B":
      "Commerce de gros (commerce interentreprises) alimentaire spécialisé divers",
    "4639A":
      "Commerce de gros (commerce interentreprises) de produits surgelés",
    "4639B":
      "Commerce de gros (commerce interentreprises) alimentaire non spécialisé",
    "4641Z": "Commerce de gros (commerce interentreprises) de textiles",
    "4642Z":
      "Commerce de gros (commerce interentreprises) d'habillement et de chaussures",
    "4643Z":
      "Commerce de gros (commerce interentreprises) d'appareils électroménagers",
    "4644Z":
      "Commerce de gros (commerce interentreprises) de vaisselle, verrerie et produits d'entretien",
    "4645Z":
      "Commerce de gros (commerce interentreprises) de parfumerie et de produits de beauté",
    "4646Z":
      "Commerce de gros (commerce interentreprises) de produits pharmaceutiques",
    "4647Z":
      "Commerce de gros (commerce interentreprises) de meubles, de tapis et d'appareils d'éclairage",
    "4648Z":
      "Commerce de gros (commerce interentreprises) d'articles d'horlogerie et de bijouterie",
    "4649Z":
      "Commerce de gros (commerce interentreprises) d'autres biens domestiques",
    "4651Z":
      "Commerce de gros (commerce interentreprises) d'ordinateurs, d'équipements informatiques périphériques et de logiciels",
    "4652Z":
      "Commerce de gros (commerce interentreprises) de composants et d'équipements électroniques et de télécommunication",
    "4661Z":
      "Commerce de gros (commerce interentreprises) de matériel agricole",
    "4662Z": "Commerce de gros (commerce interentreprises) de machines-outils",
    "4663Z":
      "Commerce de gros (commerce interentreprises) de machines pour l'extraction, la construction et le génie civil",
    "4664Z":
      "Commerce de gros (commerce interentreprises) de machines pour l'industrie textile et l'habillement",
    "4665Z":
      "Commerce de gros (commerce interentreprises) de mobilier de bureau",
    "4666Z":
      "Commerce de gros (commerce interentreprises) d'autres machines et équipements de bureau",
    "4669A":
      "Commerce de gros (commerce interentreprises) de matériel électrique",
    "4669B":
      "Commerce de gros (commerce interentreprises) de fournitures et équipements industriels divers",
    "4669C":
      "Commerce de gros (commerce interentreprises) de fournitures et équipements divers pour le commerce et les services",
    "4671Z":
      "Commerce de gros (commerce interentreprises) de combustibles et de produits annexes",
    "4672Z":
      "Commerce de gros (commerce interentreprises) de minerais et métaux",
    "4673A":
      "Commerce de gros (commerce interentreprises) de bois et de matériaux de construction",
    "4673B":
      "Commerce de gros (commerce interentreprises) d'appareils sanitaires et de produits de décoration",
    "4674A": "Commerce de gros (commerce interentreprises) de quincaillerie",
    "4674B":
      "Commerce de gros (commerce interentreprises) de fournitures pour la plomberie et le chauffage",
    "4675Z":
      "Commerce de gros (commerce interentreprises) de produits chimiques",
    "4676Z":
      "Commerce de gros (commerce interentreprises) d'autres produits intermédiaires",
    "4677Z":
      "Commerce de gros (commerce interentreprises) de déchets et débris",
    "4690Z": "Commerce de gros (commerce interentreprises) non spécialisé",
    "4711A": "Commerce de détail de produits surgelés",
    "4711B": "Commerce d'alimentation générale",
    "4711C": "Supérettes",
    "4711D": "Supermarchés",
    "4711E": "Magasins multi-commerces",
    "4711F": "Hypermarchés",
    "4719A": "Grands magasins",
    "4719B": "Autres commerces de détail en magasin non spécialisé",
    "4721Z": "Commerce de détail de fruits et légumes en magasin spécialisé",
    "4722Z":
      "Commerce de détail de viandes et de produits à base de viande en magasin spécialisé",
    "4723Z":
      "Commerce de détail de poissons, crustacés et mollusques en magasin spécialisé",
    "4724Z":
      "Commerce de détail de pain, pâtisserie et confiserie en magasin spécialisé",
    "4725Z": "Commerce de détail de boissons en magasin spécialisé",
    "4726Z":
      "Commerce de détail de produits à base de tabac en magasin spécialisé",
    "4729Z": "Autres commerces de détail alimentaires en magasin spécialisé",
    "4730Z": "Commerce de détail de carburants en magasin spécialisé",
    "4741Z":
      "Commerce de détail d'ordinateurs, d'unités périphériques et de logiciels en magasin spécialisé",
    "4742Z":
      "Commerce de détail de matériels de télécommunication en magasin spécialisé",
    "4743Z":
      "Commerce de détail de matériels audio et vidéo en magasin spécialisé",
    "4751Z": "Commerce de détail de textiles en magasin spécialisé",
    "4752A":
      "Commerce de détail de quincaillerie, peintures et verres en petites surfaces (moins de 400 m²)",
    "4752B":
      "Commerce de détail de quincaillerie, peintures et verres en grandes surfaces (400 m² et plus)",
    "4753Z":
      "Commerce de détail de tapis, moquettes et revêtements de murs et de sols en magasin spécialisé",
    "4754Z":
      "Commerce de détail d'appareils électroménagers en magasin spécialisé",
    "4759A": "Commerce de détail de meubles",
    "4759B": "Commerce de détail d'autres équipements du foyer",
    "4761Z": "Commerce de détail de livres en magasin spécialisé",
    "4762Z":
      "Commerce de détail de journaux et papeterie en magasin spécialisé",
    "4763Z":
      "Commerce de détail d'enregistrements musicaux et vidéo en magasin spécialisé",
    "4764Z": "Commerce de détail d'articles de sport en magasin spécialisé",
    "4765Z": "Commerce de détail de jeux et jouets en magasin spécialisé",
    "4771Z": "Commerce de détail d'habillement en magasin spécialisé",
    "4772A": "Commerce de détail de la chaussure",
    "4772B": "Commerce de détail de maroquinerie et d'articles de voyage",
    "4773Z":
      "Commerce de détail de produits pharmaceutiques en magasin spécialisé",
    "4774Z":
      "Commerce de détail d'articles médicaux et orthopédiques en magasin spécialisé",
    "4775Z":
      "Commerce de détail de parfumerie et de produits de beauté en magasin spécialisé",
    "4776Z":
      "Commerce de détail de fleurs, plantes, graines, engrais, animaux de compagnie et aliments pour ces animaux en magasin spécialisé",
    "4777Z":
      "Commerce de détail d'articles d'horlogerie et de bijouterie en magasin spécialisé",
    "4778A": "Commerces de détail d'optique",
    "4778B": "Commerces de détail de charbons et combustibles",
    "4778C": "Autres commerces de détail spécialisés divers",
    "4779Z": "Commerce de détail de biens d'occasion en magasin",
    "4781Z": "Commerce de détail alimentaire sur éventaires et marchés",
    "4782Z":
      "Commerce de détail de textiles, d'habillement et de chaussures sur éventaires et marchés",
    "4789Z": "Autres commerces de détail sur éventaires et marchés",
    "4791A": "Vente à distance sur catalogue général",
    "4791B": "Vente à distance sur catalogue spécialisé",
    "4799A": "Vente à domicile",
    "4799B":
      "Vente par automates et autres commerces de détail hors magasin, éventaires ou marchés n.c.a.",
    "4910Z": "Transport ferroviaire interurbain de voyageurs",
    "4920Z": "Transports ferroviaires de fret",
    "4931Z": "Transports urbains et suburbains de voyageurs",
    "4932Z": "Transports de voyageurs par taxis",
    "4939A": "Transports routiers réguliers de voyageurs",
    "4939B": "Autres transports routiers de voyageurs",
    "4939C": "Téléphériques et remontées mécaniques",
    "4941A": "Transports routiers de fret interurbains",
    "4941B": "Transports routiers de fret de proximité",
    "4941C": "Location de camions avec chauffeur",
    "4942Z": "Services de déménagement",
    "4950Z": "Transports par conduites",
    "5010Z": "Transports maritimes et côtiers de passagers",
    "5020Z": "Transports maritimes et côtiers de fret",
    "5030Z": "Transports fluviaux de passagers",
    "5040Z": "Transports fluviaux de fret",
    "5110Z": "Transports aériens de passagers",
    "5121Z": "Transports aériens de fret",
    "5122Z": "Transports spatiaux",
    "5210A": "Entreposage et stockage frigorifique",
    "5210B": "Entreposage et stockage non frigorifique",
    "5221Z": "Services auxiliaires des transports terrestres",
    "5222Z": "Services auxiliaires des transports par eau",
    "5223Z": "Services auxiliaires des transports aériens",
    "5224A": "Manutention portuaire",
    "5224B": "Manutention non portuaire",
    "5229A": "Messagerie, fret express",
    "5229B": "Affrètement et organisation des transports",
    "5310Z":
      "Activités de poste dans le cadre d'une obligation de service universel",
    "5320Z": "Autres activités de poste et de courrier",
    "5510Z": "Hôtels et hébergement similaire",
    "5520Z": "Hébergement touristique et autre hébergement de courte durée",
    "5530Z":
      "Terrains de camping et parcs pour caravanes ou véhicules de loisirs",
    "5590Z": "Autres hébergements",
    "5610A": "Restauration traditionnelle",
    "5610B": "Cafétérias et autres libres-services",
    "5610C": "Restauration de type rapide",
    "5621Z": "Services des traiteurs",
    "5629A": "Restauration collective sous contrat",
    "5629B": "Autres services de restauration n.c.a.",
    "5630Z": "Débits de boissons",
    "5811Z": "Édition de livres",
    "5812Z": "Édition de répertoires et de fichiers d'adresses",
    "5813Z": "Édition de journaux",
    "5814Z": "Édition de revues et périodiques",
    "5819Z": "Autres activités d'édition",
    "5821Z": "Édition de jeux électroniques",
    "5829A": "Édition de logiciels système et de réseau",
    "5829B": "Édition de logiciels outils de développement et de langages",
    "5829C": "Édition de logiciels applicatifs",
    "5911A": "Production de films et de programmes pour la télévision",
    "5911B": "Production de films institutionnels et publicitaires",
    "5911C": "Production de films pour le cinéma",
    "5912Z":
      "Post-production de films cinématographiques, de vidéo et de programmes de télévision",
    "5913A": "Distribution de films cinématographiques",
    "5913B": "Édition et distribution vidéo",
    "5914Z": "Projection de films cinématographiques",
    "5920Z": "Enregistrement sonore et édition musicale",
    "6010Z": "Édition et diffusion de programmes radio",
    "6020A": "Édition de chaînes généralistes",
    "6020B": "Édition de chaînes thématiques",
    "6110Z": "Télécommunications filaires",
    "6120Z": "Télécommunications sans fil",
    "6130Z": "Télécommunications par satellite",
    "6190Z": "Autres activités de télécommunication",
    "6201Z": "Programmation informatique",
    "6202A": "Conseil en systèmes et logiciels informatiques",
    "6202B": "Tierce maintenance de systèmes et d'applications informatiques",
    "6203Z": "Gestion d'installations informatiques",
    "6209Z": "Autres activités informatiques",
    "6311Z": "Traitement de données, hébergement et activités connexes",
    "6312Z": "Portails Internet",
    "6391Z": "Activités des agences de presse",
    "6399Z": "Autres services d'information n.c.a.",
    "6411Z": "Activités de banque centrale",
    "6419Z": "Autres intermédiations monétaires",
    "6420Z": "Activités des sociétés holding",
    "6430Z": "Fonds de placement et entités financières similaires",
    "6491Z": "Crédit-bail",
    "6492Z": "Autre distribution de crédit",
    "6499Z":
      "Autres activités des services financiers, hors assurance et caisses de retraite, n.c.a.",
    "6511Z": "Assurance vie",
    "6512Z": "Autres assurances",
    "6520Z": "Réassurance",
    "6530Z": "Caisses de retraite",
    "6611Z": "Administration de marchés financiers",
    "6612Z": "Courtage de valeurs mobilières et de marchandises",
    "6619A": "Supports juridiques de gestion de patrimoine mobilier",
    "6619B":
      "Autres activités auxiliaires de services financiers, hors assurance et caisses de retraite, n.c.a.",
    "6621Z": "Évaluation des risques et dommages",
    "6622Z": "Activités des agents et courtiers d'assurances",
    "6629Z":
      "Autres activités auxiliaires d'assurance et de caisses de retraite",
    "6630Z": "Gestion de fonds",
    "6810Z": "Activités des marchands de biens immobiliers",
    "6820A": "Location de logements",
    "6820B": "Location de terrains et d'autres biens immobiliers",
    "6831Z": "Agences immobilières",
    "6832A": "Administration d'immeubles et autres biens immobiliers",
    "6832B": "Supports juridiques de gestion de patrimoine immobilier",
    "6910Z": "Activités juridiques",
    "6920Z": "Activités comptables",
    "7010Z": "Activités des sièges sociaux",
    "7021Z": "Conseil en relations publiques et communication",
    "7022Z": "Conseil pour les affaires et autres conseils de gestion",
    "7111Z": "Activités d'architecture",
    "7112A": "Activité des géomètres",
    "7112B": "Ingénierie, études techniques",
    "7120A": "Contrôle technique automobile",
    "7120B": "Analyses, essais et inspections techniques",
    "7211Z": "Recherche-développement en biotechnologie",
    "7219Z":
      "Recherche-développement en autres sciences physiques et naturelles",
    "7220Z": "Recherche-développement en sciences humaines et sociales",
    "7311Z": "Activités des agences de publicité",
    "7312Z": "Régie publicitaire de médias",
    "7320Z": "Études de marché et sondages",
    "7410Z": "Activités spécialisées de design",
    "7420Z": "Activités photographiques",
    "7430Z": "Traduction et interprétation",
    "7490A": "Activité des économistes de la construction",
    "7490B": "Activités spécialisées, scientifiques et techniques diverses",
    "7500Z": "Activités vétérinaires",
    "7711A":
      "Location de courte durée de voitures et de véhicules automobiles légers",
    "7711B":
      "Location de longue durée de voitures et de véhicules automobiles légers",
    "7712Z": "Location et location-bail de camions",
    "7721Z": "Location et location-bail d'articles de loisirs et de sport",
    "7722Z": "Location de vidéocassettes et disques vidéo",
    "7729Z":
      "Location et location-bail d'autres biens personnels et domestiques",
    "7731Z": "Location et location-bail de machines et équipements agricoles",
    "7732Z":
      "Location et location-bail de machines et équipements pour la construction",
    "7733Z":
      "Location et location-bail de machines de bureau et de matériel informatique",
    "7734Z": "Location et location-bail de matériels de transport par eau",
    "7735Z": "Location et location-bail de matériels de transport aérien",
    "7739Z":
      "Location et location-bail d'autres machines, équipements et biens matériels n.c.a.",
    "7740Z":
      "Location-bail de propriété intellectuelle et de produits similaires, à l'exception des œuvres soumises à copyright",
    "7810Z": "Activités des agences de placement de main-d'œuvre",
    "7820Z": "Activités des agences de travail temporaire",
    "7830Z": "Autre mise à disposition de ressources humaines",
    "7911Z": "Activités des agences de voyage",
    "7912Z": "Activités des voyagistes",
    "7990Z": "Autres services de réservation et activités connexes",
    "8010Z": "Activités de sécurité privée",
    "8020Z": "Activités liées aux systèmes de sécurité",
    "8030Z": "Activités d'enquête",
    "8110Z": "Activités combinées de soutien lié aux bâtiments",
    "8121Z": "Nettoyage courant des bâtiments",
    "8122Z":
      "Autres activités de nettoyage des bâtiments et nettoyage industriel",
    "8129A": "Désinfection, désinsectisation, dératisation",
    "8129B": "Autres activités de nettoyage n.c.a.",
    "8130Z": "Services d'aménagement paysager",
    "8211Z": "Services administratifs combinés de bureau",
    "8219Z":
      "Photocopie, préparation de documents et autres activités spécialisées de soutien de bureau",
    "8220Z": "Activités de centres d'appels",
    "8230Z": "Organisation de foires, salons professionnels et congrès",
    "8291Z":
      "Activités des agences de recouvrement de factures et des sociétés d'information financière sur la clientèle",
    "8292Z": "Activités de conditionnement",
    "8299Z": "Autres activités de soutien aux entreprises n.c.a.",
    "8411Z": "Administration publique générale",
    "8412Z":
      "Administration publique (tutelle) de la santé, de la formation, de la culture et des services sociaux, autre que sécurité sociale",
    "8413Z": "Administration publique (tutelle) des activités économiques",
    "8421Z": "Affaires étrangères",
    "8422Z": "Défense",
    "8423Z": "Justice",
    "8424Z": "Activités d'ordre public et de sécurité",
    "8425Z": "Services du feu et de secours",
    "8430A": "Activités générales de sécurité sociale",
    "8430B": "Gestion des retraites complémentaires",
    "8430C": "Distribution sociale de revenus",
    "8510Z": "Enseignement pré-primaire",
    "8520Z": "Enseignement primaire",
    "8531Z": "Enseignement secondaire général",
    "8532Z": "Enseignement secondaire technique ou professionnel",
    "8541Z": "Enseignement post-secondaire non supérieur",
    "8542Z": "Enseignement supérieur",
    "8551Z": "Enseignement de disciplines sportives et d'activités de loisirs",
    "8552Z": "Enseignement culturel",
    "8553Z": "Enseignement de la conduite",
    "8559A": "Formation continue d'adultes",
    "8559B": "Autres enseignements",
    "8560Z": "Activités de soutien à l'enseignement",
    "8610Z": "Activités hospitalières",
    "8621Z": "Activité des médecins généralistes",
    "8622A": "Activités de radiodiagnostic et de radiothérapie",
    "8622B": "Activités chirurgicales",
    "8622C": "Autres activités des médecins spécialistes",
    "8623Z": "Pratique dentaire",
    "8690A": "Ambulances",
    "8690B": "Laboratoires d'analyses médicales",
    "8690C": "Centres de collecte et banques d'organes",
    "8690D": "Activités des infirmiers et des sages-femmes",
    "8690E":
      "Activités des professionnels de la rééducation, de l'appareillage et des pédicures-podologues",
    "8690F": "Activités de santé humaine non classées ailleurs",
    "8710A": "Hébergement médicalisé pour personnes âgées",
    "8710B": "Hébergement médicalisé pour enfants handicapés",
    "8710C":
      "Hébergement médicalisé pour adultes handicapés et autre hébergement médicalisé",
    "8720A": "Hébergement social pour handicapés mentaux et malades mentaux",
    "8720B": "Hébergement social pour toxicomanes",
    "8730A": "Hébergement social pour personnes âgées",
    "8730B": "Hébergement social pour handicapés physiques",
    "8790A": "Hébergement social pour enfants en difficultés",
    "8790B":
      "Hébergement social pour adultes et familles en difficultés et autre hébergement social",
    "8810A": "Aide à domicile",
    "8810B":
      "Accueil ou accompagnement sans hébergement d'adultes handicapés ou de personnes âgées",
    "8810C": "Aide par le travail",
    "8891A": "Accueil de jeunes enfants",
    "8891B": "Accueil ou accompagnement sans hébergement d'enfants handicapés",
    "8899A":
      "Autre accueil ou accompagnement sans hébergement d'enfants et d'adolescents",
    "8899B": "Action sociale sans hébergement n.c.a.",
    "9001Z": "Arts du spectacle vivant",
    "9002Z": "Activités de soutien au spectacle vivant",
    "9003A": "Création artistique relevant des arts plastiques",
    "9003B": "Autre création artistique",
    "9004Z": "Gestion de salles de spectacles",
    "9101Z": "Gestion des bibliothèques et des archives",
    "9102Z": "Gestion des musées",
    "9103Z":
      "Gestion des sites et monuments historiques et des attractions touristiques similaires",
    "9104Z":
      "Gestion des jardins botaniques et zoologiques et des réserves naturelles",
    "9200Z": "Organisation de jeux de hasard et d'argent",
    "9311Z": "Gestion d'installations sportives",
    "9312Z": "Activités de clubs de sports",
    "9313Z": "Activités des centres de culture physique",
    "9319Z": "Autres activités liées au sport",
    "9321Z": "Activités des parcs d'attractions et parcs à thèmes",
    "9329Z": "Autres activités récréatives et de loisirs",
    "9411Z": "Activités des organisations patronales et consulaires",
    "9412Z": "Activités des organisations professionnelles",
    "9420Z": "Activités des syndicats de salariés",
    "9491Z": "Activités des organisations religieuses",
    "9492Z": "Activités des organisations politiques",
    "9499Z": "Autres organisations fonctionnant par adhésion volontaire",
    "9511Z": "Réparation d'ordinateurs et d'équipements périphériques",
    "9512Z": "Réparation d'équipements de communication",
    "9521Z": "Réparation de produits électroniques grand public",
    "9522Z":
      "Réparation d'appareils électroménagers et d'équipements pour la maison et le jardin",
    "9523Z": "Réparation de chaussures et d'articles en cuir",
    "9524Z": "Réparation de meubles et d'équipements du foyer",
    "9525Z": "Réparation d'articles d'horlogerie et de bijouterie",
    "9529Z": "Réparation d'autres biens personnels et domestiques",
    "9601A": "Blanchisserie-teinturerie de gros",
    "9601B": "Blanchisserie-teinturerie de détail",
    "9602A": "Coiffure",
    "9602B": "Soins de beauté",
    "9603Z": "Services funéraires",
    "9604Z": "Entretien corporel",
    "9609Z": "Autres services personnels n.c.a.",
    "9700Z":
      "Activités des ménages en tant qu'employeurs de personnel domestique",
    "9810Z":
      "Activités indifférenciées des ménages en tant que producteurs de biens pour usage propre",
    "9820Z":
      "Activités indifférenciées des ménages en tant que producteurs de services pour usage propre",
    "9900Z": "Activités des organisations et organismes extraterritoriaux"
  };

  return nomenclatures[code];
};

const getLegalCode = code => {
  const nomenclature = {
    1000: "Entrepreneur individuel",
    2110: "Indivision entre personnes physiques",
    2120: "Indivision avec personne morale",
    2210: "Société créée de fait entre personnes physiques",
    2220: "Société créée de fait avec personne morale",
    2310: "Société en participation entre personnes physiques",
    2320: "Société en participation avec personne morale",
    2385: "Société en participation de professions libérales",
    2400: "Fiducie",
    2700: "Paroisse hors zone concordataire",
    2900: "Autre groupement de droit privé non doté de la personnalité morale",
    3110: "Représentation ou agence commerciale d'état ou organisme public étranger immatriculé au RCS",
    3120: "Société commerciale étrangère immatriculée au RCS",
    3205: "Organisation internationale",
    3210: "État, collectivité ou établissement public étranger",
    3220: "Société étrangère non immatriculée au RCS",
    3290: "Autre personne morale de droit étranger",
    4110: "Établissement public national à caractère industriel ou commercial doté d'un comptable public",
    4120: "Établissement public national à caractère industriel ou commercial non doté d'un comptable public",
    4130: "Exploitant public",
    4140: "Établissement public local à caractère industriel ou commercial",
    4150: "Régie d'une collectivité locale à caractère industriel ou commercial",
    4160: "Institution Banque de France",
    5191: "Société de caution mutuelle",
    5192: "Société coopérative de banque populaire",
    5193: "Caisse de crédit maritime mutuel",
    5194: "Caisse (fédérale) de crédit mutuel",
    5195: "Association coopérative inscrite (droit local Alsace Moselle)",
    5196: "Caisse d'épargne et de prévoyance à forme coopérative",
    5202: "Société en nom collectif",
    5203: "Société en nom collectif coopérative",
    5306: "Société en commandite simple",
    5307: "Société en commandite simple coopérative",
    5308: "Société en commandite par actions",
    5309: "Société en commandite par actions coopérative",
    5370: "Société de Participations Financières de Profession Libérale Société en commandite par actions (SPFPL SCA)",
    5385: "Société d'exercice libéral en commandite par actions",
    5410: "SARL nationale",
    5415: "SARL d'économie mixte",
    5422: "SARL immobilière pour le commerce et l'industrie (SICOMI)",
    5426: "SARL immobilière de gestion",
    5430: "SARL d'aménagement foncier et d'équipement rural (SAFER)",
    5431: "SARL mixte d'intérêt agricole (SMIA)",
    5432: "SARL d'intérêt collectif agricole (SICA)",
    5442: "SARL d'attribution",
    5443: "SARL coopérative de construction",
    5451: "SARL coopérative de consommation",
    5453: "SARL coopérative artisanale",
    5454: "SARL coopérative d'intérêt maritime",
    5455: "SARL coopérative de transport",
    5458: "SARL coopérative ouvrière de production (SCOP)",
    5459: "SARL union de sociétés coopératives",
    5460: "Autre SARL coopérative",
    5470: "Société de Participations Financières de Profession Libérale Société à responsabilité limitée (SPFPL SARL)",
    5485: "Société d'exercice libéral à responsabilité limitée",
    5498: "SARL unipersonnelle",
    5499: "Société à responsabilité limitée (sans autre indication)",
    5505: "SA à participation ouvrière à conseil d'administration",
    5510: "SA nationale à conseil d'administration",
    5515: "SA d'économie mixte à conseil d'administration",
    5520: "Fonds à forme sociétale à conseil d'administration",
    5522: "SA immobilière pour le commerce et l'industrie (SICOMI) à conseil d'administration",
    5525: "SA immobilière d'investissement à conseil d'administration",
    5530: "SA d'aménagement foncier et d'équipement rural (SAFER) à conseil d'administration",
    5531: "Société anonyme mixte d'intérêt agricole (SMIA) à conseil d'administration",
    5532: "SA d'intérêt collectif agricole (SICA) à conseil d'administration",
    5542: "SA d'attribution à conseil d'administration",
    5543: "SA coopérative de construction à conseil d'administration",
    5546: "SA de HLM à conseil d'administration",
    5547: "SA coopérative de production de HLM à conseil d'administration",
    5548: "SA de crédit immobilier à conseil d'administration",
    5551: "SA coopérative de consommation à conseil d'administration",
    5552: "SA coopérative de commerçants-détaillants à conseil d'administration",
    5553: "SA coopérative artisanale à conseil d'administration",
    5554: "SA coopérative (d'intérêt) maritime à conseil d'administration",
    5555: "SA coopérative de transport à conseil d'administration",
    5558: "SA coopérative ouvrière de production (SCOP) à conseil d'administration",
    5559: "SA union de sociétés coopératives à conseil d'administration",
    5560: "Autre SA coopérative à conseil d'administration",
    5570: "Société de Participations Financières de Profession Libérale Société anonyme à conseil d'administration (SPFPL SA à conseil d'administration)",
    5585: "Société d'exercice libéral à forme anonyme à conseil d'administration",
    5599: "SA à conseil d'administration (s.a.i.)",
    5605: "SA à participation ouvrière à directoire",
    5610: "SA nationale à directoire",
    5615: "SA d'économie mixte à directoire",
    5620: "Fonds à forme sociétale à directoire",
    5622: "SA immobilière pour le commerce et l'industrie (SICOMI) à directoire",
    5625: "SA immobilière d'investissement à directoire",
    5630: "Safer anonyme à directoire",
    5631: "SA mixte d'intérêt agricole (SMIA)",
    5632: "SA d'intérêt collectif agricole (SICA)",
    5642: "SA d'attribution à directoire",
    5643: "SA coopérative de construction à directoire",
    5646: "SA de HLM à directoire",
    5647: "Société coopérative de production de HLM anonyme à directoire",
    5648: "SA de crédit immobilier à directoire",
    5651: "SA coopérative de consommation à directoire",
    5652: "SA coopérative de commerçants-détaillants à directoire",
    5653: "SA coopérative artisanale à directoire",
    5654: "SA coopérative d'intérêt maritime à directoire",
    5655: "SA coopérative de transport à directoire",
    5658: "SA coopérative ouvrière de production (SCOP) à directoire",
    5659: "SA union de sociétés coopératives à directoire",
    5660: "Autre SA coopérative à directoire",
    5670: "Société de Participations Financières de Profession Libérale Société anonyme à Directoire (SPFPL SA à directoire)",
    5685: "Société d'exercice libéral à forme anonyme à directoire",
    5699: "SA à directoire (s.a.i.)",
    5710: "SAS, société par actions simplifiée",
    5720: "Société par actions simplifiée à associé unique ou société par actions simplifiée unipersonnelle",
    5770: "Société de Participations Financières de Profession Libérale Société par actions simplifiée (SPFPL SAS)",
    5785: "Société d'exercice libéral par action simplifiée",
    5800: "Société européenne",
    6100: "Caisse d'Épargne et de Prévoyance",
    6210: "Groupement européen d'intérêt économique (GEIE)",
    6220: "Groupement d'intérêt économique (GIE)",
    6316: "Coopérative d'utilisation de matériel agricole en commun (CUMA)",
    6317: "Société coopérative agricole",
    6318: "Union de sociétés coopératives agricoles",
    6411: "Société d'assurance à forme mutuelle",
    6511: "Sociétés Interprofessionnelles de Soins Ambulatoires ",
    6521: "Société civile de placement collectif immobilier (SCPI)",
    6532: "Société civile d'intérêt collectif agricole (SICA)",
    6533: "Groupement agricole d'exploitation en commun (GAEC)",
    6534: "Groupement foncier agricole",
    6535: "Groupement agricole foncier",
    6536: "Groupement forestier",
    6537: "Groupement pastoral",
    6538: "Groupement foncier et rural",
    6539: "Société civile foncière",
    6540: "Société civile immobilière",
    6541: "Société civile immobilière de construction-vente",
    6542: "Société civile d'attribution",
    6543: "Société civile coopérative de construction",
    6544: "Société civile immobilière d' accession progressive à la propriété",
    6551: "Société civile coopérative de consommation",
    6554: "Société civile coopérative d'intérêt maritime",
    6558: "Société civile coopérative entre médecins",
    6560: "Autre société civile coopérative",
    6561: "SCP d'avocats",
    6562: "SCP d'avocats aux conseils",
    6563: "SCP d'avoués d'appel",
    6564: "SCP d'huissiers",
    6565: "SCP de notaires",
    6566: "SCP de commissaires-priseurs",
    6567: "SCP de greffiers de tribunal de commerce",
    6568: "SCP de conseils juridiques",
    6569: "SCP de commissaires aux comptes",
    6571: "SCP de médecins",
    6572: "SCP de dentistes",
    6573: "SCP d'infirmiers",
    6574: "SCP de masseurs-kinésithérapeutes",
    6575: "SCP de directeurs de laboratoire d'analyse médicale",
    6576: "SCP de vétérinaires",
    6577: "SCP de géomètres experts",
    6578: "SCP d'architectes",
    6585: "Autre société civile professionnelle",
    6588: "Société civile laitière",
    6589: "Société civile de moyens",
    6595: "Caisse locale de crédit mutuel",
    6596: "Caisse de crédit agricole mutuel",
    6597: "Société civile d'exploitation agricole",
    6598: "Exploitation agricole à responsabilité limitée",
    6599: "Autre société civile",
    6901: "Autre personne de droit privé inscrite au registre du commerce et des sociétés",
    7111: "Autorité constitutionnelle",
    7112: "Autorité administrative ou publique indépendante",
    7113: "Ministère",
    7120: "Service central d'un ministère",
    7150: "Service du ministère de la Défense",
    7160: "Service déconcentré à compétence nationale d'un ministère (hors Défense)",
    7171: "Service déconcentré de l'État à compétence (inter) régionale",
    7172: "Service déconcentré de l'État à compétence (inter) départementale",
    7179: "(Autre) Service déconcentré de l'État à compétence territoriale",
    7190: "Ecole nationale non dotée de la personnalité morale",
    7210: "Commune et commune nouvelle",
    7220: "Département",
    7225: "Collectivité et territoire d'Outre Mer",
    7229: "(Autre) Collectivité territoriale",
    7230: "Région",
    7312: "Commune associée et commune déléguée",
    7313: "Section de commune",
    7314: "Ensemble urbain",
    7321: "Association syndicale autorisée",
    7322: "Association foncière urbaine",
    7323: "Association foncière de remembrement",
    7331: "Établissement public local d'enseignement",
    7340: "Pôle métropolitain",
    7341: "Secteur de commune",
    7342: "District urbain",
    7343: "Communauté urbaine",
    7344: "Métropole",
    7345: "Syndicat intercommunal à vocation multiple (SIVOM)",
    7346: "Communauté de communes",
    7347: "Communauté de villes",
    7348: "Communauté d'agglomération",
    7349: "Autre établissement public local de coopération non spécialisé ou entente",
    7351: "Institution interdépartementale ou entente",
    7352: "Institution interrégionale ou entente",
    7353: "Syndicat intercommunal à vocation unique (SIVU)",
    7354: "Syndicat mixte fermé",
    7355: "Syndicat mixte ouvert",
    7356: "Commission syndicale pour la gestion des biens indivis des communes",
    7357: "Pôle d'équilibre territorial et rural (PETR)",
    7361: "Centre communal d'action sociale",
    7362: "Caisse des écoles",
    7363: "Caisse de crédit municipal",
    7364: "Établissement d'hospitalisation",
    7365: "Syndicat inter hospitalier",
    7366: "Établissement public local social et médico-social",
    7367: "Centre Intercommunal d'action sociale (CIAS)",
    7371: "Office public d'habitation à loyer modéré (OPHLM)",
    7372: "Service départemental d'incendie et de secours (SDIS)",
    7373: "Établissement public local culturel",
    7378: "Régie d'une collectivité locale à caractère administratif",
    7379: "(Autre) Établissement public administratif local",
    7381: "Organisme consulaire",
    7382: "Établissement public national ayant fonction d'administration centrale",
    7383: "Établissement public national à caractère scientifique culturel et professionnel",
    7384: "Autre établissement public national d'enseignement",
    7385: "Autre établissement public national administratif à compétence territoriale limitée",
    7389: "Établissement public national à caractère administratif",
    7410: "Groupement d'intérêt public (GIP)",
    7430: "Établissement public des cultes d'Alsace-Lorraine",
    7450: "Etablissement public administratif, cercle et foyer dans les armées",
    7470: "Groupement de coopération sanitaire à gestion publique",
    7490: "Autre personne morale de droit administratif",
    8110: "Régime général de la Sécurité Sociale",
    8120: "Régime spécial de Sécurité Sociale",
    8130: "Institution de retraite complémentaire",
    8140: "Mutualité sociale agricole",
    8150: "Régime maladie des non-salariés non agricoles",
    8160: "Régime vieillesse ne dépendant pas du régime général de la Sécurité Sociale",
    8170: "Régime d'assurance chômage",
    8190: "Autre régime de prévoyance sociale",
    8210: "Mutuelle",
    8250: "Assurance mutuelle agricole",
    8290: "Autre organisme mutualiste",
    8310: "Comité central d'entreprise",
    8311: "Comité d'établissement",
    8410: "Syndicat de salariés",
    8420: "Syndicat patronal",
    8450: "Ordre professionnel ou assimilé",
    8470: "Centre technique industriel ou comité professionnel du développement économique",
    8490: "Autre organisme professionnel",
    8510: "Institution de prévoyance",
    8520: "Institution de retraite supplémentaire",
    9110: "Syndicat de copropriété",
    9150: "Association syndicale libre",
    9210: "Association non déclarée",
    9220: "Association déclarée",
    9221: "Association déclarée d'insertion par l'économique",
    9222: "Association intermédiaire",
    9223: "Groupement d'employeurs",
    9224: "Association d'avocats à responsabilité professionnelle individuelle",
    9230: "Association déclarée, reconnue d'utilité publique",
    9240: "Congrégation",
    9260: "Association de droit local (Bas-Rhin, Haut-Rhin et Moselle)",
    9300: "Fondation",
    9900: "Autre personne morale de droit privé",
    9970: "Groupement de coopération sanitaire à gestion privée"
  };

  return nomenclature[code] || "N/A";
};

const formatEtab = etab => {
  const getAdresseComponent = adresse => {
    return (
      adresse && {
        numero_voie: adresse.numeroVoieEtablissement,
        indice_repetition: adresse.indiceRepetitionEtablissement,
        type_voie: adresse.typeVoieEtablissement,
        nom_voie: adresse.libelleVoieEtablissement,
        complement_adresse: adresse.complementAdresseEtablissement,
        code_postal: adresse.codePostalEtablissement,
        code_insee_localite: adresse.codeCommuneEtablissement,
        localite: adresse.libelleCommuneEtablissement
      }
    );
  };

  const fields = [
    "siret",
    {
      in: "periodesEtablissement[0].etatAdministratifEtablissement",
      out: "actif",
      callback: etat => etat && etat === "A"
    },
    {
      in: "periodesEtablissement[0].etatAdministratifEtablissement",
      out: "etat_etablissement"
    },
    {
      in: "periodesEtablissement[0].dateDebut",
      out: "date_fin"
    },
    {
      in: "dateDernierTraitementEtablissement",
      out: "date_dernier_traitement_etablissement"
    },
    "enseigne",
    {
      in: "uniteLegale.activitePrincipaleUniteLegale",
      out: "naf"
    },
    {
      in: "uniteLegale.activitePrincipaleUniteLegale",
      out: "libelle_naf",
      callback: activite =>
        utils.isEmpty(activite) ? undefined : getNAF(activite.replace(".", ""))
    },
    {
      in: "uniteLegale.activitePrincipaleUniteLegale",
      out: "activite",
      callback: (naf, etablissement) =>
        utils.isEmpty(naf)
          ? undefined
          : `${naf} - ${getNAF(naf.replace(".", ""))}`
    },
    {
      in: "etablissementSiege",
      out: "siege_social"
    },
    {
      in: "etablissementSiege",
      out: "categorie_etablissement",
      callback: siege_social =>
        siege_social ? "Siège social" : "Établissement secondaire"
    },
    {
      in: "dateCreationEtablissement",
      out: "date_creation"
    },
    {
      in: "trancheEffectifsEtablissement",
      out: "tranche_effectif_insee"
    },
    {
      in: "anneeEffectifsEtablissement",
      out: "annee_tranche_effectif_insee"
    },
    {
      in: "adresseEtablissement",
      out: "adresse_components",
      callback: adresse => {
        const adresseComponent = getAdresseComponent(adresse);
        return utils.isEmpty(adresseComponent) ? undefined : adresseComponent;
      }
    },
    {
      in: "adresseEtablissement",
      out: "adresse",
      callback: adresse => {
        const adresseComponent = getAdresseComponent(adresse);
        return utils.isEmpty(adresseComponent)
          ? undefined
          : utils.getCleanAddress(adresseComponent);
      }
    },
    {
      in: "periodesEtablissement[0].caractereEmployeurEtablissement",
      out: "etablissement_employeur"
    }
  ];
  return typeof etab === "object" ? getData(etab, fields) : {};
};

const formatEnt = async (ent, params) => {
  const fields = [
    "siren",
    {
      in: "periodesUniteLegale[0].denominationUniteLegale",
      out: "raison_sociale"
    },
    { in: "sigleUniteLegale", out: "sigle" },
    { in: "periodesUniteLegale[0]nomUniteLegale", out: "nom" },
    {
      in: "prenom1UniteLegale",
      out: "prenom",
      callback: (p1, ent) =>
        utils.isEmpty(
          [
            ent.prenom1UniteLegale,
            ent.prenom2UniteLegale,
            ent.prenom3UniteLegale,
            ent.prenom4UniteLegale
          ]
            .filter(a => a)
            .join(" ")
        )
          ? undefined
          : [
              ent.prenom1UniteLegale,
              ent.prenom2UniteLegale,
              ent.prenom3UniteLegale,
              ent.prenom4UniteLegale
            ]
              .filter(a => a)
              .join(" ")
    },
    {
      in: "periodesUniteLegale[0].nomUsageUniteLegale",
      out: "nom_commercial"
    },
    {
      in: "categorieEntreprise",
      out: "categorie_entreprise"
    },
    {
      in: "periodesUniteLegale[0]",
      out: "siret_siege_social",
      defaultValue: {},
      callback: (uniteLegale, ent) =>
        utils.isEmpty(ent.siren) ||
        utils.isEmpty(uniteLegale.nicSiegeUniteLegale)
          ? undefined
          : `${ent.siren}${uniteLegale.nicSiegeUniteLegale}`
    },
    {
      in: "periodesUniteLegale[0].categorieJuridiqueUniteLegale",
      out: "categorie_juridique",
      callback: category =>
        utils.isEmpty(category) ? undefined : getLegalCode(category)
    },
    {
      in: "periodesUniteLegale[0].categorieJuridiqueUniteLegale",
      out: "categorie_juridique_code"
    },
    {
      in: "periodesUniteLegale[0].activitePrincipaleUniteLegale",
      out: "naf"
    },
    {
      in: "periodesUniteLegale[0].activitePrincipaleUniteLegale",
      out: "libelle_naf",
      callback: async naf => await getLibelleNaf(naf, params)
    },
    {
      in: "dateCreationUniteLegale",
      out: "date_de_creation"
    },
    {
      in: "periodesUniteLegale[0].etatAdministratifUniteLegale",
      out: "etat_entreprise"
    },
    {
      in: "periodesUniteLegale[0]",
      out: "date_mise_a_jour",
      defaultValue: {},
      callback: (uniteLegale, ent) =>
        uniteLegale.etatAdministratifUniteLegale === "C"
          ? uniteLegale.dateFin
          : ent.dateDernierTraitementUniteLegale
    },
    {
      in: "periodesUniteLegale[0].dateFin",
      out: "date_de_radiation"
    },
    {
      in: "periodesUniteLegale[0].caractereEmployeurUniteLegale",
      out: "entreprise_employeur"
    },
    {
      in: "anneeEffectifsUniteLegale",
      out: "annee_tranche_effectif"
    },
    {
      in: "trancheEffectifsUniteLegale",
      out: "tranche_effectif"
    }
  ];

  return typeof ent === "object" ? await getData(ent, fields) : {};
};

const getLibelleNaf = async (codeNaf, params) => {
  const Axios = axios.create({
    baseURL:
      "https://api.insee.fr/metadonnees/nomenclatures/v1/codes/nafr2/sousClasse/",
    timeout: 5000
  });
  params.timeout = 5000;

  return await utils
    .requestAPI(Axios, `${codeNaf}`, params)
    .then(data => (utils.isEmpty(data.intitule) ? undefined : data.intitule));
};

export default {
  getNAF,
  getLegalCode,
  formatEtab,
  formatEnt
};
