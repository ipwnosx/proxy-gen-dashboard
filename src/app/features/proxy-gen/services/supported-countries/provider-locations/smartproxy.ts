

export interface SpLocInfo {
	location: 		string;
	abbr: 			string;
	startPort:		string;
	endPort: 		string;
	rotatingPort: 	string;
}

// Matches against location and abbr fields.
// If no match, return the location corresponding to random
export function findSpLocationByCountry(country: string): SpLocInfo {
	for (let lInfo of spLocationInfo) {
		if (lInfo.abbr == country || lInfo.location == country) {
			return lInfo
		}
	}
	return spLocationInfo[0]
}

export const spLocationInfo: SpLocInfo[] = [
	{
		location: "Random",
		abbr: "gate",
		startPort: "10000",
		endPort: "49999",
		rotatingPort: "7000",
	},
	{
		location: "USA",
		abbr: "us",
		startPort: "10001",
		endPort: "29999",
		rotatingPort: "10000",
	},
	{
		location:     "Canada",
		abbr:         "ca",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Great Britain",
		abbr:         "gb",
		startPort:    "30001",
		endPort:      "49999",
		rotatingPort: "30000",
	},
	{
		location: "Germany",
		abbr: "de",
		startPort: "20001",
		endPort: "29999",
		rotatingPort: "20000",
	},
	{
		location:     "France",
		abbr:         "fr",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Spain",
		abbr:         "es",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Italy",
		abbr:         "it",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Sweden",
		abbr:         "se",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location: "Greece",
		abbr: "gr",
		startPort: "30001",
		endPort: "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Portugal",
		abbr:         "pt",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Netherlands",
		abbr:         "nl",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Belgium",
		abbr:         "be",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Russia",
		abbr:         "ru",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location: "Ukraine",
		abbr: "ua",
		startPort: "40001",
		endPort: "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Poland",
		abbr:         "pl",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Israel",
		abbr:         "il",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Turkey",
		abbr:         "tr",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Australia",
		abbr:         "au",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location: "Malaysia",
		abbr: "my",
		startPort: "30001",
		endPort: "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Thailand",
		abbr:         "th",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "South Korea",
		abbr:         "kr",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Japan",
		abbr:         "jp",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Philippines",
		abbr:         "ph",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location: "Singapore",
		abbr: "sg",
		startPort: "10001",
		endPort: "19999",
		rotatingPort: "10000",
	},
	{
		location:     "China",
		abbr:         "cn",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Hong Kong",
		abbr:         "hk",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Taiwan",
		abbr:         "tw",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "India",
		abbr:         "in",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location: "Pakistan",
		abbr: "pk",
		startPort: "10001",
		endPort: "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Iran",
		abbr:         "ir",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Indonesia",
		abbr:         "id",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Azerbaijan",
		abbr:         "az",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "Kazakhstan",
		abbr:         "kz",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location: "UAE",
		abbr: "ae",
		startPort: "20001",
		endPort: "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Mexico",
		abbr:         "mx",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Brazil",
		abbr:         "br",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Argentina",
		abbr:         "ar",
		startPort:    "10001",
		endPort:      "19999",
		rotatingPort: "10000",
	},
	{
		location:     "Chile",
		abbr:         "cl",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location: "Peru",
		abbr: "pe",
		startPort: "40001",
		endPort: "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Ecuador",
		abbr:         "ec",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location:     "Colombia",
		abbr:         "co",
		startPort:    "30001",
		endPort:      "39999",
		rotatingPort: "30000",
	},
	{
		location:     "South Africa",
		abbr:         "za",
		startPort:    "40001",
		endPort:      "49999",
		rotatingPort: "40000",
	},
	{
		location:     "Egypt",
		abbr:         "eg",
		startPort:    "20001",
		endPort:      "29999",
		rotatingPort: "20000",
	},
	{
		location: "Angola",
		abbr: "ao",
		startPort: "18001",
		endPort: "18999",
		rotatingPort: "18000",
	},
	{
		location:     "Cameroon",
		abbr:         "cm",
		startPort:    "19001",
		endPort:      "19999",
		rotatingPort: "19000",
	},
	{
		location:     "Central African Republic",
		abbr:         "cf",
		startPort:    "10001",
		endPort:      "10999",
		rotatingPort: "10000",
	},
	{
		location:     "Chad",
		abbr:         "td",
		startPort:    "11001",
		endPort:      "11999",
		rotatingPort: "11000",
	},
	{
		location:     "Benin",
		abbr:         "bj",
		startPort:    "12001",
		endPort:      "12999",
		rotatingPort: "12000",
	},
	{
		location: "Ethiopia",
		abbr: "et",
		startPort: "13001",
		endPort: "13999",
		rotatingPort: "13000",
	},
	{
		location:     "Djibouti",
		abbr:         "dj",
		startPort:    "14001",
		endPort:      "14999",
		rotatingPort: "14000",
	},
	{
		location:     "Gambia",
		abbr:         "gm",
		startPort:    "15001",
		endPort:      "15999",
		rotatingPort: "15000",
	},
	{
		location:     "Ghana",
		abbr:         "gh",
		startPort:    "43001",
		endPort:      "43999",
		rotatingPort: "43000",
	},
	{
		location:     "Kenya",
		abbr:         "ke",
		startPort:    "45001",
		endPort:      "45999",
		rotatingPort: "45000",
	},
	{
		location: "Liberia",
		abbr: "lr",
		startPort: "46001",
		endPort: "46999",
		rotatingPort: "46000",
	},
	{
		location:     "Madagascar",
		abbr:         "mg",
		startPort:    "47001",
		endPort:      "47999",
		rotatingPort: "47000",
	},
	{
		location:     "Mali",
		abbr:         "ml",
		startPort:    "48001",
		endPort:      "48999",
		rotatingPort: "48000",
	},
	{
		location:     "Mauritania",
		abbr:         "mr",
		startPort:    "16001",
		endPort:      "16999",
		rotatingPort: "16000",
	},
	{
		location:     "Mauritius",
		abbr:         "mu",
		startPort:    "17001",
		endPort:      "17999",
		rotatingPort: "17000",
	},
	{
		location: "Morocco",
		abbr: "ma",
		startPort: "40001",
		endPort: "40999",
		rotatingPort: "40000",
	},
	{
		location:     "Mozambique",
		abbr:         "mz",
		startPort:    "41001",
		endPort:      "41999",
		rotatingPort: "41000",
	},
	{
		location:     "Nigeria",
		abbr:         "ng",
		startPort:    "42001",
		endPort:      "42999",
		rotatingPort: "42000",
	},
	{
		location:     "Senegal",
		abbr:         "sn",
		startPort:    "49001",
		endPort:      "49999",
		rotatingPort: "49000",
	},
	{
		location:     "Seychelles",
		abbr:         "sc",
		startPort:    "10001",
		endPort:      "10999",
		rotatingPort: "10000",
	},
	{
		location: "Zimbabwe",
		abbr: "zw",
		startPort: "11001",
		endPort: "11999",
		rotatingPort: "11000",
	},
	{
		location:     "South Sudan",
		abbr:         "ss",
		startPort:    "12001",
		endPort:      "12999",
		rotatingPort: "12000",
	},
	{
		location:     "Sudan",
		abbr:         "sd",
		startPort:    "31001",
		endPort:      "31999",
		rotatingPort: "31000",
	},
	{
		location:     "Togo",
		abbr:         "tg",
		startPort:    "32001",
		endPort:      "32999",
		rotatingPort: "32000",
	},
	{
		location:     "Tunisia",
		abbr:         "tn",
		startPort:    "33001",
		endPort:      "33999",
		rotatingPort: "33000",
	},
	{
		location: "Uganda",
		abbr: "ug",
		startPort: "34001",
		endPort: "34999",
		rotatingPort: "34000",
	},
	{
		location:     "Zambia",
		abbr:         "zm",
		startPort:    "35001",
		endPort:      "35999",
		rotatingPort: "35000",
	},
	{
		location:     "Afghanistan",
		abbr:         "af",
		startPort:    "36001",
		endPort:      "36999",
		rotatingPort: "36000",
	},
	{
		location:     "Bahrain",
		abbr:         "bh",
		startPort:    "37001",
		endPort:      "37999",
		rotatingPort: "37000",
	},
	{
		location:     "Bangladesh",
		abbr:         "bd",
		startPort:    "41001",
		endPort:      "41999",
		rotatingPort: "41000",
	},
	{
		location: "Bhutan",
		abbr: "bt",
		startPort: "45001",
		endPort: "45999",
		rotatingPort: "45000",
	},
	{
		location:     "Myanmar",
		abbr:         "mm",
		startPort:    "46001",
		endPort:      "46999",
		rotatingPort: "46000",
	},
	{
		location:     "Cambodia",
		abbr:         "kh",
		startPort:    "47001",
		endPort:      "47999",
		rotatingPort: "47000",
	},
	{
		location:     "Iraq",
		abbr:         "iq",
		startPort:    "44001",
		endPort:      "44999",
		rotatingPort: "44000",
	},
	{
		location:     "Jordan",
		abbr:         "jo",
		startPort:    "26001",
		endPort:      "26999",
		rotatingPort: "26000",
	},
	{
		location: "Lebanon",
		abbr: "lb",
		startPort: "27001",
		endPort: "27999",
		rotatingPort: "27000",
	},
	{
		location:     "Maldives",
		abbr:         "mv",
		startPort:    "28001",
		endPort:      "28999",
		rotatingPort: "28000",
	},
	{
		location:     "Mongolia",
		abbr:         "mn",
		startPort:    "29001",
		endPort:      "29999",
		rotatingPort: "29000",
	},
	{
		location:     "Oman",
		abbr:         "om",
		startPort:    "30001",
		endPort:      "30999",
		rotatingPort: "30000",
	},
	{
		location:     "Qatar",
		abbr:         "qa",
		startPort:    "44001",
		endPort:      "44999",
		rotatingPort: "44000",
	},
	{
		location: "Saudi Arabia",
		abbr: "sa",
		startPort: "45001",
		endPort: "45999",
		rotatingPort: "45000",
	},
	{
		location:     "Turkmenistan",
		abbr:         "tm",
		startPort:    "47001",
		endPort:      "47999",
		rotatingPort: "47000",
	},
	{
		location:     "Uzbekistan",
		abbr:         "uz",
		startPort:    "48001",
		endPort:      "48999",
		rotatingPort: "48000",
	},
	{
		location:     "Yemen",
		abbr:         "ye",
		startPort:    "49001",
		endPort:      "49999",
		rotatingPort: "49000",
	},
	{
		location:     "Albania",
		abbr:         "al",
		startPort:    "33001",
		endPort:      "33999",
		rotatingPort: "33000",
	},
	{
		location: "Andorra",
		abbr: "ad",
		startPort: "34001",
		endPort: "34999",
		rotatingPort: "34000",
	},
	{
		location:     "Austria",
		abbr:         "at",
		startPort:    "35001",
		endPort:      "35999",
		rotatingPort: "35000",
	},
	{
		location:     "Armenia",
		abbr:         "am",
		startPort:    "42001",
		endPort:      "42999",
		rotatingPort: "42000",
	},
	{
		location:     "Bosnia and Herzegovina",
		abbr:         "ba",
		startPort:    "37001",
		endPort:      "37999",
		rotatingPort: "37000",
	},
	{
		location:     "Bulgaria",
		abbr:         "bg",
		startPort:    "38001",
		endPort:      "38999",
		rotatingPort: "38000",
	},
	{
		location: "Belarus",
		abbr: "by",
		startPort: "39001",
		endPort: "39999",
		rotatingPort: "39000",
	},
	{
		location:     "Croatia",
		abbr:         "hr",
		startPort:    "40001",
		endPort:      "40999",
		rotatingPort: "40000",
	},
	{
		location:     "Cyprus",
		abbr:         "cy",
		startPort:    "48001",
		endPort:      "48999",
		rotatingPort: "48000",
	},
	{
		location:     "Czech Republic",
		abbr:         "cz",
		startPort:    "26001",
		endPort:      "26999",
		rotatingPort: "26000",
	},
	{
		location:     "Denmark",
		abbr:         "dk",
		startPort:    "27001",
		endPort:      "27999",
		rotatingPort: "27000",
	},
	{
		location: "Estonia",
		abbr: "ee",
		startPort: "28001",
		endPort: "28999",
		rotatingPort: "28000",
	},
	{
		location:     "Finland",
		abbr:         "fi",
		startPort:    "41001",
		endPort:      "41999",
		rotatingPort: "41000",
	},
	{
		location:     "Georgia",
		abbr:         "ge",
		startPort:    "43001",
		endPort:      "43999",
		rotatingPort: "43000",
	},
	{
		location:     "Hungary",
		abbr:         "hu",
		startPort:    "43001",
		endPort:      "43999",
		rotatingPort: "43000",
	},
	{
		location:     "Iceland",
		abbr:         "is",
		startPort:    "23001",
		endPort:      "23999",
		rotatingPort: "23000",
	},
	{
		location: "Ireland",
		abbr: "ie",
		startPort: "24001",
		endPort: "24999",
		rotatingPort: "24000",
	},
	{
		location:     "Latvia",
		abbr:         "lv",
		startPort:    "22001",
		endPort:      "22999",
		rotatingPort: "22000",
	},
	{
		location:     "Liechtenstein",
		abbr:         "li",
		startPort:    "23001",
		endPort:      "23999",
		rotatingPort: "23000",
	},
	{
		location:     "Lithuania",
		abbr:         "lt",
		startPort:    "24001",
		endPort:      "24999",
		rotatingPort: "24000",
	},
	{
		location:     "Luxembourg",
		abbr:         "lu",
		startPort:    "25001",
		endPort:      "25999",
		rotatingPort: "25000",
	},
	{
		location: "Monaco",
		abbr: "mc",
		startPort: "10001",
		endPort: "10999",
		rotatingPort: "10000",
	},
	{
		location:     "Moldova",
		abbr:         "md",
		startPort:    "11001",
		endPort:      "11999",
		rotatingPort: "11000",
	},
	{
		location:     "Montenegro",
		abbr:         "me",
		startPort:    "12001",
		endPort:      "12999",
		rotatingPort: "12000",
	},
	{
		location:     "Norway",
		abbr:         "no",
		startPort:    "13001",
		endPort:      "13999",
		rotatingPort: "13000",
	},
	{
		location:     "Romania",
		abbr:         "ro",
		startPort:    "13001",
		endPort:      "13999",
		rotatingPort: "13000",
	},
	{
		location: "Serbia",
		abbr: "rs",
		startPort: "14001",
		endPort: "14999",
		rotatingPort: "14000",
	},
	{
		location:     "Slovakia",
		abbr:         "sk",
		startPort:    "15001",
		endPort:      "15999",
		rotatingPort: "15000",
	},
	{
		location:     "Slovenia",
		abbr:         "si",
		startPort:    "16001",
		endPort:      "16999",
		rotatingPort: "16000",
	},
	{
		location:     "Switzerland",
		abbr:         "ch",
		startPort:    "29001",
		endPort:      "29999",
		rotatingPort: "29000",
	},
	{
		location:     "Macedonia",
		abbr:         "mk",
		startPort:    "30001",
		endPort:      "30999",
		rotatingPort: "30000",
	},
	{
		location: "Bahamas",
		abbr: "bs",
		startPort: "17001",
		endPort: "17999",
		rotatingPort: "17000",
	},
	{
		location:     "Belize",
		abbr:         "bz",
		startPort:    "18001",
		endPort:      "18999",
		rotatingPort: "18000",
	},
	{
		location:     "British Virgin Islands",
		abbr:         "vg",
		startPort:    "19001",
		endPort:      "19999",
		rotatingPort: "19000",
	},
	{
		location:     "Costa Rica",
		abbr:         "cr",
		startPort:    "31001",
		endPort:      "31999",
		rotatingPort: "31000",
	},
	{
		location:     "Cuba",
		abbr:         "cu",
		startPort:    "32001",
		endPort:      "32999",
		rotatingPort: "32000",
	},
	{
		location: "Dominica",
		abbr: "dm",
		startPort: "17001",
		endPort: "17999",
		rotatingPort: "17000",
	},
	{
		location:     "Haiti",
		abbr:         "ht",
		startPort:    "18001",
		endPort:      "18999",
		rotatingPort: "18000",
	},
	{
		location:     "Honduras",
		abbr:         "hn",
		startPort:    "19001",
		endPort:      "19999",
		rotatingPort: "19000",
	},
	{
		location:     "Jamaica",
		abbr:         "jm",
		startPort:    "20001",
		endPort:      "20999",
		rotatingPort: "20000",
	},
	{
		location:     "Aruba",
		abbr:         "aw",
		startPort:    "21001",
		endPort:      "21999",
		rotatingPort: "21000",
	},
	{
		location: "Panama",
		abbr: "pa",
		startPort: "20001",
		endPort: "20999",
		rotatingPort: "20000",
	},
	{
		location:     "Puerto Rico",
		abbr:         "pr",
		startPort:    "21001",
		endPort:      "21999",
		rotatingPort: "21000",
	},
	{
		location:     "Trinidad and Tobago",
		abbr:         "tt",
		startPort:    "22001",
		endPort:      "22999",
		rotatingPort: "22000",
	},
	{
		location:     "Fiji",
		abbr:         "fj",
		startPort:    "38001",
		endPort:      "38999",
		rotatingPort: "38000",
	},
	{
		location:     "New Zealand",
		abbr:         "nz",
		startPort:    "39001",
		endPort:      "39999",
		rotatingPort: "39000",
	},
	{
		location: "Bolivia",
		abbr: "bo",
		startPort: "40001",
		endPort: "40999",
		rotatingPort: "40000",
	},
	{
		location:     "Paraguay",
		abbr:         "py",
		startPort:    "14001",
		endPort:      "14999",
		rotatingPort: "14000",
	},
	{
		location:     "Uruguay",
		abbr:         "uy",
		startPort:    "15001",
		endPort:      "15999",
		rotatingPort: "15000",
	},
	{
		location:     "Côte d'Ivoire",
		abbr:         "ci",
		startPort:    "44001",
		endPort:      "44999",
		rotatingPort: "44000",
	},
	{
		location:     "Syria",
		abbr:         "sy",
		startPort:    "20001",
		endPort:      "20999",
		rotatingPort: "20000",
	},
	{
		location: "New York",
		abbr: "city",
		startPort: "21001",
		endPort: "21049",
		rotatingPort: "21000",
	},
	{
		location:     "Los Angeles",
		abbr:         "city",
		startPort:    "21051",
		endPort:      "21099",
		rotatingPort: "21050",
	},
	{
		location:     "Chicago",
		abbr:         "city",
		startPort:    "21101",
		endPort:      "21149",
		rotatingPort: "21100",
	},
	{
		location:     "Houston",
		abbr:         "city",
		startPort:    "21151",
		endPort:      "21199",
		rotatingPort: "21150",
	},
	{
		location:     "Miami",
		abbr:         "city",
		startPort:    "21201",
		endPort:      "21249",
		rotatingPort: "21200",
	},
	{
		location: "London",
		abbr: "city",
		startPort: "21251",
		endPort: "21299",
		rotatingPort: "21250",
	},
	{
		location:     "Berlin",
		abbr:         "city",
		startPort:    "21301",
		endPort:      "21349",
		rotatingPort: "21300",
	},
	{
		location:     "Moscow",
		abbr:         "city",
		startPort:    "21351",
		endPort:      "21399",
		rotatingPort: "21350",
	},
	{
		location:     "Vietnam",
		abbr:         "vn",
		startPort:    "46001",
		endPort:      "46999",
		rotatingPort: "46000",
	},
];
