import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends: friends.map(character =>{
      character.clicked = false; 
      return character; 
    }),
    score: 0
  };
shuffleThisArray = (arr) => {
  let friendsArray = arr;
  let ctr = friendsArray.length;
  let temp;
  let index;
  
  // While there are elements in the array
      while (ctr > 0) {
  // Pick a random index
          index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
          ctr--;
  // And swap the last element with it
          temp = friendsArray[ctr];
          friendsArray[ctr] = friendsArray[index];
          friendsArray[index] = temp;
      }
      return friendsArray;
}
resetFriends = () => {
  const friends = this.state.friends.map(character => {
    character.clicked = false; 
    return character; 
  })
  this.setState({friends})
  return true; 
}
hasClicked = id => {
  let endGame = false; 
  let score = this.state.score; 
  const friends = this.state.friends.map( character => {
    if (character.id === id ){
      if(character.clicked){
        score = 0; 
        endGame = this.resetFriends();
      }
      else{
        character.clicked = true;
        score++; 
      }
    }
    return character
  })
  console.log(friends)

  if (!endGame){
    this.setState({score:score, friends:friends})
  }
}
 

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    
    return (
      <Wrapper>
        <Title>Clicky-Game</Title>
        {this.shuffleThisArray(this.state.friends).map(friend => (
          <FriendCard
            hasClicked = {this.hasClicked}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
