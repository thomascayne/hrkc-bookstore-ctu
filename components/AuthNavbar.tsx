// app/components/AuthNavbar.tsx
"use client";

import AppLogo from "@/components/AppLogo";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { NavbarMenuToggle } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { RiShoppingCart2Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { bookCategories } from "@/utils/bookCategories";
import ThemeSwitch, { Theme } from "./ThemeSwitcher";

interface AuthNavbarProps {
  user: User | null;
  disableMenuItems?: boolean;
}

export default function AuthNavbar({
  user,
  disableMenuItems = false,
}: AuthNavbarProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const apiUrl = "https://www.googleapis.com/books/v1/volumes";
  const url = `${apiUrl}?q=subject:fiction&orderBy=relevance&maxResults=40&key=${apiKey}`;

  useEffect(() => {
    // check for stored there
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleCategorySelect = async (key: string, label: string) => {
    try {
      // Fetch books for the selected category
      const response = await fetch(url);
      const data = await response.json();

      // Store the fetched books in localStorage or state management solution
      localStorage.setItem("categoryBooks", JSON.stringify(data.items));

      // Navigate to the category page
      router.push(
        `/category/${encodeURIComponent(key)}?label=${encodeURIComponent(
          label
        )}`
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const menuItems = [
    { item: "Categories", icon: <BiCategory /> },
    { item: "Cart", icon: <RiShoppingCart2Line /> },
    { item: user ? "Profile" : "", icon: user ? <FaRegUser /> : "" },
    {
      item: user ? "Sign Out" : "Sign In",
      icon: user ? <VscSignOut /> : <VscSignIn />,
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      position="static"
      className="py-1 fixed top-0 left-0 right-0 z-50"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link
            href="/"
            className="border-transparent hover:border-current border-1 rounded-md p-1"
          >
            <AppLogo theme={theme} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="this-is-for-when-menu-is-close-on-md-and-up ml-auto"
      >
        {!disableMenuItems && (
          <>
            <Dropdown>
              <NavbarItem className="hidden sm:flex">
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="flex border-transparent hover:border-current border-1 rounded-md p-1"
                    radius="sm"
                    variant="light"
                  >
                    <BiCategory className="mr-1" />
                    <span>Catergories</span>
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Book Categories"
                className="p-0"
                itemClasses={{
                  base: [
                    "data-[hover=true]:bg-default-100",
                    "min-w-[120px]",
                    "whitespace-nowrap",
                  ],
                }}
                items={bookCategories}
                classNames={{
                  list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[280px] sm:w-[560px] lg:w-[840px] xl:w-[1120px]",
                }}
                onAction={(key) => {
                  const category = bookCategories.find(
                    (cat) => cat.key === key
                  );

                  if (category) {
                    handleCategorySelect(category.key, category.label);
                  }
                }}
              >
                {(category) => (
                  <DropdownItem key={category.key}>
                    <Link
                      href={`/category/${encodeURIComponent(category.key)}`}
                      className="flex items-center p-2 w-full"
                    >
                      <span>{category.label}</span>
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <NavbarItem className="hidden sm:flex">
              <Link
                color="foreground"
                href="#"
                className="flex border-transparent hover:border-current border-1 rounded-md p-1"
              >
                <RiShoppingCart2Line className="mr-1" />
                <span>Cart</span>
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              {user ? (
                <div className="flex">
                  <Link
                    href="/profile"
                    className="py-2 px-3 flex no-underline bg-transparent border-transparent hover:border-current border-1 rounded-md p-1"
                  >
                    <FaRegUser className="mr-1" />
                    <span>Profile</span>
                  </Link>
                  <form action="/logout" method="post">
                    <button className="py-2 px-3 flex no-underline bg-transparent border-transparent hover:border-current border-1 rounded-md p-1">
                      <VscSignOut className="mr-1" />
                      <span>Sign Out</span>
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="py-2 px-3 flex no-underline bg-transparent border-transparent hover:border-current border-1 rounded-md p-1"
                >
                  <VscSignIn className="mr-1" />
                  <span>Sign In</span>
                </Link>
              )}
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <ThemeSwitch onThemeChange={handleThemeChange} initialTheme={theme} />
        </NavbarItem>

        {!disableMenuItems && (
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        )}
      </NavbarContent>

      {!disableMenuItems && (
        <NavbarMenu className="this-is-for-when-the-menu-is-open sm:flex">
          {menuItems.map(({ item, icon }, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              className="hover:bg-default-300 text-blue-500 dark:hover:bg-gray-300 dark:hover:text-black"
            >
              {item === "Sign Out" ? (
                <form action="/logout" method="post">
                  <button className="w-full flex text-danger text-lg items-center">
                    {icon && <span className="mr-2">{icon}</span>}
                    {item}
                  </button>
                </form>
              ) : item === "Categories" ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Link
                      color={index === 2 ? "primary" : "foreground"}
                      className="w-full cursor-pointer"
                      size="lg"
                    >
                      {icon && <span className="mr-2">{icon}</span>}
                      {item}
                    </Link>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Book Categories"
                    className="p-0 w-full max-h-[calc(100vh-100px)] overflow-auto"
                    itemClasses={{
                      base: [
                        "data-[hover=true]:bg-default-100",
                        "min-w-[120px]",
                        "whitespace-nowrap",
                      ],
                    }}
                    items={bookCategories}
                    classNames={{
                      list: "grid grid-cols-2 sm:grid-cols-2 gap-2 py-2 px-4",
                    }}
                    onAction={(key) => {
                      const category = bookCategories.find(
                        (cat) => cat.key === key
                      );
                      if (category) {
                        handleCategorySelect(category.key, category.label);
                      }
                    }}
                  >
                    {(category) => (
                      <DropdownItem key={category.key}>
                        <Link
                          href={`/category/${encodeURIComponent(category.key)}`}
                          className="flex items-center p-2 w-full"
                        >
                          <span>{category.label}</span>
                        </Link>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "foreground"
                      : "foreground"
                  }
                  className="w-full"
                  href={item === "Sign In" ? "/login" : "#"}
                  size="lg"
                >
                  {icon && <span className="mr-2">{icon}</span>}
                  {item}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
