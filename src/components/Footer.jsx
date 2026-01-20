import { navItems, heroContent, letsBuild } from "../constant/index";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-gray-400 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-zinc-800">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={safeAssetUrl("/yddconsulting logo.png")}
                alt="YDD Consulting"
                className="h-10 w-10 rounded bg-white/5 object-contain p-1 ring-1 ring-white/10"
                loading="lazy"
              />
            </div>
            <p className="text-sm mb-6">{heroContent.intro}</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold font-montserrat text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold font-montserrat text-white mb-6">
              Contact Information
            </h3>
            <ul className="space-y-3">
              <li>{letsBuild.location}</li>
              <li>{letsBuild.phone}</li>
              <li>{letsBuild.email}</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-sm">© {year} YDD Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
