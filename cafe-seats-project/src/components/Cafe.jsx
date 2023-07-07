import { useEffect } from "react";
import { collection, getDocs, db } from "../cafeConfig.js";

export default function Cafe() {
  useEffect(() => {
    const fetchCafes = async () => {
      const cafe_list = collection(db, "cafe-list");
      const result = await getDocs(cafe_list);
      const cafeData = result.docs.map((el) => el.data());
      console.log(cafeData);
    };
    void fetchCafes();
  }, []);

  return <div></div>;
}
