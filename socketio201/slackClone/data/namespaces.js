const Namespace = require("../classes/Namespace");
const Room = require("../classes/Room");

/**
 * what is this file doing?
 * in here, I have the namespaces objects that I will export to the slack.js file
 * the slack.js file is the server
 * the slack.js file will emit the nsList event to the client
 */

// wikipedia related things
const WikipediaNs = new Namespace({
  id: 0,
  name: "Wikipedia",
  img: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
  endpoint: "/wiki",
});

const wikiHistory = new Room({
  roomId: 0,
  roomTitle: "Wikipedia History",
  namespaceId: 0,
  privateRoom: false,
});

const wikiProgramming = new Room({
  roomId: 1,
  roomTitle: "Programming",
  namespaceId: 0,
  privateRoom: false,
});

const wikiScience = new Room({
  roomId: 2,
  roomTitle: "Science",
  namespaceId: 0,
  privateRoom: false,
});

WikipediaNs.addRoom(wikiHistory);
WikipediaNs.addRoom(wikiProgramming);
WikipediaNs.addRoom(wikiScience);

// Mozilla related things
const MozillaNs = new Namespace({
  id: 1,
  name: "Mozilla",
  img: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png",
  endpoint: "/mozilla",
});

const mozillaSupport = new Room({
  roomId: 0,
  roomTitle: "Mozilla Support",
  namespaceId: 1,
  privateRoom: false,
});

const mozillaAddons = new Room({
  roomId: 1,
  roomTitle: "Add-ons",
  namespaceId: 1,
  privateRoom: false,
});

const mozillaDevelopers = new Room({
  roomId: 2,
  roomTitle: "Developers",
  namespaceId: 1,
  privateRoom: false,
});

MozillaNs.addRoom(mozillaSupport);
MozillaNs.addRoom(mozillaAddons);
MozillaNs.addRoom(mozillaDevelopers);

// Linux related things
const LinuxNs = new Namespace({
  id: 2,
  name: "Linux",
  img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  endpoint: "/linux",
});

const linuxArch = new Room({
  roomId: 0,
  roomTitle: "Arch",
  namespaceId: 2,
  privateRoom: false,
});

const linuxDebian = new Room({
  roomId: 1,
  roomTitle: "Debian",
  namespaceId: 2,
  privateRoom: false,
});

const linuxRedhat = new Room({
  roomId: 2,
  roomTitle: "Redhat",
  namespaceId: 2,
  privateRoom: false,
});

LinuxNs.addRoom(linuxArch);
LinuxNs.addRoom(linuxDebian);
LinuxNs.addRoom(linuxRedhat);

const namespaces = [WikipediaNs, MozillaNs, LinuxNs];

module.exports = namespaces;
