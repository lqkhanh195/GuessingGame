import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import homeBtn from "../../imgs/home.png";
import { Wrapper } from "../main/Main";

const Alert = styled.div`
    color: white;
    font-family: "Papyrus";
    font-size: 100px;
    font-weight: bold;
`

const Img = styled.img`
    width : 30%;
    height : 20%;

    :hover {
        box-shadow: inset 10px 20px 100px 100px rgba(158, 132, 173, 0.5);
    }
`;

const NotFound = () => {
  const nav = useNavigate();

  const backToMain = () => {
      nav("/");
      console.log("clicked");
  }

  return (
    <Wrapper>
      <Alert>Not found</Alert>
      <Img src={homeBtn} alt="home btn" onClick={ backToMain }/>
    </Wrapper>
  )
};

export default NotFound;