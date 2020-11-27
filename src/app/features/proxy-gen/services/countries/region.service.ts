import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ProxyPackage } from '../../types/proxy-package';
import { map, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';
import { Region, RegionsByProvider, longname } from '../../types/region';
import { randomString } from 'src/app/core/utilities';

/**
 * This service exposes an observable of country names for the currently
 * selected package in the store. To be used by country select dropdown.
 */

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // All region longnames for current proxy provider. Will be what is displayed in
  // regions dropdown.
  regionLongnames$: Observable<longname[]>;
  // All regions for current proxy provider
  regions$ = new BehaviorSubject<Region[]>([]);

  constructor(private store: StoreService) { 

    this.regionLongnames$ = this.store.selectedPackage$
      .pipe(
        distinctUntilChanged(),
        //tap((pkg) => console.log("new pkg: ", pkg)),
        map((pkg: ProxyPackage): longname[] => {

          if (pkg && pkg.regions) {
            this.regions$.next(pkg.regions);
            return this.removeDuplicatesAndFormat(pkg.regions);
          } 

          this.regions$.next([]);
          return ['No Regions' as longname];
        }),
        //tap((cs) => console.log("new country list: ", cs)),
        shareReplay(1) // because in top bar component the FormStreamDefaulter subscribes late
      )
  }

  private removeDuplicatesAndFormat(regions: Region[]): longname[] {
    // we want to only have each longname once
    const longnamesTemp = {};
    regions.forEach((r) => longnamesTemp[r.longname] = true);

    const longnames: longname[] = Object.keys(longnamesTemp).sort();

    // remove 'random' if exists, and insert at top of list
    let index = longnames.findIndex((l: longname) => l.toLowerCase() == 'random');
    if (index != -1) {
      longnames.splice(index, 1);
    } 
    longnames.unshift('Random');

    return longnames;
  }

  // private countryListFromCodes(countryCodes: string[]) {
  //   const cc = [...countryCodes]; // because state is immutable

  //   // always insert random as first entry if doesn't exist
  //   if (!cc.includes("RANDOM")) {
  //     cc.unshift("RANDOM");
  //   }

  //   // put US as second in list after 'Random' if US is supported by this package
  //   const usIndex = cc.findIndex((code: string) => code == "US");
  //   if (usIndex != -1) {
  //     cc.splice(usIndex, 1);
  //     cc.splice(1, 0, "US"); // insert at second position, just after 'Random'
  //   }


  //   return cc
  //     .map((code: string) => {
  //       const found = this.allCountries.find((c: Country) => c.code == code);

  //       if (found == undefined) {
  //         console.error('didnt find region/country with code: ', code);
  //       }

  //       return found;
  //     })
  // }

}

