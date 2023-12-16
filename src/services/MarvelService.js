
export default class MarvelService {
	_PATH = 'https://gateway.marvel.com:443/v1/public/'
	_PUBLIC_API_KEY = 'apikey=d1464a3d250445e9bfda5939ce0a2d1c'
	_baseOffset = 0

	getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._PATH}characters?limit=9&offset=${offset}&${this._PUBLIC_API_KEY}`)
		return res.data.results.map(this._getCharacterData); // ...map(item => this._getCharacterData(item))
	}

	getCharacterData = async (id) => {
		const res = await this.getResource(`${this._PATH}characters/${id}?${this._PUBLIC_API_KEY}`);
		return this._getCharacterData(res.data.results[0])
	}

	_getCharacterData = (res) => {
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
}