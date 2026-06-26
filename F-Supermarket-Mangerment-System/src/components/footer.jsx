import React from 'react'

export default function footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-screen-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-green-600">
              Supermarket MS
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Inventory & Sales Management System for modern supermarkets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-500">

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Dashboard
                </a>
              </li>

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Products
                </a>
              </li>

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Categories
                </a>
              </li>

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Sales
                </a>
              </li>

            </ul>
          </div>

          {/* System */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">System</h3>
            <ul className="space-y-2 text-gray-500">

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Reports
                </a>
              </li>

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Users
                </a>
              </li>

              <li>
                <a className="hover:text-green-600 transition" href="#">
                  Settings
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Contact</h3>

            <p className="text-gray-500 text-sm">
              Phnom Penh, Cambodia
            </p>

            <p className="text-gray-500 text-sm mt-2">
              support@supermarketms.com
            </p>

            <p className="text-gray-500 text-sm">
              +855 123 456 789
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © 2026 Supermarket Management System. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-4 md:mt-0">

            <a href="#" className="text-gray-400 hover:text-green-600 transition">
              Facebook
            </a>

            <a href="#" className="text-gray-400 hover:text-green-600 transition">
              GitHub
            </a>

            <a href="#" className="text-gray-400 hover:text-green-600 transition">
              LinkedIn
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}
