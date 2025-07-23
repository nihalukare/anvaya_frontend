export default function Header({ headerText }) {
  return (
    <header className="text-center text-bg-primary mb-3">
      <h1 className="py-4 text-uppercase">{headerText}</h1>
    </header>
  );
}
