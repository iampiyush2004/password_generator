import { useState, useCallback, useEffect } from 'react';

function App() {
  const [len, setlen] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*{}[]~`_+-=";

    for (let i = 0; i < len; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [len, numallowed, charallowed]);

  const copypasstoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passgenerator();
  }, [len, numallowed, charallowed, passgenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white-500 bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copypasstoclipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={80}
              value={len}
              className="cursor-pointer"
              onChange={(e) => setlen(e.target.value)}
            />
            <label>Length: {len}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numallowed}
              id="numberinput"
              onChange={() => setnumallowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charallowed}
              id="characterinput"
              onChange={() => setcharallowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
