"use client"

import { useState, } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";


// Navigation Component
interface HeaderProps {
  logoText?: string;
  navLinks?: Array<{ text: string; href: string }>;
  showGetStarted?: Boolean
}

export default function Header({
  logoText,
  navLinks = [],
  showGetStarted
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(navLinks)


  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">HostelHub {""}</p>
              <span className="text-sm font-extralight">{logoText}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="secondary" size="sm" className="px-2">
              <Link href="/auth/login"> Sign In</Link>
            </Button>
            {showGetStarted && (
              <Button asChild size="sm" >
                <Link href="/property" className="">
                  Get Started</Link>
              </Button>
            )}

          </div>

          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {
        mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="secondary" size="sm">
                  <Link href="/auth/login">
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" >
                  <Link href="/list-property">
                    Get Started
                  </Link>
                </Button>

              </div>
            </div>
          </div>
        )
      }
    </header >
  );
};


// const HotelHeader = () => {
//   const [menuState, setMenuState] = React.useState(false)
//   const [scrolled, setScrolled] = React.useState(false)
//   const { scrollYProgress } = useScroll()

//   React.useEffect(() => {
//     const unsubscribe = scrollYProgress.on('change', (latest) => {
//       setScrolled(latest > 0.05)
//     })
//     return () => unsubscribe()
//   }, [scrollYProgress])

//   return (
//     <header>
//       <nav
//         data-state={menuState && 'active'}
//         className="group fixed z-20 w-full pt-2">
//         <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/50 backdrop-blur-2xl')}>
//           <motion.div
//             className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
//             <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
//               <a
//                 href="/"
//                 aria-label="home"
//                 className="flex items-center space-x-2">
//                 <Hotel className="h-8 w-8 text-primary" />
//                 <span className="text-xl font-bold">LuxStay</span>
//               </a>

//               <button
//                 onClick={() => setMenuState(!menuState)}
//                 aria-label={menuState ? 'Close Menu' : 'Open Menu'}
//                 className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
//                 <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
//                 <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
//               </button>

//               <div className="hidden lg:block">
//                 <ul className="flex gap-8 text-sm">
//                   {menuItems.map((item, index) => (
//                     <li key={index}>
//                       <a
//                         href={item.href}
//                         className="text-muted-foreground hover:text-accent-foreground block duration-150">
//                         <span>{item.name}</span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
//               <div className="lg:hidden">
//                 <ul className="space-y-6 text-base">
//                   {menuItems.map((item, index) => (
//                     <li key={index}>
//                       <a
//                         href={item.href}
//                         className="text-muted-foreground hover:text-accent-foreground block duration-150">
//                         <span>{item.name}</span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="sm">
//                   <a href="#contact">
//                     <span>Login</span>
//                   </a>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm">
//                   <a href="#contact">
//                     <span>Book Now</span>
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </nav>
//     </header>
//   )
// }
