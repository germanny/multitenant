import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { useRouter } from "next/router";
import { ManifestProps, getManifestData, getSubdomainPaths } from "@/manifest";

export default function Page({
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        <h1 className="font-bold text-5xl mb-8">{site?.name}</h1>
        <p>Description: {site?.description}</p>
        <p>Fake custom domain: {site?.customDomain}</p>
      </div>
    </main>
  );
}

// Getting the paths for all the subdomains in our database
export const getStaticPaths = (async () => {
  const paths = await getSubdomainPaths();
  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

// Getting data to display on each custom subdomain
export const getStaticProps: GetStaticProps<{
  site?: ManifestProps | null;
}> = async (context) => {
  const { site } = context.params as { site: string };
  const sites = await getManifestData(site);
  return { props: { site: sites } };
};
