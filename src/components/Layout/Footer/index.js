import React from 'react';
import './footer.scss';
import mediumImg from '../../../assets/medium.png';
import discordImg from '../../../assets/discord.png';
import telegramImg from '../../../assets/telegram.png';
import youtubeImg from '../../../assets/youtube.png';

const Footer = () => {
  return (
    <section>
      <footer className='container-fluid footer'>
        <div className='container'>
          <img src={mediumImg} alt='medium'></img>
          <img src={telegramImg} alt='telegram'></img>
          <img src={youtubeImg} alt='youtube'></img>
          <img src={discordImg} alt='discord'></img>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
