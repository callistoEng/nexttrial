import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { BsShareFill } from "react-icons/bs";

export const Interact = ({ listing, dispatch, likeListings }) => {
  if (!listing) {
    return null;
  }
  return (
    <div className="h-48 md:h-52 rounded-t-xl overflow-hidden relative">
      <Link href={`/listings/more-info/${listing.slug}`}>
        <img
          src={
            listing.thumbnail ? listing.thumbnail : listing.Images[0]?.images
          }
          alt={listing.title.substring(0, 50)}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="flex justify-between items-center content-center">
        <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
          <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
            {listing.category?.category_name === "For Sale" ? (
              <p className="font-semibold text-xs text-cloud-theme-blue ">
                SALE
              </p>
            ) : listing.category?.category_name === "For Rent" ? (
              <p className="font-semibold text-xs text-cloud-theme-blue ">
                TO-LET
              </p>
            ) : (
              <p className="font-semibold text-xs text-cloud-theme-blue ">
                LEASE
              </p>
            )}
          </div>
        </div>
        <div className="absolute top-3 md:right-3 right-1.5 text-white flex justify-between items-center content-center">
          <div className="rounded-md mr-1.5">
            <button
              type="button"
              onClick={() => dispatch(likeListings(listing.slug))}
              className="bg-cloud-theme-blue/40 dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-2 nd:mr-4"
            >
              <AiOutlineHeart className="mt-1.5 md:text-lg text-sm text-white" />
            </button>
          </div>
          <div className="rounded-md group">
            <button
              type="button"
              className="bg-cloud-theme-blue/40 dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-1"
            >
              <BsShareFill className="mt-1.5 md:text-lg text-sm text-white" />
            </button>
            <ul
              className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
            -right-full transition-all duration-50"
            >
              <li>
                <FacebookShareButton
                  quote={listing.title}
                  // url = {String(window.location.href)}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                >
                  <FacebookIcon size={20} round={true} />
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton
                  related={["@EstateCloudKe"]}
                  hashtags={["1EstateCloud"]}
                  title={listing.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                >
                  <TwitterIcon size={20} round={true} />
                </TwitterShareButton>
              </li>
              <li>
                <WhatsappShareButton
                  title={listing.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                >
                  <WhatsappIcon size={20} round={true} />
                </WhatsappShareButton>
              </li>
              <li>
                <TelegramShareButton
                  title={listing.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                >
                  <TelegramIcon size={20} round={true} />
                </TelegramShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export const InteractProperties = ({ listing, dispatch, likeListings }) => {
  if (!listing) {
    return null;
  }
  return (
    <div className="h-52 rounded-t-xl overflow-hidden relative">
      <Link href={`/listings/more-info/${listing.properties.slug}`}>
        <img
          src={
            listing.properties.thumbnail
              ? listing.properties.thumbnail
              : listing.properties.Images[0]?.images
          }
          alt={listing.properties.title.substring(0, 50)}
          className="w-full h-full object-cover"
        />
      </Link> 
      <div className="flex justify-between items-center content-center">
        <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
          <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
            {listing.properties.category?.category_name === "For Sale" ? (
              <p className="font-semibold text-xs text-cloud-theme-blue ">
                SALE
              </p>
            ) : (
              <p className="font-semibold text-xs text-cloud-theme-blue ">
                TO LET
              </p>
            )}
          </div>
        </div>
        <div className="absolute top-3 right-2 text-white flex justify-between items-center content-center">
          <div className="rounded-md mr-1.5">
            <button
              type="button"
              onClick={() => dispatch(likeListings(listing.properties.slug))}
              className="bg-cloud-theme-blue/40 dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex
              justify-center rounded-full w-6 h-6 mr-4"
            >
              <AiOutlineHeart className="mt-1 md:text-base text-sm text-white" />
            </button>
          </div>
          <div className="rounded-md group">
            <button
              type="button"
              className="bg-cloud-theme-blue/40 dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex
              justify-center rounded-full w-6 h-6 mr-1"
            >
              <BsShareFill className="mt-1 md:text-base text-sm text-white" />
            </button>
            <ul
              className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                                    -right-full transition-all duration-50"
            >
              <li>
                <FacebookShareButton
                  quote={listing.properties.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                >
                  <FacebookIcon size={20} round={true} />
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton
                  title={listing.properties.title}
                  related={["@EstateCloudKe"]}
                  hashtags={["1EstateCloud"]}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                >
                  <TwitterIcon size={20} round={true} />
                </TwitterShareButton>
              </li>
              <li>
                <WhatsappShareButton
                  title={listing.properties.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                >
                  <WhatsappIcon size={20} round={true} />
                </WhatsappShareButton>
              </li>
              <li> 
                <TelegramShareButton
                  title={listing.properties.title}
                  url={`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                >
                  <TelegramIcon size={20} round={true} />
                </TelegramShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
