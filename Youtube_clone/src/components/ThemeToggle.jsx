import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "./useTheme";

export default function ThemeToggle() {
  const [dark, toggle] = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800
                 text-gray-700 dark:text-zinc-200 hover:bg-gray-200
                 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
