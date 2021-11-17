import { useState } from 'react';
import { useFetch } from './use-fetch';

export const ExUseFetch = () => {
  const [postId, setPostId] = useState('');
  // usando o hook useFetch
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/' + postId,
    {
      headers: {
        abc: '200' + postId,
      },
    },
  );

  // condicional para mostrar o loading
  if (loading) {
    return (
      <div className="centerText">
        <h2>Carregando...</h2>
      </div>
    );
  }

  const handleClick = (id) => {
    setPostId(id);
  };

  // condicional para mostrar o resultado
  if (!loading && result) {
    return (
      <div className="centerText">
        {result?.length > 0 ? (
          result.map((post) => (
            <div key={`post-${post.id}`} onClick={() => handleClick(post.id)}>
              <p>
                post {post.id} - {post.title}
              </p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>post - {result.id}</p>
            <p>{result.body}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="centerText">
      <h1>Meu segundo Hook</h1>
    </div>
  );
};
