import React from 'react';

const Footer = () => {
  const brand = "LMS Pro"; // Replace with your actual brand name

  const items = [
    {
      title: "Features",
      items: [
        "Course Creation",
        "Student Management",
        "Progress Tracking",
        "Assessment Tools",
        "Reporting & Analytics",
      ],
    },
    {
      title: "Solutions",
      items: [
        "Corporate Training",
        "Higher Education",
        "K-12 Learning",
        "Professional Development",
        "Compliance Training",
      ],
    },
    {
      title: "Resources",
      items: [
        "Knowledge Base",
        "Webinars",
        "Case Studies",
        "API Documentation",
        "Community Forum",
      ],
    },
    {
      title: "Support",
      items: [
        "Help Center",
        "Contact Support",
        "System Status",
        "Feature Requests",
      ],
    },
    {
      title: "Company",
      items: [
        "About Us",
        "Careers",
        "Partners",
        "Blog",
        "Privacy Policy",
      ],
    },
  ];

  return (
    <footer className="pt-5 border-top border-bottom bg-white">
      <div className="container">
        <div className="row">
          {items.map((item) => (
            <div key={item.title} className="col-6 col-md-4 col-lg mb-4">
              <h5 className="fw-bold mb-3">{item.title}</h5>
              <ul className="list-unstyled">
                {item.items.map((subItem) => (
                  <li key={subItem} className="mb-2">
                    <a href="#" className="text-decoration-none text-muted hover-primary">
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-4" />
      <div className="container py-4 text-center">
        <p className="text-muted small mb-0">
          © 2015 - {new Date().getFullYear()} {brand} Global Inc. <br />
          <a href="#" className="text-decoration-none text-muted">Privacy Policy</a> | <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
