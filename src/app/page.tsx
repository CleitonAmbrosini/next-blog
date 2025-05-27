import clsx from "clsx";

export default async function HomePage() {
  return (
    <div>
      <h1
        className={clsx(
          "text-xl",
          "font-bold",
          "text-blue-500",
          "hover:text-blue-50",
          "hover:bg-blue-500",
          "transition",
          "duration-300"
        )}
      >
        Olá
      </h1>
    </div>
  );
}
