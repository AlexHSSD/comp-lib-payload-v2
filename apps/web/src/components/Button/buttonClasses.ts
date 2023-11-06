import { twMerge } from "tailwind-merge";

export function buttonClasses(color = "none", overrides = []) {
  const colors = {
    black: "bg-black text-white",
    red: "border-brandRed border-solid border text-black hover:bg-brandRed hover:text-white hover:font-bold",
    green:
      "border-brandGreen border-solid border text-black hover:bg-brandGreen hover:text-white hover:font-bold",
    greenalt:
      "border-brandGreen text-white hover:bg-brandGreen hover:text-white hover:font-bold",
    none: "bg-black text-white border-none hover:bg-brandGreen hover:font-bold hover:text-white",
    white:
      "border-white border-solid border-2 text-white bg-transparent hover:bg-white hover:text-black hover:font-bold",
  };
  return twMerge([
    "relative outline-none border-none appearance-none font-normal text-center rounded-btn cursor-pointer text-[0.813rem] justify-center min-w-[90px] px-4 py-2 leading-3 hover:scale-105 active:scale-95 transition-transform duration-300",
    color ? colors[color] : colors["none"],
    ...overrides,
  ]);
}
