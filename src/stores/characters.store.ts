import {action, observable} from "mobx";
import axios from "axios";
import _ from 'lodash';
import {ICharacter as CharacterProps} from "../interfaces/ICharacter";
import {API_URL} from "../utils/constants";

class CharactersStore {
    private static instance: CharactersStore;
    @observable characters: CharacterProps[] = [];
    @observable filteredList: CharacterProps[] = [];
    @observable selectedCharacter: CharacterProps | null = null;
    @observable isLoading = false;

    constructor() {
        this.fetchCharacters();
    }

    @action
    async fetchCharacters() {
        this.isLoading = true;
        try {
            const response = await axios.get(API_URL);
            // @ts-ignore
            this.characters = response.data.results;
            this.filteredList = this.characters;
            console.log(this.filteredList);
        } catch (err) {
            console.error(err);
        }
        this.isLoading = false;
    }


    @action
    filter = _.debounce((value: string) => {
        this.isLoading = true;
        if (value.length < 2) {
            this.filteredList = this.characters;
            this.isLoading = false;
            return;
        }

        axios
            .get(`${API_URL}/?name=${value}`)
            .then((res) => {
                // @ts-ignore
                this.filteredList = res.data.results;
                this.isLoading = false;
            })
            .catch((err) => {
                console.error(err);
                this.isLoading = false;
            });
    }, 500);

    @action setSelectedCharacter(character: CharacterProps | null) {
        this.selectedCharacter = character;
    }

    static getInstance() {
        if (!CharactersStore.instance) {
            CharactersStore.instance = new CharactersStore();
        }
        return CharactersStore.instance;
    }
}

export default CharactersStore;
