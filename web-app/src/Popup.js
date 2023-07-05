import React, { useState } from 'react';

const Popup = () => {
  const data = [
    {
      name: 'Search Engines',
      url: ['https://www.google.com', 'https://www.bing.com']
    }
  ];

  const [lists, setLists] = useState(data);

  const openTabs = (urls) => {
    for (const url of urls) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="App">
      <h3>Choose your App List</h3>
      <div className="lists">
        {lists.map((item, index) => (
          <button className="button" onClick={() => openTabs(item.url)} key={index}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Popup;
