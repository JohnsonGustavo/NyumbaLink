
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Nyumba Link</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Jukwaa la kisasa la kutafuta na kukodia nyumba nchini Tanzania. 
              Tunawachanganya wenye nyumba na wapangaji kwa urahisi na usalama.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+255 123 456 789</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@nyumbalink.co.tz</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kurasa Muhimu</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Nyumbani
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
                  Tafuta Nyumba
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  Nyumba za Kupenda
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Msaada</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Maswali ya Kawaida
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Wasiliana Nasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Sera za Faragha
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Masharti ya Matumizi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Nyumba Link. Haki zote zimehifadhiwa.
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <span>Tengenezwa kwa</span>
              <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" />
              <span>nchini Tanzania</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
