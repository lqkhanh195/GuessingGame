import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import gameOverImg from "../../imgs/GameOver.png";
import replayBtn from "../../imgs/replayBtn.png";
import { Wrapper } from "../main/Main";
import StorageUtils from '../../helpers/StorageUtils';

const Score = styled.div`
    color: white;
    font-family: "Papyrus";
    font-size: 70px;
    font-weight: bold;
`

const Img = styled.img`
    width : 30%;
    height : 20%;

    :hover {
        box-shadow: inset 0 0 100px 100px rgba(158, 132, 173, 0.5);
    }
`;

const GameOver = () => {
    const nav = useNavigate();

    const backToMain = () => {
        nav("/");
    }

    return (
        <Wrapper>
            <img src={ gameOverImg } alt="game over tilte" />
            <Score>Your score: { StorageUtils.getItem("score") } </Score>
            <Img src={ replayBtn } alt="replay button" onClick={ backToMain } />
        </Wrapper>
    )
}

export default GameOver;