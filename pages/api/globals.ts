export const syni = {
    url: 'https://vef2-2022-h1-synilausn.herokuapp.com',
    name: 'Veitingastaðurinn X'
}

export const rfc = {
    url: 'http://vef2h1-rfc.herokuapp.com',
    name: 'RFC - Reykjavík Fried Chicken'
}

export const useRfc = false;

export const Restaurant = (useRfc) ? rfc : syni;