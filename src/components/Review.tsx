import { review } from "@/types";

const Review = ({ name, content }: review) => {
  return (
    <div className="rounded-xl max-w-2xl flex flex-col gap-2 shadow p-5">
      <span className="flex items-center gap-2">
        {/* <span className="w-10 h-10"><img className="rounded-full" src="https://placehold.co/400x400" alt="Client Image" /></span> */}
        <span className="text-xl font-semibold">{name}</span>
      </span>
      <span className="text-zinc-400">{content}</span>
    </div>
  );
};

export default Review;
