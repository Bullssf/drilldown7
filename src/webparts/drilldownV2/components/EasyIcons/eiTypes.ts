
/**
 * Minimum interface into Main Web Part Properties needed to use this feature
 */
//To be added to npmFunctions
export interface IEasyIconsWPProps {
  easyIconEnable: boolean; // Used 
  easyIconKeys: string;
  easyIconIgnore: string;
}

export const changeEasyIcons: string[] = ['easyIconEnable', 'easyIconKeys', 'easyIconIgnore', ];

/**
 * Minimum interface into React Component needed to use this feature
 */
export interface IEasyIconProps {
  enable: boolean; // Used 
  Keys: IEasyIconGroups[];
  Ignore: string[];
}



//Default Library Url for all EasyIcons

export const EasyIconLibrary = `/Branding/EasyIcons`;
export const EasyIconLocation = `${window.location.origin}/sites${EasyIconLibrary}/`;


/**
 * HOW TO ADD NEW KEYWORDS
 * 
 * Instructions for adding more Groups:
 * 
 * 1. add to type:  IEasyIconGroups
 * 2. add to type:  IEasyIconFolders
 * 3. add key object to EasyIconObject.Groups
 * 4. add key to array: EasyIconDefaultKeys
 * 5. add key to array: EasyIconValidKeys
 * 6. add associated image to /Branding/EasyIcons/NewFolderName
 * 
 *   
 */

/**
 * IEasyIconFolders should match the actual folders in EasyIcons library
 * IEasyIconGroups should have at least the same values as IEasyIconFolders... 
 *      BUT IEasyIconGroups can have additional ones like ProductsCaps which could be like Products but have a rule to make these all caps in regex
 */
export type IEasyIconGroups =  'Products' | 'Processes' | 'Customers' | 'Functions' | 'Keywords' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Colors' | 'Locations' | 'Transport' | 'Software' | 'FunctionsW' | 'ProductsW' | 'WoW' | 'Words' | 'WebParts' ;
export type IEasyIconFolders = 'Products' | 'Processes' | 'Customers' | 'Functions' | 'Keywords' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Colors' | 'Locations' | 'Transport' | 'Software' | 'FunctionsW'| 'ProductsW' | 'WoW' | 'Words' | 'WebParts' ;

export type IEasyIconPriority = 'Title' | 'Description' | 'FileLeafRef' ;
export type IEasyIconOptions = 's' | 'ing' | 'r' | 'er' | 'd' ;

export interface IEasyIconGroup {
  Folder: IEasyIconFolders;  //Separated Folders from the key for potential future use where we could have different keys using the same folder but different rules.  AKA Regex Capitalization
  Rules: string;
  Icons: string[];                  // Icon Names found in the EasyIcons folder.  Must be spelled exactly as shown and must be ', '
  Suggestions: string[];            // Potential future Icon ideas
  Status: 'Active' | 'Planned' | 'Test';
  Priority: number;                 // Order in which to search for Icon
  Options?: IEasyIconOptions[];     // For possible use looking for similar words
  Exact?: boolean;                  // Excact === Exact casing.  Default is any case
}

