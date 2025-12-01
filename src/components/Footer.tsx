import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎉</span>
              <span className="text-xl font-bold">Poppy</span>
            </Link>
            <p className="opacity-80 max-w-sm">
              Turn your boring website visitors into paying customers with wake-up call popups that actually convert.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/create" className="opacity-80 hover:opacity-100 transition-opacity">
                  Create Popup
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="opacity-80 hover:opacity-100 transition-opacity">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="opacity-80 hover:opacity-100 transition-opacity">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="opacity-80 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto: iamgirikrishna@gmail.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center opacity-80 text-sm">
          <p>© {new Date().getFullYear()} Poppy. Made with 🎉 and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;