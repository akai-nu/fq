import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [foo, setFoo] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
        const res = fetch("http://localhost:5000/api/v2/users");
        const json = (await res).json();

        setFoo(await json)
    })();
  }, []);


  useEffect(() => {
    if (foo) {
        console.log('~> foo', foo)
    }
  }, [foo]);

  return (
    <div className="App">
        Hello world
    </div>
  )
}

export default App
