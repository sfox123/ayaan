import { useRouter } from "next/router";

const page = () => {
  const router = useRouter();
  const { city } = router.query;
  return (
    <div>
      <h1>Destination : {city}</h1>
    </div>
  );
};

export default page;
