import { CMSLink } from "../Link";

const rendersubNavItems = (subNavItems, setMobileNavOpen, depth, largeMenu) => {
  const d = depth + 1;
  const largeParentClasses = `block list-none whitespace-nowrap m-0 pl-4 font-normal prose-a:text-six nav:text-left nav:shadow-menu nav:px-4 nav:pt-2 nav:pb-6 nav:border-0 nav:bg-pinkishGrey nav:min-w-full nav:absolute nav:top-full nav:left-1/2 nav:transition-all nav:opacity-0 nav:pointer-events-none nav:-translate-x-1/2 nav:translate-y-10px nav:max-w-screen-lg nav:flex nav:flex-wrap nav:items-stretch nav:justify-center nav:after:absolute nav:after:block nav:after:bottom-0 nav:after:w-screen nav:after:left-1/2 nav:after:-translate-x-1/2 nav:after:-z-10 nav:after:bg-pinkishGrey nav:after:h-[calc(100%+1px)] nav:prose-a:text-five nav:group-hover:pointer-events-auto nav:group-hover:opacity-100 nav:group-hover:-translate-y-0 nav:space-x-12 hover:opacity-50 hover:duration-250`;
  const parentClasses = `mob:border-l mob:py-2 mob:border-l-grey-400 rounded-menu block list-none transition-all duration-250 whitespace-nowrap m-0 pl-8 font-normal prose-a:text-fiv nav:text-center nav:shadow-menu nav:py-4 nav:px-8 nav:shadow-header nav:min-w-full nav:absolute nav:left-1/2 nav:-translate-x-1/2 nav:translate-y-10px nav:pointer-events-none nav:opacity-0 nav:before:absolute nav:before:bottom-full nav:before:left-0 nav:before:h-[10px] nav:before:w-full nav:group-hover:opacity-100 nav:group-hover:-translate-y-0 nav:top-full nav:space-y-1 nav:group-hover:pointer-events-auto hover:opacity-50 hover:duration-250 bg-white`;
  return (
    <div
      className={
        depth === 1
          ? largeMenu
            ? largeParentClasses
            : parentClasses
          : "prose-a:font-normal"
      }
    >
      {renderNavItems(subNavItems, setMobileNavOpen, d)}
    </div>
  );
};

const renderNavItems = (navItems, setMobileNavOpen, depth = 1) => {
  const largeMenuClasses = `${
    depth === 1
      ? "static prose-a:text-five mob:text-four mob:block mob:[&>span]:opacity-75 nav:text-center nav:flex nav:items-center nav:[&>span]:cursor-pointer group border-b border-white last-of-type:border-b-0 "
      : ""
  }`;
  const menuClasses = `relative mob:text-xl mob:block mob:not-last:mb-2 mob:not-last:pb-2 mob:not-last:border-b mob:not-last:border-b-white nav:text-center nav:flex nav:items-center group`;
  return navItems.map(({ link, subNavItems }, i) => {
    let largeMenu = false;
    if (depth === 1 && subNavItems) {
      subNavItems.forEach((item) => {
        largeMenu = item.subNavItems?.length > 0;
      });
    }
    return (
      <div
        className={
          depth === 1
            ? largeMenu
              ? largeMenuClasses
              : menuClasses
            : menuClasses
        }
        key={i}
      >
        <CMSLink
          {...link}
          onClick={() => setMobileNavOpen(false)}
          className={`transition-opacity hover:opacity-50 ${
            depth === 2 && subNavItems?.length > 0
              ? "font-extrabold"
              : depth !== 1
              ? "font-normal"
              : ""
          }`}
        />
        {subNavItems?.length > 0 &&
          rendersubNavItems(subNavItems, setMobileNavOpen, depth, largeMenu)}
      </div>
    );
  });
};

export const HeaderItems = ({ navItems, setMobileNavOpen }) => {
  return <>{navItems && renderNavItems(navItems, setMobileNavOpen)}</>;
};
