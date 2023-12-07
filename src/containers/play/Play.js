import React, { useEffect, useState } from "react";
import styled from "styled-components";
import alphabetImgList from "./GetAlphabetImg";
import { Wrapper, isAsked } from "../main/Main";
import delImg from "../../imgs/deleteButton.png";
import StorageUtils from '../../helpers/StorageUtils';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import guBtn from "../../imgs/giveup_btn.png";
// import AlphabetBtn from "./AlphabetBtn";

const Playground = styled.div`
  width: 90%;
  height: 90%;
  background: #F5EDFF;
  display: flex;
  flex-direction: row;
`;

const Pickem = styled.div`
  height: 100vh;
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: stretch;
`;

const ToPick = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -70px;
`;

const Picked = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -100px;
`;

const AlphabetBut = styled.img`
  height: 100%;
  width: 10%;
  margin-left: 10px;
`;

const DelBtn = styled.img`
  height: 100%;
  width: 10%;
  margin-left: 10px;
`;

const LevelTitle = styled.div`
  color: #180324;
  font-family: "Papyrus";
  font-size: 80px;
  font-weight: bold;
  margin-top: -170px;
  margin-left: 10px;
`

const questions = [
  {
    img: "https://dogtime.com/wp-content/uploads/sites/12/2011/01/GettyImages-1294547052.jpg?resize=1200,630",
    answer: "dog",
  },
  {
    img: "https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg",
    answer: "cat",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDYhiyLQALSlro-veVCoXmnuA4UnteIvxyeQ&usqp=CAU",
    answer: "clock",
  },
  {
    img: "https://img.resized.co/breaking-news/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5icmVha2luZ25ld3MuaWVcXFwvcHJvZFxcXC9CTl8xMDIwNzg4XzEwMDAwXzY1MjFfMF8xMTY1NVxcXC9JRS1NQUlOXFxcL0ZFQVRVUkVcXFwvMjAyMFxcXC8wOFxcXC8xMFxcXC9ibi0xMDEzNjM0XFxcL2JuLTEwMTM2MzRfNmQzZTliOWZhMGJmNGFhNGI2ZWM5OTYwYTc4YWZjN2UuanBnXCIsXCJ3aWR0aFwiOjEyMDAsXCJoZWlnaHRcIjo2MjcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5icmVha2luZ25ld3MuaWVcXFwvaW1hZ2VzXFxcL25vLWltYWdlLnBuZ1wiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiI4YWQ4YWQ2OWM4MTg4OWJkNTE4M2MyZjc0YjdiMzcxZWUyNjgxMTg4In0=/world-lion-day-9-things-you-never-knew-about-these-iconic-big-cats.jpg",
    answer: "lion",
  },
  {
    img: "https://m.media-amazon.com/images/I/51ZBJbJNQcL._AC_UF894,1000_QL80_.jpg",
    answer: "ruler",
  },
  {
    img: "https://salt.tikicdn.com/ts/product/24/02/f3/b2360a6b54b6080db01f2f43be87ca60.jpeg",
    answer: "pencil",
  },
  {
    img: "https://img.freepik.com/free-photo/white-horse-runs-beach_1340-34263.jpg?size=626&ext=jpg&ga=GA1.1.541449757.1696550400&semt=ais",
    answer: "horse",
  },
  {
    img: "https://i.natgeofe.com/n/04fcf985-fc13-4dd3-ac21-03ad540915c1/0000016c-25c4-d982-a7ff-fdf7352c0000_3x2.jpg",
    answer: "bear",
  },
  {
    img: "https://media.gettyimages.com/id/519225039/photo/turle-in-the-surf.jpg?s=1024x1024&w=gi&k=20&c=zUJRJS6l5Ay6tJvFTAl5boyMo9yllkyhM0TPm8TkYwY=",
    answer: "turtle",
  },
  {
    img: "https://media.cnn.com/api/v1/images/stellar/prod/230712115127-white-tailed-deer-file.jpg?c=16x9&q=h_720,w_1280,c_fill",
    answer: "deer",
  },
  {
    img: "https://www.topgear.com/sites/default/files/2022/07/6_0.jpg",
    answer: "car",
  },
  {
    img: "https://images.ctfassets.net/cnu0m8re1exe/4txgybYHtUH0z6Dy9IIFGH/e9f4612ef512ae7ad8a580a39557e4d2/Glass_Frog.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill",
    answer: "frog",
  },
  {
    img: "https://wolfcenter.org/wp-content/uploads/2021/04/preview-full-red-fox-portrait-1080x675.jpg",
    answer: "fox",
  },
  {
    img: "https://easydrawingguides.com/wp-content/uploads/2023/05/how-to-draw-a-plane-featured-image-1200.png",
    answer: "plane",
  },
  {
    img: "https://cdn11.bigcommerce.com/s-fj5u5hhzyb/images/stencil/1280x1280/products/27344/15554/NEW_Boucle_Occasional_Chair_Lores_01__99432.1675195686.jpg?c=1",
    answer: "chair",
  },
  {
    img: "https://hips.hearstapps.com/hmg-prod/images/2020-03-10-use-a-drill-final-clean-00-01-57-10-still053-1584632505.jpg?crop=1xw:1xh;center,top&resize=1200:*",
    answer: "drill",
  },
  {
    img: "https://images.unsplash.com/photo-1504253163759-c23fccaebb55?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    answer: "cloud",
  },
  {
    img: "https://m.media-amazon.com/images/I/611zcTURLsL._AC_UF894,1000_QL80_.jpg",
    answer: "speaker",
  },
  {
    img: "https://m.media-amazon.com/images/I/61qkoldpK+L._AC_UF894,1000_QL80_.jpg",
    answer: "stapler",
  },
  {
    img: "https://t3.ftcdn.net/jpg/05/72/92/98/360_F_572929835_bm97KgBt7MDIP0mLq5bQJi3nOAByCnIK.jpg",
    answer: "bull",
  },
];


