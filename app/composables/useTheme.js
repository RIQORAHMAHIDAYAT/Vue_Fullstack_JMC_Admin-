export const useTheme = () => {
  const theme = useState("theme", () => "light");

  const initTheme = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme") || "light";
    theme.value = saved;
    document.body.setAttribute("data-bs-theme", saved);
  };

  const toggleTheme = () => {
    const next = theme.value === "dark" ? "light" : "dark";
    theme.value = next;
    document.body.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
  };

  const isDark = computed(() => theme.value === "dark");

  return { theme, isDark, initTheme, toggleTheme };
};
