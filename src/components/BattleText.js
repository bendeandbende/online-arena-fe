const BattleText = ({ rounds, roundIndex }) => {
  const title = rounds[roundIndex].split('\n')[0];

  const round = rounds[roundIndex]
    .split('\n')
    .slice(1)
    .map((line, i) => {
      const key = `battleTextLine${i}`;

      if (line === '') {
        return <p key={key}></p>;
      }

      return <li key={key}>• {line}</li>;
    });

  return (
    <div className="nes-container is-dark is-rounded with-title">
      <p className="title">{title}</p>
      <ul className="nes-list" style={{ marginLeft: '-7.5%' }}>
        {round}
      </ul>
    </div>
  );
};

export default BattleText;
