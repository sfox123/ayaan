import { useRouter } from "next/router";

const page = () => {
  const router = useRouter();
  const { day } = router.query;
  return (
    <div>
      <h1>Tour : {day}</h1>
    </div>
  );
};

export default page;
