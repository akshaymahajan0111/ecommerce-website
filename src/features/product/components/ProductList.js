import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "../productSlice";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: { value: "Essence" }, label: "Essence", checkbox: false },
      {
        value: { value: "Glamour Beauty" },
        label: "Glamour Beauty",
        checkbox: false,
      },
      {
        value: { value: "Velvet Touch" },
        label: "Velvet Touch",
        checkbox: false,
      },
      {
        value: { value: "Chic Cosmetics" },
        label: "Chic Cosmetics",
        checkbox: false,
      },
      {
        value: { value: "Nail Couture" },
        label: "Nail Couture",
        checkbox: false,
      },
      {
        value: { value: "Calvin Klein" },
        label: "Calvin Klein",
        checkbox: false,
      },
      { value: { value: "Chanel" }, label: "Chanel", checkbox: false },
      { value: { value: "Dior" }, label: "Dior", checkbox: false },
      {
        value: { value: "Dolce & Gabbana" },
        label: "Dolce & Gabbana",
        checkbox: false,
      },
      { value: { value: "Gucci" }, label: "Gucci", checkbox: false },
      {
        value: { value: "Annibale Colombo" },
        label: "Annibale Colombo",
        checkbox: false,
      },
      {
        value: { value: "Furniture Co." },
        label: "Furniture Co.",
        checkbox: false,
      },
      { value: { value: "Knoll" }, label: "Knoll", checkbox: false },
      {
        value: { value: "Bath Trends" },
        label: "Bath Trends",
        checkbox: false,
      },
      { value: { value: "Apple" }, label: "Apple", checkbox: false },
      { value: { value: "Asus" }, label: "Asus", checkbox: false },
      { value: { value: "Huawei" }, label: "Huawei", checkbox: false },
      { value: { value: "Lenovo" }, label: "Lenovo", checkbox: false },
      { value: { value: "Dell" }, label: "Dell", checkbox: false },
      {
        value: { value: "Fashion Trends" },
        label: "Fashion Trends",
        checkbox: false,
      },
      { value: { value: "Gigabyte" }, label: "Gigabyte", checkbox: false },
      {
        value: { value: "Classic Wear" },
        label: "Classic Wear",
        checkbox: false,
      },
      {
        value: { value: "Casual Comfort" },
        label: "Casual Comfort",
        checkbox: false,
      },
      {
        value: { value: "Urban Chic" },
        label: "Urban Chic",
        checkbox: false,
      },
      { value: { value: "Nike" }, label: "Nike", checkbox: false },
      { value: { value: "Puma" }, label: "Puma", checkbox: false },
      {
        value: { value: "Off White" },
        label: "Off White",
        checkbox: false,
      },
      {
        value: { value: "Fashion Timepieces" },
        label: "Fashion Timepieces",
        checkbox: false,
      },
      { value: { value: "Longines" }, label: "Longines", checkbox: false },
      { value: { value: "Rolex" }, label: "Rolex", checkbox: false },
      { value: { value: "Amazon" }, label: "Amazon", checkbox: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "beauty", label: "beauty", checkbox: false },
      { value: "fragrances", label: "fragrances", checkbox: false },
      { value: "furniture", label: "furniture", checkbox: false },
      { value: "groceries", label: "groceries", checkbox: false },
      {
        value: "home-decoration",
        label: "home decoration",
        checkbox: false,
      },
      {
        value: "kitchen-accessories",
        label: "kitchen accessories",
        checkbox: false,
      },
      { value: "laptops", label: "laptops", checkbox: false },
      { value: "mens-shirts", label: "mens shirts", checkbox: false },
      { value: "mens-shoes", label: "mens shoes", checkbox: false },
      { value: "mens-watches", label: "mens watches", checkbox: false },
      {
        value: "mobile-accessories",
        label: "mobile accessories",
        checkbox: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    // TODO : on server it will support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({ filter, sort }));
  }, [dispatch, filter, sort]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}

        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p
                          onClick={(e) => handleSort(e, option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "bg-gray-100",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilter={handleFilter}></DesktopFilter>
              <ProductGrid products={products}></ProductGrid>
            </div>
          </section>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <Pagination />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  handleFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>
            {filters.map((section) => (
              <Disclosure
                key={section.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function DesktopFilter({ handleFilter }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={option.checked}
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    type="checkbox"
                    onChange={(e) => handleFilter(e, section, option)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

function Pagination() {
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Link to="/product-details">
                  <div
                    key={product.id}
                    className="group relative border-solid border-2 p-2"
                  >
                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <div href={product.thumbnail}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 h-6 inline"></StarIcon>
                          <span className="align-bottom">{product.rating}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className="text-sm line-through font-medium text-gray-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}