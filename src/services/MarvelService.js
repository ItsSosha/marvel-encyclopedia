
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';    

    getResource = async (url) => {
        let result = await fetch(url);
    
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
    
        return await result.json();
    }
    
    postData = async (url, data) => {
        let result = await fetch(url);
    
        return await result.json();
    }

    getAllCharacters = (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        return this.getResource(`${this._apiBase}characters?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`)
    }

    getCharacterById = id => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
    }

    getAllComics = (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        return this.getResource(`${this._apiBase}comics?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`)
    }

    getComicsById = id => {
        return this.getResource(`${this._apiBase}comics/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
    }
}

export default MarvelService