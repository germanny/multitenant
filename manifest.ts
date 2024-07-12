export type ManifestProps = {
  name: string;
  description: string;
  subdomain: string;
  customDomain: string;
};

const manifest: ManifestProps[] = [
  {
    name: "Foo Site",
    description: "A Next.js site with subdomain support",
    subdomain: "foo",
    customDomain: "nextjs-site.vercel.app",
  },
  {
    name: "Bar Site",
    description: "Bar site with subdomain support",
    subdomain: "bar",
    customDomain: "another-nextjs-site.vercel.app",
  },
  {
    name: "Baz Site",
    description: "Baz site with subdomain support",
    subdomain: "baz",
    customDomain: "third-nextjs-site.vercel.app",
  },
];

/**
 * Returns the data of the hostname based on its subdomain or custom domain.
 *
 * This method is used by middleware.ts
 */
export async function getManifestData(currentHost?: string) {
  if (!currentHost) return null;

  // check if this is a subdomain
  const customDomain = currentHost.includes(".");

  // fetch data from the manifest
  return manifest.find((siteObject) =>
    customDomain
      ? siteObject.customDomain === currentHost
      : siteObject.subdomain === currentHost
  );
}

/**
 * Returns the paths for `getStaticPaths` based on the subdomain of every
 * available hostname.
 */
export async function getSubdomainPaths() {
  // get all sites that have subdomains set up
  const subdomains = manifest.filter((siteObject) => siteObject.subdomain);

  // build paths for each of the sites in the previous two lists
  return subdomains.map((item) => {
    return { params: { site: item.subdomain } };
  });
}

export default manifest;
