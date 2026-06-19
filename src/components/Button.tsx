type ButtonProps = {
  children: React.ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button className="px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
      {children}
    </button>
  );
}
