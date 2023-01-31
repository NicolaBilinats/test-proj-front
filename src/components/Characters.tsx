import React, {useState, useEffect} from "react";
import {observer} from "mobx-react";
import axios from "axios";
import CharactersStore from "../stores/characters.store";
import Character from "./Character";
import {ICharacter, ICharacter as CharacterProps} from "../interfaces/ICharacter";

const Characters: React.FC = observer(() => {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [search, setSearch] = useState("");
    const charactersStore = CharactersStore.getInstance();

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/")
            // @ts-ignore
            .then(({data}) => setCharacters(data.results));
        charactersStore.filter(search);
    }, [search]);

    return (
        <div className="flex flex-wrap">
            <div className="w-full p-4">
                <input
                    className="p-2 border border-gray-400 rounded-lg"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {charactersStore.filteredList.map((character: ICharacter) => (
                <Character character={character} key={character.id}/>
            ))}
        </div>
    );
});

export default Characters;
