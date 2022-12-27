import './categories.styles.scss';

const App = () => {
  const categories = [
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    },
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      title: 'mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    },
  ];

  return (
    <div className="categories-container">
      {categories.map(({ title, imageUrl }, idx) => (
        <div key={idx} className="category-container">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
