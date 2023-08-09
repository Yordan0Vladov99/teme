const CloseIcon = (props: { close: () => void }) => {
  return (
    <img
      className="close"
      src="icon-menu-close.svg"
      alt="close"
      onClick={props.close}
    />
  );
};

export default CloseIcon;
