const CookiePolicyButton = ({ children, className, ...props }) => {
  const classes = `ot-sdk-show-settings${className ? ` ${className}` : ""}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default CookiePolicyButton;
