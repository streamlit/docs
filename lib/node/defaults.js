import fs from "fs";
import path from "path";

export const IS_DEV = process.env.NODE_ENV === "development";
const PYTHON_DIRECTORY = path.join(process.cwd(), "python/");

const jsonDocstrings = fs.readFileSync(
  path.join(PYTHON_DIRECTORY, "streamlit.json"),
  "utf8",
);
const jsonPlatformNotes = fs.readFileSync(
  path.join(PYTHON_DIRECTORY, "snowflake.json"),
  "utf8",
);

// Gather all versioning informationing to be available for import everywhere
export const DOCSTRINGS = jsonDocstrings ? JSON.parse(jsonDocstrings) : {};
export const VERSIONS_LIST = Object.keys(DOCSTRINGS).reverse();
export const LATEST_VERSION = VERSIONS_LIST[0];
export const DEFAULT_VERSION = "latest";
export const PLATFORM_NOTES = jsonPlatformNotes
  ? JSON.parse(jsonPlatformNotes)
  : {};
let platformVersions = {};
let latestPlatformVersion = {};
for (const index in Object.keys(PLATFORM_NOTES)) {
  const key = Object.keys(PLATFORM_NOTES)[index];
  platformVersions[key] = Object.keys(PLATFORM_NOTES[key]);
  latestPlatformVersion[key] = Object.keys(PLATFORM_NOTES[key]).at(-1);
}
export const PLATFORM_VERSIONS = platformVersions;
export const PLATFORM_LATEST_VERSIONS = latestPlatformVersion;
export const PLATFORM_NAMES = {};
PLATFORM_NAMES["oss"] = "All versions";
PLATFORM_NAMES["sis"] = "Streamlit in Snowflake";
PLATFORM_NAMES["na"] = "Snowflake Native Apps";
export const DEFAULT_PLATFORM = "oss";
