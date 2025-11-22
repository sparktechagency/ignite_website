'use client'

import { IMAGE } from '@/app/constant/index.image'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import { motion, AnimatePresence, Variants } from 'framer-motion'


type NavItem = {
    href: string
    label: string
}

function Header() {
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const pathname = usePathname()

    const NavLink: NavItem[] = [
        { href: '/', label: 'Home' },
        { href: '/about-us', label: 'About Us' },
        { href: '/mission-vision', label: 'Mission & Vision' },
        { href: '/donate', label: 'Donate' },
        { href: '/contact-us', label: 'Contact us' },
    ]


    const mobileMenuVariants: Variants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
        }
    }

    const headerVariants: Variants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    }

    const handleLinkClick = (href: string) => {
        setIsMobileMenuOpen(false)
        router.push(href)
    }

    return (
        <>
            <motion.header
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur-md"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/')}
                        className="text-xl font-bold cursor-pointer text-foreground"
                    >
                        <Image
                            src={IMAGE.brandV2}
                            width={150}
                            height={40}
                            alt='IGNITE'
                            className="w-32 h-auto sm:w-36 lg:w-40"
                            priority
                        />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {NavLink.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium text-black px-3 py-2 transition-colors duration-200 relative",
                                        pathname === item.href
                                            ? "text-red-500 font-semibold border-b-2 border-red-500"
                                            : "hover:text-red-400"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <MdMenu className="w-6 h-6 text-gray-700" />
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 lg:hidden shadow-xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleLinkClick('/')}
                                        className="cursor-pointer"
                                    >
                                        <Image
                                            src={IMAGE.brandV2}
                                            width={120}
                                            height={30}
                                            alt='IGNITE'
                                            className="w-28 h-auto"
                                        />
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <MdClose className="w-6 h-6 text-gray-700" />
                                    </motion.button>
                                </div>

                                {/* Navigation Links */}
                                <motion.nav
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex-1 p-6"
                                >
                                    <div className="space-y-4">
                                        {NavLink.map((item) => (
                                            <motion.div
                                                key={item.href}
                                                variants={itemVariants}
                                                whileHover={{ x: 5 }}
                                                className="border-b border-gray-100 last:border-b-0"
                                            >
                                                <button
                                                    onClick={() => handleLinkClick(item.href)}
                                                    className={cn(
                                                        "w-full text-left py-4 px-3 rounded-lg text-base font-medium transition-colors duration-200",
                                                        pathname === item.href
                                                            ? "text-red-500 bg-red-50 font-semibold"
                                                            : "text-gray-700 hover:text-red-400 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {item.label}
                                                </button>
                                            </motion.div>
                                        ))}
                                        <Link  href="/join-our-club">
                                            <h1 onClick={() => setIsMobileMenuOpen(false)} className="text-base bg-gradient-to-r from-[#BF0A30] to-[#003F91] text-white px-3 py-1 inset-0 border border-gray-200 cursor-pointer bg-white w-fit rounded-full font-bold">Join the Be The Spark Club</h1>
                                        </Link>
                                    </div>
                                </motion.nav>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="p-6 border-t border-gray-200"
                                >
                                    <p className="text-sm text-gray-500 text-center">
                                        Together we can make a difference
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
