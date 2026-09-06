import { ImageResponse } from "next/og";

export const alt = "Jeevan Sanchez | Embedded Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#1D1D1D",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 88,
            height: 300,
            width: 300,
          }}
        />
      </div>
    ),
    size,
  );
}