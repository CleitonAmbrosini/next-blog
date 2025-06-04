import { ThemeToggle } from "../ToggleTheme";

export function Header() {
  return (
    <header className='flex align-items-center justify-center py-8 relative'>
      <h1 className='text-6xl font-bold text-center'>Aqui é a header</h1>
      <ThemeToggle />
    </header>
  );
}
