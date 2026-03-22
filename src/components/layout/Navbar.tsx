import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: session } = useSession();

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const studentLinks = [
    { name: "Dashboard", href: "/app/dashboard" },
    { name: "Sessions", href: "/app/sessions" },
    { name: "Assignments", href: "/app/assignments" },
  ];

  const coachLinks = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Sessions", href: "/admin/sessions" },
    { name: "Assignments", href: "/admin/assignments" },
  ];

  let navLinks = publicLinks;
  if (session?.user?.role === "STUDENT") {
    navLinks = studentLinks;
  } else if (session?.user?.role === "COACH") {
    navLinks = coachLinks;
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-900 tracking-tight">
            Career<span className="text-accent-500">Coach</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                router.pathname.startsWith(link.href) && link.href !== "/"
                  ? "text-accent-500" 
                  : router.pathname === "/" && link.href === "/" ? "text-accent-500" : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!session ? (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-accent-500">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-medium text-slate-600 hover:text-accent-500">
                Sign Up
              </Link>
              <Link href="/contact">
                <Button variant="primary">Book a Session</Button>
              </Link>
            </div>
          ) : (
            <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2">
              <LogOut size={16} /> Logout
            </Button>
          )}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium p-2 rounded-md ${
                router.pathname.startsWith(link.href) && link.href !== "/"
                  ? "bg-primary-50 text-primary-900"
                  : router.pathname === "/" && link.href === "/" ? "bg-primary-50 text-primary-900" : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!session ? (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium p-2 rounded-md text-slate-600">
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium p-2 rounded-md text-slate-600">
                Sign Up
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Book a Session
                </Button>
              </Link>
            </>
          ) : (
            <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center justify-center gap-2">
              <LogOut size={18} /> Logout
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
