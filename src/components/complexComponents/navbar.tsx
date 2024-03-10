interface INavbar {
  children: React.ReactNode;
}

const Navbar = (props: INavbar) => {
  const { children } = props;
  return children;
};

export default Navbar;
