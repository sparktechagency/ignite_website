'use client'
import Link from 'next/link';
import { Facebook, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ICONS, IMAGE } from '@/app/constant/index.image';
const Footer = () => {
    const currentYear = new Date().getFullYear();


    const footerLinks = {
        resources: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Contact Us', href: '/contact-us' },
            { label: 'FAQ', href: '/faq' },
        ],
        quickLinks: [
            { label: 'Home', href: '/' },
            { label: 'Nominate an Athlete', href: '/ignite-my-child' },
            { label: 'Clubs & Academies', href: '/join-our-club' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' }
        ],
        social: [
            { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61576508477441', label: 'Facebook' },
            { icon: FaXTwitter, href: 'https://x.com/bethespark25?s=21', label: 'Twitter' },
            { icon: Linkedin, href: 'https://www.linkedin.com/company/ignitefoundation-us', label: 'LinkedIn' },
            { icon: FaInstagram, href: 'https://www.instagram.com/ignitefoundation_us?igsh=eTE1M3R6ZXA4YW0x&utm_source=qr', label: 'Instagram' },
        ],
    };
    return (
        <footer
            style={{
                backgroundImage: `url(${IMAGE.footersImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="bg-[#0a1f44] text-white mt-12" role="contentinfo">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8  lg:grid-cols-4">
                    {/* Brand Section */}
                    <section aria-labelledby="brand-heading " className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex flex-col items-start mb-4 gap-1 group" aria-label="IGNITE Foundation">
                            <Image src={ICONS.fire.src} alt="Logo" width={150} height={50} className='w-16 h-16' />
                            <div>
                                <h1 className='text-xl font-bold leading-5'>IGNITE</h1>
                                <h2 className='text-sm font-normal leading-4 text-gray-300'>FOUNDATION</h2>
                            </div>
                        </Link>
                        <address className="space-y-2">
                            <span className="text-sm text-gray-300 lg:text-base">
                                <Link
                                    href="mailto:contactus@ignitefoundation.us"
                                    className="inline-flex flex-nowrap items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white lg:text-base"
                                    aria-label="Email us at contactus@ignitefoundation.us"
                                >
                                    <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                    Email: contactus@ignitefoundation.us
                                </Link>
                            </span>
                            <p className="text-sm text-gray-300">Location: 12222 Merit Drive, #130 Dallas, TX 75251</p>
                            <p className="text-sm text-gray-300">Public Charity & Tax Exempt under IRS Code : 501(c)(3)</p>
                            <p className="text-sm text-gray-300">Tax ID: EIN 39-2824042</p>
                        </address>
                    </section>

                    {/* Resources Section */}
                    <nav className="flex flex-col justify-start items-start lg:items-center col-span-2 lg:col-span-1" aria-labelledby="resources-heading">
                        <div className='space-y-4 '>
                            <h3 id="resources-heading" className="text-lg font-semibold lg:text-xl">
                                Resources
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 transition-colors hover:text-white hover:underline lg:text-base"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Quick Links Section */}
                    <nav className="flex flex-col items-start lg:items-center col-span-2 lg:col-span-1" aria-labelledby="quick-links-heading">
                        <div className='space-y-4'>
                            <h3 id="quick-links-heading" className="text-lg font-semibold lg:text-xl">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 transition-colors hover:text-white hover:underline lg:text-base"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Social Media Section */}
                    <section className=" flex flex-col  justify-start lg:justify-center lg:items-end" aria-labelledby="social-heading">
                        <div className='space-y-4'>
                            <h3 id="social-heading" className="text-lg font-semibold lg:text-xl">
                                Follow Us On
                            </h3>
                            <div className="flex gap-3">
                                {footerLinks.social.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 transition-all hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1f44]"
                                            aria-label={`Follow us on ${social.label}`}
                                        >
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    );
                                })}
                            </div>
                            <p className="text-sm text-gray-400 lg:text-base">
                                © {currentYear} IGNITE Foundation
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;