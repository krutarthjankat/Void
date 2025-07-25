const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: ["Problems", "Contests"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact", "Bug Report", "Feedback"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookie Policy"],
    },
  ];

  return (
    <footer className="border-t py-12 px-4 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white text-center">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 VoidJudge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
