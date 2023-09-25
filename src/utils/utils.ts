export const voteColor = (vote: number) =>
  vote >= 8
    ? "green-500"
    : vote >= 6
    ? "yellow-500"
    : vote >= 4
    ? "orange-500"
    : "red-500";