const Play = () => {
  const [quesId, setQuesId] = useState(Math.floor(Math.random() * 21));
  const [giveUp, setGiveUp] = useState(false);
  const [isAskedState, setIsAsked] = useState(isAsked);
  const [isVisible, setIsVisible] = useState([]);
  const [toPickArr, setToPickArr] = useState([]);
  const [pickedArr, setPickedArr] = useState([]);
  const [indexReplacing, setIndexReplacing] = useState({
    replaceIndex: -1,
    replacedBy: null,
    replaceOrder: [],
  });
  const [ans, setAns] = useState({
    byPlayer: "",
    shuffledAns: "",
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const nav = useNavigate();

  const urlLevel = useLocation().pathname[useLocation().pathname.length-1];
  if (urlLevel != StorageUtils.getItem("level"))
  {
    nav("/play/" + StorageUtils.getItem("level"));
  }

  const ToggleVisible = (index) => {
    setIsVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false; // Toggle visibility
      return updatedVisibility;
    });

    setIndexReplacing((prevIndexReplacing) => {
      return {
        ...prevIndexReplacing,
        replaceIndex: prevIndexReplacing.replaceIndex + 1,
        replacedBy: index,
        replaceOrder: [...prevIndexReplacing.replaceOrder, index],
      };
    });

    setAns((prevAns) => {
      return {
        ...prevAns,
        byPlayer: prevAns.byPlayer + prevAns.shuffledAns[index]
      };
    });
  };

  const delNewestWord = () => {
    if (indexReplacing.replaceIndex >= 0)
    {
      setIsVisible((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[indexReplacing.replaceOrder[indexReplacing.replaceOrder.length - 1]] = true; 
        return updatedVisibility;
      });

      setPickedArr((prevPickedArr) => {
        const updatedPickedArr = [...prevPickedArr];
        updatedPickedArr[indexReplacing.replaceIndex] = <AlphabetBut src={alphabetImgList["Emp"]} alt="Empty" />;
        return updatedPickedArr;
      });

      setIndexReplacing((prevIndexReplacing) => {
        return {
          ...prevIndexReplacing,
          replaceIndex: prevIndexReplacing.replaceIndex - 1,
          replacedBy: null, 
          replaceOrder: prevIndexReplacing.replaceOrder.slice(0, -1),
        };
      });

      setAns((prevAns) => {
        return {
          ...prevAns,
          byPlayer: prevAns.byPlayer.slice(0, -1),
        };
      });
    }
  }

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  const reset = () => {
    setIsCompleted(false);
    setGiveUp(false);
    while (isAskedState[quesId] === true) {
      console.log("In");
      const newQuesId = Math.floor(Math.random() * 20);

      if (!isAskedState[newQuesId]) {
        setQuesId(newQuesId);
        
        break; 
      }
    }

    const indexReplacingReset = {replaceIndex: -1,
                            replacedBy: null,
                            replaceOrder: [],}
    setIndexReplacing(indexReplacingReset);
  }

  useEffect(() => {
    while (isAskedState[quesId] === true) {
      const newQuesId = Math.floor(Math.random() * 20);
    
      if (!isAskedState[newQuesId]) {
        setQuesId(newQuesId);

        break; 
      }
    }
  }, []);

  useEffect(() => {
    setIsAsked((prevIsAsked) => {
      const updatedIsAsked = [...prevIsAsked];
      updatedIsAsked[quesId] = true; 
      return updatedIsAsked;
    });

    let init = [];
    let shuffledAnsArr = shuffle(questions[quesId].answer.split(''));
    let init2 = [];

    for (let i = 0; i < shuffledAnsArr.length; i++) {
      init.push(
        <AlphabetBut
          src={alphabetImgList[shuffledAnsArr[i].toUpperCase()]}
          alt={shuffledAnsArr[i].toUpperCase()}
          onClick={() => ToggleVisible(i)}
        />
      );
      init2.push(<AlphabetBut src={alphabetImgList["Emp"]} alt="Empty" />);
    }

    setToPickArr(init);
    setPickedArr(init2);
    setIsVisible(Array(questions[quesId].answer.length).fill(true));
    setAns((initAns) => {
      return {
        ...initAns,
        byPlayer: "",
        shuffledAns: shuffledAnsArr.join("")
      };
    });
  }, [quesId]);

  useEffect(() => {
    if (indexReplacing.replacedBy !== null && indexReplacing.replaceIndex >= 0) {
      setPickedArr((prevPickedArr) => {
        const updatedPickedArr = [...prevPickedArr];
        updatedPickedArr[indexReplacing.replaceIndex] = <AlphabetBut
          src={alphabetImgList[ans.shuffledAns[indexReplacing.replacedBy].toUpperCase()]}
          alt={ans.shuffledAns[indexReplacing.replacedBy].toUpperCase()}
        />;
        return updatedPickedArr;
      });
    }
  }, [indexReplacing]);

  useEffect(() => {
    if (ans.byPlayer.length === questions[quesId].answer.length) {
      setIsCompleted(true);

      if (ans.byPlayer === questions[quesId].answer)
      {
        const score = Number(StorageUtils.getItem("score"));
        StorageUtils.setItem("score", (score + 1).toString());
      }
    }
  }, [ans]);

  const giveUpClicked = () => {
    setGiveUp(true); 
    setIsCompleted(true);
  }

  const nextLevel = () => {
    reset();
    if (Number(StorageUtils.getItem("level")) < 5)
    {
      const level = Number(StorageUtils.getItem("level"));
      StorageUtils.setItem("level", (level + 1).toString()); 
      nav("/play/" + StorageUtils.getItem("level"));
    }
    else 
    {
      nav("/gameover");
    }
  }

  if (isCompleted){
    if (giveUp)
    {
      return (
        <Wrapper>
          <Alert severity="error" action={
            <Button color="inherit" size="big" onClick={() => nextLevel()}>
              NEXT
            </Button>
          }> 
            <AlertTitle><strong>This question is too hard ?</strong></AlertTitle>
            The correct answer is <strong><i> { questions[quesId].answer.toUpperCase() } </i></strong> - try better in next question !!!
          </Alert>
        </Wrapper>
      )
    }

    if (ans.byPlayer === questions[quesId].answer)
    {
      return (
        <Wrapper>
          <Alert severity="success" action={
            <Button color="inherit" size="big" onClick={() => nextLevel()}>
              NEXT
            </Button>
          }> 
            <AlertTitle><strong>Correct!!!</strong></AlertTitle>
            Your answer is correct - let's go into next questions !!!
          </Alert>
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <Alert severity="error" action={
          <Button color="inherit" size="big" onClick={() => nextLevel()}>
            NEXT
          </Button>
        }> 
          <AlertTitle><strong>Wrong :(</strong></AlertTitle>
          Your answer is wrong - try better in next question !!!
        </Alert>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Playground>
        <Pickem>
          <LevelTitle>Question:{StorageUtils.getItem("level")}</LevelTitle>
          <ToPick>
            {toPickArr.map((item, index) => {
              if (isVisible[index]) return item;
              return null;
            })}
            <img src={ guBtn } alt="give up btn" onClick={ () => { giveUpClicked() } } />
          </ToPick>
          <Picked>
            {pickedArr}
            <DelBtn src={ delImg } alt="delete button" onClick={ () => delNewestWord() }/>
          </Picked>
        </Pickem>
        <img
          src={questions[quesId].img}
          alt="things to guess"
          style={{ width: "35%" }}
        />
      </Playground>
    </Wrapper>
  );
};

export default Play;