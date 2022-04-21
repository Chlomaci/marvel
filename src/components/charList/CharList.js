import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: {},
            error: false,
        };
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.setCardList();
    }


    setCardList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.loadChars)
            .catch(this.onError);
    }

    loadChars = (chars) => {
        this.setState({chars})
    }

    onError = () => {
        this.setState({
            error: true,
        })
    }

    oneCardGenerate = (item) => {
            return (
                <li className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
    }

    allCardsGenerate = (...chars) => {
        chars.forEach(char => this.oneCardGenerate(char));
    }

    render() {
        const {chars} = this.state;
        return (
            <div className="char__list">
                <ul className="char__grid">
                <div className="char__list">
                <ul className="char__grid">
                    {() => this.allCardsGenerate(chars)}
                    {console.log(chars)}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
                </ul>
            </div>
        )
    }
}

export default CharList;