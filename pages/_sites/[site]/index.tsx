import { useRouter } from "next/router";
// import { getHostnameDataBySubdomain, getSubdomainPaths } from "@/lib/db";

export interface Props {
  name: String;
  description: String;
  subdomain: String;
  customDomain: String;
}

export default function Index(props: Props) {
  const router = useRouter();

  const { site } = router.query;

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
      <h1>{site}</h1>
    </main>
  );
}
