const BattleText = ({ rounds, roundIndex }) => {
  const round = rounds[roundIndex].split('\n').map((line, i) => {
    const key = `battleTextLine${i}`;

    if (i === 0) {
      return (
        <p key={key} className="title">
          {line}
        </p>
      );
    }
    if (line === '') {
      return <p key={key}></p>;
    }
    return <li key={key}>{line}</li>;
  });

  return (
    <div className="nes-container is-dark is-rounded with-title">{round}</div>
  );
};

export default BattleText;
