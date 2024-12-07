type ExtractDomain = {
  provider: string;
  domain: string;
};

const extractDomain = (email: string): ExtractDomain => {
  const domain: string = email.split("@")[1]!;
  let parts: string[] = domain.split(".");
  const match = /=(.*?)@/.exec(email);

  let extensions = 0;

  if (match?.[1]?.includes(".")) parts = match[1].split(".");

  if (parts.every((part) => part.length <= 3)) {
    return { provider: parts[0]!.toUpperCase(), domain: parts.join(".") };
  }

  if (parts.length > 2) {
    extensions = parts.reduce((extCount, part, idx) => {
      if (
        part.length <= 3 &&
        ((idx + 1 < parts.length && parts[idx + 1]!.length <= 3) ||
          !parts[idx + 1])
      ) {
        extCount++;
        return extCount;
      }
      return extCount;
    }, 0);
  }

  const result = extensions
    ? parts.slice(parts.length - extensions - 1)
    : parts;

  return { provider: result[0]!.toUpperCase(), domain: result.join(".") };
};

export { extractDomain };
