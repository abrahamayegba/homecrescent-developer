import React from "react";
import HomeCard from "./HomeCard";

const homes = [
  {
    image: "/home1.jpg",
    baths: 2,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 250000,
    address: "123 Main St",
  },
  {
    image: "/home2.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home3.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home1.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home4.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home3.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home5.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home1.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home4.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home3.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
  {
    image: "/home5.jpg",
    baths: 3,
    beds: 2,
    sqft: "3000",
    status: "active",
    price: 350000,
    address: "456 Elm St",
  },
];

const Singlepropertytabcontent = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-primary-blue lg:grid-cols-3 overflow-auto gap-x-3 gap-y-1 justify-between w-full mt-10">
        {homes.map((home, index) => (
          <div key={index} className="w-full">
            <HomeCard
              beds={home?.beds}
              sqft={home?.sqft}
              status={home?.status}
              price={home?.price}
              baths={home?.baths}
              image={home?.image}
              address={home?.address}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Singlepropertytabcontent;
