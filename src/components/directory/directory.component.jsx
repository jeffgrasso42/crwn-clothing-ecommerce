import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles.jsx';

const categories = [
  {
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats'
  },
  {
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets'
  },
  {
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers'
  },
  {
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens'
  },
  {
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens'
  },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category, idx) => (
        <DirectoryItem key={idx} category={category} />
      ))}
    </DirectoryContainer>
  )
}

export default Directory
