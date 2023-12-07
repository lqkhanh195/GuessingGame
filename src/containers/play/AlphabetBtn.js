import React, { useState } from 'react';
import styled from 'styled-components';

const AlphabetBut = styled.img`
    height: 100%;
    width: 13%;
`

const AlphabetBtn = (props) => {
    return (
        props.isVisible && <AlphabetBut src={ props.src } alt={ props.alt } onClick={props.toggleVisibility} />
    );
}

export default AlphabetBtn
