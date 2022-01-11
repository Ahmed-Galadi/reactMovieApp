import React from 'react';
//Styles
import { Content } from './MovieInfoBar.style';
import { Wrapper } from './MovieInfoBar.style';
//Helpers
import { calcTime, convertMoney } from '../../helpers';

const MovieInfoBar = ({ time, budget, revenue }) => {
    return (
        <Wrapper>
            <Content>
                <div className='column'>
                    <p>Running Time: {calcTime(time)}</p>
                </div>
                <div className='column'>
                    <p>Budget: {convertMoney(budget)}</p>
                </div>
                <div className='column'>
                    <p>Revenue: {convertMoney(revenue)}</p>
                </div>
            </Content>
        </Wrapper>
    )
}

export default MovieInfoBar;