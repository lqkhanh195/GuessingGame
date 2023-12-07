import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import playBtnImg from '../../imgs/play_btn.png';
import Title from '../../imgs/gameTitle.png';
import StorageUtils from '../../helpers/StorageUtils';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    font-size: 23px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #180324;
`;

const Img = styled.img`
    width : 30%;
    height : 20%;

    :hover {
        box-shadow: inset 0 0 100px 100px rgba(158, 132, 173, 0.5);
    }
`;

let isAsked = [];

const Main = () => {
    const nav = useNavigate();

    StorageUtils.setItem("level", "1");
    StorageUtils.setItem("score", "0");

    isAsked = [];
    for (let i = 0; i < 20; i++) {
        isAsked.push(false)
    }

    const Start = () => {
        nav("/play/" + StorageUtils.getItem("level"));
    }

    return(
        <Wrapper>
            <img style={{ paddingLeft: "10px" }} src={Title} alt="title" />
            <Img src={playBtnImg} alt='play button' onClick={ Start }/>
        </Wrapper>
    )
}

export { isAsked };
export default Main;

