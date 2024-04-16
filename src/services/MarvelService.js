import { useHttp } from "../hooks/useHttp.hook";


const useMarvelService = () => {
	const { error, loaded, request, clearError } = useHttp();

	const _PATH = 'https://gateway.marvel.com:443/v1/public/'
	const _PUBLIC_API_KEY = 'apikey=d1464a3d250445e9bfda5939ce0a2d1c'
	const _baseOffset = 0

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_PATH}characters?limit=9&offset=${offset}&${_PUBLIC_API_KEY}`)
		return res.data.results.map(_getCharacterData); // ...map(item => this._getCharacterData(item))
	}

	const getCharacterData = async (id) => {
		const res = await request(`${_PATH}characters/${id}?${_PUBLIC_API_KEY}`);
		return _getCharacterData(res.data.results[0])
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_PATH}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_PUBLIC_API_KEY}`);
		return res.data.results.map(_getComicsData);
	}

	const _getCharacterData = (res) => {
		return {
			name: res.name,
			decription: res.decription,
			thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
			homepage: res.urls[0].url,
			wiki: res.urls[1].url,
			id: res.id,
			comics: res.comics.items
		}
	}

	const _getComicsData = (res) => {
		return {
			id: res.id,
			title: res.title,
			thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
			price: res.prices[0].price ? `${res.prices[0].price} $` : "NOT AVAILABLE",
		}
	}

	return { error, loaded, getAllCharacters, getCharacterData, getAllComics, clearError }
}

export default useMarvelService;