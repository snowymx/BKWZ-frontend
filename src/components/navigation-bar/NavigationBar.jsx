import React from 'react';
import './NavigationBar.scss';
import { Link } from 'react-scroll';
import hamburger from '../../assets/hamburger.png';

const NavigationBar = () => {
  return (
    <nav className='navbar navbar-expand-xxl navbar-dark bg-transparent'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <img src={hamburger} alt='hamburger' className='img-fluid' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item ms-md-5'>
              <Link
                to='auction'
                spy={true}
                smooth={true}
                duration={500}
                className='nav-link'
              >
                Auction
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <Link
                to='features'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className='nav-link'
              >
                Why $MV
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <Link
                to='roadmap'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className='nav-link'
              >
                Roadmap
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <Link
                to='how-to-buy'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className='nav-link'
              >
                How to buy
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <Link
                to='faq'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className='nav-link'
              >
                FAQ
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <Link
                to='audit'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className='nav-link'
              >
                Audit
              </Link>
            </li>
            <li className='nav-item ms-md-5'>
              <button className='outlined'>Connect Wallet</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
