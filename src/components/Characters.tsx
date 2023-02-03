import React, {useState, useEffect} from "react";
import {observer} from "mobx-react";
import axios from "axios";
import CharactersStore from "../stores/characters.store";
import Character from "./Character";
import {ICharacter as CharacterProps} from "../interfaces/ICharacter";
import SelectedCharacter from "./SelectedCharacter";


const Characters: React.FC = observer(() => {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [search, setSearch] = useState("");
    const charactersStore = CharactersStore.getInstance();
    const [selectedCharacterName, setSelectedCharacterName] = useState("");
    const [selectedCharacterImage, setSelectedCharacterImage] = useState("");
    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/")
            // @ts-ignore
            .then(({data}) => setCharacters(data.results));
        charactersStore.filter(search);
    }, [search]);
    const onCharacterClick = (name: string, image: string) => {
        setSelectedCharacterName(name);
        setSelectedCharacterImage(image);
    };
    return (
        <>
            <div className="w-full p-4">
                <input
                    className="p-2 border border-gray-400 rounded-lg"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <SelectedCharacter
                selectedCharacterName={selectedCharacterName}
                selectedCharacterImage={selectedCharacterImage}
            />
            <div className="flex flex-wrap">
                {charactersStore.filteredList.map((character: CharacterProps) => (
                    <Character key={character.id} character={character} onClick={() => onCharacterClick(character.name, character.image)}/>
                ))}
            </div>
        </>

    );
});

export default Characters;
