class Navbar {
  title = 'nav h1';
  description = 'nav p';
  toolsArea = {
    container: 'nav div:nth-child(3)',
    timeBox: 'nav div:nth-child(3) div:first-child',
    timeBoxLabel: 'nav div:nth-child(3) div:first-child label',
    timeBoxDropdown: 'nav div:nth-child(3) div:first-child select',
  };
}

export default new Navbar();
