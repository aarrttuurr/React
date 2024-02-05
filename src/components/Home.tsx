import { useState, FC } from 'react';

/* function Home() {
  return <h1>Hello World</h1>;
} */

const Home: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Home;
