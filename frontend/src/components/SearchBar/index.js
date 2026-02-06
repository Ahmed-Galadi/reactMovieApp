import React, {useState, useEffect, useRef} from 'react';
// Styles
import { Wrapper, Content } from './SearchBar.styles';
// Icon
import searchIcon from '../../images/search-icon.svg'

const SearchBar = ({ setSearchTerm }) => {
    
    const [state, setState] = useState('');
    const initial = useRef(true);

    const inputHandler = event => {
        setState(event.target.value);
    };

    useEffect(() => {

        if(initial.current) {
            initial.current = false
            return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 800);

        return () => clearTimeout(timer)
    }, [setSearchTerm, state])

    return (<>
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input type='text' placeholder='Search Movie' onChange={inputHandler} value={state}/>
            </Content>
        </Wrapper>
    </>)
};

export default SearchBar;