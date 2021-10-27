import './styles.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import P from 'prop-types';

// Componente Post
const Posts = ({ post, handleClick }) => {
  console.log('Filho, renderizou!');
  return (
    <div key={post.id} className="post">
      <h1 style={{ fontSize: '14px' }} onClick={() => handleClick(post.title)}>
        {post.title}
      </h1>
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
  handleClick: P.func,
};

export default function ExUseRef() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null);
  const contador = useRef(0);

  console.log('Pai, renderizou');

  //Component did mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then((resp) =>
      resp.json().then((resp) => setPosts(resp)),
    );
  }, []);

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current += 1;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h1>Renderizou: {contador.current}X</h1>
      <p>
        <input
          ref={input}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <Posts key={post.id} post={post} handleClick={handleClick} />
            );
          })
        );
      }, [posts])}
      {posts.length <= 0 && <h1>Loading...</h1>}
    </div>
  );
}
