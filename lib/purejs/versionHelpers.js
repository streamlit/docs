export function looksLikeVersionAndPlatformStringGeneric(
  urlPart,
  defaultPlatform,
  platformVersions,
) {
  const platforms = [defaultPlatform].concat(Object.keys(platformVersions));

  // docs.streamlit.io/1.23.0/path1/path2
  const isPureVersion = /^[\d\.]+$/.test(urlPart);
  if (isPureVersion) return true;

  // docs.streamlit.io/latest/path1/path2
  const isLatestVersion = urlPart == "latest";
  if (isLatestVersion) return true;

  // docs.streamlit.io/1.23.0-sis/path1/path2
  const versionPlatformRegex = RegExp(`^[\\d\\.]+-(${platforms.join("|")})$`);
  const isVersionWithPlatform = versionPlatformRegex.test(urlPart);
  if (isVersionWithPlatform) return true;

  // docs.streamlit.io/latest-sis/path1/path2
  const latestPlatformRegex = RegExp(`^latest-(${platforms.join("|")})$`);
  const isLatestPlatform = latestPlatformRegex.test(urlPart);
  if (isLatestPlatform) return true;

  return false;
}
