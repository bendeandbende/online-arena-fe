import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from './UI/Button';
import config from '../config';

const CreateCharacter = () => {
  const [firstName, setFirstName] = useState('');
  const [heroes, setHeroes] = useState('');
  const [weapons, setWeapons] = useState('');
  const [hero, setHero] = useState('');
  const weaponRef = useRef();
  const heroRef = useRef();

  useEffect(() => {
    axios.get(`${config.API_URL}/heroes/`).then((res) => {
      if (res.status === 200) {
        setHeroes(res.data.data.data);
      }
    });

    axios.get(`${config.API_URL}/weapons/`).then((res) => {
      if (res.status === 200) {
        setWeapons(res.data.data.data);
      }
    });
  }, []);

  const heroList =
    heroes !== ''
      ? heroes.map((hero, i) => {
          const key = `hero_${i}`;

          return (
            <option key={key} value={hero._id}>
              {hero.name}
            </option>
          );
        })
      : '';

  const weaponList =
    weapons !== ''
      ? weapons
          .filter((weapon) => weapon.avaible.includes(hero))
          .map((weapon, i) => {
            const key = `weapon_${i}`;

            return (
              <option key={key} value={weapon._id}>
                {weapon.name}
              </option>
            );
          })
      : '';

  const createCharacter = () => {
    console.log(heroRef.current.value, weaponRef.current.value);
    const hero = heroRef.current.value;
    const weapon = weaponRef.current.value;
    axios
      .post(`${config.API_URL}/characters/`, {
        firstName,
        hero,
        weapon,
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div
      style={{
        padding: '10%',
      }}
    >
      <div
        style={{
          padding: '1.5%',
        }}
        className="nes-field"
      >
        <label style={{ color: '#fff' }} htmlFor="name_field">
          Name
        </label>
        <input
          type="text"
          id="fist_name_field"
          className="nes-input is-dark"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="dark_select" style={{ color: '#fff', marginTop: '3%' }}>
          Select a class
        </label>
        <div className="nes-select is-dark">
          <select
            ref={heroRef}
            onChange={(e) => {
              setHero(e.target.value);
            }}
            required
            id="default_select"
            defaultValue="Select..."
          >
            <option disabled hidden>
              Select...
            </option>
            {heroList}
          </select>
        </div>

        {hero && (
          <>
            <label
              htmlFor="dark_select"
              style={{ color: '#fff', marginTop: '3%' }}
            >
              Select a weapon
            </label>
            <div className="nes-select is-dark">
              <select
                ref={weaponRef}
                required
                id="default_select"
                defaultValue="Select..."
              >
                <option disabled hidden>
                  Select...
                </option>
                {weaponList}
              </select>
            </div>
          </>
        )}
      </div>
      <Button onClick={createCharacter}>Create Character</Button>
    </div>
  );
};

export default CreateCharacter;
