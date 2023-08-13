import { ReactElement, useState, useEffect, useCallback } from 'react';

interface User {
  id: number,
  username: string
}

const App = (): ReactElement => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    console.log('mounting');
    console.log('Users: ', users);

    return () => console.log('unmounting');
  }, [users]);

  const addTwo = useCallback((): void => setCount(prev => prev + 1), []);

  return (
    <div className='App'> 
      <h1>Count: {count}</h1>
      <button onClick={addTwo}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setUsers([{ id: 1, username: 'John' }])}>Set Users</button>
    </div>
  )
}

export default App;
