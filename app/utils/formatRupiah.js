export const formatRupiah = (value) => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
