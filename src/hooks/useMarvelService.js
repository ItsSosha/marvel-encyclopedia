import { useHttp } from "../hooks/useHttp";

export default function useMarvelService() {
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';    

    const {loading, error, request, clearError, process, setProcess} = useHttp();


    const _transformToCharacters = (res) => {
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

    const _transformToComics = (res) => {
        return res.data.results.map(elem => ({
            id: elem.id,
			title: elem.title,
			description: elem.description || "There is no description",
			pageCount: elem.pageCount
				? elem.pageCount
				: "No information about the number of pages",
			thumbnail: elem.thumbnail.path + "." + elem.thumbnail.extension,
			language: elem.textObjects[0]?.language || "en-us",
			price: elem.prices[0].price
				? `${elem.prices[0].price}$`
				: "not available",
        }));
    }

    const getAllCharacters = async (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        const characters = await request(`${_apiBase}characters?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`);
        return _transformToCharacters(characters);
    }

    const getCharacterById = async id => {
        const character = await request(`${_apiBase}characters/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`)
        return _transformToCharacters(character);
    }

    const getAllComics = async (limit = 0, offset = 0) => {
        const limitParam = limit ? `limit=${limit}&` : '' ;
        const offsetParam = offset ? `offset=${offset}&` : '';
        const comics = await request(`${_apiBase}comics?${limitParam}${offsetParam}apikey=96b616d24953bba69c247e1fd6d704c0`);
        return _transformToComics(comics);
    }

    const getComicsById = async id => {
        const comic = await request(`${_apiBase}comics/${id}?apikey=96b616d24953bba69c247e1fd6d704c0`);
        return _transformToComics(comic);
    }

    return {
        loading, 
        error,
        process, 
        setProcess,
        clearError, 
        getAllCharacters, 
        getCharacterById, 
        getAllComics, 
        getComicsById
    }
}
