import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumb() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  const title = pathSegments[pathSegments.length - 1] || "Home";

  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index}>
            {index === pathSegments.length - 1 ? (
              segment
            ) : (
              <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                {segment}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .breadcrumb {
          padding: 10px 20px;
          background-color: #f9f9f9;
          font-size: 14px;
          margin: 0px 40px;
        }
        .breadcrumb ul {
          list-style: none;
          display: flex;
          gap: 5px;
          margin: 0;
          padding: 0;
        }
        .breadcrumb li {
          display: inline;
        }
        .breadcrumb li:not(:last-child)::after {
          content: ">";
          margin: 0 5px;
        }
        .breadcrumb a {
          text-decoration: none;
          color: #0070f3;
        }
        .breadcrumb a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
