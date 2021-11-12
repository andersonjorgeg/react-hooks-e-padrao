import './styles.css';

import { PostsProvider } from '../../contexts/PostsProvider';
import { Posts } from '../../components/Posts';

function App() {
  return (
    <PostsProvider>
      <div className="App">
        <Posts />
      </div>
    </PostsProvider>
  );
}
export default App;
