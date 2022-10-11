const CharacterList = ({
  characters,
  selectCharacter,
  setWantToCreateChar,
}) => {
  const handleSelect = (e) => {
    if (e.target.value === 'createNew') {
      setWantToCreateChar(true);
    } else {
      setWantToCreateChar(false);
      selectCharacter(
        characters.filter((char) => char._id === e.target.value)[0]
      );
    }
  };

  const characterList = characters.map((char, i) => {
    const key = `character_${i}`;

    return (
      <option key={key} value={char._id}>
        {char.firstName}
      </option>
    );
  });

  return (
    <>
      <div
        style={{
          backgroundColor: '#212529',
          padding: '1rem 1.2rem 1rem 1rem;width:calc(100% + 8px)',
        }}
      >
        <label htmlFor="dark_select" style={{ color: '#fff' }}>
          Select your champion
        </label>
        <div className="nes-select is-dark">
          <select
            onChange={handleSelect}
            required
            id="default_select"
            defaultValue="Select..."
          >
            <option disabled hidden>
              Select...
            </option>
            {characterList}
            <option key="create_new-char" value="createNew">
              Create New Character
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CharacterList;
