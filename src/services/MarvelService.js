

class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=04e781a17dd1c6a1aaaa9b6cd71b1423"

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok){
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        if (!char.description){
            char.description = 'Описание отсутствует';
        } else if (char.description.length > 193){
            char.description = char.description.slice(0, 193) + '...';
        }

        return {
            name: char.name,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url, 
            description: char.description,
        }
    }
}

export default MarvelService;