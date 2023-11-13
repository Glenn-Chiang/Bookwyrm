export const stripTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};
