const ArrowLinkContainer = ({ children }) => {
  return (
    <section className="flex flex-wrap flex-col md:flex-row md:flex-nowrap items-center justify-between mt-20">
      {children}
    </section>
  );
};

export default ArrowLinkContainer;
