'use client';

import Link from 'next/link';

import { useAuth } from '../hooks';

const Navigation = () => {
  const { user, logout } = useAuth();

  const navItems = user
    ? [
        { href: '/users', label: 'Users' },
        { href: '/users/create', label: 'Create User' },
        { onClick: logout, label: 'Logout', isButton: true },
      ]
    : [
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' },
      ];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-bold text-white">
          <Link href="/">TestApp</Link>
        </div>
        <ul className="flex space-x-4">
          {navItems.map((item, index) =>
            item.isButton ? (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className="text-gray-300 hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ) : (
              <li key={index}>
                <Link
                  href={item.href!}
                  className="text-gray-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
