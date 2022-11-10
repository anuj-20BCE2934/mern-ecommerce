import React from 'react';
import Menu2 from './Menu2';
import '../styles.css';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <Menu2 />
    <div className='jumbotron mt-5'>
      <h2>{title}</h2>
      <p className='lead'>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