export interface IEasyIcons {
  Enabled: boolean;
  Priority: IEasyIconPriority[];
  GroupKeys: IEasyIconGroups[], // From Web Part Props Used to prioritize order of folders to look in
  Valid: IEasyIconGroups[], // Valid keys the web part should find, to test against Keys typed in by user
  Ignore: string[], // Strings comprised of Folder/Icon to ignore, meant to be used in Props to remove undesired icons
  RandomMulti: boolean;  // FUTURE USE:  Use random selection of numbered options... Bank#5 means there is Bank, Bank1, Bank2, Bank3, Bank4, Bank5
  Groups: {
    Products: IEasyIconGroup;
    Processes: IEasyIconGroup;
    Customers: IEasyIconGroup;
    Functions: IEasyIconGroup;
    WebParts: IEasyIconGroup;
    Keywords: IEasyIconGroup;
    Nouns: IEasyIconGroup;
    Verbs: IEasyIconGroup;
    Adjectives: IEasyIconGroup;
    Colors: IEasyIconGroup;
    Locations: IEasyIconGroup;
    Transport: IEasyIconGroup;
    Software: IEasyIconGroup;
    ProductsW: IEasyIconGroup;  // Labels would be Text Words, Labels where the Word is the Icon
    FunctionsW: IEasyIconGroup;  // Labels would be Text Words, Labels where the Word is the Icon
    WoW: IEasyIconGroup;  // Labels would be Text Words, Labels where the Word is the Icon
    Words: IEasyIconGroup;  // Labels would be Text Words, Labels where the Word is the Icon

  }
}
//'Products' | 'Processes' | 'Customers' | 'Functions' | 'Keywords' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Colors' | 'Locations' | 'Transport' | 'Software' | 'FunctionsW' | 'ProductsW' | 'WoW' | 'Words' | 'WebParts' ;
export const EasyIconDefaultKeys: IEasyIconGroups[] = [ 'Products' , 'Processes' , 'Customers' , 'Functions' , 'Keywords' , 'Nouns' , 'Verbs' , 'Adjectives', 'Colors', 'Locations', 'Transport', 'Software', 'FunctionsW', 'ProductsW', 'WoW', 'Words', 'WebParts'  ];
export const EasyIconValidKeys: IEasyIconGroups[] = [ 'Products' , 'Processes' , 'Customers' , 'Functions' , 'Keywords' , 'Nouns' , 'Verbs' , 'Adjectives', 'Colors', 'Locations', 'Transport', 'Software', 'FunctionsW', 'ProductsW', 'WoW', 'Words', 'WebParts'  ];

export const ProductWords : string [] = [ 'Armature', 'Curtain', 'Cushion', 'DAB', 'FAB', 'IC', 'KAB', 'Magnesium', 'Metal', 'PAB', 'Plastic', 'PTSAB', 'Thread', 'Webbing', 'Seatbelt', 'Airbag', 'Wheel', 'AB', 'SW', 'SB', 'IN', 'TE', 'Textile', 'Products' ];
export const FunctionWords: string [] = [ 'Engineering', 'Purchasing', 'Finance', 'Manufacturing', 'Logistics', 'Legal', 'Human Resources' , 'Sales', 'Quality', 'Communications', 'Operations', 'Sustainability', 'IT', 'Information Technology' ];

export const Software: string [] = [ 'JDE', 'Microsoft', 'Service Now', 'SharePoint', 'Windows', 'SAP', 'OneStream', 'Crow Canyon', 'iOS', 'Google', 'Bing' ];


export const WaysOfWorking: string[] = [ 'APS', 'Q5', '1P1p', 'VEVA', ];

