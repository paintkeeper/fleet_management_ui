export function supplyConvert<I, O>(supplier: () => I | null, converter: (val: I) => O, def: O): O {
    const supplied = supplier()
    return supplied ? converter(supplied) : def
}

export function parseJwt(jwt: string): any {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}