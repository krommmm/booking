const getPageName = () => {
    const PATH = window.location.pathname;
    const PARTS = PATH.split("/");
    const FILE_NAME = PARTS[PARTS.length-1];
    const PAGE_NAME = FILE_NAME.replace(".html","");
    return PAGE_NAME
};
export default getPageName;