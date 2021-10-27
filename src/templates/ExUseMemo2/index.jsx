import './styles.css';
import { useEffect, useState, useMemo } from 'react';
import P from 'prop-types';

// Componente Post
const Posts = ({ post }) => {
  console.log('Filho, renderizou!');
  return (
    <div key={post.id} className="post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

Posts.propTypes = {
  post: P.shape({
    id: P.number.isRequired,
    title: P.string,
    body: P.string,
  }),
};

export default function ExUseMemo2() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  console.log('Pai, renderizou');

  //Component did mount
  useEffect(() => {
    setTimeout(function () {
      fetch('https://jsonplaceholder.typicode.com/posts').then((resp) =>
        resp.json().then((resp) => setPosts(resp)),
      );
    }, 5000);
  }, []);

  return (
    <div className="App">
      <p>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => {
            return <Posts key={post.id} post={post} />;
          })
        );
      }, [posts])}
      {posts.length <= 0 && <h1>Loading...</h1>}
    </div>
  );
}
