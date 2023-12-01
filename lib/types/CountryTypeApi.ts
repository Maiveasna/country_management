export interface CountryTpe  {
    flags:        Flags;
    name:         Name;
    cca2:         string;
    cca3:         string;
    idd:          Idd;
    altSpellings: string[];
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Idd {
    root:     Root;
    suffixes: string[];
}

export enum Root {
    Empty = "",
    The1 = "+1",
    The2 = "+2",
    The3 = "+3",
    The4 = "+4",
    The5 = "+5",
    The6 = "+6",
    The7 = "+7",
    The8 = "+8",
    The9 = "+9",
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}
