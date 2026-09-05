import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export async function renderSlug(slugDir) {
  const base = slugDir.endsWith("/") ? slugDir : `${slugDir}/`;
  const config = JSON.parse(readFileSync(`${base}config.json`, "utf8"));
  const { default: shell } = await import(pathToFileURL(`${base}shell.mjs`).href);
  const sections = [];
  for (const name of config.sections) {
    const { default: render } = await import(pathToFileURL(`${base}components/${name}.mjs`).href);
    sections.push(render(config));
  }
  return shell(config, sections.join("\n"));
}