// const isoCountries = {
//   'RANDOM': 'Random', // Used by smart proxy residential
//   'AF': 'Afghanistan',
//   'AX': 'Aland Islands',
//   'AL': 'Albania',
//   'DZ': 'Algeria',
//   'AS': 'American Samoa',
//   'AD': 'Andorra',
//   'AO': 'Angola',
//   'AI': 'Anguilla',
//   'AQ': 'Antarctica',
//   'AG': 'Antigua And Barbuda',
//   'AR': 'Argentina',
//   'AM': 'Armenia',
//   'AW': 'Aruba',
//   'AU': 'Australia',
//   'AT': 'Austria',
//   'AZ': 'Azerbaijan',
//   'BS': 'Bahamas',
//   'BH': 'Bahrain',
//   'BD': 'Bangladesh',
//   'BB': 'Barbados',
//   'BY': 'Belarus',
//   'BE': 'Belgium',
//   'BZ': 'Belize',
//   'BJ': 'Benin',
//   'BM': 'Bermuda',
//   'BT': 'Bhutan',
//   'BO': 'Bolivia',
//   'BA': 'Bosnia And Herzegovina',
//   'BW': 'Botswana',
//   'BV': 'Bouvet Island',
//   'BR': 'Brazil',
//   'IO': 'British Indian Ocean Territory',
//   'BN': 'Brunei Darussalam',
//   'BG': 'Bulgaria',
//   'BF': 'Burkina Faso',
//   'BI': 'Burundi',
//   'KH': 'Cambodia',
//   'CM': 'Cameroon',
//   'CA': 'Canada',
//   'CV': 'Cape Verde',
//   'KY': 'Cayman Islands',
//   'CF': 'Central African Republic',
//   'TD': 'Chad',
//   'CL': 'Chile',
//   'CN': 'China',
//   'CX': 'Christmas Island',
//   'CC': 'Cocos (Keeling) Islands',
//   'CO': 'Colombia',
//   'KM': 'Comoros',
//   'CG': 'Congo',
//   'CD': 'Congo, Democratic Republic',
//   'CK': 'Cook Islands',
//   'CR': 'Costa Rica',
//   'CI': 'Cote D\'Ivoire',
//   'HR': 'Croatia',
//   'CU': 'Cuba',
//   'CW': 'Curacao',
//   'CY': 'Cyprus',
//   'CZ': 'Czech Republic',
//   'DK': 'Denmark',
//   'DJ': 'Djibouti',
//   'DM': 'Dominica',
//   'DO': 'Dominican Republic',
//   'EC': 'Ecuador',
//   'EG': 'Egypt',
//   'SV': 'El Salvador',
//   'GQ': 'Equatorial Guinea',
//   'ER': 'Eritrea',
//   'EE': 'Estonia',
//   'ET': 'Ethiopia',
//   'FK': 'Falkland Islands (Malvinas)',
//   'FO': 'Faroe Islands',
//   'FJ': 'Fiji',
//   'FI': 'Finland',
//   'FR': 'France',
//   'GF': 'French Guiana',
//   'PF': 'French Polynesia',
//   'TF': 'French Southern Territories',
//   'GA': 'Gabon',
//   'GM': 'Gambia',
//   'GE': 'Georgia',
//   'DE': 'Germany',
//   'GH': 'Ghana',
//   'GI': 'Gibraltar',
//   'GR': 'Greece',
//   'GL': 'Greenland',
//   'GD': 'Grenada',
//   'GP': 'Guadeloupe',
//   'GU': 'Guam',
//   'GT': 'Guatemala',
//   'GG': 'Guernsey',
//   'GN': 'Guinea',
//   'GW': 'Guinea-Bissau',
//   'GY': 'Guyana',
//   'HT': 'Haiti',
//   'HM': 'Heard Island & Mcdonald Islands',
//   'VA': 'Holy See (Vatican City State)',
//   'HN': 'Honduras',
//   'HK': 'Hong Kong',
//   'HU': 'Hungary',
//   'IS': 'Iceland',
//   'IN': 'India',
//   'ID': 'Indonesia',
//   'IR': 'Iran',
//   'IQ': 'Iraq',
//   'IE': 'Ireland',
//   'IM': 'Isle Of Man',
//   'IL': 'Israel',
//   'IT': 'Italy',
//   'JM': 'Jamaica',
//   'JP': 'Japan',
//   'JE': 'Jersey',
//   'JO': 'Jordan',
//   'KZ': 'Kazakhstan',
//   'KE': 'Kenya',
//   'KI': 'Kiribati',
//   'KR': 'Korea',
//   'KW': 'Kuwait',
//   'KG': 'Kyrgyzstan',
//   'LA': 'Laos',
//   'LV': 'Latvia',
//   'LB': 'Lebanon',
//   'LS': 'Lesotho',
//   'LR': 'Liberia',
//   'LY': 'Libyan Arab Jamahiriya',
//   'LI': 'Liechtenstein',
//   'LT': 'Lithuania',
//   'LU': 'Luxembourg',
//   'MO': 'Macao',
//   'MK': 'Macedonia',
//   'MG': 'Madagascar',
//   'MW': 'Malawi',
//   'MY': 'Malaysia',
//   'MV': 'Maldives',
//   'ML': 'Mali',
//   'MT': 'Malta',
//   'MH': 'Marshall Islands',
//   'MQ': 'Martinique',
//   'MR': 'Mauritania',
//   'MU': 'Mauritius',
//   'YT': 'Mayotte',
//   'MX': 'Mexico',
//   'FM': 'Micronesia, Federated States Of',
//   'MD': 'Moldova',
//   'MC': 'Monaco',
//   'MN': 'Mongolia',
//   'ME': 'Montenegro',
//   'MS': 'Montserrat',
//   'MA': 'Morocco',
//   'MZ': 'Mozambique',
//   'MM': 'Myanmar',
//   'NA': 'Namibia',
//   'NR': 'Nauru',
//   'NP': 'Nepal',
//   'NL': 'Netherlands',
//   'AN': 'Netherlands Antilles',
//   'NC': 'New Caledonia',
//   'NZ': 'New Zealand',
//   'NI': 'Nicaragua',
//   'NE': 'Niger',
//   'NG': 'Nigeria',
//   'NU': 'Niue',
//   'NF': 'Norfolk Island',
//   'MP': 'Northern Mariana Islands',
//   'NO': 'Norway',
//   'OM': 'Oman',
//   'PK': 'Pakistan',
//   'PW': 'Palau',
//   'PS': 'Palestinian Territory, Occupied',
//   'PA': 'Panama',
//   'PG': 'Papua New Guinea',
//   'PY': 'Paraguay',
//   'PE': 'Peru',
//   'PH': 'Philippines',
//   'PN': 'Pitcairn',
//   'PL': 'Poland',
//   'PT': 'Portugal',
//   'PR': 'Puerto Rico',
//   'QA': 'Qatar',
//   'RE': 'Reunion',
//   'RO': 'Romania',
//   'RU': 'Russian Federation',
//   'RW': 'Rwanda',
//   'BL': 'Saint Barthelemy',
//   'SH': 'Saint Helena',
//   'SS': 'South Sudan',
//   'KN': 'Saint Kitts And Nevis',
//   'LC': 'Saint Lucia',
//   'MF': 'Saint Martin',
//   'PM': 'Saint Pierre And Miquelon',
//   'VC': 'Saint Vincent And Grenadines',
//   'WS': 'Samoa',
//   'SM': 'San Marino',
//   'ST': 'Sao Tome And Principe',
//   'SA': 'Saudi Arabia',
//   'SN': 'Senegal',
//   'RS': 'Serbia',
//   'SC': 'Seychelles',
//   'SL': 'Sierra Leone',
//   'SG': 'Singapore',
//   'SK': 'Slovakia',
//   'SI': 'Slovenia',
//   'SB': 'Solomon Islands',
//   'SO': 'Somalia',
//   'ZA': 'South Africa',
//   'GS': 'South Georgia And Sandwich Isl.',
//   'ES': 'Spain',
//   'LK': 'Sri Lanka',
//   'SD': 'Sudan',
//   'SR': 'Suriname',
//   'SJ': 'Svalbard And Jan Mayen',
//   'SZ': 'Swaziland',
//   'SE': 'Sweden',
//   'CH': 'Switzerland',
//   'SY': 'Syrian Arab Republic',
//   'TW': 'Taiwan',
//   'TJ': 'Tajikistan',
//   'TZ': 'Tanzania',
//   'TH': 'Thailand',
//   'TL': 'Timor-Leste',
//   'TG': 'Togo',
//   'TK': 'Tokelau',
//   'TO': 'Tonga',
//   'TT': 'Trinidad And Tobago',
//   'TN': 'Tunisia',
//   'TR': 'Turkey',
//   'TM': 'Turkmenistan',
//   'TC': 'Turks And Caicos Islands',
//   'TV': 'Tuvalu',
//   'UG': 'Uganda',
//   'UA': 'Ukraine',
//   'AE': 'United Arab Emirates',
//   'GB': 'United Kingdom',
//   'US': 'United States',
//   'UM': 'United States Outlying Islands',
//   'UY': 'Uruguay',
//   'UZ': 'Uzbekistan',
//   'VU': 'Vanuatu',
//   'VE': 'Venezuela',
//   'VN': 'Viet Nam',
//   'VG': 'Virgin Islands, British',
//   'VI': 'Virgin Islands, U.S.',
//   'WF': 'Wallis And Futuna',
//   'EH': 'Western Sahara',
//   'YE': 'Yemen',
//   'ZM': 'Zambia',
//   'ZW': 'Zimbabwe'
// };
