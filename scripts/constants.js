const rootElement = document.querySelector('#mapGroupTag');
const statisticList = document.querySelector('.statisticList');
const playerData = document.querySelector('.playerData');

let playerStatus = false;

const dataStatistic = [];
const shortStatistic = {};
let keysShortStatistic;
let specificationByLanguage;

const svgns = "http://www.w3.org/2000/svg";

const language = navigator.language.slice(0, 2) || 'uk';
const languageFullName = navigator.language || 'uk_UA';