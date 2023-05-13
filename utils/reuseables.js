export const getColor = (name) => {
  switch (name) {
    case "successful":
      return {
        background: "#F1FFFD",
        color: "#1ee0ac"
      }
    case "error":
      return {
        background: "#FFF5F5",
        color: "#e85347"
      };
    case "failed":
      return {
        background: "#FFF5F5",
        color: "#e85347"
      };

    case "pending":
      return {
        background: "#FFFDF5",
        color: "#f4bd0e"
      };

    default:
      return "#1C9B88"

  }
}