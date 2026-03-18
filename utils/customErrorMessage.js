import { toast } from "react-toastify";

export const customErrorMessage = async (error, closeAfter) => {
  console.log("error", error);

  const errorArray = error
    ?.split("✖")
    .map((error) => "✖" + error)
    .filter((error) => error !== "✖") || ["✖ something went wrong"];
  console.log("error array", errorArray);

  toast.error(errorArray.join("\n"), {
    autoClose: closeAfter,
    // This allows line breaks in the toast message
    style: { whiteSpace: "pre-line" },
  });
};
