export const useGoBack = () => {
  const router = useRouter();

  const goBack = (fallback = "/") => {
    if (window.history.length > 1) {
      router.back();
    } else {
      navigateTo(fallback);
    }
  };

  return {
    goBack,
  };
};
