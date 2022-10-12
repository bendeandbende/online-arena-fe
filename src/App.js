import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import BattleText from './components/BattleText';
import LogInSignUp from './components/LogInSignUp';
import TitleText from './components/TitleText';
import Button from './components/Button';
import CharacterList from './components/CharacterList';
import CreateCharacter from './components/CreateCharacter';
import config from './config';

import 'nes.css/css/nes.min.css';
import './style.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [selectedChar, setSelectedChar] = useState('');
  const [wantToCreateChar, setWantToCreateChar] = useState(false);
  const [summary, setSummary] = useState('');
  const [roundIndex, setRoundIndex] = useState(0);

  const handleLogin = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logOut = () => {
    removeCookie('token');
    setLoggedIn(false);
    setSummary('');
    setUser('');
    setSelectedChar('');
    setWantToCreateChar(false);
  };

  useEffect(() => {
    if (cookies.token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${cookies.token}`;

      axios.get(`${config.API_URL}/users/me`).then((res) => {
        if (res.status === 200) {
          handleLogin(res.data.data.data);
        }
      });
    }
  }, [cookies.token]);

  const nextRound = () => {
    roundIndex + 1 < summary.rounds.length && setRoundIndex(roundIndex + 1);
  };

  const startFight = () => {
    axios
      .patch(`${config.API_URL}/battle/${selectedChar._id}`)
      .then(({ data }) => {
        setSummary(data.result.summary);
      });

    setRoundIndex(0);
  };

  return (
    <div className="nes-container is-dark main-container">
      {!loggedIn && (
        <LogInSignUp setCookie={setCookie} handleLogin={handleLogin} />
      )}
      {loggedIn && (!summary || roundIndex + 1 === summary.rounds.length) && (
        <CharacterList
          characters={user.characters}
          selectCharacter={setSelectedChar}
          setWantToCreateChar={setWantToCreateChar}
        />
      )}

      {!wantToCreateChar ? (
        <>
          {selectedChar && (
            <div
              className="nes-container is-centered is-dark"
              style={{ borderColor: '#212529' }}
            >
              {selectedChar && !summary && (
                <p>Get ready to fight {selectedChar.firstName}!</p>
              )}

              {summary ? (
                <Button
                  onClick={
                    roundIndex + 1 === summary.rounds.length
                      ? startFight
                      : nextRound
                  }
                >
                  {`${
                    roundIndex + 1 === summary.rounds.length
                      ? `Let's fight again with ${selectedChar.firstName}!`
                      : 'Next'
                  }`}
                </Button>
              ) : (
                <Button onClick={startFight}>{`Let's fight!`}</Button>
              )}
            </div>
          )}

          {summary && (
            <div
              className="nes-container is-dark"
              style={{ borderColor: '#212529' }}
            >
              {roundIndex === 0 && <TitleText titleText={summary.prep} />}
              <BattleText rounds={summary.rounds} roundIndex={roundIndex} />
              {roundIndex + 1 === summary.rounds.length && (
                <TitleText titleText={summary.end} />
              )}
            </div>
          )}
        </>
      ) : (
        loggedIn && <CreateCharacter />
      )}
      {loggedIn && <Button onClick={logOut}>Log out</Button>}
    </div>
  );
}

export default App;
