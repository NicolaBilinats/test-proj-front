import React from "react";
import { observer } from "mobx-react";
import { ICharacter as CharacterProps } from "../interfaces/ICharacter";

const Character: React.FC<{ character: CharacterProps }> = observer(({ character }) => {
    return (
        <div className="w-1/3 p-3">
            <img
                src={character.image}
                className="w-full h-64 object-cover rounded-lg"
                title={`Name: ${character.name}\nStatus: ${character.status}\nRace: ${character.species}`}
                alt={character.name}
            />
            <p className="text-center font-bold mt-3">{character.name}</p>
        </div>
    );
});

export default Character;
