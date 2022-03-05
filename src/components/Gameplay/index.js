import React from "react";
import Backgorund from "../Background";
import "./Gameplay.scss";
import diceImage from "../../assets/dicegroup1.svg";
import gameImage from "../../assets/GameImage.svg";

const Gameplay = () => {
  return (
    <section className="container-fluid gameplay" id="gameplay">
      <Backgorund imageName="minting-back" />
      <div className="content">
        <div className="gameplay-box">
          <h2>
            The <span className="grad-txt">Gameplay</span>
          </h2>
          <br />
          <h4>Easy to pick up, hard to master.</h4>
          <br />
          <h5>Fresh approach to a board game turned into an online PvP (player versus player) blockchain game with strategic elements to create a dynamic, fast paced gameplay with a ton of different outcomes.</h5>
          <br />
          <h4>Once you understand the basics, you want to play more, and more, and more…</h4>
          <br />
          <h5>You will experience games where you make a “great move” and smile as you just blocked your opponents move, but also the “ohh noo” moments when someone blocked you from winning, or even worse – you blocked yourself.</h5>
          <br />
          <h4>The game works on a strategic mathematical collision based system.</h4>
          <br />
          <h5><span className="h4-text">Example: </span>if you collide your dice #5 with opponent’s dice #3 – you will still be left with a dice #2 after the collision. (#5 – #3 = #2)</h5>
          <br />
          <div className="dice-image">
            <img src={diceImage} alt="dice" />
          </div>
          <br />
          <h4>All dice are able to move forward – they can all be used to “attack” and to “defend”.</h4>
          <br />
          <h5>Each dice has a “<span className="h4-text">passive</span>“ ability displayed with a different symbol on the dice itself like the ones above - (#5 is a jumper, #3 can also move diagonally and #2 can heal your other dice), which gives you tons of options how to play.</h5>
          <br />
          <h5>You roll 5 dice at the beginning of the game (from total of 10 dice to use each game) and the aim of the game – and the condition of victory is to capture two out of three lanes on the opponents side.</h5>
          <br />
          <h4>If you destroy all of your opponents dice and still have at least one dice – you will also win.</h4>
          <br />
          <h5>Check the video just below to see a short gameplay trailer.</h5>
          <br />
          <div className="dice-image">
            <img src={gameImage} alt="dice" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gameplay;
