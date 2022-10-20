const Button = ({ type, onClick, children }) => {
  return (
    <button className="nes-btn" type={type || 'button'} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
