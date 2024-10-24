/**
 * what is this file doing?
 * in here, I have the namespaces objects that I will export to the slack.js file
 * the slack.js file is the server
 * the slack.js file will emit the nsList event to the client
 */

const wikiNs = {
    name: '/wiki',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
};

const mozillaNs = {
    name: '/mozilla',
    image: 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png',
};

const linuxNs = {
    name: '/linux',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
};

const namespaces = [
    wikiNs,
    mozillaNs,
    linuxNs,
];

module.exports = namespaces;