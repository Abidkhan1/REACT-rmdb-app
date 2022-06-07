import React from 'react';
import { Link } from 'react-router-dom';

import TMDBLogo from '../../images/tmdb_logo.svg';

import RMDBLogo from '../../images/react-movie-logo.svg';

import {Wrapper, Content, LogoImg, TMDBLogoImg} from './Header.styles';

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/' >
                <LogoImg src={RMDBLogo} alt="rmdb-logo" />
            </Link>
            
            <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
        </Content>
    </Wrapper>
);

export default Header;