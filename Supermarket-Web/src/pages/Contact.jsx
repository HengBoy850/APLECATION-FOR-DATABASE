import {
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import mapPreview from "../assets/Screenshot 2026-06-25 132731.png";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-5 pb-24">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {/* Map */}
      <a
        href="https://maps.app.goo.gl/ahtdiucQyYzupU6D7?g_st=com.google.maps.preview.copy"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-5"
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <img
            src={mapPreview}
            alt="Store Location"
            className="w-full h-56 object-cover"
          />

          <div className="p-4 bg-white">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-brand" />
              <span className="font-semibold">
                Open in Google Maps
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Phnom Penh, Cambodia
            </p>
          </div>
        </div>
      </a>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">

        <div className="flex items-center gap-3">
          <Phone className="text-brand" />
          <div>
            <p className="font-semibold">Phone</p>
            <p className="text-gray-500">+855 12 345 678</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-brand" />
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-gray-500">support@freshgo.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-brand" />
          <div>
            <p className="font-semibold">Working Hours</p>
            <p className="text-gray-500">
              Mon - Sun : 8:00 AM - 9:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-3 mt-5">

        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            bg-blue-600 text-white
            rounded-2xl py-3
            font-semibold
            hover:opacity-90
          "
        >
          <FaFacebookF size={18} />
          Facebook
        </a>

        <a
          href="https://t.me/yourtelegram"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            bg-sky-500 text-white
            rounded-2xl py-3
            font-semibold
            hover:opacity-90
          "
        >
          <FaTelegramPlane size={18} />
          Telegram
        </a>

      </div>
    </div>
  );
}