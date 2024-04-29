import Head from "next/head";
import Gallery from "./gallery";
import data from "@/data/imageData";
import { useState } from "react";
import Pagination from "@/components/pagination";
import LightBox from "@/components/LightBox";

export default function Home() {
  const [imagesData, setImagesData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [clickedImg, setClickedImg] = useState(null);

  const filterdArray = imagesData.filter((currItem) =>
    currItem.description.includes(searchValue)
  );

  const handleClick = (item) => {
    console.log(item);
    setClickedImg(item);
  };

  return (
    <div>
      <Head>
        <title>Simple Image Gallery</title>
        <meta
          name="description"
          content="An image gallery is a collection of images that are organized in a particular way, often from intention of displaying them to others."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/*  search functionality starts */}
        <div className="w-full flex justify-center mt-10">
          <input
            placeholder="search images 🔍 "
            className="p-2 bg-gray-200  text-center"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {/*  search functionality ends */}

        {filterdArray.length === 0 ? (
          <h3 className="flex justify-center m-60 text-gray-600 ">
            Image Not Found
          </h3>
        ) : (
          <>
            {" "}
            <div className=" mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className=" ml-11 grid grid-cols-1 gap-y-10 gap-x-6  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                {filterdArray.slice(page * 20 - 20, page * 20).map((elem) => (
                  <span key={elem.id} onClick={() => handleClick(elem)}>
                    <Gallery
                      imageUrl={elem.imageUrl}
                      description={elem.description}
                      id={elem.id}
                    />
                  </span>
                ))}
              </div>
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              totalImages={filterdArray}
            />
            <div>
              {clickedImg && (
                <LightBox
                  clickedImg={clickedImg}
                  setClickedImg={setClickedImg}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