export const EasyIconObjectDefault : IEasyIcons = {
  Enabled: true,
  Priority: [ 'Title', 'Description', 'FileLeafRef' ],
  GroupKeys: EasyIconDefaultKeys,
  Valid: EasyIconValidKeys,
  RandomMulti: false,
  Ignore: [],

  Groups: {
    Products: {
      Folder: 'Products',
      Rules: '',
      Icons: ProductWords,
      Suggestions: [ '', '', '', '', '', '', '' ],
      Status: 'Active',
      Priority: 1,
      Options: [ 's' ],
    },

    Processes: {
      Folder: 'Processes',
      Rules: '',
      Icons: [ 'Fold', 'Sew', 'Warehouse', 'Weave', 'Weld', ],
      Suggestions: [ '', '', '', ],
      Status: 'Active',
      Priority: 2,
      Options: [ 'ing', 'r', 'er' ],
    } ,

    Customers: {
      Folder: 'Customers',
      Rules: '',
      Icons: [ 'Audi', 'BMW', 'Daimler', 'FCA', 'Fiat', 'Ford', 'GM', 'Honda', 'Hyundai', 'Isuzu', 'Kia', 'Mercedes', 'Mitsubishi', 'Nissan', 'Rivian', 'Stellantis', 'Subaru', 'Tesla', 'Toyota', 'VW', 'Customers', ],
      Suggestions: [  '', '', '', '', ],
      Status: 'Active',
      Priority: 3,
    } ,

    Functions: {
      Folder: 'Functions',
      Rules: '',
      Icons: FunctionWords,
      Suggestions: [  ],
      Status: 'Active',
      Priority: 4,
    } ,

    WebParts: {
      Folder: 'WebParts',
      Rules: '',
      Icons: [ 'Extreme', 'Contents', 'Drilldown', 'Time', 'List', '', '',  ],
      Suggestions: [ '', '' ],
      Status: 'Active',
      Priority: 4,
    } ,

    Keywords: {
      Folder: 'Keywords',
      Rules: '',
      Icons: [  'Chart', 'Calendar', 'Contact', 'Process', 'Question', 'Request', 'Task', 'Track', 'Tree' ],
      Suggestions: [ 'Start', 'Work', 'Complete', 'Reject', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    Nouns: {
      Folder: 'Nouns',
      Rules: '',
      Icons: [  'Bank', 'Calculator', 'Cargo', 'Code', 'Credit', 'Fire', 'Health', 'Intelligence', 'Key', 'Link', 'Lock', 'Network', 'Program', 'Tool', 'Map', '', '', ],
      Suggestions: [ '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    Transport: {
      Folder: 'Transport',
      Rules: '',
      Icons: [  'Car', 'Truck', 'Cycle', 'MotorCycle', 'Airplane', 'Airport', '', '', '', ],
      Suggestions: [ '', '', '', '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    Software: {
      Folder: 'Software',
      Rules: '',
      Icons: Software,
      Suggestions: [ '', '', '', '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    Verbs: {
      Folder: 'Verbs',
      Rules: '',
      Icons: [  'Charge', 'Expedite', 'Measure', 'Ship', 'Stop', '', '', '', '',  ],
      Suggestions: [ '', '', '', '', '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's', 'ing', 'd' ],
    } ,

    Adjectives: {
      Folder: 'Adjectives',
      Rules: '',
      Icons: [  'Large', 'Medium', 'Small', 'Heavy', 'Light', 'First',  ],
      Suggestions: [ 'Large', 'Medium', 'Small', 'Heavy', 'Light', 'First', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 'r', 'er' ],
    } ,

    Colors: {
      Folder: 'Colors',
      Rules: '',
      Icons: [  'Color', 'Red', 'Yellow', 'Green', 'Blue', 'Black', 'White', 'Bright', 'Dark',  ],
      Suggestions: [ '', '', '', '', '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 'er', 's' ],
    } ,

    Locations: {
      Folder: 'Locations',
      Rules: '',
      Icons: [  'NA', 'North America', 'SA', 'South America', 'Africa', 'EU', 'Europe', 'CH', 'China', 'Asia', 'ROAP',  ],
      Suggestions: [ '', '', '', '', '', '', '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [  ],
    } ,

    ProductsW: {
      Folder: 'ProductsW',
      Rules: '',
      Icons: ProductWords,
      Suggestions: [   '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    FunctionsW: {
      Folder: 'FunctionsW',
      Rules: '',
      Icons: FunctionWords,
      Suggestions: [   '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    WoW: {
      Folder: 'WoW',
      Rules: '',
      Icons: WaysOfWorking,
      Suggestions: [   '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    Words: {
      Folder: 'Words',
      Rules: '',
      Icons: [  'Supplier', 'Vendor', 'Customer',   ],
      Suggestions: [   '', '', '', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,

    // Template: {
    //   Rules: '',
    //   Icons: [ ],
    //   Suggestions: [ '', '', '', '', '', '', '',  ],
    //   Status: 'Test',
    //   Priority: 99,
    // } ,
  }

}

