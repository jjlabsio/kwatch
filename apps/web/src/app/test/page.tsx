import type { GetTestResponse } from "@/types/api";
import ky from "ky";

export const dynamic = "force-dynamic";

const fetchData = async (): Promise<GetTestResponse> => {
  const data = await ky
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/test`)
    .json<GetTestResponse>();

  return data;
};

export default async function TestPage() {
  const data = await fetchData();

  return (
    <div>
      <div>test</div>
      {data && (
        <div>
          {data.list.map((el) => (
            <div key={el.id} className="border-primary m-10">
              <div>{el.id}</div>
              <div>{el.startAt}</div>
              <div>{el.endAt ?? "진행중"}</div>
              <div>{el.type}</div>
            </div>
          ))}
          <div className="m-10">{data.today}</div>
          {data.filtered.map((el) => (
            <div key={el.id} className="border-primary m-10">
              <div>{el.id}</div>
              <div>{el.startAt}</div>
              <div>{el.endAt ?? "진행중"}</div>
              <div>{el.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
