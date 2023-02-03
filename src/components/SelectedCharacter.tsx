import React from "react";

interface SelectedCharacterProps {
    selectedCharacterName: string;
    selectedCharacterImage: string;
}

const SelectedCharacter: React.FC<SelectedCharacterProps> = ({
                                                                 selectedCharacterName,
                                                                 selectedCharacterImage,
                                                             }) => {
    const img = 'https://via.placeholder.com/150x150';
    const leftImg = selectedCharacterName.toLowerCase().includes("rick") ? selectedCharacterImage : img;
    const rightImg = selectedCharacterName.toLowerCase().includes("morty") ? selectedCharacterImage : img;
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center  mx-4">
                <img src={leftImg} alt={selectedCharacterName} className="w-32 h-32 rounded-full"/>
            </div>
            <div className="flex flex-col items-center mx-4">
                <img src={rightImg} alt={selectedCharacterName} className="w-32 h-32 rounded-full"/>
             </div>
        </div>
    );
};

export default SelectedCharacter;
