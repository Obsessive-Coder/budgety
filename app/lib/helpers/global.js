// Taken from on comment on this page...
// https://dev.to/suyashdev/camelcase-to-normal-string-in-javascript-592g
export const camelToFlat = c => (c = c.replace(/[A-Z]/g, " $&"), c[0].toUpperCase() + c.slice(1));

export const removeWhitespace = value => value.replace(' ', '');

export const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});