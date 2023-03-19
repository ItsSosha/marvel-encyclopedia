
// class MarvelService {
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';    

//     getResource = async (url) => {
//         let result = await fetch(url);
    
//         if (!result.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${result.status}`);
//         }
    
//         return await result.json();
//     }
    
//     postData = async (url, data) => {
//         let result = await fetch(url);
    
//         return await result.json();
//     }

//     _transformToObject = (res) => {
//         return res.data.results.map(elem => ({
//             name: elem.name,
//             description: elem.description,
//             thumbnail: elem.thumbnail.path + '.' + elem.thumbnail.extension,
//             homepage: elem.urls[0].url,
//             wiki: elem.urls[1].url,
//             id: elem.id,
//             comics: elem.comics
//         }));
//     }

//     getAllCharacters = async (limit = 0, offset = 0) => {
//         const limitParam = limit ? `limit=${limit}&` : '' ;
//         const offsetParam = offset ? `offset=${offset}&` : '';
//         const characters = await this.getResource(`${this._apiBase}characters?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`);
//         return this._transformToObject(characters);
//     }

//     getCharacterById = async id => {
//         const character = await this.getResource(`${this._apiBase}characters/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
//         return this._transformToObject(character);
//     }

//     getAllComics = (limit = 0, offset = 0) => {
//         const limitParam = limit ? `limit=${limit}&` : '' ;
//         const offsetParam = offset ? `offset=${offset}&` : '';
//         return this.getResource(`${this._apiBase}comics?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`)
//     }

//     getComicsById = id => {
//         return this.getResource(`${this._apiBase}comics/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
//     }
// }

// export default MarvelService




import { useHttp } from "../hooks/useHttp";

export default function useMarvelService() {
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';    

    const {loading, error, request, clearError} = useHttp();


    const _transformToObject = (res) => {
        return res.data.results.map(elem => ({
            name: elem.name,
            description: elem.description,
            thumbnail: elem.thumbnail.path + '.' + elem.thumbnail.extension,
            homepage: elem.urls[0].url,
            wiki: elem.urls[1].url,
            id: elem.id,
            comics: elem.comics
        }));
    }

    const getAllCharacters = async (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        const characters = await request(`${_apiBase}characters?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`);
        return _transformToObject(characters);
    }

    const getCharacterById = async id => {
        const character = await request(`${_apiBase}characters/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
        return _transformToObject(character);
    }

    const getAllComics = (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        return request(`${_apiBase}comics?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`)
    }

    const getComicsById = id => {
        return request(`${_apiBase}comics/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
    }

    return {
        loading, 
        error, 
        clearError, 
        getAllCharacters, 
        getCharacterById, 
        getAllComics, 
        getComicsById}
}
