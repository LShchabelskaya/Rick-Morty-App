MIN_CHARACTER_ID = 1;
MAX_CHARACTER_ID = 826;

const container = document.querySelector('.container');
const filterBtnsArr = document.querySelectorAll('.selector-item_radio');
let liveStatus = '';
let gender = '';

filterBtnsArr.forEach((btn) => {
	btn.addEventListener('change', () => {
		if (btn.name === 'gender') {
			gender = btn.value;
		} else {
			liveStatus = btn.value;
		};
		filterRandomCharacters();
	});
});

getRandomCharacters();

function createCard(name, species, status, location, portrait) {
	const card = document.createElement('div');
	card.classList.add('card');

	const cardInfo = document.createElement('div');
	cardInfo.classList.add('card-info');

	const cardTitle = document.createElement('div');
	cardTitle.classList.add('title');
	const cardTitleH1 = document.createElement('h1');
	cardTitleH1.innerHTML = name;
	cardTitle.append(cardTitleH1);

	const cardStatus = document.createElement('div');
	cardStatus.classList.add('status');
	const cardLiveStatus = document.createElement('div');
	cardLiveStatus.classList.add('live-status');

	if(status === 'Dead') {
		cardLiveStatus.classList.add('dead');
	};

	const cardStatusP = document.createElement('p');
	const cardStatusPText = document.createTextNode(`species -- ${species}`);
	cardStatus.append(cardLiveStatus);
	cardStatusP.append(cardStatusPText);
	cardStatus.append(cardStatusP);
	cardTitle.append(cardStatus);
	cardInfo.append(cardTitle);

	const cardContent = document.createElement('div');
	cardContent.classList.add('content');
	const cardContentText = document.createTextNode(location);
	cardContent.append(cardContentText);
	cardInfo.append(cardContent);

	card.append(cardInfo);

	const cardImage = document.createElement('div');
	cardImage.classList.add('card-image');
	const image = document.createElement('img');
	image.src = portrait;
	image.alt = 'Character portrait';
	cardImage.append(image);
	card.append(cardImage);

	container.append(card);
};

function getRandomIdsArr(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return new Array(10).fill(null).map(() => Math.floor(Math.random() * (max - min + 1) + min));
};

function getRandomCharacters() {
	fetch(`https://rickandmortyapi.com/api/character/${getRandomIdsArr(MIN_CHARACTER_ID, MAX_CHARACTER_ID)}`)
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		return json.forEach((character) => {
			createCard(character.name, character.species, character.status, character.location.name, character.image);
		});
	});
};

function filterRandomCharacters() {
	document.querySelectorAll('.card').forEach((card) => card.remove());
	fetch(`https://rickandmortyapi.com/api/character/?gender=${gender}&status=${liveStatus}`)
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		return json.results.forEach((character) => {
			createCard(character.name, character.species, character.status, character.location.name, character.image);
		});
	});  
};