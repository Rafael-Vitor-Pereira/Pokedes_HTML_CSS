const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemom__image');

const form = document.querySelector('.form');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input__search');

let numberPokemon = 1;

const fetchPokemon = async (pokemon) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	if(response.status === 200){
		const data = await response.json();
		return data;
	}
}

const renderPokemon = async (pokemon) => {
	pokemonName.innerHTML = 'Carregando...';
	pokemonNumber.innerHTML = '';

	const data = await fetchPokemon(pokemon);

	if(data){
		pokemonName.innerHTML = data.name;
		pokemonNumber.innerHTML = data.id;
		pokemonImage.style.display = 'block';
		pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
		numberPokemon = data.id
	}else{
		pokemonName.innerHTML = 'Not Found :(';
		pokemonNumber.innerHTML = '';
		pokemonImage.style.display = 'none';
	}

	input.value = ""
}


form.addEventListener('submit', (event) => {
	event.preventDefault();

	renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
	if(numberPokemon > 1){
		numberPokemon--;
		renderPokemon(numberPokemon);
	}
});

btnNext.addEventListener('click', () => {
	numberPokemon++;
	renderPokemon(numberPokemon);	
});

renderPokemon(numberPokemon);