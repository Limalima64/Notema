import React from 'react';

import '../Css/MainHeader.css';

const MainHeader = props => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
