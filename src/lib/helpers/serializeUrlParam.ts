export const parseParamFromUrl = (param: string | string[]) => {
  if (typeof param !== 'string') {
    param = param[0]
  }
  return param.split("_").join(" ");
};

export const serializeStringToUrl = (string: string) => {
  return string.split(" ").join("_");
};
