export const voteColor = (vote: number) =>
  vote >= 8 ? "text-green-500" : vote >= 6 ? "text-yellow-500" : "text-red-500";
