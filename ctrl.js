angular.module("application", ['jdewit'])
.controller("ctrl", ['$scope', function ($scope) {

  $scope.alias = []
  for (var i = 0; i < 100; i++) {
    $scope.alias.push({
      id: i
    });
  }

  $scope.aliasSearch = [{ "c": { "i": 1, "n": "ABB", "e": 0 }, "b": { "i": 21725, "n": "Marine", "e": 0 } }, { "c": { "i": 3, "n": "Expired Allergan, Inc. ARI (877)246-3533", "e": 1 }, "b": { "i": 3, "n": "Expired Allergan, Inc. ARI (877)246-3533", "e": 1 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 384, "n": "ARI - General", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 4163, "n": "0107 - Follett Corp. Please send back to ARI", "e": 1 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 10760, "n": "0B12 - Mastec**Refer Back To ARI**", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9728, "n": "0G03 - MasTec **Refer Back To ARI**", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 8492, "n": "0G76 - Consumer HealthCare (ARI GSK)", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9390, "n": "0G92 - HSS,Inc DOES NOT USE CEI PASS BACK TO ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9642, "n": "0J88 - Union Pacific Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 5499, "n": "0P48 - KELLOGG CARIBBEAN SERVICE", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 22103, "n": "0R68 - CNH America LLC Case New Holland Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 22109, "n": "1C13 - CNH America LLC Case New Holland Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 22110, "n": "1C86 - CNH America LLC Case New Holland Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 8024, "n": "1E14 - MasTec**Refer Back To ARI**", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 5519, "n": "1P07 - Kellogg Caribbean Service", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 31086, "n": "1P47 - L\u0027Oreal Caribe PR", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 22111, "n": "2B54 - CNH America LLC Case New Holland Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 385, "n": "2C21 - Bandag Do Not Process, send back to ARI", "e": 1 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 17693, "n": "2P36 - L\u0027Oreal Caribe PR", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 6987, "n": "2P53 - J \u0026 J Medical Caribbean", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 22112, "n": "2T72 - CNH America LLC Case New Holland Please send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 8673, "n": "5A89 - St. Jude Children\u0027s Hospital - ALS Charities", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 14479, "n": "5AK7 - Tetra Compresso CEI does not handle - Back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 14480, "n": "5AM2 - Tetra CEI does not handle - Back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 2539, "n": "5C23 - State of Wisconsin STOP DO NOT Process send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 244, "n": "5C95 - State of GA STOP Do Not Process, back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 4237, "n": "5D58 - Equi Utilities - Do Not Process send to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 6270, "n": "5F25 - State of GA STOP Do Not Process Back 2 ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9066, "n": "5G35 - HSS DOES NOT USE CEI PASS BACK TO ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 23338, "n": "5J69 - Children and Family Services - NO CEI back to ARI", "e": 1 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 14349, "n": "5P20 - Kraft Foods Caricam", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9045, "n": "5U37 - State of MD STOP Do Not Process, Back 2 ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 21522, "n": "5U95 - MasTec**Refer Back To ARI**", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 8153, "n": "5V31 - City of NY STOP Do Not Process Back 2 ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 9746, "n": "5Z30 - G and K Services - Send back to ARI", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 190, "n": "7069 - Marigold Foods", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 191, "n": "Mary Kay Cosmetics c/o ARI", "e": 1 } }, { "c": { "i": 6, "n": "ARI - NO GLASS CLAIMS", "e": 0 }, "b": { "i": 392, "n": "marigolds foods", "e": 1 } }, { "c": { "i": 7, "n": "Ashland", "e": 0 }, "b": { "i": 468, "n": "Drew Marine", "e": 1 } }, { "c": { "i": 38, "n": "FedExKinkos Office and Print Services, Inc. *Do not Take reports by Phone except tows*Refer to: 800-322-5600 **glass only to ARI**.", "e": 0 }, "b": { "i": 38, "n": "FedExKinkos Office and Print Services, Inc. *Do not Take reports by Phone except tows*Refer to: 800-322-5600 **glass only to ARI**.", "e": 0 } }, { "c": { "i": 41, "n": "Mettler-Toledo, Inc.", "e": 1 }, "b": { "i": 1216, "n": "OH, WORTHINGTON (PLANT) 1900 POLARIS PWKY           LOC#2005", "e": 0 } }, { "c": { "i": 41, "n": "Mettler-Toledo, Inc.", "e": 1 }, "b": { "i": 1217, "n": "OH, WORTHINGTON (SALES) 1900 POLARIS PWKY           LOC#3390", "e": 0 } }, { "c": { "i": 53, "n": "Saint Gobain Corporation", "e": 1 }, "b": { "i": 519, "n": "Etobicoke, Ontario CN - 6207", "e": 1 } }, { "c": { "i": 54, "n": "Salvation Army", "e": 0 }, "b": { "i": 1551, "n": "Ontario Corps", "e": 0 } }, { "c": { "i": 54, "n": "Salvation Army", "e": 0 }, "b": { "i": 1613, "n": "Santa Maria Corps", "e": 0 } }, { "c": { "i": 65, "n": "inVentiv Commercial Services", "e": 0 }, "b": { "i": 32018, "n": "Aeterrna Zentaris", "e": 0 } }, { "c": { "i": 65, "n": "inVentiv Commercial Services", "e": 0 }, "b": { "i": 23412, "n": "Resource Solutions Temporaries", "e": 0 } }, { "c": { "i": 632, "n": "Expired NiSource", "e": 1 }, "b": { "i": 643, "n": "32KY012627 PARIS AREA", "e": 1 } }, { "c": { "i": 632, "n": "Expired NiSource", "e": 1 }, "b": { "i": 649, "n": "34NR021121 AREA OFFICE MARITIME", "e": 1 } }, { "c": { "i": 632, "n": "Expired NiSource", "e": 1 }, "b": { "i": 668, "n": "34SR041331 MARION AREA", "e": 1 } }, { "c": { "i": 632, "n": "Expired NiSource", "e": 1 }, "b": { "i": 723, "n": "38VA083880 PEARISBURG,VA", "e": 1 } }, { "c": { "i": 632, "n": "Expired NiSource", "e": 1 }, "b": { "i": 803, "n": "51CO616261 MARIETTA COMP STAT", "e": 1 } }, { "c": { "i": 1860, "n": "Charter Communications", "e": 0 }, "b": { "i": 4649, "n": "Sault Ste. Marie, MI - MI8510105", "e": 1 } }, { "c": { "i": 1860, "n": "Charter Communications", "e": 0 }, "b": { "i": 4676, "n": "Faribault, MN - MN8510507", "e": 1 } }, { "c": { "i": 1860, "n": "Charter Communications", "e": 0 }, "b": { "i": 5129, "n": "Marion, NC - NC3920200", "e": 1 } }, { "c": { "i": 1860, "n": "Charter Communications", "e": 0 }, "b": { "i": 4929, "n": "Marietta, OH - OH7110203", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 4381, "n": "003643 - ASTARIS LLC", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 5640, "n": "103913 - Religious Sisters  Of Charity", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 5758, "n": "107744 - PMC, INC., And Subsidiaries", "e": 0 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 6245, "n": "003945 - GE Instrumentarium", "e": 0 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 6373, "n": "003981 - St Paul Fire \u0026 Marine Please refer drivers to 1-800-832-7839", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 8035, "n": "008270 - Mariner Post-Acute Network, Inc.", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 31848, "n": "007223 - Mercury Marine Group", "e": 0 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 1912, "n": "004502 - A.M. CASTLE \u0026 CO. \u0026 SUBSIDIARIES", "e": 0 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 4512, "n": "826684 - FirstOntario Credit Union Limited", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 7097, "n": "003411 - Aventis Pharma (Send drivers to ARI Canada 1-877-274-2262)", "e": 1 } }, { "c": { "i": 1905, "n": "Element", "e": 0 }, "b": { "i": 8173, "n": "007014 - Autoshare Car Sharing Network, Inc.", "e": 0 } }, { "c": { "i": 2524, "n": "Fleet Sure", "e": 0 }, "b": { "i": 7903, "n": "Clarins USA, Inc. (0)", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 8148, "n": "NSS Net ARI", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 8150, "n": "NSS Net General ARI", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35231, "n": "0201 - ONTARIO", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35248, "n": "0201 - ONTARIO", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35264, "n": "576510 - SANTA MARIA", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35266, "n": "020110 - ONTARIO", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35269, "n": "651611 - ONTARIO PHILADELPHIA ST", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35389, "n": "576510 - SANTA MARIA", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35391, "n": "020110 - ONTARIO", "e": 0 } }, { "c": { "i": 2582, "n": "NSS Corporation", "e": 0 }, "b": { "i": 35394, "n": "651611 - ONTARIO PHILADELPHIA ST", "e": 0 } }, { "c": { "i": 2591, "n": "PPG Industries, Inc.", "e": 0 }, "b": { "i": 8207, "n": "Protective \u0026 Marine Coating", "e": 1 } }, { "c": { "i": 2591, "n": "PPG Industries, Inc.", "e": 0 }, "b": { "i": 31007, "n": "Protective and Marine Coatings-CANADA", "e": 1 } }, { "c": { "i": 2766, "n": "Frito Lay", "e": 1 }, "b": { "i": 3231, "n": "39990 - Arizona Service Center Reg. Whse.", "e": 1 } }, { "c": { "i": 2766, "n": "Frito Lay", "e": 1 }, "b": { "i": 3090, "n": "43878 - Amarillo Fac.", "e": 1 } }, { "c": { "i": 2766, "n": "Frito Lay", "e": 1 }, "b": { "i": 3264, "n": "49992 - Arizona Service Center Fac.", "e": 1 } }, { "c": { "i": 3750, "n": "TransportAction", "e": 1 }, "b": { "i": 6893, "n": "Sumitomo Marine \u0026 Fire Inc", "e": 1 } }, { "c": { "i": 4523, "n": "ARI Insurance", "e": 1 }, "b": { "i": 4523, "n": "ARI Insurance", "e": 1 } }, { "c": { "i": 6409, "n": "Diamond Glass, Inc.-EXPIRED", "e": 1 }, "b": { "i": 6673, "n": "MARIETTA", "e": 0 } }, { "c": { "i": 6409, "n": "Diamond Glass, Inc.-EXPIRED", "e": 1 }, "b": { "i": 6644, "n": "ONTARIO", "e": 0 } }, { "c": { "i": 6767, "n": "Nalco", "e": 1 }, "b": { "i": 6829, "n": "Nalco - Corp Code:01 FLEET:008469 GROUP/DIVISION:CARIBB", "e": 1 } }, { "c": { "i": 7389, "n": "CitiCorp", "e": 1 }, "b": { "i": 7421, "n": "CitiCorp - Corp Code:01 CUSTOMER:199004 LEVEL 2:MARINE", "e": 1 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 23997, "n": "576510 - Santa Maria (Consumer Rtl)", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 24005, "n": "623310 - Faribault (Consumer Rtl)", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 24142, "n": "020110 - Ontario (Consumer Rtl)", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 24190, "n": "512910 - Marietta/hwy 41 Rentl Mt (Consumer Rtl)", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 35100, "n": "651611 - ONTARIO PHILADELPHIA ST (Consumer Rtl)", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 9297, "n": "3156 - WP DCM-RDC/ONTARIO CA", "e": 1 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 9332, "n": "4362 - WP DCC-IB/MARION OH", "e": 0 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 34623, "n": "020110 - Ontario (Commercial Rtl)", "e": 1 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 34859, "n": "512910 - Marietta/hwy 41 Rentl Mt (Commercial Rtl)", "e": 1 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 34898, "n": "576510 - Santa Maria (Commercial Rtl)", "e": 1 } }, { "c": { "i": 7901, "n": "Penske", "e": 0 }, "b": { "i": 34914, "n": "623310 - Faribault (Commercial Rtl)", "e": 1 } }, { "c": { "i": 9860, "n": "WheelTime", "e": 1 }, "b": { "i": 10703, "n": "Raritan Valley Bus Service", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16690, "n": "One Arizona Center", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16691, "n": "Arizona Center", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16540, "n": "Marina Greens Park", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16548, "n": "Aquarium", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 15274, "n": "Marin County Parks", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 17141, "n": "Larimer Square", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 17336, "n": "Black Point Marina", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 17337, "n": "Crandon Park Marina", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 15013, "n": "Mandarian Oriental - Chicago", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 17221, "n": "123 Marietta-Carell Atl RECLASS from 150", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 17007, "n": "Ontario Garage", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16051, "n": "St. Ann/Marie Antoinette Hotel Valet", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 15375, "n": "25 Varick Street", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 15389, "n": "The Claridge House", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 14645, "n": "Marine Garage (HSBC)", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 14603, "n": "ARIA Langhorne", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 14633, "n": "Rittenhouse Claridge", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 16303, "n": "Valarium", "e": 0 } }, { "c": { "i": 14476, "n": "Central Parking Systems", "e": 0 }, "b": { "i": 15209, "n": "Marion \u0026 Minor Garage", "e": 0 } }, { "c": { "i": 20507, "n": "Crawford \u0026 Company", "e": 0 }, "b": { "i": 24884, "n": "SJFM - Sompo Japan Fire \u0026 Marine *", "e": 0 } }, { "c": { "i": 20507, "n": "Crawford \u0026 Company", "e": 0 }, "b": { "i": 25037, "n": "Samsung Fire and Marine Insurance Company", "e": 0 } }, { "c": { "i": 20781, "n": "AstraZeneca Canada", "e": 0 }, "b": { "i": 23335, "n": "156131 - Ontario RMM", "e": 0 } }, { "c": { "i": 22589, "n": "Ingersoll Rand", "e": 0 }, "b": { "i": 22837, "n": "USVARI02: Richmond VA  540 Southlake", "e": 1 } }, { "c": { "i": 23568, "n": "Troy Life and Fire Safety Ltd.", "e": 1 }, "b": { "i": 23571, "n": "Troy Life and Fire Safety Ltd. - Corp Code:67 CUSTOMER:009831 LEVEL 2:MARINE", "e": 1 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 26271, "n": "Fleet: 057412-Garlock Bearings Division", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 29293, "n": "Account: 57412-Garlock Bearings Division", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27492, "n": "Account: 58276-KLF-Ontario", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 26042, "n": "Fleet: 072685-Arizona 4430", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28057, "n": "Account: 72685-Arizona 4430", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 25996, "n": "Fleet: 003209-BARI", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 25593, "n": "Ikaria - 2527", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 25927, "n": "Fleet: 002425-Ikaria Field Sales", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 26028, "n": "Fleet: 002426-Ikaria Medical Affairs", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 26154, "n": "Fleet: 002427-Ikaria Trucks", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27479, "n": "Account: 2425-Ikaria West Region", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27480, "n": "Account: 2426-Ikaria Central Region", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27481, "n": "Account: 2427-Ikaria East Region", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27482, "n": "Account: 2428-Ikaria South Region", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27483, "n": "Account: 2429-Ikaria NAM Region", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 27940, "n": "Account: 2431-Ikaria Medical Affairs", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28843, "n": "Account: 2432-Ikaria Atlanta RSC", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28844, "n": "Account: 2433-Ikaria Chicago RSC", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28845, "n": "Account: 2434-Ikaria Dallas RSC", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28846, "n": "Account: 2435-Ikaria Los Angelos RSC", "e": 1 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28847, "n": "Account: 2436-Ikaria New Jersey RSC", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28848, "n": "Account: 2437-Ikaria Port Allen RSC", "e": 1 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 28849, "n": "Account: 2438-Ikaria San Fran RSC", "e": 0 } }, { "c": { "i": 25539, "n": "Donlen", "e": 0 }, "b": { "i": 31579, "n": "Account: 2439-Ikaria Mid-Atlantic", "e": 0 } }, { "c": { "i": 31489, "n": "McDonald\u0027s Corporation", "e": 0 }, "b": { "i": 31995, "n": "CARIBBEAN", "e": 1 } }];
  
  $scope.clients = [{ "key": 1, "value": "ABB", "e": 0, "c": 24 }, { "key": 2, "value": "Alcon Laboratories", "e": 1, "c": 11 }, { "key": 3, "value": "Expired Allergan, Inc. ARI (877)246-3533", "e": 1, "c": 17 }, { "key": 4, "value": "Alro Steel Corporation", "e": 0, "c": 5 }, { "key": 5, "value": "Apple Computer Inc.", "e": 1, "c": 4 }, { "key": 6, "value": "ARI - NO GLASS CLAIMS", "e": 0, "c": 760 }, { "key": 7, "value": "Ashland", "e": 0, "c": 37 }, { "key": 8, "value": "Avery Dennison - expired 2006", "e": 1, "c": 8 }, { "key": 11, "value": "Expired George Weston Bakeries  GE", "e": 1, "c": 7 }, { "key": 12, "value": "Biogen-Old (do not use)", "e": 1, "c": 2 }, { "key": 13, "value": "Bristol-Myers Squibb Company", "e": 0, "c": 12 }, { "key": 14, "value": "BTR/Invensys Inc.", "e": 1, "c": 2 }, { "key": 16, "value": "CUNA", "e": 1, "c": 5 }, { "key": 17, "value": "Expired DeLaval Inc", "e": 1, "c": 4 }, { "key": 18, "value": "Donlen Corporation (Do Not Use 2014-04-07)", "e": 1, "c": 62 }, { "key": 21, "value": "Ecolab Inc.", "e": 1, "c": 32 }, { "key": 22, "value": "Expired Ecolab Pest Elimination Div.", "e": 1, "c": 2 }, { "key": 23, "value": "Emkay Leasing Inc.", "e": 1, "c": 3 }, { "key": 24, "value": "Enterprise Fleets Inc.", "e": 1, "c": 2 }, { "key": 25, "value": "Equilon Enterprises LLC", "e": 1, "c": 2 }, { "key": 26, "value": "Shell Oil Products US-Refer Calls to Wheels at 877-888-8909", "e": 1, "c": 41 }, { "key": 27, "value": "Ericsson Inc.", "e": 1, "c": 76 }, { "key": 28, "value": "Experian Information Solutions", "e": 1, "c": 5 }, { "key": 29, "value": "FM Global", "e": 0, "c": 35 }, { "key": 30, "value": "Formica Corporation", "e": 1, "c": 2 }, { "key": 31, "value": "Expired Getronics Send to LeasePlan", "e": 1, "c": 6 }, { "key": 32, "value": "GlaxoSmithKline", "e": 0, "c": 3 }, { "key": 33, "value": "Expired Gordon Food Srv", "e": 1, "c": 3 }, { "key": 34, "value": "Handleman Company", "e": 1, "c": 18 }, { "key": 35, "value": "Harcourt Brace \u0026 Company", "e": 1, "c": 19 }, { "key": 36, "value": "House Account", "e": 1, "c": 2 }, { "key": 37, "value": "Iron Mountain*Do Not Take Report by Phone*", "e": 0, "c": 6 }, { "key": 38, "value": "FedExKinkos Office and Print Services, Inc. *Do not Take reports by Phone except tows*Refer to: 800-322-5600 **glass only to ARI**.", "e": 0, "c": 2 }, { "key": 39, "value": "Laboratory Corporation of America", "e": 1, "c": 31 }, { "key": 40, "value": "Expired Lease Plan USA", "e": 1, "c": 24 }, { "key": 41, "value": "Mettler-Toledo, Inc.", "e": 1, "c": 70 }, { "key": 42, "value": "EMD Millipore", "e": 1, "c": 7 }, { "key": 43, "value": "Modine Manufacturing Company", "e": 0, "c": 2 }, { "key": 44, "value": "Motiva Car Wash (3rd Party)", "e": 1, "c": 3 }, { "key": 45, "value": "NEC Technologies, Inc.", "e": 1, "c": 2 }, { "key": 46, "value": "CEI Internal Access Account", "e": 0, "c": 2 }, { "key": 47, "value": "OneSource", "e": 1, "c": 2 }, { "key": 48, "value": "Pfizer-Old  (DO NOT TAKE-REFER TO 888-391-8775)", "e": 1, "c": 134 }, { "key": 49, "value": "Playtex refer to PHH 800-446-7052", "e": 1, "c": 4 }, { "key": 52, "value": "Weston Solutions, Inc", "e": 1, "c": 2 }, { "key": 53, "value": "Saint Gobain Corporation", "e": 1, "c": 48 }, { "key": 54, "value": "Salvation Army", "e": 0, "c": 594 }, { "key": 55, "value": "Servicemaster", "e": 1, "c": 3 }, { "key": 56, "value": "SimplexGrinnell", "e": 1, "c": 3 }, { "key": 57, "value": "Solvay America Inc.", "e": 1, "c": 2 }, { "key": 58, "value": "Syngenta Corp.", "e": 1, "c": 16 }, { "key": 60, "value": "Gap", "e": 0, "c": 10 }, { "key": 61, "value": "Expired The Stanley Works EMKY 888-576-0107", "e": 1, "c": 33 }, { "key": 62, "value": "Bright House Networks", "e": 1, "c": 2 }, { "key": 63, "value": "Ultramar Diamond Shamrock Corp.", "e": 1, "c": 2 }, { "key": 64, "value": "Union Pacific Railroad", "e": 1, "c": 3 }, { "key": 65, "value": "inVentiv Commercial Services", "e": 0, "c": 254 }, { "key": 66, "value": "VPSI Inc.", "e": 1, "c": 4 }, { "key": 67, "value": "Washington State Patrol", "e": 0, "c": 2 }, { "key": 68, "value": "Watchtower of New York", "e": 0, "c": 4 }, { "key": 69, "value": "Waters Corporation", "e": 0, "c": 2 }, { "key": 70, "value": "Expired Xerium", "e": 1, "c": 4 }, { "key": 459, "value": "Lonza, Inc.", "e": 1, "c": 0 }, { "key": 460, "value": "Amalgamated Life Insurance", "e": 1, "c": 0 }, { "key": 461, "value": "AMSCO School Publications Inc.", "e": 1, "c": 0 }, { "key": 484, "value": "Associates Global Systems Inc.", "e": 1, "c": 0 }, { "key": 546, "value": "BellSouth", "e": 0, "c": 2 }, { "key": 629, "value": "Carmelite Sisters of the Most Sacred Heart of Los Angeles", "e": 1, "c": 0 }, { "key": 630, "value": "Ceramic World Inc.", "e": 1, "c": 0 }, { "key": 631, "value": "Charles J O Donnell", "e": 1, "c": 0 }, { "key": 632, "value": "Expired NiSource", "e": 1, "c": 23 }, { "key": 932, "value": "Crum \u0026 Forster Insurance", "e": 0, "c": 7 }, { "key": 935, "value": "Enterprise Rent-a-Car", "e": 1, "c": 0 }, { "key": 1062, "value": "Exide Technologies Inc.", "e": 1, "c": 2 }, { "key": 1084, "value": "Follett Higher Education Group", "e": 1, "c": 0 }, { "key": 1085, "value": "Frederick Wildman \u0026 Sons LTD", "e": 0, "c": 0 }, { "key": 1114, "value": "Joseph T. Ryerson \u0026 Son Inc.", "e": 1, "c": 14 }, { "key": 1142, "value": "Lavita Industries", "e": 1, "c": 0 }, { "key": 1143, "value": "L\u0027Eggs Products", "e": 1, "c": 19 }, { "key": 1163, "value": "Lenox Inc.", "e": 1, "c": 0 }, { "key": 1164, "value": "Magnum Leasing", "e": 1, "c": 0 }, { "key": 1165, "value": "Med-Part Division of Health Care Eqpt and Parts Company", "e": 1, "c": 0 }, { "key": 1235, "value": "Murray Rosof", "e": 1, "c": 0 }, { "key": 1236, "value": "NEC America Inc.", "e": 1, "c": 0 }, { "key": 1239, "value": "Prospect Park Nursing Home Inc.", "e": 1, "c": 0 }, { "key": 1240, "value": "Quest Diagnostics", "e": 1, "c": 2 }, { "key": 1256, "value": "Dow Reichhold Chemicals Inc.", "e": 1, "c": 1 }, { "key": 1257, "value": "RH Donnelly", "e": 1, "c": 0 }, { "key": 1258, "value": "Rockwell", "e": 0, "c": 5 }, { "key": 1265, "value": "Rockwell Collins", "e": 1, "c": 27 }, { "key": 1291, "value": "Sappi / S.D. Warren Company", "e": 1, "c": 0 }, { "key": 1292, "value": "Sinclair Operating Company", "e": 1, "c": 0 }, { "key": 1304, "value": "Speedmark Transportation", "e": 1, "c": 0 }, { "key": 1305, "value": "DeLaval", "e": 1, "c": 19 }, { "key": 1324, "value": "The AMI Leasing Companies", "e": 1, "c": 0 }, { "key": 1325, "value": "Quaker Oats Company", "e": 1, "c": 0 }, { "key": 1716, "value": "United Service Workers of America", "e": 1, "c": 0 }, { "key": 1727, "value": "Why-weight", "e": 1, "c": 0 }, { "key": 1742, "value": "Pfizer", "e": 1, "c": 10 }, { "key": 1836, "value": "Expired WaSMP", "e": 1, "c": 0 }, { "key": 1860, "value": "Charter Communications", "e": 0, "c": 30 }, { "key": 1878, "value": "Galderma", "e": 0, "c": 5 }, { "key": 1905, "value": "Element", "e": 0, "c": 4 }, { "key": 2523, "value": "Procter \u0026 Gamble - Clairol Division", "e": 1, "c": 0 }, { "key": 2524, "value": "Fleet Sure", "e": 0, "c": 91 }, { "key": 2542, "value": "Ryan Herco Products Corporation", "e": 1, "c": 0 }, { "key": 2548, "value": "ARAMARK", "e": 1, "c": 2 }, { "key": 2561, "value": "State of Washington", "e": 1, "c": 5 }, { "key": 2572, "value": "Mykrolis", "e": 1, "c": 0 }, { "key": 2582, "value": "NSS Corporation", "e": 0, "c": 3462 }, { "key": 2591, "value": "PPG Industries, Inc.", "e": 0, "c": 4 }, { "key": 2594, "value": "Pitt Glass Works", "e": 0, "c": 8 }, { "key": 2597, "value": "William Grant \u0026 Sons", "e": 1, "c": 0 }, { "key": 2651, "value": "Capitol Surgical Supplies", "e": 1, "c": 0 }, { "key": 2652, "value": "Norstad", "e": 1, "c": 0 }, { "key": 2711, "value": "Hallmark", "e": 1, "c": 0 }, { "key": 2747, "value": "Expired Adv Med Optics (AMO)", "e": 1, "c": 4 }, { "key": 2753, "value": "OPAC", "e": 1, "c": 3 }, { "key": 2758, "value": "AIG-CCT", "e": 1, "c": 0 }, { "key": 2761, "value": "MTD Products", "e": 1, "c": 0 }, { "key": 2766, "value": "Frito Lay", "e": 1, "c": 6 }, { "key": 3750, "value": "TransportAction", "e": 1, "c": 30 }, { "key": 3781, "value": "First Choice Solutions", "e": 1, "c": 0 }, { "key": 3783, "value": "AIG-Private Client Group", "e": 1, "c": 0 }, { "key": 3812, "value": "Actavis", "e": 0, "c": 2 }, { "key": 4178, "value": "Companion Property and Casualty", "e": 1, "c": 0 }, { "key": 4266, "value": "CSI Holdings, Inc.", "e": 1, "c": 3 }, { "key": 4296, "value": "The St. Paul Companies", "e": 1, "c": 0 }, { "key": 4333, "value": "Farmers Alliance", "e": 1, "c": 0 }, { "key": 4334, "value": "Wausau", "e": 1, "c": 4 }, { "key": 4342, "value": "Liberty Mutual", "e": 1, "c": 6 }, { "key": 4349, "value": "Safeco", "e": 1, "c": 1 }, { "key": 4351, "value": "Trinity Solutions Agency", "e": 1, "c": 0 }, { "key": 4352, "value": "Bankers Insurance Group", "e": 1, "c": 0 }, { "key": 4353, "value": "Professional Claims Service", "e": 1, "c": 0 }, { "key": 4490, "value": "AIG Private Client", "e": 1, "c": 0 }, { "key": 4491, "value": "Lynx Services/Zurich Insurance", "e": 1, "c": 0 }, { "key": 4493, "value": "American Honda Motor Co., Inc.", "e": 1, "c": 3 }, { "key": 4503, "value": "Buffets Inc.", "e": 1, "c": 0 }, { "key": 4507, "value": "Amgen GE", "e": 1, "c": 0 }, { "key": 4519, "value": "HealthCare Equipment \u0026 Parts Company (FleetSure)", "e": 1, "c": 0 }, { "key": 4522, "value": "Hewlett Packard", "e": 1, "c": 0 }, { "key": 4523, "value": "ARI Insurance", "e": 1, "c": 0 }, { "key": 4549, "value": "North American Risk Services", "e": 1, "c": 0 }, { "key": 4557, "value": "Emkay Inc. (FleetSure)", "e": 1, "c": 0 }, { "key": 4594, "value": "Lynx Empire", "e": 0, "c": 0 }, { "key": 5282, "value": "METSO", "e": 0, "c": 32 }, { "key": 5291, "value": "Broadspire", "e": 1, "c": 6 }, { "key": 5382, "value": "Sunkist Growers", "e": 1, "c": 0 }, { "key": 5590, "value": "Chubb Insurance", "e": 0, "c": 3 }, { "key": 5611, "value": "GuideOne", "e": 1, "c": 0 }, { "key": 6243, "value": "LeasePlan - Ecolab", "e": 1, "c": 1 }, { "key": 6279, "value": "Anything Distributors Inc. CV", "e": 1, "c": 0 }, { "key": 6280, "value": "Anything Distributors Inc. HV", "e": 1, "c": 0 }, { "key": 6362, "value": "Lynx Services/Universal Underwriters Group (UUG)", "e": 1, "c": 0 }, { "key": 6378, "value": "City of Gainesville", "e": 0, "c": 1 }, { "key": 6381, "value": "Verizon", "e": 1, "c": 0 }, { "key": 6382, "value": "AstraZeneca", "e": 0, "c": 7 }, { "key": 6393, "value": "Sprint Nextel (DO NOT USE)", "e": 1, "c": 0 }, { "key": 6408, "value": "Medtronic", "e": 0, "c": 11 }, { "key": 6409, "value": "Diamond Glass, Inc.-EXPIRED", "e": 1, "c": 382 }, { "key": 6728, "value": "FMC Chemicals", "e": 1, "c": 1 }, { "key": 6729, "value": "Hercules Incorporated", "e": 1, "c": 1 }, { "key": 6765, "value": "L\u0027Oreal", "e": 1, "c": 1 }, { "key": 6766, "value": "Qualex", "e": 1, "c": 2 }, { "key": 6767, "value": "Nalco", "e": 1, "c": 2 }, { "key": 6768, "value": "Apria HealthCare", "e": 1, "c": 5 }, { "key": 6910, "value": "Tyco Healthcare Retail Group", "e": 0, "c": 0 }, { "key": 6966, "value": "Driving Dynamics", "e": 0, "c": 0 }, { "key": 6990, "value": "BMHC", "e": 1, "c": 2 }, { "key": 6991, "value": "Donaldson", "e": 1, "c": 1 }, { "key": 7025, "value": "Brethren Mutual", "e": 0, "c": 0 }, { "key": 7040, "value": "Proliance", "e": 1, "c": 0 }, { "key": 7043, "value": "GE Fleet Services Canada MVRs Only", "e": 1, "c": 1 }, { "key": 7046, "value": "DHL Express", "e": 0, "c": 142 }, { "key": 7128, "value": "AlliedBarton", "e": 0, "c": 5 }, { "key": 7236, "value": "Tyco Electronics", "e": 1, "c": 7 }, { "key": 7244, "value": "Church Mutual Insurance Co.", "e": 1, "c": 0 }, { "key": 7253, "value": "Rohde \u0026 Schwarz Inc.", "e": 1, "c": 1 }, { "key": 7323, "value": "OneBeacon Insurance", "e": 1, "c": 1 }, { "key": 7340, "value": "GE Security", "e": 1, "c": 1 }, { "key": 7352, "value": "TransLogic", "e": 1, "c": 1 }, { "key": 7363, "value": "Novartis", "e": 0, "c": 7 }, { "key": 7377, "value": "Shire", "e": 0, "c": 23 }, { "key": 7388, "value": "Altana", "e": 1, "c": 1 }, { "key": 7389, "value": "CitiCorp", "e": 1, "c": 5 }, { "key": 7477, "value": "Silgan Containers", "e": 1, "c": 1 }, { "key": 7482, "value": "Elizabeth Arden", "e": 1, "c": 1 }, { "key": 7484, "value": "Rotech Healthcare Inc.", "e": 0, "c": 157 }, { "key": 7543, "value": "Johns Manville", "e": 1, "c": 2 }, { "key": 7545, "value": "Akzo Nobel", "e": 1, "c": 1 }, { "key": 7636, "value": "GE Energy", "e": 1, "c": 6 }, { "key": 7643, "value": "Triax Pharmaceuticals, LLC", "e": 1, "c": 1 }, { "key": 7647, "value": "Crown Cork and Seal USA Inc.", "e": 1, "c": 0 }, { "key": 7668, "value": "Wells Dairy", "e": 1, "c": 1 }, { "key": 7671, "value": "Pall Corp", "e": 1, "c": 1 }, { "key": 7717, "value": "The Great Atlantic and Pacific Tea Company", "e": 1, "c": 1 }, { "key": 7898, "value": "City Of Tacoma", "e": 0, "c": 11 }, { "key": 7901, "value": "Penske", "e": 0, "c": 5 }, { "key": 7913, "value": "Sara Lee", "e": 1, "c": 1 }, { "key": 7915, "value": "GE Healthcare Biosciences", "e": 1, "c": 3 }, { "key": 7927, "value": "Red Bull North America", "e": 1, "c": 6 }, { "key": 7945, "value": "Steelcase", "e": 1, "c": 1 }, { "key": 7949, "value": "Advance Auto Parts", "e": 0, "c": 34 }, { "key": 7953, "value": "Novartis Consumer Health", "e": 0, "c": 8 }, { "key": 7974, "value": "Novartis Alcon ", "e": 0, "c": 4 }, { "key": 8002, "value": "The Medicines Company", "e": 1, "c": 1 }, { "key": 8031, "value": "Lummus Corp", "e": 1, "c": 1 }, { "key": 8162, "value": "Ferguson Enterprises, Inc.", "e": 0, "c": 0 }, { "key": 8169, "value": "Stock Building Supply", "e": 0, "c": 0 }, { "key": 8175, "value": "National Semiconductor Corp.", "e": 1, "c": 1 }, { "key": 8200, "value": "PURE Risk Management", "e": 1, "c": 0 }, { "key": 8201, "value": "Sanofi-Aventis", "e": 1, "c": 1 }, { "key": 8217, "value": "Mike Albert Leasing", "e": 0, "c": 23 }, { "key": 8227, "value": "Dallas Airmotive", "e": 1, "c": 0 }, { "key": 8242, "value": "CenturyLink", "e": 1, "c": 88 }, { "key": 8291, "value": "Noritsu ", "e": 1, "c": 1 }, { "key": 8293, "value": "Pitt Ohio Express", "e": 1, "c": 0 }, { "key": 8294, "value": "Kern County", "e": 0, "c": 1 }, { "key": 8351, "value": "Baldor Electric Company", "e": 0, "c": 2 }, { "key": 8352, "value": "Emerson", "e": 1, "c": 1 }, { "key": 8365, "value": "Raymour and Flanigan", "e": 0, "c": 35 }, { "key": 8377, "value": "Comcast Cable Communications Management", "e": 0, "c": 4 }, { "key": 8383, "value": "FCI USA Inc.", "e": 1, "c": 1 }, { "key": 8398, "value": "Newpage", "e": 1, "c": 1 }, { "key": 8441, "value": "Whatcom County Public Works", "e": 0, "c": 0 }, { "key": 8452, "value": "DSHS (State of Washington) (Department of Social and Health Services)", "e": 0, "c": 13 }, { "key": 8491, "value": "Ampco", "e": 1, "c": 1 }, { "key": 8499, "value": "Tacoma Public Utilities", "e": 0, "c": 7 }, { "key": 8505, "value": "Pearson Inc.", "e": 1, "c": 1 }, { "key": 8512, "value": "GMAC Insurance Management Corp", "e": 1, "c": 1 }, { "key": 8532, "value": "Palm Beach County", "e": 1, "c": 0 }, { "key": 8538, "value": "Tegrant - DO NOT USE - OLD GE CLIENT", "e": 1, "c": 2 }, { "key": 8541, "value": "Apple Computer (MVR)", "e": 1, "c": 1 }, { "key": 8551, "value": "Cemex", "e": 1, "c": 1 }, { "key": 8553, "value": "MedImmune", "e": 0, "c": 5 }, { "key": 8641, "value": "Kern County Probation ", "e": 0, "c": 0 }, { "key": 8647, "value": "Coca-Cola (GEMVR)", "e": 1, "c": 2 }, { "key": 8648, "value": "City of Inglewood", "e": 1, "c": 0 }, { "key": 8659, "value": "Level Three Communications", "e": 1, "c": 1 }, { "key": 8677, "value": "ImClone Systems", "e": 1, "c": 1 }, { "key": 8709, "value": "AmeriFleet", "e": 1, "c": 15 }, { "key": 8765, "value": "Motorola, Inc.", "e": 1, "c": 1 }, { "key": 8779, "value": "Nestle Infant Nutrition", "e": 1, "c": 4 }, { "key": 8791, "value": "Modular Space", "e": 1, "c": 1 }, { "key": 8814, "value": "Charming Shoppes", "e": 1, "c": 1 }, { "key": 8823, "value": "Duplicate - do not use", "e": 1, "c": 0 }, { "key": 8824, "value": "Liebert", "e": 1, "c": 1 }, { "key": 8825, "value": "Rosemount Analytical", "e": 1, "c": 1 }, { "key": 8857, "value": "EKA Chemicals", "e": 1, "c": 1 }, { "key": 8929, "value": "Nielsen", "e": 1, "c": 1 }, { "key": 8967, "value": "Coca Cola Service Fleet", "e": 1, "c": 1 }, { "key": 9033, "value": "Mortenson", "e": 1, "c": 2 }, { "key": 9110, "value": "Gilbane", "e": 1, "c": 1 }, { "key": 9127, "value": "Gambro", "e": 1, "c": 5 }, { "key": 9128, "value": "Carter Brothers", "e": 1, "c": 1 }, { "key": 9164, "value": "DS Services- We take all claims", "e": 0, "c": 10 }, { "key": 9169, "value": "Dermalogica", "e": 1, "c": 1 }, { "key": 9205, "value": "Merck", "e": 0, "c": 3 }, { "key": 9225, "value": "Liebert Corporation", "e": 1, "c": 1 }, { "key": 9374, "value": "University of Washington", "e": 0, "c": 0 }, { "key": 9420, "value": "Bridgestone Americas Holding", "e": 1, "c": 2 }, { "key": 9452, "value": "Kraft Food Group, Inc.", "e": 1, "c": 1 }, { "key": 9513, "value": "Xerox Non-Service Fleets", "e": 1, "c": 3 }, { "key": 9568, "value": "Abercrombie and Fitch", "e": 1, "c": 1 }, { "key": 9606, "value": "Optos", "e": 1, "c": 1 }, { "key": 9637, "value": "Anderson Merchandisers, LP", "e": 0, "c": 2 }, { "key": 9663, "value": "Xerox Service Fleets", "e": 1, "c": 7 }, { "key": 9664, "value": "New Century Transportation", "e": 0, "c": 0 }, { "key": 9713, "value": "Landair", "e": 0, "c": 1 }, { "key": 9719, "value": "Southwire", "e": 1, "c": 1 }, { "key": 9781, "value": "Linde", "e": 1, "c": 1 }, { "key": 9786, "value": "EXPRESS CAR \u0026 TRUCK RENTAL", "e": 0, "c": 0 }, { "key": 9799, "value": "Eli Lilly and Company ", "e": 0, "c": 10 }, { "key": 9843, "value": "Safelite Solutions LLC", "e": 0, "c": 0 }, { "key": 9860, "value": "WheelTime", "e": 1, "c": 139 }, { "key": 9890, "value": "Maplehurst Bakeries", "e": 1, "c": 1 }, { "key": 9893, "value": "Novartis Vaccines and Diagnostics Inc.", "e": 0, "c": 3 }, { "key": 9903, "value": "Washington State Fleet Operations", "e": 0, "c": 0 }, { "key": 9905, "value": "King County Solid Waste Division", "e": 0, "c": 0 }, { "key": 9907, "value": "Dresser, Inc.", "e": 1, "c": 1 }, { "key": 9938, "value": "Sprint", "e": 1, "c": 0 }, { "key": 9939, "value": "Multiband, Inc.", "e": 1, "c": 40 }, { "key": 9957, "value": "Chemetall", "e": 1, "c": 1 }, { "key": 10030, "value": "Buckman Labs", "e": 1, "c": 1 }, { "key": 10040, "value": "Tegrant", "e": 1, "c": 2 }, { "key": 10082, "value": "Danaher Corporation", "e": 1, "c": 1 }, { "key": 10119, "value": "Gilbarco", "e": 1, "c": 1 }, { "key": 10133, "value": "Tektronix", "e": 1, "c": 1 }, { "key": 10193, "value": "Xerox Managed Services", "e": 1, "c": 1 }, { "key": 10201, "value": "Biogen", "e": 0, "c": 10 }, { "key": 10208, "value": "Sony Electronics", "e": 1, "c": 1 }, { "key": 10223, "value": "Danaher Tool", "e": 1, "c": 1 }, { "key": 10294, "value": "Aera Energy (never used ?)", "e": 1, "c": 0 }, { "key": 10295, "value": "Amerigroup", "e": 1, "c": 1 }, { "key": 10298, "value": "Novartis Animal Health", "e": 1, "c": 4 }, { "key": 10309, "value": "Crawford", "e": 1, "c": 0 }, { "key": 10311, "value": "ConvaTec", "e": 1, "c": 5 }, { "key": 10313, "value": "Emkay Canada Fleet Services Corp.", "e": 0, "c": 7 }, { "key": 10662, "value": "Foss National", "e": 0, "c": 40 }, { "key": 10674, "value": "Constar", "e": 1, "c": 17 }, { "key": 10689, "value": "Sybron Dental", "e": 1, "c": 1 }, { "key": 10720, "value": "Amedisys, Inc.", "e": 1, "c": 2 }, { "key": 10732, "value": "RockTenn", "e": 1, "c": 4 }, { "key": 10777, "value": "Washington State Office of the Insurance Commissioner", "e": 0, "c": 0 }, { "key": 10783, "value": "Grainger", "e": 1, "c": 1 }, { "key": 10799, "value": "DirecTV", "e": 1, "c": 0 }, { "key": 10800, "value": "Amgen - NonFleet", "e": 1, "c": 0 }, { "key": 10801, "value": "Videojet Technologies", "e": 1, "c": 1 }, { "key": 10802, "value": "Emerson Electrical Reliability Services", "e": 1, "c": 1 }, { "key": 10831, "value": "Velcor Leasing", "e": 0, "c": 0 }, { "key": 10839, "value": "Ecolab - Canada", "e": 1, "c": 11 }, { "key": 14330, "value": "DriverCare Edu Demo", "e": 1, "c": 11 }, { "key": 14333, "value": "NSS MVR Manager", "e": 1, "c": 2 }, { "key": 14340, "value": "Emerson Process Management", "e": 1, "c": 2 }, { "key": 14353, "value": "Gilead Sciences", "e": 1, "c": 1 }, { "key": 14400, "value": "Orange County Sanitation District", "e": 0, "c": 0 }, { "key": 14439, "value": "The Babcock \u0026 Wilcox Company", "e": 1, "c": 1 }, { "key": 14440, "value": "Yokogawa", "e": 1, "c": 12 }, { "key": 14465, "value": "Grainger OSS", "e": 1, "c": 1 }, { "key": 14476, "value": "Central Parking Systems", "e": 0, "c": 114 }, { "key": 14489, "value": "Central Parking", "e": 1, "c": 0 }, { "key": 14490, "value": "Norfolk and Dedham", "e": 0, "c": 0 }, { "key": 14491, "value": "Teva", "e": 0, "c": 10 }, { "key": 17524, "value": "Test GE MVR customer - SEE MIKEI", "e": 1, "c": 1 }, { "key": 17536, "value": "Eli Lilly - NonFleet", "e": 1, "c": 0 }, { "key": 17554, "value": "Fresenius Kabi", "e": 1, "c": 9 }, { "key": 17564, "value": "Commonwealth Brands", "e": 1, "c": 12 }, { "key": 17582, "value": "Danaher Sensors and Controls", "e": 1, "c": 1 }, { "key": 17583, "value": "Hach", "e": 1, "c": 1 }, { "key": 17584, "value": "Chemtreat", "e": 1, "c": 2 }, { "key": 17585, "value": "Radiometer", "e": 1, "c": 1 }, { "key": 17586, "value": "Danaher Motion", "e": 1, "c": 1 }, { "key": 17659, "value": "Chas Roberts AC", "e": 1, "c": 1 }, { "key": 17675, "value": "ArjoHuntLeigh", "e": 1, "c": 0 }, { "key": 17689, "value": "Irish Dairy Board", "e": 1, "c": 1 }, { "key": 17692, "value": "Coloplast", "e": 1, "c": 2 }, { "key": 17742, "value": "Cephalon ", "e": 1, "c": 16 }, { "key": 17743, "value": "ASL", "e": 0, "c": 0 }, { "key": 17751, "value": "Aera Energy", "e": 1, "c": 9 }, { "key": 17817, "value": "NFI Industries", "e": 1, "c": 0 }, { "key": 17866, "value": "McKee Foods Transportation", "e": 0, "c": 0 }, { "key": 17867, "value": "Bristol-Myers Squibb-ZymoGenetics", "e": 1, "c": 0 }, { "key": 17893, "value": "Chopper Express", "e": 0, "c": 0 }, { "key": 17906, "value": "Avanir Pharmaceuticals", "e": 1, "c": 1 }, { "key": 17920, "value": "City of Lynnwood", "e": 0, "c": 6 }, { "key": 17927, "value": "GE Canada Fleet Services", "e": 1, "c": 1 }, { "key": 17935, "value": "GE Capital Canada Equipment Financing", "e": 1, "c": 1 }, { "key": 17936, "value": "Financement D\u0027equipement GE Capital", "e": 1, "c": 1 }, { "key": 20357, "value": "Endo Health Solutions", "e": 0, "c": 25 }, { "key": 20358, "value": "Alliance Inspection", "e": 1, "c": 1 }, { "key": 20365, "value": "The Hershey Company", "e": 1, "c": 1 }, { "key": 20367, "value": "DTZ", "e": 1, "c": 1 }, { "key": 20446, "value": "Bank of America", "e": 1, "c": 2 }, { "key": 20482, "value": "Otto Bock Polyurethane Technologies", "e": 1, "c": 1 }, { "key": 20494, "value": "Farmer Brothers ", "e": 0, "c": 0 }, { "key": 20495, "value": "Lilly ISE", "e": 1, "c": 0 }, { "key": 20497, "value": "Zogenix", "e": 1, "c": 9 }, { "key": 20505, "value": "Cure Leasing \u0026 Maintenance", "e": 0, "c": 0 }, { "key": 20507, "value": "Crawford \u0026 Company", "e": 0, "c": 16 }, { "key": 20602, "value": "Allied Electronics", "e": 1, "c": 7 }, { "key": 20621, "value": "Sound Transit", "e": 0, "c": 15 }, { "key": 20652, "value": "Arysta LifeScience", "e": 1, "c": 12 }, { "key": 20682, "value": "Plote Construction", "e": 1, "c": 0 }, { "key": 20715, "value": "Orapharma", "e": 1, "c": 1 }, { "key": 20745, "value": "Safway Services, LLC", "e": 0, "c": 0 }, { "key": 20750, "value": "Bucyrus", "e": 1, "c": 1 }, { "key": 20754, "value": "3M Company", "e": 1, "c": 1 }, { "key": 20759, "value": "Washington State Liquor Control Board", "e": 0, "c": 0 }, { "key": 20770, "value": "Univar", "e": 1, "c": 1 }, { "key": 20781, "value": "AstraZeneca Canada", "e": 0, "c": 24 }, { "key": 20845, "value": "Kodak", "e": 1, "c": 3 }, { "key": 20996, "value": "Comcast Corporation", "e": 1, "c": 2 }, { "key": 21131, "value": "P.V. Transport (Hatfield Meats)", "e": 0, "c": 0 }, { "key": 21132, "value": "Mennel Milling Co.", "e": 0, "c": 0 }, { "key": 21149, "value": "Xerox Auto Equity", "e": 1, "c": 1 }, { "key": 21169, "value": "Kodak Canada", "e": 1, "c": 1 }, { "key": 21259, "value": "Dollar Tree Stores", "e": 1, "c": 1 }, { "key": 21303, "value": "Grainger Service Holding Company", "e": 1, "c": 1 }, { "key": 21308, "value": "Driverpromise", "e": 0, "c": 0 }, { "key": 21492, "value": "Molecular Devices", "e": 1, "c": 1 }, { "key": 21517, "value": "Duke Realty", "e": 1, "c": 1 }, { "key": 21610, "value": "Veeder Root", "e": 1, "c": 1 }, { "key": 21612, "value": "Fluke Corporation", "e": 1, "c": 1 }, { "key": 21659, "value": "Nexeo Solutions", "e": 0, "c": 2 }, { "key": 21660, "value": "Gambro Canada", "e": 1, "c": 1 }, { "key": 21692, "value": "Hoffman La Roche - Canada", "e": 1, "c": 1 }, { "key": 21701, "value": "Jim Pattison Lease", "e": 0, "c": 7 }, { "key": 21741, "value": "Incyte", "e": 1, "c": 1 }, { "key": 21772, "value": "Beckman Coulter", "e": 1, "c": 1 }, { "key": 21794, "value": "Loreal Canada", "e": 1, "c": 1 }, { "key": 21875, "value": "A. Duie Pyle", "e": 0, "c": 0 }, { "key": 21892, "value": "Alamo Pharma Services", "e": 1, "c": 1 }, { "key": 21914, "value": "Avery Dennison ", "e": 1, "c": 4 }, { "key": 21964, "value": "Novartis Sandoz", "e": 0, "c": 4 }, { "key": 22006, "value": "GE Healthcare Global", "e": 1, "c": 3 }, { "key": 22037, "value": "Tyco Global", "e": 1, "c": 1 }, { "key": 22050, "value": "Esko", "e": 1, "c": 1 }, { "key": 22064, "value": "WA Department of Ecology", "e": 0, "c": 0 }, { "key": 22072, "value": "Office Of The Attorney General", "e": 0, "c": 0 }, { "key": 22091, "value": "Farmer Bros. - duplicate (do not use)", "e": 1, "c": 0 }, { "key": 22098, "value": "Gilead Sciences Canada", "e": 1, "c": 1 }, { "key": 22137, "value": "Wincor", "e": 1, "c": 0 }, { "key": 22158, "value": "Tacoma Community College", "e": 0, "c": 0 }, { "key": 22180, "value": "Ashland Canada", "e": 1, "c": 1 }, { "key": 22235, "value": "S \u0026 D Coffee", "e": 1, "c": 2 }, { "key": 22390, "value": "Schneider Electric", "e": 1, "c": 2 }, { "key": 22422, "value": "CVS Caremark", "e": 0, "c": 0 }, { "key": 22439, "value": "Dependable Highway Express, Inc.", "e": 0, "c": 0 }, { "key": 22508, "value": "Mondelez Global LLC", "e": 1, "c": 1 }, { "key": 22525, "value": "Welch Allyn", "e": 1, "c": 14 }, { "key": 22585, "value": "Nestle Canada Inc.", "e": 1, "c": 1 }, { "key": 22589, "value": "Ingersoll Rand", "e": 0, "c": 3 }, { "key": 22590, "value": "Washington State Department of Corrections", "e": 0, "c": 0 }, { "key": 22604, "value": "Washington State University", "e": 0, "c": 0 }, { "key": 22984, "value": "JRRW Transport", "e": 0, "c": 0 }, { "key": 23011, "value": "QBE Americas, Inc", "e": 0, "c": 3 }, { "key": 23020, "value": "Triad Isotopes", "e": 1, "c": 1 }, { "key": 23041, "value": "Sarasota County", "e": 0, "c": 4 }, { "key": 23047, "value": "ICF International", "e": 1, "c": 1 }, { "key": 23053, "value": "Beckman Coulter Canada", "e": 1, "c": 1 }, { "key": 23064, "value": "Bristol-Myers Squibb Amylin", "e": 1, "c": 0 }, { "key": 23080, "value": "7-Eleven", "e": 1, "c": 1 }, { "key": 23127, "value": "Lennox NAS", "e": 1, "c": 1 }, { "key": 23131, "value": "Hach Canada", "e": 1, "c": 1 }, { "key": 23135, "value": "VOID - DO NOT USE", "e": 1, "c": 0 }, { "key": 23154, "value": "Molson Coors", "e": 1, "c": 1 }, { "key": 23162, "value": "Avon", "e": 1, "c": 1 }, { "key": 23167, "value": "Granville Island Brewing", "e": 1, "c": 1 }, { "key": 23187, "value": "Modelo Molsen Imports", "e": 1, "c": 1 }, { "key": 23207, "value": "Creemore Springs Brewery Limited", "e": 1, "c": 1 }, { "key": 23223, "value": "Noble Environmental Power", "e": 1, "c": 1 }, { "key": 23228, "value": "CitiFinancial Canada", "e": 1, "c": 1 }, { "key": 23233, "value": "Dean Foods", "e": 0, "c": 9 }, { "key": 23351, "value": "Gilbarco Canada", "e": 1, "c": 1 }, { "key": 23371, "value": "Trelleborg Sealing Solutions", "e": 1, "c": 1 }, { "key": 23378, "value": "Unitek Global Services", "e": 0, "c": 5 }, { "key": 23446, "value": "Washington State Gambling Commission", "e": 0, "c": 0 }, { "key": 23448, "value": "Amedisys - Non Fleet", "e": 1, "c": 1 }, { "key": 23568, "value": "Troy Life and Fire Safety Ltd.", "e": 1, "c": 1 }, { "key": 23576, "value": "City of Bellevue", "e": 0, "c": 0 }, { "key": 23651, "value": "Western Washington University", "e": 0, "c": 0 }, { "key": 23656, "value": "AB SCIEX LP", "e": 1, "c": 1 }, { "key": 23669, "value": "MaintenX", "e": 1, "c": 0 }, { "key": 23672, "value": "C \u0026 K Markets", "e": 1, "c": 1 }, { "key": 23690, "value": "Matrix Medical Network", "e": 1, "c": 2 }, { "key": 24262, "value": "Mueller Group, LLC", "e": 1, "c": 1 }, { "key": 24344, "value": "Ecolab Inc. - Energy Services", "e": 1, "c": 1 }, { "key": 24346, "value": "Encana Oil \u0026 Gas (USA)", "e": 1, "c": 1 }, { "key": 24350, "value": "Health Resources Solutions", "e": 1, "c": 0 }, { "key": 24352, "value": "Rite Aid - Core Fleet", "e": 1, "c": 2 }, { "key": 24367, "value": "Seattle City Light", "e": 0, "c": 0 }, { "key": 24368, "value": "Callaway Golf", "e": 1, "c": 1 }, { "key": 24372, "value": "ADT", "e": 1, "c": 2 }, { "key": 24405, "value": "Phonak", "e": 1, "c": 1 }, { "key": 24450, "value": "Mallinckrodt Pharmaceuticals", "e": 1, "c": 10 }, { "key": 24464, "value": "GE Water \u0026 Process Technologies", "e": 1, "c": 1 }, { "key": 24471, "value": "Whataburger", "e": 1, "c": 5 }, { "key": 24484, "value": "Tyco Integrated Security", "e": 1, "c": 2 }, { "key": 24762, "value": "Radiometer Canada", "e": 1, "c": 1 }, { "key": 24805, "value": "Sybron Dental Canada", "e": 1, "c": 1 }, { "key": 24814, "value": "Luitpold Pharmaceuticals, Inc.", "e": 1, "c": 2 }, { "key": 24905, "value": "Snohomish County PUD", "e": 0, "c": 9 }, { "key": 24915, "value": "Alfa Laval", "e": 1, "c": 1 }, { "key": 25038, "value": "Chrysler Group LLC", "e": 0, "c": 2 }, { "key": 25064, "value": "Grainger Non-Fleet", "e": 1, "c": 1 }, { "key": 25080, "value": "NCR", "e": 1, "c": 1 }, { "key": 25101, "value": "Rothmans, Benson \u0026 Hedges, Inc.", "e": 1, "c": 2 }, { "key": 25106, "value": "Allegion", "e": 0, "c": 2 }, { "key": 25112, "value": "Ipsco Tubulars, Inc.", "e": 1, "c": 1 }, { "key": 25123, "value": "Leica", "e": 1, "c": 1 }, { "key": 25130, "value": "Metropolitan Property and Casualty Insurance", "e": 1, "c": 1 }, { "key": 25138, "value": "DriverCare Demo ATS", "e": 1, "c": 0 }, { "key": 25139, "value": "P\u0026S Transportation", "e": 1, "c": 0 }, { "key": 25142, "value": "Unilever", "e": 1, "c": 1 }, { "key": 25173, "value": "Washington State Military Department", "e": 0, "c": 0 }, { "key": 25179, "value": "Allstate", "e": 1, "c": 0 }, { "key": 25194, "value": "Lennox Industries - USA", "e": 1, "c": 1 }, { "key": 25232, "value": "Supernus Pharm", "e": 0, "c": 7 }, { "key": 25253, "value": "Hershey Canada", "e": 1, "c": 1 }, { "key": 25278, "value": "Southwire - Canada", "e": 1, "c": 1 }, { "key": 25389, "value": "Valmet", "e": 0, "c": 0 }, { "key": 25393, "value": "Lennox Industries Canada", "e": 1, "c": 1 }, { "key": 25409, "value": "Onset Dermatologics", "e": 1, "c": 2 }, { "key": 25430, "value": "Dawn Foods Products, Inc.", "e": 1, "c": 1 }, { "key": 25436, "value": "GARDENVISION", "e": 1, "c": 1 }, { "key": 25470, "value": "LeasePlan Canada", "e": 0, "c": 20 }, { "key": 25487, "value": "Washington State Labor \u0026 Industries", "e": 0, "c": 0 }, { "key": 25490, "value": "Selective Insurance ", "e": 1, "c": 1 }, { "key": 25501, "value": "Leica Biosystems Canada", "e": 1, "c": 1 }, { "key": 25530, "value": "Pactiv Reynolds", "e": 1, "c": 9 }, { "key": 25531, "value": "Allergan", "e": 1, "c": 1 }, { "key": 25539, "value": "Donlen", "e": 0, "c": 2 }, { "key": 29451, "value": "Enersys Delaware Inc.", "e": 1, "c": 1 }, { "key": 29673, "value": "Fuchs", "e": 1, "c": 2 }, { "key": 29721, "value": "Asco", "e": 1, "c": 2 }, { "key": 29778, "value": "Tyco Corp", "e": 1, "c": 2 }, { "key": 30271, "value": "King County", "e": 0, "c": 2 }, { "key": 30512, "value": "Rexel", "e": 1, "c": 46 }, { "key": 30690, "value": "Tektronix Canada", "e": 1, "c": 1 }, { "key": 30935, "value": "SAC Wireless", "e": 1, "c": 1 }, { "key": 30948, "value": "Rite Aid Corporation", "e": 1, "c": 1 }, { "key": 30975, "value": "KONE and Door Systems", "e": 1, "c": 2 }, { "key": 30994, "value": "MEMIC", "e": 1, "c": 1 }, { "key": 31056, "value": "Iris Power", "e": 1, "c": 1 }, { "key": 31099, "value": "Jazz Pharmaceuticals", "e": 1, "c": 1 }, { "key": 31103, "value": "ORTHO-CLINICAL DIAGNOSTICS, INC.", "e": 1, "c": 1 }, { "key": 31106, "value": "IBEX", "e": 1, "c": 1 }, { "key": 31139, "value": "Wesco Distribution, Inc.", "e": 1, "c": 1 }, { "key": 31176, "value": "Leo Pharma", "e": 1, "c": 1 }, { "key": 31402, "value": "COMPUCOM SYSTEMS, INC.", "e": 1, "c": 2 }, { "key": 31489, "value": "McDonald\u0027s Corporation", "e": 0, "c": 8 }, { "key": 31577, "value": "Bayer", "e": 0, "c": 1 }, { "key": 31771, "value": "Tyco Canada", "e": 0, "c": 7 }, { "key": 31811, "value": "OFS International", "e": 1, "c": 1 }, { "key": 32080, "value": "Centralia College", "e": 0, "c": 0 }, { "key": 32426, "value": "Wayne Fueling Systems", "e": 1, "c": 1 }, { "key": 32452, "value": "Skagit Valley College", "e": 0, "c": 1 }, { "key": 33010, "value": "Schneider Electric Buildings", "e": 1, "c": 1 }, { "key": 33061, "value": "Betco Corporation", "e": 1, "c": 1 }, { "key": 33075, "value": "Sigma Tau Pharmaceuticals", "e": 1, "c": 1 }, { "key": 33738, "value": "Bendix", "e": 1, "c": 1 }, { "key": 33776, "value": "Safety Store", "e": 1, "c": 0 }, { "key": 33777, "value": "Duncan School of Driving", "e": 1, "c": 0 }, { "key": 33778, "value": "General Motors LLC", "e": 1, "c": 0 }, { "key": 33779, "value": "NASTC", "e": 1, "c": 0 }, { "key": 33908, "value": "HTX Services", "e": 1, "c": 1 }, { "key": 33950, "value": "DES Consolidated Mail Services", "e": 0, "c": 0 }, { "key": 34121, "value": "Vivint, Inc.", "e": 1, "c": 1 }, { "key": 34283, "value": "Newpark Resources", "e": 1, "c": 1 }, { "key": 34353, "value": "Stillwater Insurance Group", "e": 0, "c": 0 }, { "key": 34419, "value": "LHC Group", "e": 1, "c": 1 }, { "key": 34524, "value": "AbbVie Inc", "e": 0, "c": 0 }, { "key": 34525, "value": "Valeant", "e": 1, "c": 1 }, { "key": 35482, "value": "Lehigh Hanson", "e": 1, "c": 1 }, { "key": 35496, "value": "WSDOT", "e": 0, "c": 1 }, { "key": 35503, "value": "CNA Insurance", "e": 0, "c": 2 }];

  $scope.asset = { "rules": { "10005": "0", "200016": "1" }, "orgUnitId": 7, "assetCriteria": [{ "OrgStructureID": 0, "LiteralName": "Vehicle #", "ControlName": "vehicle", "SearchColumn": -1, "AssetTable": "V", "Inheritable": 1, "UseLike": 0, "Active": 1, "Order": -3 }, { "OrgStructureID": 0, "LiteralName": "Plate #", "ControlName": "plate", "SearchColumn": -1, "AssetTable": "V", "Inheritable": 1, "UseLike": 0, "Active": 1, "Order": -2 }, { "OrgStructureID": 0, "LiteralName": "Employee #", "ControlName": "employee", "SearchColumn": -1, "AssetTable": "E", "Inheritable": 1, "UseLike": 0, "Active": 1, "Order": -2 }, { "OrgStructureID": 0, "LiteralName": "Last Name", "ControlName": "lname", "SearchColumn": -1, "AssetTable": "E", "Inheritable": 1, "UseLike": 0, "Active": 1, "Order": -1 }, { "OrgStructureID": 0, "LiteralName": "VIN", "ControlName": "vin", "SearchColumn": -1, "AssetTable": "V", "Inheritable": 1, "UseLike": 0, "Active": 1, "Order": -1 }] };

  $scope.assetCriteriaFilter = function (item) {
    return item.AssetTable === $scope._assetSearchType;
  }

  $scope.assetSearchEmployeeResults = [{ "ClientEmployeeListID": 42141, "ClientEmployeeNo": null, "FirstName": "Mark", "LastName": "Smith", "SSN": "", "LicenseNo": "f99325582", "Address1": "109 Logan\u0027s Run", "City": "Sadieville", "StateProvince": "KY", "PhoneHome": "5028574665", "LastClaim": 193224, "LastUpdate": "\/Date(1188996857037)\/", "Client_Org_Name": "Ashland", "Branch_Org_Name": "Valvoline", "OrgStructureID": 2565 }, { "ClientEmployeeListID": 1872006, "ClientEmployeeNo": "A208370", "FirstName": "Mark", "LastName": "Smith", "SSN": "", "LicenseNo": "D02411607", "Address1": "121 Sterling Crossing Drive", "City": "O\u0027fallon", "StateProvince": "MO", "PhoneHome": null, "LastClaim": 351734, "LastUpdate": "\/Date(1253628018220)\/", "Client_Org_Name": "Ashland", "Branch_Org_Name": "Valvoline", "OrgStructureID": 2565 }, { "ClientEmployeeListID": 2387274, "ClientEmployeeNo": "080993", "FirstName": "Michael", "LastName": "Smith", "SSN": "", "LicenseNo": "24645875", "Address1": "10 Spruce Canyon", "City": "Spring", "StateProvince": "TX", "PhoneHome": null, "LastClaim": 720674, "LastUpdate": "\/Date(1211209669600)\/", "Client_Org_Name": "Ashland", "Branch_Org_Name": "Ashland", "OrgStructureID": 7 }, { "ClientEmployeeListID": 2472473, "ClientEmployeeNo": "A295237", "FirstName": "David", "LastName": "Smith", "SSN": "", "LicenseNo": "RH672967", "Address1": "1308 Massachusetts Drive", "City": "Xenia", "StateProvince": "OH", "PhoneHome": null, "LastClaim": 841713, "LastUpdate": "\/Date(1255007234553)\/", "Client_Org_Name": "Ashland", "Branch_Org_Name": "Valvoline", "OrgStructureID": 2565 }];
  $scope.assetSearchVehicleResults = [{ "ClientVehicleListID": 1272728, "ClaimVehicleID": 734703, "OrgStructureID": 7, "ClientVehNo": "", "VehYear": 2008, "Make": "Chevrolet", "Model": "Impala", "VehicleStyleID": 2, "VIN": "2G1WT55KX89123162", "PlateNo": "AXP563", "StateProvince": "OK", "Mileage": 26000, "MileageDistanceID": 1, "LastMileage_DT_UTC": "\/Date(1216022400000)\/", "LastMileage_DT_TZID": 1, "LastMileage_DT_Local": "\/Date(1216008000000)\/", "ColorID": 8, "PriorDamage": "", "PriorDmgLstUpdate": null, "TravDirID": null, "HasDriver": null, "HasPassenger": null, "ClientEmployeeListID": null, "ClientVehOwnerID": null, "PrimaryClientVehNum": null, "VehBookValue": null, "NewVehOnOrder": null, "OnRoadDate_UTC": null, "OnRoadDate_TZID": 1, "OnRoadDate_Local": null, "OffRoadDate_UTC": null, "OffRoadDate_TZID": 1, "OffRoadDate_Local": null, "ContractStartDate_UTC": null, "ContractStartDate_TZID": 1, "ContractStartDate_Local": null, "ContractEndDate_UTC": null, "ContractEndDate_TZID": 1, "ContractEndDate_Local": null, "VehicleDetail1": null, "VehicleDetail2": null, "VehicleDetail3": null, "VehicleDetail4": null, "VehicleDetail5": null, "VehicleDetail6": null, "VehicleDetails": "", "CreateUserID": 5215120, "Create_DT_UTC": "\/Date(1216065147623)\/", "Create_DT_TZID": 1, "Create_DT_Local": "\/Date(1216050747623)\/", "UpdateUserID": null, "Update_DT_UTC": null, "Update_DT_TZID": null, "Update_DT_Local": null, "PlateCountryID": 1, "VehBookValueCurrencyID": null, "ClientOrgName": "Ashland", "BranchOrgName": "Ashland", "Color": null, "VehicleStyle": null, "ServiceTypeID": null, "ClientTitle": null, "AssetOwnerID": null, "OrgStructureID1": 7 }, { "ClientVehicleListID": 1036433, "ClaimVehicleID": 591542, "OrgStructureID": 2565, "ClientVehNo": "", "VehYear": 2006, "Make": "Chevrolet", "Model": "Express", "VehicleStyleID": 4, "VIN": "1GCFG15T661237092", "PlateNo": "U181SE", "StateProvince": "FM", "Mileage": 25942, "MileageDistanceID": 1, "LastMileage_DT_UTC": "\/Date(1165485600000)\/", "LastMileage_DT_TZID": 1, "LastMileage_DT_Local": "\/Date(1165467600000)\/", "ColorID": 33, "PriorDamage": "", "PriorDmgLstUpdate": null, "TravDirID": null, "HasDriver": null, "HasPassenger": null, "ClientEmployeeListID": null, "ClientVehOwnerID": null, "PrimaryClientVehNum": null, "VehBookValue": null, "NewVehOnOrder": null, "OnRoadDate_UTC": null, "OnRoadDate_TZID": 1, "OnRoadDate_Local": null, "OffRoadDate_UTC": null, "OffRoadDate_TZID": 1, "OffRoadDate_Local": null, "ContractStartDate_UTC": null, "ContractStartDate_TZID": 1, "ContractStartDate_Local": null, "ContractEndDate_UTC": null, "ContractEndDate_TZID": 1, "ContractEndDate_Local": null, "VehicleDetail1": null, "VehicleDetail2": null, "VehicleDetail3": null, "VehicleDetail4": null, "VehicleDetail5": null, "VehicleDetail6": null, "VehicleDetails": "", "CreateUserID": 4000253, "Create_DT_UTC": "\/Date(1165539701837)\/", "Create_DT_TZID": 1, "Create_DT_Local": "\/Date(1165521701837)\/", "UpdateUserID": null, "Update_DT_UTC": null, "Update_DT_TZID": null, "Update_DT_Local": null, "PlateCountryID": 1, "VehBookValueCurrencyID": null, "ClientOrgName": "Ashland", "BranchOrgName": "Valvoline", "Color": null, "VehicleStyle": null, "ServiceTypeID": null, "ClientTitle": null, "AssetOwnerID": null, "OrgStructureID1": 2565 }, { "ClientVehicleListID": 1389345, "ClaimVehicleID": 845811, "OrgStructureID": 2565, "ClientVehNo": "217170", "VehYear": 2008, "Make": "Chevrolet", "Model": "Impala", "VehicleStyleID": 2, "VIN": "2G1WT55K289123124", "PlateNo": "BCV7976", "StateProvince": "GA", "Mileage": 70000, "MileageDistanceID": 1, "LastMileage_DT_UTC": "\/Date(1256716800000)\/", "LastMileage_DT_TZID": 1, "LastMileage_DT_Local": "\/Date(1256702400000)\/", "ColorID": 18, "PriorDamage": "", "PriorDmgLstUpdate": null, "TravDirID": null, "HasDriver": null, "HasPassenger": null, "ClientEmployeeListID": null, "ClientVehOwnerID": null, "PrimaryClientVehNum": null, "VehBookValue": null, "NewVehOnOrder": null, "OnRoadDate_UTC": null, "OnRoadDate_TZID": 1, "OnRoadDate_Local": null, "OffRoadDate_UTC": null, "OffRoadDate_TZID": 1, "OffRoadDate_Local": null, "ContractStartDate_UTC": null, "ContractStartDate_TZID": 1, "ContractStartDate_Local": null, "ContractEndDate_UTC": null, "ContractEndDate_TZID": 1, "ContractEndDate_Local": null, "VehicleDetail1": null, "VehicleDetail2": null, "VehicleDetail3": null, "VehicleDetail4": null, "VehicleDetail5": null, "VehicleDetail6": null, "VehicleDetails": "", "CreateUserID": 4000140, "Create_DT_UTC": "\/Date(1256747569223)\/", "Create_DT_TZID": 1, "Create_DT_Local": "\/Date(1256733169223)\/", "UpdateUserID": null, "Update_DT_UTC": null, "Update_DT_TZID": null, "Update_DT_Local": null, "PlateCountryID": 1, "VehBookValueCurrencyID": null, "ClientOrgName": "Ashland", "BranchOrgName": "Valvoline", "Color": null, "VehicleStyle": null, "ServiceTypeID": null, "ClientTitle": null, "AssetOwnerID": null, "OrgStructureID1": 2565 }, { "ClientVehicleListID": 1324214, "ClaimVehicleID": 777995, "OrgStructureID": 2565, "ClientVehNo": "216852", "VehYear": 2006, "Make": "Chevrolet", "Model": "Impala", "VehicleStyleID": 7, "VIN": "2G1WT58K269123584", "PlateNo": "872NKZ", "StateProvince": "TX", "Mileage": 62124, "MileageDistanceID": 1, "LastMileage_DT_UTC": "\/Date(1232100000000)\/", "LastMileage_DT_TZID": 1, "LastMileage_DT_Local": "\/Date(1232082000000)\/", "ColorID": 24, "PriorDamage": "", "PriorDmgLstUpdate": null, "TravDirID": null, "HasDriver": null, "HasPassenger": null, "ClientEmployeeListID": null, "ClientVehOwnerID": null, "PrimaryClientVehNum": null, "VehBookValue": null, "NewVehOnOrder": null, "OnRoadDate_UTC": null, "OnRoadDate_TZID": 1, "OnRoadDate_Local": null, "OffRoadDate_UTC": null, "OffRoadDate_TZID": 1, "OffRoadDate_Local": null, "ContractStartDate_UTC": null, "ContractStartDate_TZID": 1, "ContractStartDate_Local": null, "ContractEndDate_UTC": null, "ContractEndDate_TZID": 1, "ContractEndDate_Local": null, "VehicleDetail1": null, "VehicleDetail2": null, "VehicleDetail3": null, "VehicleDetail4": null, "VehicleDetail5": null, "VehicleDetail6": null, "VehicleDetails": "", "CreateUserID": 5202639, "Create_DT_UTC": "\/Date(1232153381030)\/", "Create_DT_TZID": 1, "Create_DT_Local": "\/Date(1232135381030)\/", "UpdateUserID": null, "Update_DT_UTC": null, "Update_DT_TZID": null, "Update_DT_Local": null, "PlateCountryID": 1, "VehBookValueCurrencyID": null, "ClientOrgName": "Ashland", "BranchOrgName": "Valvoline", "Color": null, "VehicleStyle": null, "ServiceTypeID": null, "ClientTitle": null, "AssetOwnerID": null, "OrgStructureID1": 2565 }, { "ClientVehicleListID": 1528462, "ClaimVehicleID": 921112, "OrgStructureID": 2565, "ClientVehNo": "", "VehYear": 2006, "Make": "Chevrolet", "Model": "Silverado", "VehicleStyleID": 13, "VIN": "2GCEK13T561234739", "PlateNo": "", "StateProvince": "OR", "Mileage": 0, "MileageDistanceID": 1, "LastMileage_DT_UTC": "\/Date(1288771200000)\/", "LastMileage_DT_TZID": 1, "LastMileage_DT_Local": "\/Date(1288756800000)\/", "ColorID": null, "PriorDamage": "", "PriorDmgLstUpdate": null, "TravDirID": null, "HasDriver": null, "HasPassenger": null, "ClientEmployeeListID": null, "ClientVehOwnerID": null, "PrimaryClientVehNum": null, "VehBookValue": null, "NewVehOnOrder": null, "OnRoadDate_UTC": null, "OnRoadDate_TZID": 1, "OnRoadDate_Local": null, "OffRoadDate_UTC": null, "OffRoadDate_TZID": 1, "OffRoadDate_Local": null, "ContractStartDate_UTC": null, "ContractStartDate_TZID": 1, "ContractStartDate_Local": null, "ContractEndDate_UTC": null, "ContractEndDate_TZID": 1, "ContractEndDate_Local": null, "VehicleDetail1": null, "VehicleDetail2": null, "VehicleDetail3": null, "VehicleDetail4": null, "VehicleDetail5": null, "VehicleDetail6": null, "VehicleDetails": "", "CreateUserID": 5220212, "Create_DT_UTC": "\/Date(1288822153993)\/", "Create_DT_TZID": 1, "Create_DT_Local": "\/Date(1288807753993)\/", "UpdateUserID": null, "Update_DT_UTC": null, "Update_DT_TZID": null, "Update_DT_Local": null, "PlateCountryID": 1, "VehBookValueCurrencyID": null, "ClientOrgName": "Ashland", "BranchOrgName": "Valvoline", "Color": null, "VehicleStyle": null, "ServiceTypeID": null, "ClientTitle": null, "AssetOwnerID": null, "OrgStructureID1": 2565 }];
  $scope.loadSubBranch = function (orgId) { };
  $scope.breadCrumb = [{ id: 1, name: 'Donlen' }, { id: 1, name: 'Donlen USA' }, { id: 1, name: 'ABS Global Inc - 2138' }, { id: 1, name: 'Fleet: 058031-PIC' }];
  $scope.breadCrumbBranches = [{ "id": 26972, "name": "Account: 38126-PIC-ADMIN" }, { "id": 26973, "name": "Account: 38128-PIC-ZICK" }, { "id": 26974, "name": "Account: 38129-PIC-JOBIN" }, { "id": 30892, "name": "Account: 38203-PIC-PEREZ" }, { "id": 30893, "name": "Account: 38204-PIC-CULBERTSON" }, { "id": 30894, "name": "Account: 38207-PIC-THOMAS" }, { "id": 30895, "name": "Account: 38210-PIC-CANO" }, { "id": 30896, "name": "Account: 38215-PIC-KRAMER" }, { "id": 30907, "name": "Account: 38205-PIC-MCCULLEY" }, { "id": 30908, "name": "Account: 38209-PIC-HAMILTON" }, { "id": 30909, "name": "Account: 38212-PIC-COATES" }, { "id": 30910, "name": "Account: 38213-PIC-KLEIN" }, { "id": 30911, "name": "Account: 38214-PIC-PINILLA" }, { "id": 30912, "name": "Account: 38216-PIC-FITZGERALD" }, { "id": 30917, "name": "Account: 38127-PIC-ALTFILLISCH" }, { "id": 30918, "name": "Account: 38202-PIC-SMITH" }, { "id": 30919, "name": "Account: 38206-PIC-WILKEN" }, { "id": 30920, "name": "Account: 38208-PIC-MELODY" }, { "id": 30921, "name": "Account: 38211-PIC-MITTAG" }, { "id": 31424, "name": "Account: 38201-PIC-CANTRELL" }, { "id": 34083, "name": "Account: 58051-PIC-REETZKE" }, { "id": 34084, "name": "Account: 58052-PIC-WILKERSON" }, { "id": 34086, "name": "Account: 58033-PIC-CASE" }, { "id": 34087, "name": "Account: 58049-PIC-PIVA" }, { "id": 34089, "name": "Account: 58032-PIC-SOSNICKI" }, { "id": 34090, "name": "Account: 58034-PIC-HOVER" }, { "id": 34091, "name": "Account: 58043-PIC-BLUMHAGEN" }, { "id": 34092, "name": "Account: 58044-PIC-WALTERS" }, { "id": 34093, "name": "Account: 58054-PIC-HIATT" }, { "id": 34094, "name": "Account: 58053-PIC-HOFFMAN" }];

  $scope.serviceTypes = [{ "id": 1, "name": "Incident" }, { "id": 2, "name": "Glass Only" }, { "id": 3, "name": "Rental Only" }, { "id": 4, "name": "Glass-Vandalism" }, { "id": 5, "name": "Subrogation Only" }, { "id": 6, "name": "Shop Assignment Only" }, { "id": 7, "name": "Inspection Management" }, { "id": 10, "name": "Road Side Assistance" }, { "id": 11, "name": "Third Party Claim" }, { "id": 12, "name": "FNOL Only" }, { "id": 13, "name": "Maintenance Rental" }, { "id": 14, "name": "Salvage Only" }];


  presidents = [
  {
    "number": 1,
    "president": "George Washington",
    "birth_year": 1732,
    "death_year": 1799,
    "took_office": "1789-04-30",
    "left_office": "1797-03-04",
    "party": "No Party"
  },
  {
    "number": 2,
    "president": "John Adams",
    "birth_year": 1735,
    "death_year": 1826,
    "took_office": "1797-03-04",
    "left_office": "1801-03-04",
    "party": "Federalist"
  },
  {
    "number": 3,
    "president": "Thomas Jefferson",
    "birth_year": 1743,
    "death_year": 1826,
    "took_office": "1801-03-04",
    "left_office": "1809-03-04",
    "party": "Democratic-Republican"
  },
  {
    "number": 4,
    "president": "James Madison",
    "birth_year": 1751,
    "death_year": 1836,
    "took_office": "1809-03-04",
    "left_office": "1817-03-04",
    "party": "Democratic-Republican"
  },
  {
    "number": 5,
    "president": "James Monroe",
    "birth_year": 1758,
    "death_year": 1831,
    "took_office": "1817-03-04",
    "left_office": "1825-03-04",
    "party": "Democratic-Republican"
  },
  {
    "number": 6,
    "president": "John Quincy Adams",
    "birth_year": 1767,
    "death_year": 1848,
    "took_office": "1825-03-04",
    "left_office": "1829-03-04",
    "party": "Democratic-Republican"
  },
  {
    "number": 7,
    "president": "Andrew Jackson",
    "birth_year": 1767,
    "death_year": 1845,
    "took_office": "1829-03-04",
    "left_office": "1837-03-04",
    "party": "Democratic"
  },
  {
    "number": 8,
    "president": "Martin Van Buren",
    "birth_year": 1782,
    "death_year": 1862,
    "took_office": "1837-03-04",
    "left_office": "1841-03-04",
    "party": "Democratic"
  },
  {
    "number": 9,
    "president": "William Henry Harrison",
    "birth_year": 1773,
    "death_year": 1841,
    "took_office": "1841-03-04",
    "left_office": "1841-04-04",
    "party": "Whig"
  },
  {
    "number": 10,
    "president": "John Tyler",
    "birth_year": 1790,
    "death_year": 1862,
    "took_office": "1841-04-04",
    "left_office": "1845-03-04",
    "party": "Whig"
  },
  {
    "number": 11,
    "president": "James K. Polk",
    "birth_year": 1795,
    "death_year": 1849,
    "took_office": "1845-03-04",
    "left_office": "1849-03-04",
    "party": "Democratic"
  },
  {
    "number": 12,
    "president": "Zachary Taylor",
    "birth_year": 1784,
    "death_year": 1850,
    "took_office": "1849-03-04",
    "left_office": "1850-07-09",
    "party": "Whig"
  },
  {
    "number": 13,
    "president": "Millard Fillmore",
    "birth_year": 1800,
    "death_year": 1874,
    "took_office": "1850-07-09",
    "left_office": "1853-03-04",
    "party": "Whig"
  },
  {
    "number": 14,
    "president": "Franklin Pierce",
    "birth_year": 1804,
    "death_year": 1869,
    "took_office": "1853-03-04",
    "left_office": "1857-03-04",
    "party": "Democratic"
  },
  {
    "number": 15,
    "president": "James Buchanan",
    "birth_year": 1791,
    "death_year": 1868,
    "took_office": "1857-03-04",
    "left_office": "1861-03-04",
    "party": "Democratic"
  },
  {
    "number": 16,
    "president": "Abraham Lincoln",
    "birth_year": 1809,
    "death_year": 1865,
    "took_office": "1861-03-04",
    "left_office": "1865-04-15",
    "party": "Republican"
  },
  {
    "number": 17,
    "president": "Andrew Johnson",
    "birth_year": 1808,
    "death_year": 1875,
    "took_office": "1865-04-15",
    "left_office": "1869-03-04",
    "party": "Democratic"
  },
  {
    "number": 18,
    "president": "Ulysses S. Grant",
    "birth_year": 1822,
    "death_year": 1885,
    "took_office": "1869-03-04",
    "left_office": "1877-03-04",
    "party": "Republican"
  },
  {
    "number": 19,
    "president": "Rutherford B. Hayes",
    "birth_year": 1822,
    "death_year": 1893,
    "took_office": "1877-03-04",
    "left_office": "1881-03-04",
    "party": "Republican"
  },
  {
    "number": 20,
    "president": "James A. Garfield",
    "birth_year": 1831,
    "death_year": 1881,
    "took_office": "1881-03-04",
    "left_office": "1881-09-19",
    "party": "Republican"
  },
  {
    "number": 21,
    "president": "Chester A. Arthur",
    "birth_year": 1829,
    "death_year": 1886,
    "took_office": "1881-09-19",
    "left_office": "1885-03-04",
    "party": "Republican"
  },
  {
    "number": 22,
    "president": "Grover Cleveland",
    "birth_year": 1837,
    "death_year": 1908,
    "took_office": "1885-03-04",
    "left_office": "1889-03-04",
    "party": "Democratic"
  },
  {
    "number": 23,
    "president": "Benjamin Harrison",
    "birth_year": 1833,
    "death_year": 1901,
    "took_office": "1889-03-04",
    "left_office": "1893-03-04",
    "party": "Republican"
  },
  {
    "number": 24,
    "president": "Grover Cleveland",
    "birth_year": 1837,
    "death_year": 1908,
    "took_office": "1893-03-04",
    "left_office": "1897-03-04",
    "party": "Democratic"
  },
  {
    "number": 25,
    "president": "William McKinley",
    "birth_year": 1843,
    "death_year": 1901,
    "took_office": "1897-03-04",
    "left_office": "1901-09-14",
    "party": "Republican"
  },
  {
    "number": 26,
    "president": "Theodore Roosevelt",
    "birth_year": 1858,
    "death_year": 1919,
    "took_office": "1901-09-14",
    "left_office": "1909-03-04",
    "party": "Republican"
  },
  {
    "number": 27,
    "president": "William Howard Taft",
    "birth_year": 1857,
    "death_year": 1930,
    "took_office": "1909-03-04",
    "left_office": "1913-03-04",
    "party": "Republican"
  },
  {
    "number": 28,
    "president": "Woodrow Wilson",
    "birth_year": 1856,
    "death_year": 1924,
    "took_office": "1913-03-04",
    "left_office": "1921-03-04",
    "party": "Democratic"
  },
  {
    "number": 29,
    "president": "Warren G. Harding",
    "birth_year": 1865,
    "death_year": 1923,
    "took_office": "1921-03-04",
    "left_office": "1923-08-02",
    "party": "Republican"
  },
  {
    "number": 30,
    "president": "Calvin Coolidge",
    "birth_year": 1872,
    "death_year": 1933,
    "took_office": "1923-08-02",
    "left_office": "1929-03-04",
    "party": "Republican"
  },
  {
    "number": 31,
    "president": "Herbert Hoover",
    "birth_year": 1874,
    "death_year": 1964,
    "took_office": "1929-03-04",
    "left_office": "1933-03-04",
    "party": "Republican"
  },
  {
    "number": 32,
    "president": "Franklin D. Roosevelt",
    "birth_year": 1882,
    "death_year": 1945,
    "took_office": "1933-03-04",
    "left_office": "1945-04-12",
    "party": "Democratic"
  },
  {
    "number": 33,
    "president": "Harry S. Truman",
    "birth_year": 1884,
    "death_year": 1972,
    "took_office": "1945-04-12",
    "left_office": "1953-01-20",
    "party": "Democratic"
  },
  {
    "number": 34,
    "president": "Dwight D. Eisenhower",
    "birth_year": 1890,
    "death_year": 1969,
    "took_office": "1953-01-20",
    "left_office": "1961-01-20",
    "party": "Republican"
  },
  {
    "number": 35,
    "president": "John F. Kennedy",
    "birth_year": 1917,
    "death_year": 1963,
    "took_office": "1961-01-20",
    "left_office": "1963-11-22",
    "party": "Democratic"
  },
  {
    "number": 36,
    "president": "Lyndon B. Johnson",
    "birth_year": 1908,
    "death_year": 1973,
    "took_office": "1963-11-22",
    "left_office": "1969-01-20",
    "party": "Democratic"
  },
  {
    "number": 37,
    "president": "Richard Nixon",
    "birth_year": 1913,
    "death_year": 1994,
    "took_office": "1969-01-20",
    "left_office": "1974-08-09",
    "party": "Republican"
  },
  {
    "number": 38,
    "president": "Gerald Ford",
    "birth_year": 1913,
    "death_year": 2006,
    "took_office": "1974-08-09",
    "left_office": "1977-01-20",
    "party": "Republican"
  },
  {
    "number": 39,
    "president": "Jimmy Carter",
    "birth_year": 1924,
    "death_year": null,
    "took_office": "1977-01-20",
    "left_office": "1981-01-20",
    "party": "Democratic"
  },
  {
    "number": 40,
    "president": "Ronald Reagan",
    "birth_year": 1911,
    "death_year": 2004,
    "took_office": "1981-01-20",
    "left_office": "1989-01-20",
    "party": "Republican"
  },
  {
    "number": 41,
    "president": "George H. W. Bush",
    "birth_year": 1924,
    "death_year": null,
    "took_office": "1989-01-20",
    "left_office": "1993-01-20",
    "party": "Republican"
  },
  {
    "number": 42,
    "president": "Bill Clinton",
    "birth_year": 1946,
    "death_year": null,
    "took_office": "1993-01-20",
    "left_office": "2001-01-20",
    "party": "Democratic"
  },
  {
    "number": 43,
    "president": "George W. Bush",
    "birth_year": 1946,
    "death_year": null,
    "took_office": "2001-01-20",
    "left_office": "2009-01-20",
    "party": "Republican"
  },
  {
    "number": 44,
    "president": "Barack Obama",
    "birth_year": 1961,
    "death_year": null,
    "took_office": "2009-01-20",
    "left_office": null,
    "party": "Democratic"
  }
  ];
  var fn = $scope.fn = {

    stringit: function (item) {

      var first, middle, last, ordinal

      var s = item.president.split(' ');

      switch (s.length) {
        case 2:
          first = s[0];
          middle = "";
          last = s[1];
          break;
        case 3:
          first = s[0];
          middle = s[1];
          last = s[2];
          break;
        case 4:
          first = s[0];
          middle = s[1] + " " + s[2];
          last = s[3];
          break;
      }

      ordinal = item.number;

      var x = ordinal + '\t' + first + '\t' + middle + '\t' + last;

      console.log(s)

      return x;

    },
    parse: function () {

      var nResult = "";

      for (var i = 0 ; i < presidents.length; i++) {
        nResult += fn.stringit(presidents[i]) + '\n';
      }

      return nResult;
    }
  }

}]);
