import React from "react";
import { SvgXml } from "react-native-svg";

export default function FemaleSvg() {
  const variable = `<svg fill="#000000" viewBox="0 0 10 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>female</title> <path d="M7.656 7.344c0-1.313-1.063-2.375-2.375-2.375-1.281 0-2.344 1.063-2.344 2.375s1.063 2.375 2.344 2.375c1.313 0 2.375-1.063 2.375-2.375zM8.969 11.219l1.563 4.906c0.156 0.406-0.094 0.844-0.5 0.969-0.406 0.156-0.844-0.094-1-0.5l-0.844-2.594c-0.125-0.406-0.5-0.75-0.844-0.75-0.313 0-0.469 0.344-0.344 0.75l1.813 5.594c0.125 0.406-0.125 0.75-0.563 0.75h-0.781v6.344c0 0.438-0.375 0.781-0.781 0.781-0.438 0-0.813-0.344-0.813-0.781v-6.344h-1.188v6.344c0 0.438-0.344 0.781-0.781 0.781s-0.781-0.344-0.781-0.781v-6.344h-0.781c-0.438 0-0.688-0.344-0.563-0.75l1.813-5.594c0.125-0.406-0.031-0.75-0.375-0.75-0.313 0-0.688 0.344-0.844 0.75l-0.844 2.594c-0.125 0.406-0.563 0.656-0.969 0.5-0.438-0.125-0.656-0.563-0.531-0.969l1.594-4.906c0.125-0.406 0.594-0.75 1.031-0.75h5.281c0.438 0 0.875 0.344 1.031 0.75z"></path> </g></svg>`;
  const FemaleSVG = () => <SvgXml xml={variable} width="100%" height="100%" />;
  return <FemaleSVG></FemaleSVG>;
}
